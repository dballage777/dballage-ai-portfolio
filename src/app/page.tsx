import Link from "next/link";
import { site } from "@/content/site";
import { capabilities } from "@/content/capabilities";
import { featuredCaseStudies } from "@/content/caseStudies";
import { methodSteps } from "@/content/process";
import { Button, Container, Section, SectionHeading, Eyebrow } from "@/components/ui";
import { CaseStudyCard } from "@/components/CaseStudyCard";

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <Container className="relative">
          <div className="max-w-3xl py-20 sm:py-28">
            <Eyebrow>{site.role}</Eyebrow>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              I turn messy problems into{" "}
              <span className="text-accent">tested, repeatable</span> AI workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {site.positioning.heroSub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/work">Explore case studies</Button>
              <Button href="/approach" variant="outline">
                See how I work
              </Button>
            </div>

            {/* who / what / who-i-help / why — answered fast */}
            <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="eyebrow mb-1.5">What I do</dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  Design prompt systems &amp; AI workflows, then prove they work with
                  evaluation.
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1.5">Who I help</dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  Teams and founders adopting AI who need it reliable — not just
                  impressive in a demo.
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1.5">Why it matters</dt>
                <dd className="text-sm leading-relaxed text-ink-soft">
                  A one-off prompt is a lucky guess. A tested workflow is something you
                  can trust and repeat.
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* ---------------- POSITIONING / ANTI-CLAIM ---------------- */}
      <Section className="border-b border-line">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>The difference</Eyebrow>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Most portfolios <span className="text-muted">claim</span> AI expertise.
              This one <span className="text-accent">demonstrates</span> it — with the
              actual prompts, the failures, the fixes, and how each result was
              evaluated.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="It's the full loop, not just the prompt"
            intro="Writing the prompt is one step. The value is in framing the problem, choosing the approach, iterating against real cases, and proving the output is good."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div
                key={c.slug}
                className="rounded-[var(--radius-card)] border border-line bg-surface p-5"
              >
                <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.slice(0, 4).map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-ink-soft"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/capabilities"
              className="flex items-center justify-between rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface-2 p-5 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
            >
              See all capabilities
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ---------------- FEATURED CASE STUDIES ---------------- */}
      <Section className="border-b border-line">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Case studies, not screenshots"
              intro="Each one walks the same path: problem → approach → prompt → iteration → evaluation → result → lessons."
            />
            <Link href="/work" className="link-underline shrink-0 text-sm font-semibold text-accent">
              All case studies →
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredCaseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} cs={cs} />
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted">
            {site.demoDisclaimer}
          </p>
        </Container>
      </Section>

      {/* ---------------- METHOD LOOP ---------------- */}
      <Section className="border-b border-line">
        <Container>
          <SectionHeading
            eyebrow="Method"
            title="A repeatable loop I can defend"
            intro="This is the backbone of every project. It's also why the work holds up: nothing here rests on a single lucky output."
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
                <h3 className="mt-2 text-sm font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------- EVALUATION DIFFERENTIATOR ---------------- */}
      <Section className="border-b border-line">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Why evaluation</Eyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Anyone can generate output. Few can prove it&apos;s good.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                The rare, valuable skill isn&apos;t producing an answer — it&apos;s
                defining what &ldquo;good&rdquo; means, testing against real cases, and
                catching the failures before your users do. That&apos;s the thread
                running through this whole site.
              </p>
              <div className="mt-7">
                <Button href="/work/evaluation-framework" variant="outline">
                  See the evaluation case study
                </Button>
              </div>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <p className="eyebrow mb-4">Illustrative scorecard</p>
              <ul className="space-y-3.5">
                {[
                  ["Faithfulness", 9],
                  ["Instruction following", 10],
                  ["Coverage", 8],
                  ["Consistency", 9],
                ].map(([label, val]) => (
                  <li key={label as string} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 text-sm text-ink-soft">{label}</span>
                    <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-accent"
                        style={{ width: `${((val as number) / 10) * 100}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right font-mono text-xs text-muted">
                      {val}/10
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted">
                Demonstration data — illustrates the review format, not a benchmark.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section>
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-8 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Have a task that&apos;s currently ad-hoc or inconsistent?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                That&apos;s exactly the kind of thing I turn into a documented, tested
                workflow. Tell me the problem — I&apos;ll tell you how I&apos;d approach
                it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Start a conversation</Button>
                <Button href="/services" variant="outline">
                  What I offer
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
