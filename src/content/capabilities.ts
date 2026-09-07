/**
 * Capability groups shown on the home page and /capabilities.
 * These describe *how* the work is done, framed as demonstrable skills rather
 * than claims. Each group maps to evidence elsewhere on the site.
 */

export type Capability = {
  slug: string;
  title: string;
  summary: string;
  skills: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "problem-framing",
    title: "Problem framing & workflow design",
    summary:
      "Turning a vague request into a defined problem, then into a sequence of AI and human steps that can actually be executed and checked.",
    skills: [
      "Analyzing ambiguous problems",
      "Decomposing tasks into steps",
      "Designing AI-assisted workflows",
      "Deciding where AI helps and where it doesn't",
      "Turning vague problems into structured solutions",
    ],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt engineering & context design",
    summary:
      "Writing prompts that behave consistently: clear roles, structured instructions, examples, output schemas, and guardrails — not just clever wording.",
    skills: [
      "Role & context engineering",
      "Structured instructions & delimiters",
      "Few-shot examples & output schemas",
      "Prompt decomposition & chaining",
      "Guardrails & constraint design",
      "Output budgeting & structured compression",
      "Building reusable prompt systems",
    ],
  },
  {
    slug: "evaluation",
    title: "Evaluation & iteration",
    summary:
      "Deciding what 'good' means before writing the prompt, then testing against real cases, analyzing failures, and improving deliberately.",
    skills: [
      "Defining evaluation criteria & rubrics",
      "Building test cases",
      "Failure & error analysis",
      "Before/after comparison",
      "Regression checking",
      "Demonstrating measurable improvement",
    ],
  },
  {
    slug: "model-strategy",
    title: "Model-aware strategy",
    summary:
      "Choosing the right model and prompting approach for the task instead of forcing one tool to do everything.",
    skills: [
      "Comparing prompting strategies",
      "Model-specific prompting",
      "Using multiple models effectively",
      "Cost / quality / latency trade-offs",
      "Tool use & retrieval concepts",
    ],
  },
  {
    slug: "communication",
    title: "Documentation & communication",
    summary:
      "Making the work legible: methodology write-ups, honest limitations, and explanations a non-technical client can follow.",
    skills: [
      "Documenting methodology",
      "Communicating AI capabilities to non-technical clients",
      "Producing reliable instructional & technical documents",
      "Writing clear limitations",
      "Creating repeatable, hand-off-able processes",
      "Helping organizations use AI more effectively",
    ],
  },
];
