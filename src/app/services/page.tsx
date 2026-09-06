import type { Metadata } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Container, Section, SectionHeading, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Focused AI services: prompt system design, AI workflow design, and AI output evaluation & audit.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Three ways I help — clearly scoped"
            intro="No vague 'AI consulting'. Each engagement solves a specific problem and ends with something concrete you can use and maintain."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.slug}
                className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6"
              >
                <span className="eyebrow">{s.format}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.what}</p>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">Who it&apos;s for</dt>
                    <dd className="mt-0.5 text-muted">{s.who}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Problem it solves</dt>
                    <dd className="mt-0.5 text-muted">{s.problem}</dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="eyebrow mb-2">You receive</p>
                  <ul className="space-y-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                        <span aria-hidden className="text-accent">✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Not sure which one fits?
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                Describe the task in a sentence or two. I&apos;ll tell you honestly
                whether AI is the right tool, and if so, how I&apos;d scope it.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/contact">Describe your task</Button>
                <Button href="/work" variant="outline">
                  See example outcomes
                </Button>
              </div>
              <p className="mt-6 text-xs text-muted">
                Note: engagement formats above are offerings — pricing and availability
                are discussed per project. {site.name} does not list fabricated client
                results.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
