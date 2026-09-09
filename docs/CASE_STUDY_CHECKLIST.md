# Case-study capture checklist

Keep this open when you do real AI work. Capturing four things in the moment is
90% of a case study — Claude Code turns the rest into a polished page.

## Capture these 4 things (rough is fine)

1. **The task** — one sentence: what you were trying to get the AI to do, and
   why the naive version wasn't good enough.
2. **The prompt(s)** — paste your first attempt *and* the version that finally
   worked. The gap between them is the story.
3. **One before/after** — a single input, the weak output, the good output.
4. **What failed / where it still breaks** — the honest bit. This builds trust
   more than a flawless story does.

## Nice to add if you have it
- How you judged it (even "I ran it on 4 topics and 3/4 were usable").
- Which model/mode, and whether you'd pick a different one next time.
- A transferable lesson (what you'd tell someone doing the same task).

## Then
1. Copy `src/content/_case-study-template.ts`, fill in what you have (bullet
   fragments are fine), and save it — or just paste your notes to Claude Code.
2. Say: **"Turn this into a case study."**
3. Claude will: sanitize anything identifying (names, employer, students,
   clients, health), tighten the copy, choose the right `types`, set `real`/
   `featured`/`order`, and paste it into `caseStudies.ts`. It shows up in the
   filterable gallery automatically.

## The honesty rules (Claude enforces these too)
- `real: true` only if you actually did it — otherwise it's a **demonstration**.
- **Never invent numbers.** Default to the Fail/Partial/Pass evaluation unless
  you genuinely scored outputs.
- Strip anything identifying or sensitive before it goes public.

## Cadence
Roughly **one strong case study a month** beats ten thin ones. Add a Prompt Pack
entry only when you build a genuinely new reusable prompt. Let categories like
"Automations & bots" stay hidden until you have real work for them.
