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
    slug: "multi-model-extraction",
    title: "Same task, three models: structured extraction",
    kind: "Multi-model comparison",
    types: ["Prompt systems"],
    featured: false,
    order: 4,
    oneLiner:
      "Extracting clean structured data from messy meeting notes — and adapting the prompt to how each model actually behaves.",
    tags: ["Model-aware prompting", "Structured output", "Few-shot", "Evaluation"],
    models: ["Claude", "GPT-class", "Gemini-class"],
    problem:
      "The same extraction prompt gave different failure modes on different models: one over-explained, one dropped fields, one wrapped JSON in prose. 'It works on my model' isn't a strategy.",
    context:
      "Teams frequently standardize on one prompt and assume it ports across models. Models differ in defaults — verbosity, how strictly they honour schemas, how they handle 'unknown'. Effective work means adapting the prompt, not blaming the model.",
    objective:
      "Extract {action_items, owners, due_dates, decisions} from free-form notes as valid JSON, with 'unknown' where a field isn't stated — reliably, on each model.",
    constraints: [
      "Never infer an owner or date that isn't in the text",
      "Always valid, parseable JSON — no prose wrapper",
      "Same target schema across all models",
    ],
    initialApproach:
      "One shared prompt asking for the four fields as JSON. It exposed each model's default behaviour rather than controlling it.",
    promptVersions: [
      {
        label: "Shared baseline (revealed per-model quirks)",
        prompt: `Extract action items, owners, due dates, and decisions from these notes
as JSON.

Notes:
{{notes}}`,
        problems: [
          "One model returned Markdown-fenced JSON with commentary.",
          "One inferred owners not present in the text.",
          "One omitted the decisions array when there were none instead of returning [].",
        ],
      },
      {
        label: "Model-aware adjustments (same schema, tuned instructions)",
        language: "text",
        prompt: `SHARED SCHEMA (all models):
{
  "action_items": [{"task": string, "owner": string|"unknown", "due": string|"unknown"}],
  "decisions": string[]
}

CLAUDE  — responds well to XML structure + explicit "unknown" rule:
  Wrap notes in <notes>...</notes>. Add:
  "If owner or due date is not explicitly stated, use \\"unknown\\". Return
   [] for empty arrays. Output JSON only, no preamble."

GPT-class — enforce format hard; it tends to add helper prose:
  Use a system message: "You are a JSON API. Output ONLY valid JSON matching
  the schema. No markdown, no explanation." Provide one few-shot pair.

GEMINI-class — benefits from an explicit 'do not infer' guardrail and an
  example showing the "unknown" case, or it will guess owners.`,
      },
    ],
    whyItWorks: [
      "The schema is the contract and stays identical — only the *instructions around it* adapt to each model's defaults.",
      "Each adjustment targets that model's observed failure: prose-wrapping, inference, or empty-array handling.",
      "A shared 'unknown' rule prevents the most damaging error — confidently inventing an owner or deadline.",
    ],
    evaluation: {
      kind: "Illustrative demonstration",
      criteria:
        "Ten messy note samples were run through each model, before and after the model-aware tuning, and scored on the same rubric. Illustrative of the comparison.",
      rows: [
        { criterion: "Valid JSON on first parse", before: 6, after: 10, note: "Format enforcement removed prose wrappers." },
        { criterion: "No invented owners/dates", before: 5, after: 9, note: "'Do not infer' + unknown rule." },
        { criterion: "Schema completeness (arrays present)", before: 6, after: 10, note: "Explicit empty-array rule." },
        { criterion: "Cross-model consistency", before: 4, after: 9, note: "Outputs now interchangeable downstream." },
      ],
    },
    testCases: [
      "Notes with clear owners and dates",
      "Notes where owners are implied but not stated (must be 'unknown')",
      "Notes with no decisions at all (must return [])",
      "Notes containing a date range or relative date ('next Friday')",
    ],
    beforeAfter: [
      {
        input: "\"...Sam will look into the vendor thing. We agreed to postpone the launch. Follow up soon.\"",
        before:
          "Illustrative baseline (one model): ```json { \"action_items\": [{\"task\":\"vendor research\",\"owner\":\"Sam\",\"due\":\"this week\"}] }``` — invents a due date and drops the decision.",
        after:
          "Illustrative tuned output: {\"action_items\":[{\"task\":\"Look into the vendor issue\",\"owner\":\"Sam\",\"due\":\"unknown\"}],\"decisions\":[\"Postpone the launch\"]}",
      },
    ],
    failureCases: [
      "Relative dates ('next Friday') are left 'unknown' unless a reference date is supplied — arguably safer, but a resolver step would improve it.",
      "Nicknames vs. full names aren't reconciled without a roster.",
    ],
    lessons: [
      "Portability is a myth you should test for, not assume. Same schema, adapted instructions.",
      "The highest-value guardrail across all models was the same: 'do not infer — use unknown'.",
      "Model choice is a design decision with cost/latency/verbosity trade-offs, not a loyalty.",
    ],
    businessApplication:
      "Any pipeline that ingests unstructured notes (CRM updates, meeting minutes, tickets) can standardize on one schema while staying free to switch models for cost or availability.",
  },

  // ==========================================================================
  {
    slug: "evaluation-framework",
    title: "A rubric-based evaluation harness for AI summaries",
    kind: "Evaluation",
    types: ["Evaluation"],
    featured: true,
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
        "Illustrative comparison of two summary prompts (a naive one vs. a structured one) scored by the harness across a small fixed test set.",
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
];

export const featuredCaseStudies = caseStudies
  .filter((c) => c.featured)
  .sort((a, b) => a.order - b.order);

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
