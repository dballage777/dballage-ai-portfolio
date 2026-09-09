import type { Metadata } from "next";
import { promptPack } from "@/content/promptPack";
import { Container, Section, SectionHeading, Button, Pill } from "@/components/ui";
import { PromptBlock } from "@/components/PromptBlock";

export const metadata: Metadata = {
  title: "Prompt Pack",
  description:
    "A free, curated set of reusable, copy-ready AI prompts — research, evaluation-minded, and teaching workflows. Sanitized real templates.",
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function PromptPackPage() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Free resource"
          title="The Prompt Pack"
          intro="A curated set of the reusable prompts I actually use — cleaned up and made generic. Copy any of them, or download the whole pack. They're built to get high-signal, verifiable results, not just plausible-looking text."
        />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={`${basePath}/prompt-pack.md`} external>
            ↓ Download the pack (Markdown)
          </Button>
          <span className="text-sm text-muted">
            {promptPack.length} prompts · free to use and adapt
          </span>
        </div>

        <div className="mt-12 space-y-6">
          {promptPack.map((p, i) => (
            <div
              key={p.slug}
              id={p.slug}
              className="scroll-mt-24 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                </div>
                <Pill>{p.model}</Pill>
              </div>
              <p className="mt-2 text-sm text-muted">
                <span className="font-medium text-ink-soft">Use it when:</span> {p.use}
              </p>
              <div className="mt-4">
                <PromptBlock label={p.title} prompt={p.prompt} tone="strong" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm leading-relaxed text-muted">
          <p>
            These are sanitized versions of real, working prompts — topics and any
            personal context removed. Use them freely. If you want a prompt system
            built and tested around <em>your</em> specific task, that&apos;s exactly
            what I do —{" "}
            <a href="/contact" className="link-underline text-accent">
              get in touch
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
