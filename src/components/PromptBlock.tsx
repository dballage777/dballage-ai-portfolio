"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

/**
 * A readable prompt viewer: labelled header, copy button, and — for long
 * prompts — an expand/collapse so the page doesn't become a wall of text.
 */
export function PromptBlock({
  label,
  prompt,
  tone = "neutral",
  collapsible = true,
}: {
  label: string;
  prompt: string;
  tone?: "neutral" | "weak" | "strong";
  collapsible?: boolean;
}) {
  const lineCount = prompt.split("\n").length;
  const longEnough = collapsible && lineCount > 14;
  const [open, setOpen] = useState(!longEnough);

  const toneStyles =
    tone === "weak"
      ? "border-neg/40"
      : tone === "strong"
        ? "border-pos/40"
        : "border-line";

  const dot =
    tone === "weak"
      ? "bg-neg"
      : tone === "strong"
        ? "bg-pos"
        : "bg-muted";

  return (
    <div className={`overflow-hidden rounded-lg border ${toneStyles} bg-surface-2`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <span aria-hidden className={`h-2 w-2 rounded-full ${dot}`} />
          {label}
        </span>
        <div className="flex items-center gap-2">
          {longEnough && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink-soft hover:bg-surface"
              aria-expanded={open}
            >
              {open ? "Collapse" : `Expand (${lineCount} lines)`}
            </button>
          )}
          <CopyButton text={prompt} label="Copy prompt" />
        </div>
      </div>
      {open ? (
        <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-ink">
          <code>{prompt}</code>
        </pre>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full px-4 py-3 text-left text-[13px] text-muted hover:bg-surface"
        >
          <code className="line-clamp-2 whitespace-pre-wrap opacity-80">{prompt}</code>
          <span className="mt-1 block text-xs font-medium text-accent">Show full prompt →</span>
        </button>
      )}
    </div>
  );
}
