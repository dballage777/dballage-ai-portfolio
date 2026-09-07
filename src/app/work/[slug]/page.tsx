import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";
import { Container, Section, Pill, Button } from "@/components/ui";
import { PromptBlock } from "@/components/PromptBlock";
import { EvalTable } from "@/components/EvalTable";
import { QualEvalTable } from "@/components/QualEvalTable";
import { BeforeAfter } from "@/components/BeforeAfter";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: cs.title,
    description: cs.oneLiner,
    openGraph: { title: cs.title, description: cs.oneLiner },
  };
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-8">
      <h2 className="eyebrow pt-1">{label}</h2>
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <article>
      {/* Header */}
      <div className="border-b border-line">
        <Container className="py-12 sm:py-16">
          <Link href="/work" className="link-underline text-sm text-muted">
            ← All case studies
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                cs.real ? "bg-pos-bg text-pos" : "bg-surface-2 text-ink-soft"
              }`}
            >
              <span aria-hidden>{cs.real ? "●" : "◐"}</span>
              {cs.real ? "Real project (anonymized)" : "Independent demonstration"}
            </span>
            <span className="eyebrow">{cs.kind}</span>
          </div>
          <h1 className="mt-2 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            {cs.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{cs.oneLiner}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {cs.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-muted">Models: {cs.models.join(" · ")}</p>
        </Container>
      </div>

      <Container className="py-4">
        <Block label="Problem">
          <p className="text-base leading-relaxed text-ink-soft">{cs.problem}</p>
        </Block>

        <Block label="Context">
          <p className="text-base leading-relaxed text-ink-soft">{cs.context}</p>
        </Block>

        <Block label="Objective">
          <p className="text-base leading-relaxed text-ink-soft">{cs.objective}</p>
        </Block>

        <Block label="Constraints">
          <ul className="space-y-2">
            {cs.constraints.map((c) => (
              <li key={c} className="flex gap-2.5 text-base leading-relaxed text-ink-soft">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </Block>

        {cs.initialApproach && (
          <Block label="Initial approach">
            <p className="text-base leading-relaxed text-ink-soft">{cs.initialApproach}</p>
          </Block>
        )}

        {/* Prompt iteration — full width for readability */}
        {cs.promptVersions && cs.promptVersions.length > 0 && (
          <section className="border-t border-line py-8">
            <h2 className="eyebrow">Prompt iteration</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
              The versions below show the actual progression — including what was wrong
              with each step. This is the work.
            </p>
            <div className="mt-6 space-y-5">
              {cs.promptVersions.map((v, i) => {
                const tone =
                  i === 0
                    ? "weak"
                    : i === cs.promptVersions!.length - 1
                      ? "strong"
                      : "neutral";
                return (
                  <div key={v.label}>
                    <PromptBlock label={v.label} prompt={v.prompt} tone={tone} />
                    {v.problems && (
                      <ul className="mt-3 space-y-1.5 pl-1">
                        {v.problems.map((p) => (
                          <li key={p} className="flex gap-2 text-sm leading-relaxed text-muted">
                            <span aria-hidden className="text-neg">✕</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <Block label="Why it works">
          <ul className="space-y-3">
            {cs.whyItWorks.map((w) => (
              <li key={w} className="flex gap-2.5 text-base leading-relaxed text-ink-soft">
                <span aria-hidden className="text-pos">✓</span>
                {w}
              </li>
            ))}
          </ul>
        </Block>

        {/* Evaluation — full width */}
        {cs.evaluation && (
          <section className="border-t border-line py-8">
            <h2 className="eyebrow">Evaluation</h2>
            <div className="mt-5">
              {cs.evaluation.rows ? (
                <EvalTable
                  rows={cs.evaluation.rows}
                  kind={cs.evaluation.kind}
                  criteria={cs.evaluation.criteria}
                />
              ) : cs.evaluation.qualRows ? (
                <QualEvalTable
                  rows={cs.evaluation.qualRows}
                  kind={cs.evaluation.kind}
                  criteria={cs.evaluation.criteria}
                />
              ) : null}
            </div>
            {Boolean(cs.testCases?.length || cs.failureCases?.length) && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {cs.testCases && cs.testCases.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-ink">Test cases</h3>
                    <ul className="space-y-1.5">
                      {cs.testCases.map((t) => (
                        <li key={t} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span aria-hidden className="font-mono text-accent">›</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {cs.failureCases && cs.failureCases.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-ink">Failure cases</h3>
                    <ul className="space-y-1.5">
                      {cs.failureCases.map((f) => (
                        <li key={f} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span aria-hidden className="text-neg">▲</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Before / After */}
        {cs.beforeAfter && cs.beforeAfter.length > 0 && (
          <section className="border-t border-line py-8">
            <h2 className="eyebrow">Before / after</h2>
            <div className="mt-5">
              <BeforeAfter items={cs.beforeAfter} />
            </div>
          </section>
        )}

        <Block label="Lessons learned">
          <ul className="space-y-3">
            {cs.lessons.map((l) => (
              <li key={l} className="flex gap-2.5 text-base leading-relaxed text-ink-soft">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {l}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Business application">
          <p className="text-base leading-relaxed text-ink-soft">{cs.businessApplication}</p>
          {cs.repoUrl && (
            <a
              href={cs.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-block text-sm font-semibold text-accent"
            >
              View artifacts on GitHub →
            </a>
          )}
        </Block>
      </Container>

      {/* Footer note + CTA */}
      <Section>
        <Container>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8">
            <p className="text-xs leading-relaxed text-muted">{site.demoDisclaimer}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg font-medium tracking-tight">
                Want this kind of rigor on your AI task?
              </p>
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
