import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container, Section, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about AI workflow design, prompt systems, or evaluation.`,
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="max-w-xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell me what you&apos;re trying to do.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              The best first message is a plain description of the task — what it is
              today, why it&apos;s frustrating, and what &ldquo;done well&rdquo; would
              look like. I&apos;ll reply with how I&apos;d approach it and whether AI is
              even the right tool.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              {site.email !== "you@example.com" && (
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 hover:border-line-strong"
                >
                  <span aria-hidden className="text-accent">✉</span>
                  <span className="text-ink-soft">{site.email}</span>
                </a>
              )}
              {site.links.linkedin && (
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 hover:border-line-strong"
                >
                  <span aria-hidden className="text-accent">in</span>
                  <span className="text-ink-soft">LinkedIn</span>
                </a>
              )}
              {site.links.github && (
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 hover:border-line-strong"
                >
                  <span aria-hidden className="font-mono text-accent">{"{ }"}</span>
                  <span className="text-ink-soft">GitHub</span>
                </a>
              )}
            </div>
            <p className="mt-6 text-xs text-muted">{site.location}</p>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
