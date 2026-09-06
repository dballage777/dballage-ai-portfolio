export function BeforeAfter({
  items,
}: {
  items: { input: string; before: string; after: string }[];
}) {
  return (
    <div className="space-y-6">
      {items.map((it, i) => (
        <div key={i} className="rounded-[var(--radius-card)] border border-line bg-surface">
          <div className="border-b border-line px-4 py-3">
            <p className="eyebrow mb-1">Input</p>
            <p className="text-sm text-ink-soft">{it.input}</p>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-2">
            <div className="bg-neg-bg px-4 py-3.5">
              <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-neg">
                <span aria-hidden>▲</span> Before
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">{it.before}</p>
            </div>
            <div className="bg-pos-bg px-4 py-3.5">
              <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-pos">
                <span aria-hidden>▼</span> After
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">{it.after}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
