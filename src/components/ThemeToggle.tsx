"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

function readMode(): Mode {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    /* ignore */
  }
  return "system";
}

export function ThemeToggle() {
  // Starts "system" on the server; corrected from localStorage after mount.
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    // Sync React state with the persisted value the inline <head> script
    // already applied to <html>. This is the sanctioned "read once from an
    // external system on mount" case; no cascading render loop occurs.
    const current = readMode();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode((prev) => (prev === current ? prev : current));
  }, []);

  function apply(next: Mode) {
    setMode(next);
    const el = document.documentElement;
    el.classList.remove("light", "dark");
    try {
      if (next === "system") {
        localStorage.removeItem("theme");
      } else {
        el.classList.add(next);
        localStorage.setItem("theme", next);
      }
    } catch {
      /* ignore */
    }
  }

  function cycle() {
    apply(mode === "light" ? "dark" : mode === "dark" ? "system" : "light");
  }

  const label =
    mode === "light" ? "Light theme" : mode === "dark" ? "Dark theme" : "System theme";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme (currently: ${label})`}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink hover:bg-surface-2"
    >
      <span aria-hidden suppressHydrationWarning className="text-base leading-none">
        {mode === "light" ? "☀" : mode === "dark" ? "☾" : "◐"}
      </span>
    </button>
  );
}
