import type { Metadata } from "next";
import { methodSteps, workflowExamples } from "@/content/process";
import { Container, Section, SectionHeading, Eyebrow, Button } from "@/components/ui";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "The method behind the work: a repeatable problem → approach → prompt → iteration → evaluation → result → lessons loop, plus example AI workflows.",
};

export default function ApproachPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Approach"
            title="A method, not a bag of tricks"
            intro="The same loop runs through everything I build. It's deliberately unglamorous — that's the point. Reliability comes from process, not from a clever one-liner."
          />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {methodSteps.map((s) => (
              <li
                key={s.n}
                className="rounded-[var(--radius-card)] border border-line bg-surface p-5"
              >
                <span className="font-mono text-xs font-semibold text-accent">
                  {String(s.n).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Workflows"
            title="Workflows, not isolated prompts"
            intro="Real problems rarely fit in one prompt. These are the kinds of multi-step, human-in-the-loop workflows I design — each step is defined, checkable, and improvable on its own."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {workflowExamples.map((wf) => (
              <WorkflowDiagram key={wf.slug} wf={wf} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Practice, measured"
            title="Iterated and reused — not one-off"
            intro="These are real counts from my own prompt history. They're not vanity metrics; they're evidence that the work is developed deliberately and reused, rather than typed once and hoped over."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                n: "36",
                label: "tasks one research template was reused across",
                note: "A single, recognizable research prompt — applied again and again, not rewritten from scratch.",
              },
              {
                n: "42",
                label: "refinements of one prompt, across 12 sessions",
                note: "The same ranking prompt, tightened toward objectivity over roughly two months.",
              },
              {
                n: "3",
                label: "tightening passes to make a formatting prompt content-safe",
                note: "From the document-guardrail case study — broad → forbid-destructive → preservation-first.",
              },
            ].map((s) => (
              <div key={s.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <div className="font-mono text-4xl font-semibold tracking-tight text-accent">
                  {s.n}
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{s.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">
            Method: counted from my own AI-chat history by identifying reuse of a
            recognizable prompt template and distinct, dated iterations of the same
            prompt. Reproducible from an export; figures describe prompt practice, not
            client outcomes.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>On simplicity</Eyebrow>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              The best AI system is the simplest one that reliably works. I reach for a
              multi-step workflow or an agent only when a single well-designed prompt
              genuinely can&apos;t do the job.
            </p>
            <div className="mt-8">
              <Button href="/work">See the loop applied →</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
