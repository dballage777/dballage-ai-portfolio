import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { site } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/ui";
import { CaseStudyCard } from "@/components/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "In-depth AI prompt engineering and workflow case studies — problem, approach, prompt iteration, evaluation, and lessons.",
};

export default function WorkPage() {
  const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Case studies"
          title="Work you can inspect"
          intro="These are independent demonstrations built to show method and thinking. Each follows the same structure so you can compare how I reason across different problems."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          {site.demoDisclaimer}
        </p>
      </Container>
    </Section>
  );
}
