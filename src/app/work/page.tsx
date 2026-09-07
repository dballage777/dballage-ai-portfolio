import type { Metadata } from "next";
import { caseStudies } from "@/content/caseStudies";
import { site } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/ui";
import { WorkGallery } from "@/components/WorkGallery";
import type { CardCaseStudy } from "@/components/CaseStudyCard";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "AI prompt engineering, research-workflow, and evaluation case studies — problem, approach, prompt iteration, evaluation, and lessons. Filter by type.",
};

export default function WorkPage() {
  const items: CardCaseStudy[] = [...caseStudies]
    .sort((a, b) => a.order - b.order)
    .map(({ slug, title, kind, oneLiner, tags, models, real, types }) => ({
      slug,
      title,
      kind,
      oneLiner,
      tags,
      models,
      real,
      types,
    }));

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Case studies"
          title="Work you can inspect"
          intro="A mix of real, anonymized projects and independent demonstrations — each labelled. Filter by the kind of work, or read them all; every one follows the same structure so you can compare how I reason across problems."
        />
        <div className="mt-10">
          <WorkGallery items={items} />
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          {site.demoDisclaimer}
        </p>
      </Container>
    </Section>
  );
}
