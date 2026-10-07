---
description: Extract the genuinely useful life hacks from a YouTube video into a polished DOCX (junk/ads/filler removed).
argument-hint: <youtube-url>
---

Run the **transcribe-hacks** workflow on this YouTube URL:

$ARGUMENTS

Follow `.claude/skills/transcribe-hacks/SKILL.md` exactly, using the scripts in
that folder:

1. Fetch the transcript:
   `python3 .claude/skills/transcribe-hacks/fetch_transcript.py "$ARGUMENTS" --json youtube-life-hacks/transcript.json`
   (If it fails because the URL is invalid or the video has no captions and no
   Whisper fallback is installed, tell me plainly — do not fabricate a transcript.)
2. Read the full transcript, identify every candidate hack, and **filter
   ruthlessly** — keep only the genuinely useful ones; never pad to reach 10.
3. Be skeptical of exaggerated claims; include a real link only if clearly
   identifiable, else `Not applicable` / `Not identified` — never invent a URL.
4. Write `youtube-life-hacks/curated.json`, then build the document:
   `python3 .claude/skills/transcribe-hacks/build_docx.py --data youtube-life-hacks/curated.json --out-dir youtube-life-hacks/output`
5. Report concisely (title · candidates found · useful kept · DOCX filename ·
   path) and hand me the `.docx`.

If no URL was provided above, tell me the exact usage:
`/transcribe-hacks https://www.youtube.com/watch?v=…`
