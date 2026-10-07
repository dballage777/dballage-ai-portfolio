#!/usr/bin/env python3
"""
fetch_transcript.py  —  part of the /transcribe-hacks Claude Code skill.

Given a YouTube URL, retrieve video metadata + the full transcript and write:
  - a human-readable transcript file (transcripts/<slug>.txt)
  - a machine-readable JSON (<--json> path or stdout) that the skill reads next

Strategy (simplest reliable method first):
  1. yt-dlp metadata  (title, channel, id)
  2. yt-dlp subtitles: manual subs first, then auto-captions (English)
  3. Fallback: if no captions AND ffmpeg+whisper exist -> download audio + STT
  4. Otherwise: report clearly that no transcript could be obtained.

Dependencies are checked, not assumed. yt-dlp is auto-installed to the user
site if missing. ffmpeg/whisper are optional (only for the no-captions path).

This script only READS from YouTube and WRITES local files; it never executes
downloaded content.
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

YT_URL_RE = re.compile(
    r"^(https?://)?(www\.|m\.)?(youtube\.com/(watch\?v=|shorts/|live/)|youtu\.be/)[\w\-]{6,}",
    re.IGNORECASE,
)


def eprint(*a):
    print(*a, file=sys.stderr, flush=True)


def sanitize_filename(name: str, maxlen: int = 120) -> str:
    name = re.sub(r"[\\/:*?\"<>|]+", " ", name)      # illegal on common filesystems
    name = re.sub(r"\s+", " ", name).strip()
    name = name.replace(" ", "_")
    return (name[:maxlen].rstrip("_") or "youtube_video")


def ensure_yt_dlp() -> list:
    """Return the command prefix to invoke yt-dlp, installing it if needed."""
    if shutil.which("yt-dlp"):
        return ["yt-dlp"]
    # module form?
    if subprocess.run([sys.executable, "-m", "yt_dlp", "--version"],
                      capture_output=True).returncode == 0:
        return [sys.executable, "-m", "yt_dlp"]
    eprint("yt-dlp not found — installing to user site…")
    subprocess.run([sys.executable, "-m", "pip", "install", "--user", "--quiet", "yt-dlp"],
                   check=True)
    return [sys.executable, "-m", "yt_dlp"]


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def get_metadata(ytdlp, url):
    r = run(ytdlp + ["--dump-single-json", "--skip-download", "--no-warnings", url])
    if r.returncode != 0:
        raise RuntimeError("yt-dlp could not read the video metadata.\n" + r.stderr.strip())
    info = json.loads(r.stdout)
    return {
        "video_id": info.get("id", ""),
        "title": info.get("title", "Untitled video"),
        "channel": info.get("uploader") or info.get("channel") or "",
        "duration": info.get("duration"),
        "webpage_url": info.get("webpage_url", url),
    }


def _vtt_to_lines(vtt_text: str):
    """Parse a WebVTT caption file into (timestamp_seconds, text) cues, deduped.
    Pure function — unit-testable without a network call."""
    lines = vtt_text.splitlines()
    cues, cur_start, buf = [], None, []
    ts_re = re.compile(r"(\d{2}):(\d{2}):(\d{2})[.,](\d{3})\s*-->")
    tag_re = re.compile(r"<[^>]+>")

    def flush():
        nonlocal buf, cur_start
        if cur_start is not None and buf:
            text = " ".join(buf).strip()
            text = tag_re.sub("", text)                    # strip inline <c> timing tags
            text = re.sub(r"\s+", " ", text)
            if text:
                cues.append((cur_start, text))
        buf = []

    for ln in lines:
        m = ts_re.search(ln)
        if m:
            flush()
            h, mm, s, _ = map(int, m.groups())
            cur_start = h * 3600 + mm * 60 + s
            continue
        s = ln.strip()
        if not s or s == "WEBVTT" or s.isdigit() or s.startswith(("NOTE", "Kind:", "Language:")):
            continue
        buf.append(s)
    flush()

    # auto-captions repeat lines across cues; drop consecutive duplicates
    deduped, prev = [], None
    for t, txt in cues:
        if txt != prev:
            deduped.append((t, txt))
            prev = txt
    return deduped


def _fmt_ts(sec: int) -> str:
    h, rem = divmod(int(sec), 3600)
    m, s = divmod(rem, 60)
    return (f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:d}:{s:02d}")


def get_subtitles(ytdlp, url, video_id, workdir):
    """Download English subs (manual first, then auto) and parse to cues."""
    base = os.path.join(workdir, "sub")
    for auto in (False, True):
        args = ytdlp + [
            "--skip-download", "--no-warnings",
            "--sub-langs", "en.*,en",
            "--sub-format", "vtt",
            ("--write-auto-subs" if auto else "--write-subs"),
            "-o", base, url,
        ]
        run(args)
        vtts = [f for f in os.listdir(workdir) if f.endswith(".vtt")]
        if vtts:
            vtts.sort(key=lambda f: (0 if ".en." in f else 1, len(f)))
            with open(os.path.join(workdir, vtts[0]), encoding="utf-8", errors="ignore") as fh:
                cues = _vtt_to_lines(fh.read())
            for f in vtts:
                os.remove(os.path.join(workdir, f))
            if cues:
                return cues, ("auto-captions" if auto else "manual captions")
    return None, None


def whisper_fallback(ytdlp, url, workdir):
    if not (shutil.which("ffmpeg") and shutil.which("whisper")):
        return None, None
    eprint("No captions found — trying audio download + Whisper (this is slow)…")
    audio = os.path.join(workdir, "audio.%(ext)s")
    r = run(ytdlp + ["-f", "bestaudio", "-x", "--audio-format", "mp3",
                     "--no-warnings", "-o", audio, url])
    mp3s = [f for f in os.listdir(workdir) if f.endswith(".mp3")]
    if r.returncode != 0 or not mp3s:
        return None, None
    path = os.path.join(workdir, mp3s[0])
    run(["whisper", path, "--model", "base", "--language", "en",
         "--output_format", "txt", "--output_dir", workdir])
    txts = [f for f in os.listdir(workdir) if f.endswith(".txt")]
    if not txts:
        return None, None
    with open(os.path.join(workdir, txts[0]), encoding="utf-8", errors="ignore") as fh:
        text = fh.read().strip()
    return ([(0, text)] if text else None), "whisper speech-to-text"


def main():
    ap = argparse.ArgumentParser(description="Fetch a YouTube transcript for /transcribe-hacks.")
    ap.add_argument("url")
    ap.add_argument("--transcripts-dir", default="youtube-life-hacks/transcripts")
    ap.add_argument("--json", help="where to write the machine-readable result (default: stdout)")
    args = ap.parse_args()

    if not YT_URL_RE.match(args.url.strip()):
        eprint(f"ERROR: that does not look like a YouTube URL: {args.url}")
        sys.exit(2)

    try:
        ytdlp = ensure_yt_dlp()
    except Exception as e:
        eprint("ERROR: could not obtain yt-dlp (needed to fetch the transcript).")
        eprint(str(e).splitlines()[-1] if str(e) else "")
        eprint("Install it with:  python3 -m pip install --user yt-dlp")
        sys.exit(4)

    try:
        meta = get_metadata(ytdlp, args.url)
    except Exception as e:
        eprint("ERROR: could not read the video. Common causes:")
        eprint("  - this environment blocks YouTube (network egress policy), or")
        eprint("  - the video is private/age-restricted/removed, or the URL is wrong.")
        tail = (str(e).strip().splitlines() or [""])[-1]
        if tail:
            eprint("  detail: " + tail)
        sys.exit(5)

    with tempfile.TemporaryDirectory() as workdir:
        cues, source = get_subtitles(ytdlp, args.url, meta["video_id"], workdir)
        if not cues:
            cues, source = whisper_fallback(ytdlp, args.url, workdir)

    if not cues:
        eprint("ERROR: No transcript available (no captions, and no Whisper fallback installed).")
        eprint("Install ffmpeg + openai-whisper to enable speech-to-text, or pick a video with captions.")
        sys.exit(3)

    # human-readable transcript with light timestamps every ~cue
    readable = "\n".join(f"[{_fmt_ts(t)}] {txt}" for t, txt in cues)
    plain = " ".join(txt for _, txt in cues)

    os.makedirs(args.transcripts_dir, exist_ok=True)
    slug = sanitize_filename(meta["title"])
    tpath = os.path.join(args.transcripts_dir, f"{slug}.txt")
    with open(tpath, "w", encoding="utf-8") as fh:
        fh.write(f"{meta['title']}\nSource: {meta['webpage_url']}\n"
                 f"Channel: {meta['channel']}\nTranscript source: {source}\n\n{readable}\n")

    result = {
        "ok": True,
        "video_id": meta["video_id"],
        "title": meta["title"],
        "channel": meta["channel"],
        "url": meta["webpage_url"],
        "duration_seconds": meta["duration"],
        "transcript_source": source,
        "transcript_file": tpath,
        "slug": slug,
        "cue_count": len(cues),
        "transcript_text": readable,
        "transcript_plain": plain,
    }
    out = json.dumps(result, ensure_ascii=False, indent=2)
    if args.json:
        with open(args.json, "w", encoding="utf-8") as fh:
            fh.write(out)
        eprint(f"Transcript saved: {tpath}\nMetadata JSON: {args.json}  "
               f"({len(cues)} cues, via {source})")
    else:
        print(out)


if __name__ == "__main__":
    main()
