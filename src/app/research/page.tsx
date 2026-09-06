import type { Metadata } from "next";
import { sources, type SourceType } from "@/content/sources";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research basis",
  description:
    "This portfolio's strategy is grounded in 30 researched sources across prompt engineering, evaluation tooling, hiring, and hosting — accessed and compared, not copied.",
};

const typeOrder: SourceType[] = [
  "Primary/Vendor",
  "Academic/Community",
  "Tooling",
  "Example",
  "Practical/Career",
  "Marketplace/Commercial",
  "Platform",
];

const typeBlurb: Record<SourceType, string> = {
  "Primary/Vendor": "Model-makers' own guidance — highest weight on technique, but written to serve their platforms.",
  "Academic/Community": "Open, peer-pressured knowledge — strong on rigor and breadth.",
  Tooling: "Evaluation platforms — concrete eval practice, read past the sales layer.",
  Example: "A real peer portfolio — studied for what works and what to improve on.",
  "Practical/Career": "Hiring and portfolio advice — useful, often generic, sometimes course-selling.",
  "Marketplace/Commercial": "Freelance / prompt marketplaces — demand signals and the positioning to avoid.",
  Platform: "Hosting options — weighed for the platform decision.",
};

export default function ResearchPage() {
  return (
    <>
      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Research basis"
            title="This portfolio is researched, not vibes"
            intro="Before designing anything, I worked through 30 sources spanning prompt-engineering guidance, evaluation tooling, hiring signals, and hosting options — accessing them directly, comparing them, and weighing each by credibility rather than treating them as equally authoritative."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Compared, not copied", "I looked for consensus, disagreement, and outdated or commercially-biased advice — then synthesized rather than imitating any one template."],
              ["Weighted by credibility", "Primary vendor docs and open community guides carried more weight on technique; marketplace pages were read for demand signals and anti-patterns."],
              ["Evaluation-forward", "The strongest cross-source signal: evaluation is what separates real AI competence from a good-looking demo. It became this site's spine."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <h3 className="text-sm font-semibold tracking-tight">{h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>The 30 sources</Eyebrow>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
            Grouped by source type, with the single most useful thing each contributed
            to the strategy. A fuller internal synthesis (consensus, conflicts, and
            source-quality notes) ships with the source code as{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">RESEARCH.md</code>.
          </p>

          <div className="mt-10 space-y-10">
            {typeOrder.map((t) => {
              const group = sources.filter((s) => s.type === t);
              if (group.length === 0) return null;
              return (
                <div key={t}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
                    <h2 className="text-lg font-semibold tracking-tight">{t}</h2>
                    <span className="font-mono text-xs text-muted">{group.length} sources</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{typeBlurb[t]}</p>
                  <ul className="mt-4 space-y-3">
                    {group.map((s) => (
                      <li
                        key={s.n}
                        className="grid gap-2 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[1fr_1.4fr] sm:gap-6"
                      >
                        <div>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-ink hover:text-accent"
                          >
                            {s.title}
                          </a>
                          <p className="mt-0.5 font-mono text-xs text-muted">
                            {String(s.n).padStart(2, "0")} · {s.org}
                          </p>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{s.contribution}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
