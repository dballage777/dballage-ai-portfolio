import type { Metadata } from "next";
import { capabilities } from "@/content/capabilities";
import { Container, Section, SectionHeading, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "The full set of AI capabilities: problem framing, prompt engineering, evaluation, model-aware strategy, and communication.",
};

export default function CapabilitiesPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="What I actually do with AI"
          intro="Grouped by the part of the process they belong to. Each is something demonstrated elsewhere on this site, not just claimed."
        />
        <div className="mt-12 space-y-5">
          {capabilities.map((c, i) => (
            <div
              key={c.slug}
              className="grid gap-5 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:grid-cols-[280px_1fr]"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {c.skills.map((s) => (
                  <li
                    key={s}
                    className="h-fit rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-ink-soft"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/work">See these in the case studies →</Button>
        </div>
      </Container>
    </Section>
  );
}
