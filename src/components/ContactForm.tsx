"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const isPlaceholderEmail = site.email === "you@example.com";

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project enquiry from ${name || "your site"}`,
  )}&body=${encodeURIComponent(
    `${message}\n\n— ${name}${from ? ` (${from})` : ""}`,
  )}`;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto;
      }}
    >
      {isPlaceholderEmail && (
        <p className="rounded-lg border border-dashed border-line-strong bg-surface-2 p-3 text-xs text-muted">
          Setup reminder (only you see this): a public contact address hasn&apos;t been
          set yet, so this form points to a placeholder. Add one before launch.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-ink outline-none focus:border-accent"
            placeholder="Jane Doe"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Your email</span>
          <input
            type="email"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-ink outline-none focus:border-accent"
            placeholder="jane@company.com"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">
          What do you want to do with AI?
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-line bg-canvas px-3 py-2.5 text-ink outline-none focus:border-accent"
          placeholder="Describe the task that's currently ad-hoc, slow, or inconsistent..."
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast hover:bg-accent-ink"
      >
        Open email draft →
      </button>
      <p className="text-xs text-muted">
        This opens a pre-filled draft in your email app — no data is sent anywhere else.
      </p>
    </form>
  );
}
