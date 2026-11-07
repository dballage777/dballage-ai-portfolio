/**
 * Case studies (Parts 5 & 6).
 *
 * These are honest, independent DEMONSTRATIONS. They are written to show
 * method, prompt-engineering technique, and evaluation thinking. Where a score
 * appears it is labelled illustrative — it demonstrates the review process, it
 * is not a benchmark from paid client work. Example outputs are illustrative of
 * the *kind* of result and are shortened for readability.
 */

export type EvalRow = {
  criterion: string;
  before: number; // out of 10
  after: number; // out of 10
  note: string;
};

/** Verdict-based row for REAL work, where honest numeric scores don't exist. */
export type QualRow = {
  criterion: string;
  before: "Fail" | "Partial" | "Pass";
  after: "Fail" | "Partial" | "Pass";
  note: string;
};

export type PromptVersion = {
  label: string;
  language?: string;
  prompt: string;
  problems?: string[]; // what's wrong with this version
};

/**
 * Controlled vocabulary for the filterable gallery. Only add a project under a
 * type you actually have real (or clearly-labelled demonstration) work for —
 * empty categories are hidden so the site never advertises an unproven skill.
 */
export type ProjectType =
  | "Prompt systems"
  | "Research workflows"
  | "Content & documents"
  | "Evaluation"
  | "Websites & apps"
  | "Automations & bots"
  | "Education AI"
  | "Creative & visual";

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string; // e.g. "Prompt system", "Evaluation", "Multi-model"
  /** Which gallery filters this project appears under (1+). */
  types: ProjectType[];
  /** true = real, anonymized work; false/undefined = independent demonstration. */
  real?: boolean;
  featured: boolean;
  order: number;
  oneLiner: string;
  tags: string[];
  models: string[];
  problem: string;
  context: string;
  objective: string;
  constraints: string[];
  initialApproach?: string;
  promptVersions?: PromptVersion[];
  whyItWorks: string[];
  evaluation?: {
    kind: "Illustrative demonstration" | "Qualitative evaluation";
    criteria: string; // what the rubric measures
    rows?: EvalRow[]; // numeric (demonstrations)
    qualRows?: QualRow[]; // verdict-based (real work)
  };
  testCases?: string[];
  beforeAfter?: { input: string; before: string; after: string }[];
  failureCases?: string[];
  lessons: string[];
  businessApplication: string;
  repoUrl?: string; // OPTIONAL — set when you publish the artifacts
};

