/**
 * Prompt Pack (Part 19 — downloadable resource / lead magnet).
 *
 * A curated, SANITIZED set of the owner's real, reusable prompts. Topics and
 * any personal/identifying context have been stripped to generic placeholders
 * ([TOPIC], [PRODUCT]). These are genuine working templates, not demos.
 *
 * Keep this file and /public/prompt-pack.md in sync when editing.
 */

export type PromptPackItem = {
  slug: string;
  title: string;
  use: string; // when to reach for it
  model: string; // suggested model / mode
  prompt: string;
};

export const promptPack: PromptPackItem[] = [
  {
    slug: "community-research",
    title: "Community-sourced research (anti-SEO)",
    use: "Find what real people actually say about a topic — not marketing pages or AI summaries.",
    model: "Any web-capable model",
    prompt: `You are an expert research assistant. Search thoroughly across topic-relevant
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

Topic: [TOPIC]`,
  },
  {
    slug: "source-validation",
    title: "Deep source-validation research (multi-role)",
    use: "When a decision depends on sources that must actually be trustworthy, not just top-ranked.",
    model: "A deep-research / reasoning mode",
    prompt: `You are a coordinated research team: Research Director, Investigative
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
and where they conflict).`,
  },
  {
    slug: "scholarly-sources",
    title: "Scholarly source finder (student-friendly)",
    use: "Turn a topic into a graded reading list of credible academic sources.",
    model: "A research-capable mode",
    prompt: `You are an expert research assistant. Find the strongest scholarly sources on
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
7. Recommended reading order  8. Final summary`,
  },
  {
    slug: "concept-video-finder",
    title: "Concept video finder (step-by-step)",
    use: "Find the best videos that actually explain a concept, not just show the answer.",
    model: "A research-capable mode",
    prompt: `You are an expert academic research assistant. Find the best videos that
explain [TOPIC] for a learner.

Requirements:
- Prioritize clear explanations from real teachers/tutors, well-reviewed creators.
- Avoid low-quality SEO articles and unclear tutorials.
- Prefer videos that explain step-by-step, not just give the final answer.
- Include common mistakes learners make, and community recommendations.
- Direct links to every recommended video.

Output: Best overall · Best for beginners · Best for advanced · Best for a quick
review before a test — each with title, creator, why, and a link.`,
  },
  {
    slug: "interactive-tutor",
    title: "Interactive step-by-step tutor",
    use: "Get guided tutoring that makes you think, instead of a wall of notes.",
    model: "A reasoning / study mode",
    prompt: `You are an excellent tutor preparing a learner for a test on [TOPIC].

- Teach interactively: present ONE step at a time and ask a short guiding
  question before revealing the next step.
- Use a visual or worked setup first, then build difficulty gradually.
- Give hints before answers; explain every rule and formula.
- Include common mistakes, shortcuts, and the most-tested question types.
- Give practice problems where I solve first, then show the full explanation.
- Prioritize understanding over memorization.

Start with a quick concept intro, then the first guided step.`,
  },
  {
    slug: "coding-helper",
    title: "Coding helper (root-cause first)",
    use: "Solve a coding problem with the reasoning shown, not just a code dump.",
    model: "A thinking / coding mode",
    prompt: `You are an expert software engineer helping with a coding problem at a
learner-appropriate level.

- First state the exact problem clearly.
- Explain the ROOT CAUSE before giving the solution.
- Give the cleanest, most readable, production-quality solution.
- Explain the code step by step.
- Include edge cases, common mistakes, and debugging tips.
- Compare alternative approaches and say which is best and why.

Problem: [PASTE PROBLEM]`,
  },
  {
    slug: "compact-review-sheet",
    title: "Compact one-page review sheet (output budgeting)",
    use: "Compress a full lesson or doc into a skimmable one-pager without losing concepts.",
    model: "Any",
    prompt: `Act as a professional textbook publisher building a one-page quick-reference
review sheet for [TOPIC].

Budget:
- Summary: 3–5 sentences, readable in under a minute.
- Key takeaways: 4–6 bullets, one sentence each, no repeats.
- Common mistakes: concise one-line bullets.
- Rules & reference: combine into ONE compact table.

Rules: compress wording, not content — keep every concept. Prefer bullets and
tables; minimal whitespace; fit one page. Before finishing, compare against the
source and confirm nothing important was dropped.`,
  },
  {
    slug: "model-aware-research",
    title: "Model-aware research (four variants)",
    use: "Run the same research task well on whichever model you're using.",
    model: "ChatGPT · Perplexity · Gemini · HuggingChat",
    prompt: `BASE INTENT: find authentic user discussion about [TOPIC] across Reddit,
forums, and public Discord/Telegram archives; avoid SEO filler and AI summaries.

CHATGPT: "...Return a numbered or bullet list only. No metadata or headers."
PERPLEXITY: "...Analyze 100+ sources; give a direct link per insight; group by
platform (Reddit / GitHub / Discord / forums)."
GEMINI: "...Using public web indexes and community platforms, gather
user-generated conversations; report source, key opinions, themes, disagreements."
HUGGINGCHAT: "...Return a simple, user-centric bullet list: source, main
opinions, recurring trends, notable disagreements."`,
  },
];
