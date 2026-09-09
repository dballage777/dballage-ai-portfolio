import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Section, Eyebrow, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: site.positioning.short,
};

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <Eyebrow>About</Eyebrow>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              I care less about impressive demos and more about whether the thing
              actually works.
            </h1>

            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>{site.positioning.long}</p>
              <p>
                My background is in turning ambiguity into structure. AI didn&apos;t
                change that instinct — it gave it a new, fast-moving medium. The
                interesting questions are the same ones they&apos;ve always been: What
                are we really trying to do? How will we know if it worked? What happens
                when it doesn&apos;t?
              </p>
              <p>
                So the work you&apos;ll find here leans into the unglamorous parts:
                defining criteria before writing a prompt, testing against the cases that
                break things, and writing down the method so it can be trusted and
                handed off. If that sounds less like &ldquo;AI wizard&rdquo; and more
                like careful engineering — good. That&apos;s the point.
              </p>
            </div>

          </div>

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <h2 className="eyebrow mb-3">How I think about AI</h2>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">›</span>
                  It&apos;s a tool, not a personality.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">›</span>
                  &ldquo;It worked once&rdquo; isn&apos;t &ldquo;it works&rdquo;.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">›</span>
                  Pick the model for the task, not out of habit.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">›</span>
                  If you can&apos;t evaluate it, you can&apos;t trust it.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">›</span>
                  Say what it can&apos;t do, out loud.
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <h2 className="eyebrow mb-3">Elsewhere</h2>
              <ul className="space-y-2 text-sm">
                {site.links.github && (
                  <li>
                    <a href={site.links.github} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-accent">
                      GitHub →
                    </a>
                  </li>
                )}
                {site.links.linkedin && (
                  <li>
                    <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-accent">
                      LinkedIn →
                    </a>
                  </li>
                )}
                {!site.links.github && !site.links.linkedin && (
                  <li className="text-muted">Reach out through the contact page.</li>
                )}
              </ul>
              <div className="mt-4">
                <Button href="/contact" variant="outline" className="w-full">
                  Contact
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
