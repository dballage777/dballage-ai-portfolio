/**
 * The core method (Part 5): the loop repeated across every case study.
 * Also a couple of concrete workflow examples (Part 14).
 */

export const methodSteps = [
  {
    n: 1,
    title: "Problem",
    body: "Define what's actually being asked. What does a good output look like? What would make it wrong or unsafe?",
  },
  {
    n: 2,
    title: "Approach",
    body: "Decide the shape of the solution: single prompt, a chain of steps, or a human-in-the-loop workflow. Pick the model to match.",
  },
  {
    n: 3,
    title: "Prompt / Workflow",
    body: "Engineer the first version — roles, structure, examples, output format, constraints — and write down why each part is there.",
  },
  {
    n: 4,
    title: "Iteration",
    body: "Run it against real and adversarial inputs. Find where it breaks. Revise deliberately, one change at a time.",
  },
  {
    n: 5,
    title: "Evaluation",
    body: "Score outputs against explicit criteria. Compare versions. Confirm improvements are real, not lucky.",
  },
  {
    n: 6,
    title: "Result",
    body: "Ship a version that behaves consistently, with its limits documented and known failure cases listed.",
  },
  {
    n: 7,
    title: "Lessons",
    body: "Capture what worked, what didn't, and what to watch — so the process can be trusted, repeated, and handed off.",
  },
] as const;

export type WorkflowExample = {
  slug: string;
  title: string;
  summary: string;
  stages: { label: string; detail: string }[];
};

export const workflowExamples: WorkflowExample[] = [
  {
    slug: "research-workflow",
    title: "AI-assisted research workflow",
    summary:
      "A repeatable way to research a topic with AI without trusting it blindly — the same workflow used to build this site's own research base.",
    stages: [
      { label: "Research question", detail: "State exactly what needs to be answered and why." },
      { label: "Search strategy", detail: "Plan sources and queries; prefer primary/authoritative ones." },
      { label: "Source discovery", detail: "Gather candidate sources across source types." },
      { label: "Source validation", detail: "Access sources directly; note credibility, recency, and bias." },
      { label: "Evidence extraction", detail: "Pull concrete claims, not vibes; keep them attributable." },
      { label: "Cross-checking", detail: "Compare sources; flag consensus, disagreement, and outdated advice." },
      { label: "Synthesis", detail: "Combine into a defensible position with limitations stated." },
    ],
  },
  {
    slug: "optimization-workflow",
    title: "Prompt optimization workflow",
    summary:
      "The evaluation-driven loop for making a prompt reliable instead of tweaking it by feel.",
    stages: [
      { label: "Baseline prompt", detail: "Write the simplest version that could work." },
      { label: "Test cases", detail: "Assemble real and edge-case inputs before optimizing." },
      { label: "Failure analysis", detail: "Label what goes wrong and group the errors." },
      { label: "Revision", detail: "Change one thing at a time, tied to a specific failure." },
      { label: "Evaluation", detail: "Re-score against the same cases; check for regressions." },
      { label: "Final prompt", detail: "Lock the version, document why each part exists." },
    ],
  },
  {
    slug: "content-workflow",
    title: "AI content workflow with quality control",
    summary:
      "How AI drafting fits into a process a person can actually stand behind.",
    stages: [
      { label: "Input", detail: "Structured brief: goal, audience, constraints, facts." },
      { label: "AI processing", detail: "Model drafts within a defined template and tone." },
      { label: "Human review", detail: "A person checks accuracy, tone, and intent." },
      { label: "Quality control", detail: "Run against a checklist / rubric before release." },
      { label: "Final output", detail: "Publish, and log anything to fix in the template." },
    ],
  },
];
