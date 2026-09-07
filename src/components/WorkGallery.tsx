"use client";

import { useMemo, useState } from "react";
import type { ProjectType } from "@/content/caseStudies";
import { CaseStudyCard, type CardCaseStudy } from "./CaseStudyCard";

// Display order for the filter chips.
const TYPE_ORDER: ProjectType[] = [
  "Prompt systems",
  "Research workflows",
  "Content & documents",
  "Evaluation",
  "Websites & apps",
  "Automations & bots",
  "Creative & visual",
];

export function WorkGallery({ items }: { items: CardCaseStudy[] }) {
  // Only surface filters that actually have projects behind them.
  const availableTypes = useMemo(() => {
    const present = new Set<ProjectType>();
    items.forEach((i) => i.types.forEach((t) => present.add(t)));
    return TYPE_ORDER.filter((t) => present.has(t));
  }, [items]);

  const [active, setActive] = useState<ProjectType | "All">("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.types.includes(active));

  const chip = (label: string, value: ProjectType | "All", count: number) => {
    const isActive = active === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setActive(value)}
        aria-pressed={isActive}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
          isActive
            ? "border-accent bg-accent text-accent-contrast"
            : "border-line bg-surface text-ink-soft hover:border-line-strong hover:bg-surface-2"
        }`}
      >
        {label}
        <span className={`text-xs ${isActive ? "opacity-80" : "text-muted"}`}>{count}</span>
      </button>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {chip("All", "All", items.length)}
        {availableTypes.map((t) =>
          chip(t, t, items.filter((i) => i.types.includes(t)).length),
        )}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs) => (
          <CaseStudyCard key={cs.slug} cs={cs} />
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {filtered.length} of {items.length} projects
        {active !== "All" ? ` in “${active}”` : ""}.
      </p>
    </div>
  );
}
