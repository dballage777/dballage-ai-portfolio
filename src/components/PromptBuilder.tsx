"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

/**
 * An interactive, client-side demo (no API, no keys). It applies the same
 * prompt-structure method used across this site — role, context, explicit
 * constraints, output schema, guardrails — to whatever task a visitor types,
 * and assembles a copyable structured prompt live. The point is to let someone
 * *try the method*, not to call a model.
 */

type Format = "bullets" | "prose" | "json" | "table";

const FORMAT_LABEL: Record<Format, string> = {
  bullets: "Bulleted list",
  prose: "Short prose",
  json: "JSON (structured)",
  table: "Table",
};

const FORMAT_BLOCK: Record<Format, string> = {
  bullets: "Return a concise bulleted list. No preamble.",
  prose: "Return 1–2 short paragraphs. No preamble.",
  json: `Return JSON only, matching this shape (no prose, no markdown fences):
{ "result": [ { "item": string, "detail": string } ], "notes": string }`,
  table: "Return a compact Markdown table with a header row. No preamble.",
};

export function PromptBuilder() {
  const [task, setTask] = useState("");
  const [audience, setAudience] = useState("");
  const [role, setRole] = useState("");
  const [format, setFormat] = useState<Format>("bullets");
  const [noInvent, setNoInvent] = useState(true);
  const [askWhenUnsure, setAskWhenUnsure] = useState(true);
  const [citeSources, setCiteSources] = useState(false);
  const [stepByStep, setStepByStep] = useState(false);
  const [example, setExample] = useState(false);

  const taskText = task.trim() || "[describe the task — e.g. summarize this contract]";
  const roleText = role.trim();

  const guardrails: string[] = [];
  if (noInvent)
    guardrails.push("Use only information given or that you can verify. Do not invent facts, names, numbers, or sources.");
  if (askWhenUnsure)
    guardrails.push("If a needed detail is missing, do not guess — say what's missing and ask for it.");
  if (citeSources)
    guardrails.push("Cite a source or direct link for every non-obvious claim.");

  const lines: string[] = [];
  lines.push(
    `<role>You are ${roleText || "an expert assistant"}${
      audience.trim() ? `, writing for ${audience.trim()}` : ""
    }.</role>`,
  );
  lines.push("");
  lines.push(`<task>\n${taskText}\n</task>`);
  if (stepByStep) {
    lines.push("");
    lines.push(
      "<method>\nWork step by step. Briefly state your approach before the answer.\n</method>",
    );
  }
  if (guardrails.length) {
    lines.push("");
    lines.push("<rules>\n" + guardrails.map((g) => `- ${g}`).join("\n") + "\n</rules>");
  }
  if (example) {
    lines.push("");
    lines.push(
      "<example>\nInput: [a short representative input]\nOutput: [the ideal output in the exact format below]\n</example>",
    );
  }
  lines.push("");
  lines.push(`<output_format>\n${FORMAT_BLOCK[format]}\n</output_format>`);

  const assembled = lines.join("\n");

  const field =
    "w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-accent";

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">The task</span>
            <textarea
              rows={3}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Draft a reply to this customer email"
              className={`${field} resize-y`}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink">Model plays the role of…</span>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="a senior support agent"
                className={field}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-ink">Audience (optional)</span>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="a non-technical customer"
                className={field}
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-ink">Output format</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as Format)}
              className={field}
            >
              {(Object.keys(FORMAT_LABEL) as Format[]).map((f) => (
                <option key={f} value={f}>
                  {FORMAT_LABEL[f]}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="space-y-2">
            <legend className="mb-1 text-sm font-medium text-ink">Guardrails</legend>
            {[
              [noInvent, setNoInvent, "Don't invent facts / sources"],
              [askWhenUnsure, setAskWhenUnsure, "Ask when a detail is missing (don't guess)"],
              [citeSources, setCiteSources, "Cite a source for each claim"],
              [stepByStep, setStepByStep, "Reason step by step"],
              [example, setExample, "Include a one-shot example slot"],
            ].map(([val, set, label], i) => (
              <label key={i} className="flex items-center gap-2.5 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={val as boolean}
                  onChange={(e) => (set as (b: boolean) => void)(e.target.checked)}
                  className="h-4 w-4 rounded border-line accent-[var(--accent)]"
                />
                {label as string}
              </label>
            ))}
          </fieldset>
        </div>

        {/* Live output */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="eyebrow">Your structured prompt</span>
            <CopyButton text={assembled} label="Copy prompt" />
          </div>
          <pre className="h-[360px] overflow-auto rounded-lg border border-pos/40 bg-surface-2 px-4 py-3.5 text-[13px] leading-relaxed text-ink">
            <code>{assembled}</code>
          </pre>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Notice what changed: a clear role, the task in its own block, explicit
            guardrails, and a defined output format. That structure — not clever
            wording — is what makes a prompt behave the same way twice.
          </p>
        </div>
      </div>
    </div>
  );
}
