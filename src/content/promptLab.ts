/**
 * Prompt Lab (Part 13): compact, readable demonstrations of individual
 * techniques. Each entry pairs a weak prompt with an improved one and explains
 * the technique — so a visitor learns something and sees the reasoning, not
 * just a wall of text. Prompts are copyable in the UI.
 */

export type PromptLabEntry = {
  slug: string;
  technique: string;
  task: string;
  weak: string;
  strong: string;
  reasoning: string;
  whenToUse: string;
};

export const promptLab: PromptLabEntry[] = [
  {
    slug: "role-and-context",
    technique: "Role & context engineering",
    task: "Get a technical explanation pitched at the right audience.",
    weak: "Explain how vector databases work.",
    strong: `<role>You are a staff engineer explaining a concept to a smart product
manager with no ML background.</role>

<goal>Explain what a vector database does and when to use one.</goal>

<constraints>
- Use one concrete analogy.
- No math notation. Define any term you introduce.
- End with a 1-sentence "use it when…" heuristic.
</constraints>`,
    reasoning:
      "The weak version leaves audience, depth, and format to chance, so the model picks a generic middle. Specifying the role and the reader calibrates vocabulary; the constraints control shape and stop it from drifting into math.",
    whenToUse:
      "Any time the 'right' answer depends on who it's for — explanations, rewrites, docs, client-facing copy.",
  },
  {
    slug: "output-schema",
    technique: "Output schemas & structured output",
    task: "Get machine-usable results, not prose.",
    weak: "Give me the pros and cons of these three tools.",
    strong: `Compare the tools below. Return JSON ONLY, no prose:

{
  "tools": [
    { "name": string,
      "best_for": string,
      "pros": string[],
      "cons": string[],
      "avoid_if": string }
  ],
  "recommendation": { "pick": string, "why": string }
}

Tools: {{tool_list}}`,
    reasoning:
      "A defined schema turns the model into a component you can parse, diff, and test. It also forces completeness — every field must be filled — which surfaces gaps the prose version would gloss over.",
    whenToUse:
      "Whenever the output feeds another step, a UI, or a spreadsheet — or when you want to compare answers across runs or models.",
  },
  {
    slug: "few-shot",
    technique: "Few-shot examples",
    task: "Pin down a specific format or judgement the model keeps getting wrong.",
    weak: "Classify these support tickets by urgency.",
    strong: `Classify each ticket as P1 / P2 / P3 using these examples:

"Site is down for all users" -> P1  (outage, revenue impact)
"Login is slow this morning" -> P2  (degraded, not blocking)
"Typo on the pricing page" -> P3  (cosmetic)

Now classify (return "ticket -> level" only):
{{tickets}}`,
    reasoning:
      "Two or three well-chosen examples communicate a boundary faster than a paragraph of definitions. The examples also encode the *reasoning* (why P1) so edge cases land closer to your intent.",
    whenToUse:
      "Subjective or house-specific judgements, consistent formatting, or any task where you can show 'like this, not like that'.",
  },
  {
    slug: "decomposition",
    technique: "Prompt decomposition & chaining",
    task: "Stop one prompt from doing three jobs badly.",
    weak: "Read this contract and tell me if we should sign it.",
    strong: `Step 1 (extract): List every obligation, deadline, and penalty as JSON.
Step 2 (assess): For each item from step 1, rate risk (low/med/high) with a
  one-line reason. Use ONLY items from step 1.
Step 3 (summarize): Given the step-2 risks, write a 5-line plain-English
  recommendation and list what a lawyer should review.`,
    reasoning:
      "One mega-prompt blends extraction, judgement, and writing, so errors compound invisibly. Splitting into steps makes each stage checkable and lets you fix the weak link without touching the others — the backbone of workflow design.",
    whenToUse:
      "Multi-stage reasoning, anything high-stakes, or when you need to inspect intermediate results.",
  },
  {
    slug: "grounding-guardrails",
    technique: "Grounding & guardrails",
    task: "Stop the model from confidently making things up.",
    weak: "Answer the customer's question about our return policy.",
    strong: `<policy>{{official_policy_text}}</policy>

Answer the question using ONLY the text in <policy>.
If the answer is not in <policy>, reply exactly:
"I don't have that in our policy — let me check with the team."
Do not guess, and do not add rules that aren't written above.

Question: {{question}}`,
    reasoning:
      "Hallucination is usually a scope failure. Naming the allowed source and giving an explicit escape hatch ('say this if you don't know') converts invented answers into safe deferrals.",
    whenToUse:
      "Policy, legal, medical, factual lookup — anywhere a wrong-but-confident answer is worse than 'I don't know'.",
  },
];
