import type { Metadata } from "next";
import { promptLab } from "@/content/promptLab";
import { Container, Section, SectionHeading, Pill } from "@/components/ui";
import { PromptBlock } from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Prompt Lab",
  description:
    "Side-by-side prompt engineering demonstrations: a weak prompt, an improved one, and the reasoning behind each technique.",
};

export default function PromptLabPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Prompt Lab"
          title="Techniques, shown — not just named"
          intro="Each card pairs a weak prompt with a stronger one and explains the technique. Copy any prompt and adapt it. The point isn't the wording; it's why the change works."
        />

        <div className="mt-12 space-y-6">
          {promptLab.map((e) => (
            <div
              key={e.slug}
              id={e.slug}
              className="scroll-mt-24 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight">{e.technique}</h3>
                <Pill>Technique</Pill>
              </div>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-ink-soft">Task:</span> {e.task}
              </p>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <PromptBlock label="Weaker prompt" prompt={e.weak} tone="weak" collapsible={false} />
                </div>
                <div>
                  <PromptBlock label="Stronger prompt" prompt={e.strong} tone="strong" collapsible={false} />
                </div>
              </div>

              <div className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-[1.6fr_1fr]">
                <div>
                  <h4 className="eyebrow mb-1.5">Why it works</h4>
                  <p className="text-sm leading-relaxed text-ink-soft">{e.reasoning}</p>
                </div>
                <div>
                  <h4 className="eyebrow mb-1.5">When to use it</h4>
                  <p className="text-sm leading-relaxed text-muted">{e.whenToUse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
