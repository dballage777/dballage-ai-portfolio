/**
 * A focused service offering (Part 16). Deliberately NOT a laundry list —
 * three clear services, each answering: what / who / problem / deliverable.
 */

export type Service = {
  slug: string;
  name: string;
  what: string;
  who: string;
  problem: string;
  deliverables: string[];
  format: string;
};

export const services: Service[] = [
  {
    slug: "prompt-system",
    name: "Prompt system design & optimization",
    what: "I take a task you're currently doing with ad-hoc prompts and turn it into a documented prompt system that behaves consistently.",
    who: "Teams or individuals who rely on a repeated AI task (support replies, summaries, extraction, drafting) and get inconsistent results.",
    problem:
      "One-off prompts work in a demo and break on real inputs. There's no way to tell a good output from a bad one, and no way to improve on purpose.",
    deliverables: [
      "Reusable, documented prompt(s) with role, structure, and guardrails",
      "A small evaluation set with pass/fail criteria",
      "Before/after examples and known failure cases",
      "A short methodology note so your team can maintain it",
    ],
    format: "Fixed-scope engagement",
  },
  {
    slug: "workflow-design",
    name: "AI workflow design",
    what: "I map a fuzzy, multi-step goal into a concrete AI-assisted workflow: which steps are AI, which are human, and how quality is checked.",
    who: "Organizations exploring AI who need a repeatable process, not a pile of prompts.",
    problem:
      "AI is being used inconsistently across a team, with no shared process, no quality control, and no clear hand-off points.",
    deliverables: [
      "A workflow diagram (inputs → steps → checks → output)",
      "Prompts / templates for each AI step",
      "Human review and quality-control checkpoints",
      "Model & tool recommendations with trade-offs",
    ],
    format: "Discovery + design engagement",
  },
  {
    slug: "evaluation-audit",
    name: "AI output evaluation & audit",
    what: "I assess whether an existing AI feature or workflow actually works: what it does well, where it fails, and how risky those failures are.",
    who: "Anyone shipping or considering an AI feature who needs an honest read on quality before trusting it.",
    problem:
      "An AI system 'seems fine' but nobody has defined what good looks like or tested it against realistic, adversarial inputs.",
    deliverables: [
      "Evaluation criteria & scoring rubric tailored to your task",
      "Test cases including edge and failure cases",
      "A scored review with concrete examples",
      "Prioritized recommendations to improve reliability",
    ],
    format: "Audit engagement",
  },
];
