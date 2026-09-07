import type { QualRow } from "@/content/caseStudies";

function Verdict({ value }: { value: QualRow["before"] }) {
  const styles =
    value === "Pass"
      ? "bg-pos-bg text-pos"
      : value === "Fail"
        ? "bg-neg-bg text-neg"
        : "bg-surface-2 text-ink-soft";
  const icon = value === "Pass" ? "✓" : value === "Fail" ? "✕" : "◐";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}>
      <span aria-hidden>{icon}</span>
      {value}
    </span>
  );
}

export function QualEvalTable({
  rows,
  kind,
  criteria,
}: {
  rows: QualRow[];
  kind: string;
  criteria: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
          {kind}
        </span>
      </div>
      <p className="border-b border-line px-4 py-3 text-sm text-muted">{criteria}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted">
              <th scope="col" className="px-4 py-2.5 font-medium">Criterion</th>
              <th scope="col" className="px-4 py-2.5 font-medium">v1</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Final</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.criterion} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                  {r.criterion}
                </th>
                <td className="px-4 py-3">
                  <Verdict value={r.before} />
                </td>
                <td className="px-4 py-3">
                  <Verdict value={r.after} />
                </td>
                <td className="px-4 py-3 text-muted">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
