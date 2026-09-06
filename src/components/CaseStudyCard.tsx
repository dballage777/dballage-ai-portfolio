import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { Pill } from "./ui";

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-2 sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{cs.kind}</span>
        <span className="text-xs text-muted transition-transform group-hover:translate-x-0.5">
          Read →
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{cs.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{cs.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {cs.tags.slice(0, 4).map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className="font-mono text-xs text-muted">
          {cs.models.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
