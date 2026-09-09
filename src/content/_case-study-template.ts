/**
 * ============================================================================
 *  CASE STUDY TEMPLATE  —  copy me when you do real AI work worth showing
 * ============================================================================
 *  HOW TO USE
 *  1. Do your real task in ChatGPT / Gemini / Claude / etc. as normal.
 *  2. Before you forget, capture the FOUR things (see docs/CASE_STUDY_CHECKLIST.md):
 *       - the task, the prompt version(s), one before/after, what failed.
 *  3. Fill in the fields below (rough is fine — bullet fragments are OK).
 *  4. Hand it to Claude Code and say "turn this into a case study."
 *     Claude will polish the copy, sanitize anything identifying, and paste it
 *     into caseStudies.ts as a new entry.
 *
 *  This file is NOT imported anywhere, so it never appears on the live site —
 *  it's a scratchpad. Leave it here; copy its shape into caseStudies.ts.
 *
 *  Honesty rules (non-negotiable):
 *   - real: true ONLY if you actually did this. Otherwise it's a demonstration.
 *   - Never invent numbers. Use the QUALITATIVE eval (Fail/Partial/Pass) unless
 *     you truly scored outputs; then use numeric rows and label them illustrative.
 *   - Strip names, employers, locations, students, clients, health, credentials.
 * ============================================================================
 */

import type { CaseStudy } from "./caseStudies";

export const NEW_CASE_STUDY: CaseStudy = {
  slug: "kebab-case-url-slug", // e.g. "grading-rubric-prompt"
  title: "Short, concrete title (what you actually did)",
  kind: "Real project · <what kind>", // or "Demonstration · <what kind>"
  // Pick 1–2 that fit. Must be from the ProjectType list in caseStudies.ts:
  // "Prompt systems" | "Research workflows" | "Content & documents" |
  // "Evaluation" | "Websites & apps" | "Automations & bots" | "Creative & visual"
  types: ["Prompt systems"],
  real: true, // <-- true only if this is genuinely your work
  featured: false, // set true for the 3 you most want on the homepage
  order: 10, // lower = earlier; existing real work is 0–6, so 10 is safe

  oneLiner: "One sentence a stranger understands: the problem you solved.",
  tags: ["Guardrails", "Iteration", "Structured output"], // 3–4 short tags
  models: ["ChatGPT"], // whatever you actually used

  problem: "What was going wrong / hard before. Be concrete.",
  context: "Anonymized background. Who it was for (generically), why it mattered.",
  objective: "What a good result had to do.",
  constraints: [
    "A rule the output had to obey",
    "Another constraint (safety, format, tone, don't-invent-facts, etc.)",
  ],

  // OPTIONAL — delete if not relevant (e.g. for a website/build project)
  initialApproach: "The obvious first attempt, and why it fell short.",

  // OPTIONAL — the heart of a prompt case study. Show the real progression.
  promptVersions: [
    {
      label: "v1 — first attempt",
      prompt: `Paste your actual first prompt here (sanitized).`,
      problems: ["What was wrong with it", "Another failure it caused"],
    },
    {
      label: "vFinal — what worked",
      prompt: `Paste the final, working prompt here (sanitized).`,
    },
  ],

  whyItWorks: [
    "The specific reason the final version behaves better.",
    "Another concrete reason (a rule, a structure, a guardrail).",
  ],

  // OPTIONAL — pick ONE eval style, delete the other. Delete the whole block
  // if there's no evaluation.
  evaluation: {
    kind: "Qualitative evaluation", // honest default when you didn't score numbers
    criteria: "How you judged it (e.g. compared before/after on N real inputs).",
    // QUALITATIVE (verdict-based) — use this unless you truly scored outputs:
    qualRows: [
      { criterion: "What you checked", before: "Fail", after: "Pass", note: "One line of evidence." },
    ],
    // NUMERIC (only if you actually scored) — then set kind to
    // "Illustrative demonstration" and DELETE qualRows above, use:
    // rows: [{ criterion: "Accuracy", before: 4, after: 9, note: "..." }],
  },

  // OPTIONAL sections — delete any you don't have.
  testCases: ["A real input you tried", "An edge case that mattered"],
  beforeAfter: [
    {
      input: "The input / the change you made.",
      before: "What the weak version produced (sanitized).",
      after: "What the good version produced (sanitized).",
    },
  ],
  failureCases: ["Where it still breaks — be honest, this builds trust."],

  lessons: [
    "What you'd tell someone doing this task.",
    "The transferable principle behind it.",
  ],
  businessApplication: "Where this same approach is useful beyond your one case.",

  // OPTIONAL — a public (sanitized) repo/gist link once you have one.
  // repoUrl: "https://github.com/<handle>/<repo>",
};
