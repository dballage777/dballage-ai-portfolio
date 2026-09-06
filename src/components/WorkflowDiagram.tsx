import type { WorkflowExample } from "@/content/process";

export function WorkflowDiagram({ wf }: { wf: WorkflowExample }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
      <h3 className="text-lg font-semibold tracking-tight">{wf.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{wf.summary}</p>
      <ol className="mt-5 flex flex-col gap-2">
        {wf.stages.map((s, i) => (
          <li key={s.label} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line-strong font-mono text-xs font-semibold text-accent"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">
                {s.label}
                {i < wf.stages.length - 1 && (
                  <span aria-hidden className="ml-2 text-muted">
                    ↓
                  </span>
                )}
              </p>
              <p className="text-sm text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