export const caseStudies: CaseStudy[] = [
  // ==========================================================================
  {
    slug: "research-prompt-behind-this-portfolio",
    title: "The research prompt that built this portfolio's evidence base",
    kind: "Real project · Research prompt system",
    types: ["Research workflows", "Prompt systems"],
    real: true,
    featured: true,
    order: 0,
    oneLiner:
      "A multi-role research prompt that refuses to take search results at face value — it opens, inspects, and credibility-checks every source. It's what produced the 30 sources behind this very site.",
    tags: ["Source credibility", "Prompt system", "Research workflow", "Bias auditing"],
    models: ["ChatGPT (deep research)", "reused on Gemini & Claude"],
    problem:
      "Ask an AI to 'research X and give me the best sources' and it hands back the first page of search results dressed up as analysis — popular, unvetted, and occasionally fabricated. For anything that has to be trustworthy, that's worthless.",
    context:
      "Real, anonymized work. This is the prompt (lightly trimmed) I actually used to gather and vet the source base for this portfolio — the 30 resources on the Research page came out of it. It casts the model as a team of roles (research director, source-credibility analyst, bias auditor…) running a defined workflow, not just answering a query.",
    objective:
      "Return a fixed set of individually-validated sources — each actually opened, inspected, and judged for authority, originality, and commercial bias — with weak, duplicate, and SEO results explicitly disqualified.",
    constraints: [
      "Every final source must be individually opened and evaluated — never included for ranking, backlinks, or popularity",
      "Flag commercial incentives and conflicts of interest",
      "De-duplicate, and keep a balance of authoritative / academic / community / independent sources",
      "Do not pad to hit the target number if genuine sources run out",
    ],
    initialApproach:
      "The obvious ask — 'find me the 30 best sources on this' — returns a popularity list: the top blogs, a couple of vendor pages, whatever ranks. No validation, no credibility signal, and a real risk of invented links.",
    promptVersions: [
      {
        label: "v1 — Naive ask",
        prompt: `Research [topic] and give me the 30 best sources.`,
        problems: [
          "Returns first-page, popularity-ranked results, not vetted ones.",
          "No per-source validation — includes things it never actually opened.",
          "Risk of fabricated or SEO-spam links, with no credibility signal.",
        ],
      },
      {
        label: "vFinal — Multi-role team + per-source validation checklist (real prompt, trimmed)",
        prompt: `You are a coordinated research team: Research Director, Investigative
Researcher, Source-Credibility Analyst, Evidence Analyst, Community
Intelligence Analyst, Bias Auditor, and Research Quality Auditor.

Mission: a deep, systematic, deliberately unbiased investigation of resources
on [TOPIC]. Do NOT give a superficial list from the first page of results.

You MUST actually search for, open, inspect, evaluate, and validate EACH final
source. Do not count a source merely because it appeared in results, was
recommended, ranks highly, or has many backlinks.

For each candidate that enters the final set:
1. Locate and open the actual resource.
2. Inspect its real contents; determine what it provides.
3. Evaluate its authority and credibility.
4. Judge original vs. derivative information.
5. Check for commercial incentives or conflicts of interest.
6. Check for duplication against others already chosen.

Balance authoritative, academic, technical, practical, community-driven,
independent, and specialized sources. Do not pad the list — if fewer genuine
sources exist, return fewer.

Workflow: DEFINE (what [TOPIC] means) -> DISCOVER (candidates) -> VALIDATE
(the checklist above) -> SYNTHESIZE (what each contributes, and conflicts).`,
      },
    ],
    whyItWorks: [
      "It casts the model as several adversarial roles — a Bias Auditor and Source-Credibility Analyst argue with the Researcher — instead of a single eager assistant.",
      "It replaces 'find sources' with an explicit per-source validation checklist: open it, inspect it, judge authority, originality, and commercial bias.",
      "It names the shortcuts models default to — popularity, backlinks, 'it appeared in results' — and forbids each one.",
      "A DEFINE → DISCOVER → VALIDATE → SYNTHESIZE workflow turns a lookup into a repeatable process, and 'don't pad the list' stops it inventing sources to hit a number.",
    ],
    evaluation: {
      kind: "Qualitative evaluation",
      criteria:
        "Judged by whether the sources it returned actually survived independent re-checking while this site was built. Verdicts compare the naive ask to the final prompt.",
      qualRows: [
        { criterion: "Sources individually verifiable", before: "Fail", after: "Pass", note: "Each of the 30 was opened and summarized during the build." },
        { criterion: "Weak / SEO / AI-slop excluded", before: "Fail", after: "Pass", note: "Disqualification rules kept filler out of the final set." },
        { criterion: "Credibility & commercial bias assessed", before: "Fail", after: "Pass", note: "Marketplace pages were flagged as commercially motivated, not neutral." },
        { criterion: "No fabricated links padding the count", before: "Partial", after: "Pass", note: "'Don't pad' helped; a human open-check was still needed for a few." },
      ],
    },
    testCases: [
      "The portfolio research itself — 30 sources across vendor, academic, community, and marketplace types",
      "Reused on unrelated topics with the same structure (a genuinely reusable system)",
      "A thin-evidence topic (must return fewer, not invent sources)",
    ],
    beforeAfter: [
      {
        input: "'Gather the strongest sources for building an AI portfolio.'",
        before:
          "A flat popularity list — a few top blogs and vendor pages — with no indication any of it had been opened or vetted.",
        after:
          "Thirty individually-evaluated sources spanning vendor docs, academic/community guides, evaluation tooling, marketplaces (flagged as commercial), and a peer example — the exact set powering this site's Research page.",
      },
    ],
    failureCases: [
      "It's slow and needs a research-capable mode; it's overkill for a casual lookup.",
      "It can still surface a paywalled or moved link — the 'open it yourself' step doesn't disappear.",
      "When genuine sources are scarce it must be explicitly told not to pad — and watched to confirm it didn't.",
    ],
    lessons: [
      "Turn 'find' into 'validate': enumerate the checks a source must pass to make the cut.",
      "Assign adversarial roles — a Bias Auditor makes the model critique its own picks.",
      "Name the shortcuts to forbid (popularity, backlinks, 'it appeared in results'), or the model will take them.",
    ],
    businessApplication:
      "Due diligence, literature reviews, vendor and competitive research, policy research — anywhere a decision rests on sources that must actually be trustworthy, not merely top-ranked.",
  },

  // ==========================================================================
  {
    slug: "content-preserving-formatting-guardrails",
    title: "Making an AI reformat a document without destroying it",
    kind: "Real project · Prompt guardrails",
    types: ["Prompt systems", "Content & documents"],
    real: true,
    featured: true,
    order: 1,
    oneLiner:
      "Converting a lesson packet's plain-text math into proper equation objects — while stopping the model from silently rewriting, regenerating, or deleting the content around it.",
    tags: ["Guardrails", "Prompt iteration", "Instruction design", "Verification"],
    models: ["Gemini (in Google Docs)"],
    problem:
      "A formatting-only task — turn typed math like '(b)/(2)' into real equation objects — kept turning destructive. Asked to 'convert all math to equation format', the model would also paraphrase the lesson, regenerate whole sections, and drop or replace equations that were already correct.",
    context:
      "This is real, anonymized work: a multi-page math notes-and-review packet where every mathematical concept, every reference table, and the blank student workspace had to survive completely untouched. The only thing allowed to change was plain-text notation becoming properly typeset equations.",
    objective:
      "Convert every eligible plain-text expression to a native equation object and change nothing else. The document must never end with fewer equations — or less content — than it started with.",
    constraints: [
      "No rewriting, regenerating, paraphrasing, or reorganizing anything",
      "Preserve page breaks, tables, headings, spacing, and student workspace exactly",
      "If an expression can't be cleanly converted, leave it exactly as-is — never delete it",
      "When in doubt, preserve the original rather than attempt a conversion",
    ],
    initialApproach:
      "A broad, thorough-sounding instruction: 'Review the entire document and convert every mathematical expression to a formatted equation.' It read well but gave the model permission to touch everything — so it 'improved' prose and regenerated sections it was never asked to.",
    promptVersions: [
      {
        label: "v1 — Broad 'convert all the math' (over-reaches)",
        prompt: `Review the ENTIRE document. Locate every mathematical expression,
equation, fraction, exponent, radical, etc. that is typed as plain text and
replace it with a properly formatted equation (Insert -> Equation).
Use stacked fractions, superscripts, proper radicals, professional spacing.
The finished document should resemble a professionally typeset textbook.`,
        problems: [
          "'Review the entire document' + 'should resemble a textbook' invited rewriting, not just converting.",
          "The model regenerated the review section and paraphrased instructional text.",
          "Some already-correct equations were replaced or dropped in the process.",
          "No rule for what to do with an expression it couldn't convert.",
        ],
      },
      {
        label: "v2 — Forbid the destructive actions + define success",
        prompt: `Your task is ONLY to convert existing plain-text math into equation
objects. DO NOT rewrite, regenerate, paraphrase, summarize, reorganize, or edit
any instructional content. DO NOT remove or replace existing equations.

1. Find math currently typed as plain text.
2. Replace ONLY that expression with an Insert -> Equation object.
3. Move on.

If you cannot confidently convert an expression, LEAVE IT EXACTLY AS IS. Never
delete it. The document must never contain fewer equations after this than
before it. When in doubt, preserve the original text.

Success criteria: no content removed, no formatting/layout changes, no rewritten
text — only successful plain-text -> equation conversions.`,
        problems: [
          "Much safer, but under ambiguity the model still occasionally nudged spacing or dropped a borderline expression.",
        ],
      },
      {
        label: "v3 — Final: make preservation the top priority, explicitly",
        prompt: `DO NOT delete, replace, rewrite, or modify any existing mathematical
expression. If you cannot convert a plain-text expression into a native equation
object, leave the original text EXACTLY as it is.

Under no circumstances should an equation disappear. If conversion is not
possible, make no change.

Content preservation is more important than equation formatting.`,
      },
    ],
    whyItWorks: [
      "It separates the one allowed action (convert) from everything else, instead of describing a goal ('make it look like a textbook') that licenses rewriting.",
      "It enumerates the forbidden actions explicitly — 'do not rewrite / regenerate / paraphrase / delete' — rather than trusting the model to infer scope.",
      "It defines a measurable invariant: the document must never have fewer equations or less content afterward. That turns 'did it behave?' into something you can actually check.",
      "It gives the model a safe default for ambiguity ('when in doubt, preserve') and states the priority order outright: preservation beats formatting.",
    ],
    evaluation: {
      kind: "Qualitative evaluation",
      criteria:
        "Judged by comparing the before and after documents page by page — a manual diff, not a score. Verdicts below track how each version behaved against the invariants.",
      qualRows: [
        { criterion: "Instructional content preserved", before: "Fail", after: "Pass", note: "v1 paraphrased/regenerated text; v3 left all prose untouched." },
        { criterion: "No equations lost (count never drops)", before: "Fail", after: "Pass", note: "v1 replaced/dropped correct equations; the invariant fixed it." },
        { criterion: "Layout, tables & student workspace intact", before: "Partial", after: "Pass", note: "v2 still nudged spacing occasionally; v3 held." },
        { criterion: "Only plain-text notation converted", before: "Fail", after: "Pass", note: "Scope narrowed from 'all math' to 'plain-text math only'." },
      ],
    },
    testCases: [
      "A page mixing prose, worked examples, and typed math",
      "A page that is mostly blank student workspace (must stay blank and intact)",
      "Expressions that don't convert cleanly (must be left as text, not deleted)",
      "Reference tables of rules/keywords (must not be 'improved' or reflowed)",
    ],
    beforeAfter: [
      {
        input: "The broad 'convert all the math and make it look like a textbook' prompt, run on the packet.",
        before:
          "The model returned a 'better' document: it had rewritten the review summary, reworded takeaways, and a couple of already-correct equations had vanished — a net loss disguised as an improvement.",
        after:
          "With the guardrailed prompt, the diff showed only what was intended: plain-text expressions became equation objects, and every word, table, and blank workspace line was byte-for-byte where it had been.",
      },
    ],
    failureCases: [
      "The safe default ('when in doubt, preserve') trades completeness for safety — a few genuinely convertible expressions get left as text. That's the right trade for this task, but it's a trade.",
      "Models can still tweak spacing on the converted lines; a final human diff is still worth doing.",
      "The guardrails reduce the risk of silent destruction — they don't remove the need to verify the artifact.",
    ],
    lessons: [
      "For 'touch only X, preserve everything else' tasks, constrain by forbidding actions and defining an invariant — don't just describe the goal.",
      "Give the model an explicit safe default for ambiguous cases, and state the priority order out loud ('preservation beats formatting').",
      "Make success verifiable: if you can diff the artifact against an invariant, you can tell whether the prompt actually worked.",
    ],
    businessApplication:
      "This pattern applies to any 'change only one thing, preserve the rest' document task — reformatting, tagging, notation migration, or light cleanup — where a silent rewrite is the real danger. It's also the backbone of using AI to produce instructional or technical materials you can actually trust to ship.",
  },

  // ==========================================================================
  {
    slug: "student-research-source-finder",
    title: "A research prompt that finds real scholarly sources — and rates them",
    kind: "Real project · Research workflow",
    types: ["Research workflows", "Prompt systems"],
    real: true,
    featured: true,
    order: 2,
    oneLiner:
      "A reusable prompt that turns a topic into a graded reading list of genuine, credible academic sources — with the blogs, SEO filler, and hallucinated citations filtered out.",
    tags: ["Research workflow", "Source credibility", "Structured output", "Guardrails"],
    models: ["Gemini (Deep Research / Pro mode)"],
    problem:
      "Ask an AI for 'sources on X' and you get a confident list padded with blogs, SEO filler, and sometimes invented citations — the opposite of what a research paper needs. There's no signal for which sources are actually credible.",
    context:
      "Real, anonymized work: a reusable prompt built to help high-school students find trustworthy sources for papers, debates, and presentations — academically strong but still readable. It runs in a research-capable mode so it can actually search rather than recall.",
    objective:
      "Return a structured, graded reading list of real, credible sources — beginner-friendly through most-cited — with working links, opposing viewpoints where genuine debate exists, and an explicit steer away from weak sources.",
    constraints: [
      "Prioritize peer-reviewed, primary, and highly-cited work",
      "Explicitly avoid weak blogs, AI summaries, SEO filler, and unsupported opinion",
      "Include opposing viewpoints where real academic disagreement exists",
      "Say which sources to actually cite, and in what reading order",
    ],
    initialApproach:
      "The obvious version — 'find scholarly sources about [topic]' — returns a flat list that mixes a couple of gold-standard papers with random blogs, gives no credibility signal, and occasionally fabricates a link.",
    promptVersions: [
      {
        label: "v1 — Naive ask",
        prompt: `Find scholarly sources about [topic].`,
        problems: [
          "Mixes credible papers with blogs and AI-summary sites, with no way to tell them apart.",
          "No ranking, no citation counts, no opposing views.",
          "Links are unreliable — some don't resolve or are invented.",
        ],
      },
      {
        label: "vFinal — Role + source-quality rules + graded schema (real prompt, trimmed)",
        prompt: `You are an expert research assistant using a research-capable mode.
Find the strongest scholarly sources on this topic for a high-school student.

Requirements:
- Academically strong but understandable for high-school papers/debates/essays.
- Search journals, Google Scholar, university & government sources, databases.
- Prioritize peer-reviewed research, primary sources, landmark & highly-cited work.
- Also include beginner-friendly university explainers that aid understanding.
- AVOID weak blogs, AI summaries, SEO filler, and unsupported opinion pieces.
- Include opposing viewpoints if genuine academic disagreement exists.
- Compare the strongest sources and explain which are most credible.
- Include direct, clickable links to every source.

Output format:
1. Best Beginner-Friendly Sources (title · author/institution · why · link)
2. Strongest Academic Sources
3. Most-Cited Sources (with citation counts)
4. Best Recent Research
5. Major Academic Debates (competing views + key sources per side)
6. Leading Scholars & Institutions
7. Recommended Sources to Actually Cite
8. Recommended Reading Order
9. Final Research Summary

Topic: [TOPIC]`,
      },
    ],
    whyItWorks: [
      "It encodes source-quality *judgment* as explicit rules — prioritize peer-reviewed/primary/highly-cited, and name the anti-patterns to avoid (SEO filler, AI summaries).",
      "The 9-section schema forces the model to compare and justify credibility, surface real debates, and end with 'what to actually cite' — turning a list into a graded research map.",
      "Asking for citation counts makes credibility visible instead of implied.",
      "Running in a research-capable mode means it searches for real sources rather than recalling plausible-sounding ones.",
    ],
    evaluation: {
      kind: "Qualitative evaluation",
      criteria:
        "Checked against a real run for a 10th-grade English topic ('can TV / social media / gaming be considered literature?'). Verdicts compare the naive ask to the final prompt on that run.",
      qualRows: [
        { criterion: "Sources are real & locatable", before: "Fail", after: "Pass", note: "Final surfaced findable works (Jenkins, Convergence Culture; Aarseth, Cybertext)." },
        { criterion: "Credibility is visible", before: "Fail", after: "Pass", note: "Lists citation counts & why each matters (Convergence Culture ~38k citations)." },
        { criterion: "Weak sources filtered", before: "Partial", after: "Pass", note: "Explicit 'avoid SEO filler / AI summaries' steer." },
        { criterion: "Opposing viewpoints surfaced", before: "Fail", after: "Pass", note: "Final surfaced the Ludology-vs-Narratology debate." },
      ],
    },
    testCases: [
      "A humanities topic with genuine academic debate",
      "A STEM topic where primary papers dominate",
      "A niche topic with thin scholarship (should say so, not invent sources)",
    ],
    beforeAfter: [
      {
        input: "Topic: 'Can TV / social media / gaming be considered literature?' (10th-grade English paper)",
        before:
          "A flat list: two real books mixed with generic blog posts and an AI-summary site, no indication which are credible, and one link that didn't resolve.",
        after:
          "A 9-part guide — beginner-friendly picks, strongest academic sources (Aarseth's 'ergodic literature'), most-cited (Convergence Culture, ~38k citations), the Ludology-vs-Narratology debate, a reading order, and the three sources to actually cite — each with a link.",
      },
    ],
    failureCases: [
      "A link can still point to a paywalled or moved page — verify before citing.",
      "For very niche topics it can over-reach; the thin-scholarship case is the real test.",
      "It's a strong starting map, not a substitute for actually reading the sources.",
    ],
    lessons: [
      "Encode source-quality judgment into the prompt, not just the task — name what 'good' and 'bad' sources look like.",
      "A good output schema forces the model to compare and justify, instead of just listing.",
      "Naming anti-patterns ('no SEO filler, no AI summaries') matters as much as naming targets.",
    ],
    businessApplication:
      "The same pattern powers any credibility-first research assistant — literature reviews, market/competitive research, or due diligence — where 'which sources can I trust, and why' matters more than sheer volume.",
  },

  // ==========================================================================
  {
    slug: "one-task-four-models",
    title: "One research task, four models — tuned to each",
    kind: "Real project · Model-aware prompting",
    types: ["Prompt systems", "Research workflows"],
    real: true,
    featured: false,
    order: 3.5,
    oneLiner:
      "The same 'find authentic community discussion, not SEO slop' task, rewritten for ChatGPT, Perplexity, Gemini, and HuggingChat — because one prompt does not behave the same on each.",
    tags: ["Model-aware prompting", "Research workflow", "Prompt portability"],
    models: ["ChatGPT", "Perplexity", "Gemini", "HuggingChat"],
    problem:
      "A prompt that works beautifully on one model returns bloated prose, ignores the format, or under-searches on another. Treating models as interchangeable wastes what each is actually best at.",
    context:
      "Real, anonymized work. I keep a base research task — find real user discussion on Reddit/forums/Discord, avoid SEO filler and AI summaries — and maintain a tailored variant per model, plus a note on when to reach for each.",
    objective:
      "Get the same high-signal, community-sourced research out of every model, adapting phrasing, format, and verbosity to how that model actually behaves.",
    constraints: [
      "Identical intent across all four models",
      "Adapt only the framing and output format, not the goal",
      "Pick the model (and mode) that fits the job",
    ],
    initialApproach:
      "Paste one identical prompt into all four. It exposed each model's defaults rather than controlling them — one over-explained, one wrapped everything in prose, one ignored the requested format.",
    promptVersions: [
      {
        label: "Per-model variants (same intent, tuned framing)",
        language: "text",
        prompt: `BASE INTENT (all models): find authentic user discussion about [TOPIC]
across Reddit, niche forums, and public Discord/Telegram archives. Prioritize
real experiences and disagreement; avoid SEO filler and AI-generated summaries.

CHATGPT — enforce a tight format; it tends to add helper prose:
  "...Return a numbered or bullet list only. No metadata, no headers, no
   citations unless asked."

PERPLEXITY — lean into its sourcing; make it cite:
  "...Analyze at least 100 sources. Provide a direct link for each insight.
   Group findings by platform (Reddit / GitHub / Discord / forums)."

GEMINI — frame around indexes + community platforms:
  "...Using public web indexes and community platforms, gather user-generated
   conversations; report source, key opinions, recurring themes, disagreements."

HUGGINGCHAT — keep it lean:
  "...Search public conversations; return a simple, user-centric bullet list of
   source, main opinions, recurring trends, and notable disagreements."`,
      },
    ],
    whyItWorks: [
      "The intent is identical; only the framing changes — so results stay comparable across models.",
      "Each variant targets that model's strength: Perplexity's citations, ChatGPT's format-following, Gemini's index framing, HuggingChat's brevity.",
      "A 'when to use each' note turns model choice into a deliberate design decision instead of a habit.",
    ],
    evaluation: {
      kind: "Qualitative evaluation",
      criteria:
        "Compared the four tailored runs against pasting one identical prompt into all four, on the same topic, for signal vs. filler and format usability.",
      qualRows: [
        { criterion: "Returns real user discussion (not SEO/AI slop)", before: "Partial", after: "Pass", note: "Anti-filler framing tuned per model." },
        { criterion: "Output usable without cleanup", before: "Fail", after: "Pass", note: "Format enforced where the model tends to ramble." },
        { criterion: "Plays to each model's strength", before: "Fail", after: "Pass", note: "Perplexity cites sources; ChatGPT holds a tight list." },
      ],
    },
    testCases: [
      "A consumer-product question with lots of forum chatter",
      "A niche how-to with thin, scattered discussion",
      "A debate-heavy topic where disagreement is the point",
    ],
    beforeAfter: [
      {
        input: "The same research prompt pasted, unchanged, into all four models.",
        before:
          "One over-explained, one wrapped the list in paragraphs, one dropped the requested structure — three different cleanup jobs.",
        after:
          "Each model returned clean, comparable, high-signal results in the format asked for, using what it's individually good at.",
      },
    ],
    failureCases: [
      "Maintaining four variants is ongoing upkeep.",
      "Model behavior drifts across updates, so the variants need occasional re-tuning.",
      "Some models' search is simply weaker on a given topic, no matter the prompt.",
    ],
    lessons: [
      "Portability is a myth to test for, not assume.",
      "Adapt the framing, keep the intent — that's what keeps outputs comparable.",
      "Model choice is a design decision with real trade-offs in cost, format, and search quality.",
    ],
    businessApplication:
      "Any team using more than one AI tool benefits from a small library of per-model prompts instead of one prompt that's mediocre everywhere.",
  },

  // ==========================================================================
  {
    slug: "support-triage-prompt-system",
    title: "Support-inbox triage & drafting system",
    kind: "Prompt system",
    types: ["Prompt systems"],
    featured: false,
    order: 3,
    oneLiner:
      "Turning a single 'answer this email' prompt into a two-step system that classifies, then drafts — with guardrails and an evaluation set.",
    tags: ["Prompt chaining", "Structured output", "Guardrails", "Evaluation"],
    models: ["Claude (Sonnet-class)", "GPT-4-class"],
    problem:
      "A generic 'reply to this customer email' prompt produced confident answers even when it had no basis to — inventing refund policies, guessing order status, and using an inconsistent tone.",
    context:
      "Support teams often start with one big prompt pasted into a chat window. It looks fine on the three emails someone tried, then fails quietly on the long tail: angry customers, missing information, out-of-scope requests.",
    objective:
      "Produce replies that are correct, safe, and consistent in tone — and, crucially, that refuse to answer when the information isn't available instead of hallucinating a policy.",
    constraints: [
      "Must never invent policy, prices, or order details",
      "Must escalate to a human for refunds, legal, or security topics",
      "Consistent, calm, branded tone",
      "Output must be machine-readable so it can slot into a helpdesk",
    ],
    initialApproach:
      "A single prompt asked the model to 'reply helpfully and professionally'. This conflates two different jobs — deciding what kind of request this is, and writing the reply — so the model does both poorly and there's no place to put a guardrail.",
    promptVersions: [
      {
        label: "v1 — Baseline (single prompt)",
        prompt: `You are a helpful customer support agent. Reply to the following customer email professionally and helpfully.

Email:
"""
{{email}}
"""`,
        problems: [
          "No definition of what's in or out of scope — the model answers everything.",
          "No grounding: it invents policies and order details it cannot know.",
          "No structure: the output is a blob of text with no routing signal.",
          "Tone drifts between formal and casual across similar emails.",
        ],
      },
      {
        label: "v2 — Split the job (classify → draft), add grounding",
        prompt: `<role>
You are a support triage assistant for {{company}}. You do exactly two things:
classify the email, then draft a reply ONLY if it is safe to do so.
</role>

<knowledge>
You may ONLY use facts present in <policies> and <account_context>.
If a needed fact is missing, you must NOT guess it.
</knowledge>

<policies>
{{policy_snippets}}
</policies>

<account_context>
{{account_context_or_none}}
</account_context>

<email>
{{email}}
</email>

<rules>
- If the request involves refunds, legal, security, or account deletion,
  set "action" to "escalate" and do not draft a resolution.
- If a fact you need is not in <policies> or <account_context>,
  set "needs_info" to the missing item(s) and draft a reply that asks for it.
- Tone: calm, warm, concise. No exclamation marks. Never blame the customer.
</rules>

<output_format>
Return JSON only:
{
  "category": "billing | shipping | technical | account | other",
  "action": "answer | ask_for_info | escalate",
  "needs_info": string[],
  "draft_reply": string,
  "confidence": "high | medium | low"
}
</output_format>`,
        problems: [
          "Better, but the model still occasionally 'answered' when action should have been 'escalate' on borderline security wording.",
        ],
      },
      {
        label: "v3 — Final: add a hard escalation check + one-shot example",
        prompt: `<role>
You are a support triage assistant for {{company}}. Classify the email, then
draft a reply ONLY if it is safe and grounded.
</role>

<hard_stops>
Before anything else, if the email mentions any of: chargeback, lawyer/legal
action, data/privacy request, "hacked"/unauthorized access, or account
deletion — set action="escalate", leave draft_reply empty, and stop.
</hard_stops>

<grounding>
Use ONLY facts in <policies> and <account_context>. If a needed fact is
absent, do not guess: list it in needs_info and ask for it.
</grounding>

<policies>{{policy_snippets}}</policies>
<account_context>{{account_context_or_none}}</account_context>

<example>
Input: "Where's my order? It's been 2 weeks." (no order data provided)
Output: {"category":"shipping","action":"ask_for_info",
"needs_info":["order number"],"draft_reply":"Hi — I'm sorry for the wait...
could you share your order number so I can look into this right away?",
"confidence":"high"}
</example>

<email>{{email}}</email>

<rules>
- Tone: calm, warm, concise. No exclamation marks. Never blame the customer.
- confidence reflects how well the facts cover the request.
</rules>

<output_format>
JSON only: { "category", "action", "needs_info", "draft_reply", "confidence" }
</output_format>`,
      },
    ],
    whyItWorks: [
      "Splitting classification from drafting gives the guardrails a place to live — the model decides *whether* to answer before it decides *how*.",
      "The <hard_stops> block runs an explicit safety check first, so sensitive topics can't slip through as a normal answer.",
      "Grounding language ('use ONLY facts in…') plus a 'don't guess, ask' rule converts hallucinations into follow-up questions.",
      "A machine-readable schema makes the output routable and testable, and the single example anchors tone and the ask-for-info behaviour.",
    ],
    evaluation: {
      kind: "Illustrative demonstration",
      criteria:
        "Each version was reviewed against the same 12 hand-written test emails using a fixed rubric. Scores below are illustrative of that review, averaged and scaled to 10.",
      rows: [
        { criterion: "Groundedness (no invented facts)", before: 4, after: 9, note: "v1 invented policy on 5/12; v3 asked for info instead." },
        { criterion: "Correct escalation", before: 5, after: 10, note: "Hard-stop block caught all sensitive-topic cases." },
        { criterion: "Instruction following (schema)", before: 3, after: 9, note: "v1 free text; v3 returned valid JSON." },
        { criterion: "Tone consistency", before: 6, after: 9, note: "Explicit tone rules removed the formal/casual drift." },
        { criterion: "Helpfulness when it can answer", before: 7, after: 8, note: "Roughly held; slightly more concise." },
      ],
    },
    testCases: [
      "Straightforward shipping question with order data present",
      "Shipping question with NO order data (should ask, not guess)",
      "Refund demand (should escalate)",
      "'I think my account was hacked' (should escalate, security)",
      "Out-of-scope: partnership pitch (should classify 'other')",
      "Angry, all-caps message (tone must stay calm)",
    ],
    beforeAfter: [
      {
        input: "\"Hi, it's been two weeks and my order still hasn't arrived. What's going on?\" (no order details supplied)",
        before:
          "Illustrative v1 output: \"Your order was shipped and should arrive within 3–5 business days. Our standard policy allows...\" — invents a status and a policy it has no basis for.",
        after:
          "Illustrative v3 output: {\"category\":\"shipping\",\"action\":\"ask_for_info\",\"needs_info\":[\"order number\"],\"draft_reply\":\"Hi — I'm sorry for the wait, and I want to get this sorted quickly. Could you share your order number so I can check exactly where it is?\",\"confidence\":\"high\"}",
      },
    ],
    failureCases: [
      "Very long forwarded threads can bury the actual request; a pre-summarization step helps.",
      "Sarcasm is sometimes read literally, changing the category.",
      "If policy snippets are stale, the model is confidently wrong — the system is only as grounded as its inputs.",
    ],
    lessons: [
      "Most 'hallucination' problems are really scope problems: tell the model what it may use and what to do when it can't.",
      "Put safety checks first and make them explicit, not implied.",
      "A structured output isn't decoration — it's what makes the prompt testable.",
    ],
    businessApplication:
      "A support team can route on `action`/`category`, auto-send only high-confidence grounded replies, and escalate the rest — reducing hallucinated answers while keeping a human on anything sensitive.",
  },

  // ==========================================================================
  {
    slug: "evaluation-framework",
    title: "A rubric-based evaluation harness for AI summaries",
    kind: "Evaluation",
    types: ["Evaluation"],
    featured: false,
    order: 5,
    oneLiner:
      "Deciding what 'a good summary' means before generating one — a reusable rubric, test set, and LLM-judge sanity check.",
    tags: ["Evaluation rubric", "LLM-as-judge", "Failure analysis", "Regression"],
    models: ["Any (model-agnostic harness)"],
    problem:
      "'Summarize this' is easy to run and impossible to grade. Without a definition of quality, you can't tell if a prompt change helped, and you can't catch regressions.",
    context:
      "This case study demonstrates the evaluation thinking that underpins every other project on this site: the flywheel of analyze failures → measure → improve, and the discipline of validating an automated judge before trusting it.",
    objective:
      "Build a small, reusable evaluation harness that scores summaries against explicit criteria, supports before/after comparison, and doesn't blindly trust an LLM judge.",
    constraints: [
      "Criteria must be concrete enough for two people to agree on a score",
      "Must detect regressions, not just averages",
      "An LLM judge may assist but must be checked against human labels",
    ],
    initialApproach:
      "Reading a few summaries and saying 'looks good'. This feels like evaluation but has no criteria, no coverage, and no memory — the next prompt change starts the guesswork over.",
    promptVersions: [
      {
        label: "The evaluator prompt (LLM-as-judge)",
        prompt: `<role>You are a strict evaluator. You score a SUMMARY against its SOURCE
using the rubric. You do not rewrite the summary.</role>

<rubric>
Score each 1–5 with a one-line justification:
- faithfulness: no claims that aren't supported by the source (5 = none)
- coverage: captures the source's main points (5 = all key points)
- conciseness: no padding or repetition
- instruction_following: respects length / format asked for
Flag "hallucination": true if any unsupported claim appears.
</rubric>

<source>{{source}}</source>
<summary>{{summary}}</summary>

<output_format>
JSON: { "faithfulness":n, "coverage":n, "conciseness":n,
"instruction_following":n, "hallucination":bool, "notes":string }
</output_format>`,
      },
      {
        label: "Judge validation step (the part people skip)",
        language: "text",
        prompt: `Before trusting the judge, validate it against human labels:

1. Hand-label ~20 summaries (some deliberately bad, some good).
2. Run the judge on the same 20.
3. Compare on the binary "hallucination" flag:
   - True Positive Rate: of the summaries humans marked bad, how many did
     the judge catch?
   - True Negative Rate: of the good ones, how many did it correctly pass?
4. Only trust the judge at scale if BOTH rates are high. A judge that flags
   everything has perfect recall and is useless.

This mirrors the "evaluation flywheel" idea: measure the measurer.`,
      },
    ],
    whyItWorks: [
      "Criteria are specific and bounded (1–5 with justification), so scores are comparable across runs and reviewers.",
      "Separating faithfulness from coverage catches the two opposite failure modes: making things up vs. leaving things out.",
      "Validating the judge against human labels (TPR/TNR) prevents the classic trap of trusting an automated grader that's secretly biased.",
      "Because the test set is fixed, a prompt change can be checked for regressions, not just average lift.",
    ],
    evaluation: {
      kind: "Illustrative demonstration",
      criteria:
        "Illustrative comparison of two summary prompts (a naive one vs. a structured one) scored by the harness across a small fixed test set. Reproducible: run the evaluator prompt above on your own before/after outputs against a fixed set and compare — the scores below show the shape of that review, not a fixed benchmark.",
      rows: [
        { criterion: "Faithfulness", before: 3, after: 5, note: "Structured prompt banned claims not in source." },
        { criterion: "Coverage", before: 3, after: 4, note: "Bullet structure surfaced more key points." },
        { criterion: "Conciseness", before: 4, after: 4, note: "Held steady." },
        { criterion: "Instruction following", before: 2, after: 5, note: "Length limit now respected." },
        { criterion: "Hallucination rate (lower better)", before: 3, after: 5, note: "Score inverted: 5 = none observed on the set." },
      ],
    },
    testCases: [
      "A dense technical source (tests coverage vs. conciseness tension)",
      "A source with a tempting-but-false implication (tests faithfulness)",
      "A 'summarize in 2 bullets' instruction (tests instruction following)",
      "A near-duplicate summary (tests regression detection run-to-run)",
    ],
    beforeAfter: [
      {
        input: "Prompt change: from \"Summarize this article\" to a structured prompt with a length cap and a 'only claims supported by the text' rule.",
        before: "Illustrative: faithfulness 3/5, instruction-following 2/5, one hallucinated statistic.",
        after: "Illustrative: faithfulness 5/5, instruction-following 5/5, no unsupported claims on the test set.",
      },
    ],
    failureCases: [
      "LLM judges can be swayed by fluent, confident writing — human spot-checks remain necessary.",
      "Small test sets give noisy averages; the harness reports per-case results, not just a mean.",
      "A rubric encodes someone's values — 'good' for a legal summary differs from a marketing one.",
    ],
    lessons: [
      "Evaluation is the differentiator: anyone can generate output, few can prove it's good.",
      "Define 'good' before you optimize, or you'll optimize for the wrong thing.",
      "Never trust an automated judge you haven't checked against human labels.",
    ],
    businessApplication:
      "Any team shipping an AI feature (summaries, replies, extraction) can adopt this pattern to gate releases: define criteria, keep a test set, and require the judge itself to be validated before it's trusted.",
  },
  // ==========================================================================
  {
    slug: "this-portfolio-site",
    title: "This site, built to demonstrate instead of claim",
    kind: "Real project · Design & build",
    types: ["Websites & apps"],
    real: true,
    featured: false,
    order: 6,
    oneLiner:
      "A fast, accessible, statically-portable Next.js portfolio whose architecture is part of the argument — real work labelled honestly, content separated from code.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Accessibility", "SEO"],
    models: ["Design & build (no model at runtime)"],
    problem:
      "Most AI portfolios claim expertise with adjectives. The brief here was the opposite: prove it by showing prompts, iterations, and evaluations — while staying honest and, for now, anonymous.",
    context:
      "A real build. The structure and positioning were chosen from a synthesis of 30 researched sources spanning prompt engineering, evaluation, hiring signals, and hosting.",
    objective:
      "Fast, responsive, accessible, SEO-ready, and easy to maintain — host-portable across Vercel and static hosts — and honest by construction, with real work and demonstrations clearly distinguished.",
    constraints: [
      "No fabricated claims, clients, or credentials",
      "Anonymous until the owner chooses otherwise",
      "Content editable without touching components",
      "Deployable on Vercel or as a static export (GitHub Pages)",
    ],
    whyItWorks: [
      "Content is separated from presentation in typed data files, so projects and prompts are edited without touching components.",
      "The information architecture leads with method and evaluation, with a filterable gallery layered on top for browsing by type.",
      "Honesty is built into the system: real-vs-demonstration badges, illustrative-score labels, and empty categories hidden so nothing unproven is advertised.",
      "It's theme-aware and accessible (skip link, focus states, reduced-motion) and exports to static HTML for zero-cost hosting.",
    ],
    lessons: [
      "Architecture can be the argument — how a portfolio is built is itself evidence.",
      "Honesty is a feature, not a limitation: labelling demonstrations plainly makes the real work more credible, not less.",
      "Separating content from code is what makes a site something you'll actually keep updated.",
    ],
    businessApplication:
      "The same approach fits any professional or personal site that has to load fast, rank in search, and stay easy to update without a developer on call.",
  },
  // ==========================================================================
  {
    slug: "differentiation-reteaching-assistant",
    title:
      "An AI teaching assistant that differentiates, reteaches, and co-teaches — directed by the teacher",
    kind: "Real project · Interactive prompt system (AI-assisted)",
    types: ["Prompt systems", "Automations & bots", "Education AI"],
    real: true,
    featured: true,
    order: 0.5,
    oneLiner:
      "One Gemini assistant a teacher steers by stating a goal — differentiate, reteach, challenge, co-teach, or analyze results — then uploads real materials and gets back classroom-ready documents, with students referred to by row number only.",
    tags: ["Differentiation", "Co-teaching", "AI governance", "Item analysis", "Instructional design"],
    models: ["Google Gemini (Pro)"],
    problem:
      "Differentiation, reteaching, and co-teaching planning are the high-skill, high-time work teachers never have enough hours for — and generic 'make this easier / make this harder' prompts ignore the learning objective and produce vague, unusable output.",
    context:
      "Real, anonymized work, built with an AI coding assistant under my direction: I set the goals, requirements, and revisions; the AI drafted and built. It is designed and documented, and one real failure was found and fixed through live use (v3) — but it has not yet been systematically classroom-tested.",
    objective:
      "Let a teacher pick a goal, upload any material (a lesson, worksheet, test, reading, or results file), and receive finished, classroom-ready differentiation / reteach / co-teaching materials — with student data de-identified and the teacher in control of every decision.",
    constraints: [
      "Students are referred to by row number only — never by name",
      "The teacher decides groups, grades, and accommodations; the assistant proposes, the teacher disposes",
      "The learning objective stays the same for every tier — support changes, the target does not",
      "Be explicit about platform limits (e.g. no direct Pear Assessment connection — a download-and-upload workflow instead)",
    ],
    initialApproach:
      "A single 'differentiate this' prompt returns one-size output that drops the objective and can't tell a struggling reader from an advanced one. The fix was an interactive, goal-first assistant backed by a research base — not a cleverer one-shot prompt.",
    whyItWorks: [
      "It opens by asking the teacher's goal, which filters a 26-option menu (support, challenge, whole-class, assessment, the six Friend & Cook co-teaching models, and English-learner supports) instead of guessing.",
      "It is backed by a research-based differentiation knowledge base, so tiers follow evidence: struggling students get more support (not less work), advanced students get more depth (not more volume), and the objective holds for everyone.",
      "It reads PDFs and CSVs and can match a results CSV to a test PDF, producing a question-by-question analysis — % correct, common wrong answers, likely misconceptions, and reteach / mastery flags — then suggest flexible groups.",
      "De-identification (row numbers, not names) is built into the workflow, not bolted on afterward.",
      "It ships with a 3-page, color-coded PDF guide so a non-technical teacher can use it without training.",
    ],
    failureCases: [
      "v3 — found in live use, not desk review: Gemini treated the uploaded prompt as a document to read rather than instructions to run, and the workflow stalled. Fixed with explicit 'keep-moving' rules plus three deployment options. This is the project's clearest credibility signal: a flaw surfaced through use and was corrected.",
    ],
    lessons: [
      "The decisive fix came from using the tool live, not from reviewing it on paper.",
      "A goal-first question removes the 'blank menu' problem for non-technical users.",
      "Stating platform limits honestly (no live connections; download-and-upload) prevents silent failure later.",
    ],
    businessApplication:
      "The pattern — a goal-first interactive assistant, a research-backed knowledge base, de-identified inputs, and human approval at each step — transfers to any setting where a non-expert needs governed, document-producing AI (HR, compliance, customer operations), not only classrooms.",
    // repoUrl: "[ADD: link only after an anonymized mirror exists — the source repo is under a real handle]",
  },
  // ==========================================================================
  {
    slug: "prompt-engineering-knowledge-bases",
    title:
      "Knowledge bases that make every later AI session smarter — and a prompt that writes prompts",
    kind: "Real project · AI systems & methodology (AI-assisted)",
    types: ["Prompt systems", "Research workflows", "Education AI"],
    real: true,
    featured: true,
    order: 2.5,
    oneLiner:
      "Two persistent, research-backed knowledge bases — one for Claude Code, one for Gemini K-12 assistants — plus 'Prompt Architect,' a reusable prompt that interviews you and outputs a finished, governed, platform-specific prompt.",
    tags: ["Knowledge base", "Meta-prompting", "Research methodology", "Governance", "Multi-platform"],
    models: ["Claude (Claude Code)", "Google Gemini"],
    problem:
      "Prompt quality shouldn't restart from zero every session, and 'best practices' scattered across blog posts don't transfer. I wanted reusable, inspectable foundations that bake method into future work.",
    context:
      "Real, anonymized work, built with an AI coding assistant under my direction. Research was gathered under network restrictions; some sources were blocked and those gaps are documented, not hidden. Templates are desk-reviewed, not yet validated at scale.",
    objective:
      "Build durable, indexed knowledge bases plus a tool that turns them into finished, governed prompts on demand — so method is reused instead of re-derived.",
    constraints: [
      "Grade findings by evidence strength and record where sources were inaccessible",
      "Keep the two knowledge bases separate and independently maintainable",
      "Every generated prompt must carry role designation, an instruction hierarchy, privacy/safety rules, and a quality checklist",
    ],
    whyItWorks: [
      "The Claude Code base — 13 topic files, a master framework, and 11 reusable templates — was built by running 11 parallel research agents over 30 designated plus 20 expansion sources, then synthesizing and running a completion audit.",
      "The Gemini K-12 base adds a 22-part assistant framework, FERPA/COPPA-aware privacy design, 7 copy-ready templates, a 100-point prompt-quality rubric, and a test-case suite, screened against 78 expansion sources.",
      "'Prompt Architect' asks two questions (target platform, then goal), consults the right base, and outputs a finished .txt prompt — it is in active use and produced the Study Helper and both differentiation assistants.",
      "It captures current, checkable findings (e.g. Google's 'Gems' to 'skills' migration; that unguarded answer-giving can harm learning while guided tutoring avoids it; that Gemini performs best with concise instructions), each labeled by evidence tier.",
    ],
    lessons: [
      "A knowledge base earns its keep only if a later tool actually consults it — Prompt Architect is that consumer.",
      "Documenting blocked sources (Reddit, Hacker News, Discord, two vendor PDFs) is more credible than a tidy list that hides them.",
      "The same method works across platforms, but the house style differs — Gemini rewards concision, so the Gemini base says so.",
    ],
    businessApplication:
      "Any team standardizing AI use can turn its own scattered know-how into an indexed base plus a generator that outputs on-brand, governed prompts — cutting the gap between an expert's prompt and a novice's.",
    // repoUrl: "[ADD: anonymized mirror link if desired]",
  },
  // ==========================================================================
  {
    slug: "parent-communication-mail-merge",
    title: "A parent-communication mail-merge system a non-technical teacher can actually run",
    kind: "Real project · Prompt system (AI-assisted)",
    types: ["Automations & bots", "Content & documents", "Education AI"],
    real: true,
    featured: false,
    order: 4,
    oneLiner:
      "A reusable Gemini 'operating prompt' that sets up a parent-communication project once, then turns each new gradebook CSV into individualized progress letters — with approval checkpoints and no automatic emailing.",
    tags: ["Mail merge", "AI governance", "FERPA-aware", "Workflow design", "Non-technical users"],
    models: ["Google Gemini (Pro)"],
    problem:
      "Every grading period, teachers hand-match rosters to parent contacts and rewrite the same progress letters — hours of repetitive, error-prone work.",
    context:
      "Real, anonymized work, built with an AI coding assistant under my direction. Designed and documented; not yet validated with real class data. No student data is included here.",
    objective:
      "Set up a parent-communication project once, then regenerate individualized letters from each new gradebook export, safely and with the teacher approving every step.",
    constraints: [
      "No automatic emailing and no silent deletion of records — all guardians are kept",
      "FERPA-aware handling of student data throughout",
      "Honest about platform limits: Google Docs and Sheets are not 'live-linked'",
      "Lead a novice one step at a time; request each file and check it before moving on",
    ],
    whyItWorks: [
      "Two modes — a one-time setup (roster plus parent contacts) and repeat updates (new gradebook CSVs) — keep the recurring task to a single file drop.",
      "A project registry in Google Sheets and a letter template in Google Docs give consistent, auditable output with student-to-parent matching rules and validation checks.",
      "v2 redesigned it to guide a non-technical teacher one file at a time; v2.1 made student IDs optional, so a roster with parent emails is enough.",
      "Governance is the product: approval checkpoints, kept records, and honest capability limits are the selling point, not an afterthought.",
    ],
    lessons: [
      "For non-technical users, 'request and verify one file at a time' beats asking for everything up front.",
      "Removing a hard requirement (student IDs) can matter more than any new feature — it decides who can use the tool at all.",
      "Saying plainly what the tool cannot do (no live links, no auto-send) builds the trust the task needs.",
    ],
    businessApplication:
      "Any recurring, record-to-document workflow with privacy stakes — progress letters, renewal notices, status updates — can be run this way: set up once, regenerate from an export, human-approved, nothing sent automatically.",
  },
  // ==========================================================================
  {
    slug: "guided-study-helper",
    title: "A study helper that tutors students instead of doing their work",
    kind: "Real project · Prompt system (AI-assisted)",
    types: ["Prompt systems", "Education AI"],
    real: true,
    featured: false,
    order: 4.5,
    oneLiner:
      "A student-facing Gemini tutor that asks for the subject, topic, and kind of help, teaches through graduated hints, and won't finish until the student can explain the idea back.",
    tags: ["Tutoring", "Guardrails", "Formative assessment", "Student safety", "Prompt engineering"],
    models: ["Google Gemini"],
    problem:
      "The easiest thing for an AI to do with homework is the harmful thing — hand over the answer. A student tutor has to help learning happen, not replace it.",
    context:
      "Real, anonymized work, built with an AI coding assistant under my direction. Desk-reviewed; not yet field-tested with students. No student data is used.",
    objective:
      "Give students genuine help — explanation, worked examples, practice, test review — while refusing to complete graded work for them, and confirm understanding before ending.",
    constraints: [
      "No answers to graded work — graduated hints instead",
      "Never do a student's assignment for them",
      "Include a crisis response (988 / 911) and privacy rules; never invent links",
    ],
    whyItWorks: [
      "It asks for subject, then topic, then the kind of help (explanation, interactive walkthrough, worked example, practice, resources, or test review) — so help is targeted, not generic.",
      "Every session ends with an understanding check: the student explains the idea in their own words, answers fresh questions, and rates their confidence, with reteaching if needed.",
      "Safeguards are built in — graduated hints instead of answers, a crisis response, privacy rules, and no invented links.",
    ],
    lessons: [
      "A tutor's hardest design choice is what it refuses to do; the guardrails are the product.",
      "Ending on a student-explains-it-back check turns a Q&A bot into a learning loop.",
    ],
    businessApplication:
      "The same 'help without doing it for them' pattern fits any coaching or onboarding assistant that must build a person's capability rather than substitute for it — training, support deflection, certification prep.",
  },
];

export const featuredCaseStudies = caseStudies
  .filter((c) => c.featured)
  .sort((a, b) => a.order - b.order);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
