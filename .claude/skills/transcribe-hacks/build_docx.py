#!/usr/bin/env python3
"""
build_docx.py  —  part of the /transcribe-hacks Claude Code skill.

Input: a curated JSON file (written by Claude after filtering the transcript):
  {
    "title":   "Top 10 Kitchen Life Hacks",
    "url":     "https://www.youtube.com/watch?v=XXXX",
    "channel": "Some Channel",            # optional
    "hacks": [
      { "topic": "Re-sharpen scissors with foil",
        "link":  "Not applicable",         # a URL, "Not applicable", or "Not identified"
        "explanation": "Fold a sheet of foil and cut through it 8–10 times..." },
      ...
    ]
  }

Output: a polished .docx in the output dir. Only the curated hacks go in — the
transcript does not. python-docx is auto-installed if missing.
"""
import argparse
import json
import os
import re
import sys


def ensure_docx():
    try:
        import docx  # noqa
    except ImportError:
        import subprocess
        print("python-docx not found — installing to user site…", file=sys.stderr)
        subprocess.run([sys.executable, "-m", "pip", "install", "--user", "--quiet", "python-docx"],
                       check=True)


def sanitize_filename(name, maxlen=120):
    name = re.sub(r"[\\/:*?\"<>|]+", " ", name)
    name = re.sub(r"\s+", " ", name).strip().replace(" ", "_")
    return (name[:maxlen].rstrip("_") or "youtube_video")


def add_hyperlink(paragraph, url, text):
    """Insert a real clickable hyperlink into a python-docx paragraph."""
    from docx.oxml.ns import qn
    from docx.oxml import OxmlElement
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    color = OxmlElement("w:color"); color.set(qn("w:val"), "0B6FC2"); rpr.append(color)
    u = OxmlElement("w:u"); u.set(qn("w:val"), "single"); rpr.append(u)
    new_run.append(rpr)
    t = OxmlElement("w:t"); t.text = text; new_run.append(t)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def is_url(s):
    return isinstance(s, str) and re.match(r"^https?://", s.strip(), re.IGNORECASE)


def build(data, out_dir):
    ensure_docx()
    from docx import Document
    from docx.shared import Pt, Inches
    from docx.enum.text import WD_ALIGN_PARAGRAPH

    title = data.get("title", "Untitled video").strip()
    url = data.get("url", "").strip()
    channel = (data.get("channel") or "").strip()
    hacks = data.get("hacks", [])

    doc = Document()
    # Normal margins
    for sec in doc.sections:
        sec.top_margin = sec.bottom_margin = Inches(1)
        sec.left_margin = sec.right_margin = Inches(1)
    # Base font
    normal = doc.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(11)

    h = doc.add_heading(f"{title} — Useful Life Hacks", level=0)
    h.alignment = WD_ALIGN_PARAGRAPH.LEFT

    if url:
        p = doc.add_paragraph()
        p.add_run("Source: ").bold = True
        if is_url(url):
            add_hyperlink(p, url, url)
        else:
            p.add_run(url)
    if channel:
        p = doc.add_paragraph()
        p.add_run("Channel: ").bold = True
        p.add_run(channel)

    doc.add_paragraph()  # spacer

    for i, hack in enumerate(hacks, 1):
        topic = (hack.get("topic") or "Untitled hack").strip()
        link = (hack.get("link") or "Not applicable").strip()
        explanation = (hack.get("explanation") or "").strip()

        head = doc.add_paragraph()
        head.space_before = Pt(6)
        run = head.add_run(f"{i}. {topic}")
        run.bold = True
        run.font.size = Pt(12)
        head.add_run("  —  Link: ")
        if is_url(link):
            add_hyperlink(head, link, link)
        else:
            head.add_run(link)  # "Not applicable" / "Not identified"

        body = doc.add_paragraph(explanation)
        body.paragraph_format.space_after = Pt(10)

    os.makedirs(out_dir, exist_ok=True)
    fname = f"{sanitize_filename(title)}_Useful_Life_Hacks.docx"
    fpath = os.path.join(out_dir, fname)
    doc.save(fpath)
    return fpath


def main():
    ap = argparse.ArgumentParser(description="Build the curated life-hacks DOCX.")
    ap.add_argument("--data", required=True, help="curated JSON file")
    ap.add_argument("--out-dir", default="youtube-life-hacks/output")
    args = ap.parse_args()

    with open(args.data, encoding="utf-8") as fh:
        data = json.load(fh)

    fpath = build(data, args.out_dir)
    print(json.dumps({"ok": True, "docx": fpath, "hacks": len(data.get("hacks", []))},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
