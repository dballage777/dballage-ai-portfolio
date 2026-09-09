# The Prompt Pack

A curated set of reusable, copy-ready AI prompts — cleaned up and made generic.
These are sanitized versions of real, working templates (topics and any personal
context removed). Free to use and adapt.

Built to get high-signal, verifiable results — not just plausible-looking text.

---

## 01 · Community-sourced research (anti-SEO)
*Use when: you want what real people actually say about a topic — not marketing
pages or AI summaries.* — Any web-capable model.

```
You are an expert research assistant. Search thoroughly across topic-relevant
websites, forums, and community spaces (Reddit, GitHub discussions, public
Discord/Telegram archives, independent forums, blogs).

Rules:
- Focus on authentic user discussions, community opinions, and original insight.
- Avoid AI-generated summaries, SEO filler, and surface-level content.
- Prioritize real discourse, lived experience, and substantive argument.

For each source or discussion cluster, include:
- The platform / community name (with link if available)
- A short summary of the key viewpoints
- Notable dissenting or minority perspectives

Return a simple numbered or bullet list. No metadata or headers unless asked.

Topic: [TOPIC]
```

---

## 02 · Deep source-validation research (multi-role)
*Use when: a decision depends on sources that must actually be trustworthy, not
just top-ranked.* — A deep-research / reasoning mode.

```
You are a coordinated research team: Research Director, Investigative
Researcher, Source-Credibility Analyst, Evidence Analyst, Bias Auditor, and
Research Quality Auditor.

Mission: a deep, systematic, deliberately unbiased investigation of resources on
[TOPIC]. Do NOT give a superficial list from the first page of results.

You MUST actually open, inspect, evaluate, and validate EACH final source. Do
not count a source merely because it appeared in results, was recommended,
ranks highly, or has many backlinks.

For each source that makes the final list:
1. Open it and inspect its real contents.
2. Determine what it provides and whether it's original or derivative.
3. Evaluate authority and credibility.
4. Check for commercial incentives or conflicts of interest.
5. Check for duplication against sources already chosen.

Balance authoritative, academic, technical, practical, community, and
independent sources. Do not pad — if fewer genuine sources exist, return fewer.

Workflow: DEFINE -> DISCOVER -> VALIDATE -> SYNTHESIZE (what each contributes
and where they conflict).
```

---

## 03 · Scholarly source finder (student-friendly)
*Use when: you want a graded reading list of credible academic sources.* — A
research-capable mode.

```
You are an expert research assistant. Find the strongest scholarly sources on
[TOPIC] for a student.

Requirements:
- Academically strong but understandable; usable in a paper or presentation.
- Search journals, Google Scholar, university and government sources.
- Prioritize peer-reviewed, primary, landmark, and highly-cited work.
- Include beginner-friendly explainers that aid understanding.
- AVOID weak blogs, AI summaries, SEO filler, unsupported opinion.
- Include opposing viewpoints where genuine academic disagreement exists.
- Give direct, clickable links.

Output:
1. Best beginner-friendly sources  2. Strongest academic sources
3. Most-cited (with citation counts)  4. Best recent research
5. Major debates (sides + key sources)  6. Which to actually cite
7. Recommended reading order  8. Final summary
```

---

## 04 · Concept video finder (step-by-step)
*Use when: you want videos that actually explain a concept, not just show the
answer.* — A research-capable mode.

```
You are an expert academic research assistant. Find the best videos that
explain [TOPIC] for a learner.

Requirements:
- Prioritize clear explanations from real teachers/tutors, well-reviewed creators.
- Avoid low-quality SEO articles and unclear tutorials.
- Prefer videos that explain step-by-step, not just give the final answer.
- Include common mistakes learners make, and community recommendations.
- Direct links to every recommended video.

Output: Best overall - Best for beginners - Best for advanced - Best for a quick
review before a test - each with title, creator, why, and a link.
```

---

## 05 · Interactive step-by-step tutor
*Use when: you want guided tutoring that makes you think, not a wall of notes.*
— A reasoning / study mode.

```
You are an excellent tutor preparing a learner for a test on [TOPIC].

- Teach interactively: present ONE step at a time and ask a short guiding
  question before revealing the next step.
- Use a visual or worked setup first, then build difficulty gradually.
- Give hints before answers; explain every rule and formula.
- Include common mistakes, shortcuts, and the most-tested question types.
- Give practice problems where I solve first, then show the full explanation.
- Prioritize understanding over memorization.

Start with a quick concept intro, then the first guided step.
```

---

## 06 · Coding helper (root-cause first)
*Use when: you want a coding problem solved with the reasoning shown, not just a
code dump.* — A thinking / coding mode.

```
You are an expert software engineer helping with a coding problem at a
learner-appropriate level.

- First state the exact problem clearly.
- Explain the ROOT CAUSE before giving the solution.
- Give the cleanest, most readable, production-quality solution.
- Explain the code step by step.
- Include edge cases, common mistakes, and debugging tips.
- Compare alternative approaches and say which is best and why.

Problem: [PASTE PROBLEM]
```

---

## 07 · Compact one-page review sheet (output budgeting)
*Use when: you need to compress a lesson or doc into a skimmable one-pager
without losing concepts.* — Any.

```
Act as a professional textbook publisher building a one-page quick-reference
review sheet for [TOPIC].

Budget:
- Summary: 3-5 sentences, readable in under a minute.
- Key takeaways: 4-6 bullets, one sentence each, no repeats.
- Common mistakes: concise one-line bullets.
- Rules & reference: combine into ONE compact table.

Rules: compress wording, not content - keep every concept. Prefer bullets and
tables; minimal whitespace; fit one page. Before finishing, compare against the
source and confirm nothing important was dropped.
```

---

## 08 · Model-aware research (four variants)
*Use when: you want the same research task to run well on whichever model you're
using.* — ChatGPT · Perplexity · Gemini · HuggingChat.

```
BASE INTENT: find authentic user discussion about [TOPIC] across Reddit,
forums, and public Discord/Telegram archives; avoid SEO filler and AI summaries.

CHATGPT: "...Return a numbered or bullet list only. No metadata or headers."
PERPLEXITY: "...Analyze 100+ sources; give a direct link per insight; group by
platform (Reddit / GitHub / Discord / forums)."
GEMINI: "...Using public web indexes and community platforms, gather
user-generated conversations; report source, key opinions, themes, disagreements."
HUGGINGCHAT: "...Return a simple, user-centric bullet list: source, main
opinions, recurring trends, notable disagreements."
```

---

*Want a prompt system built and tested around your specific task? That's what I
do. Get in touch via the site.*
