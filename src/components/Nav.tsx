"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/work", label: "Work" },
  { href: "/prompt-lab", label: "Prompt Lab" },
  { href: "/prompt-pack", label: "Prompt Pack" },
  { href: "/approach", label: "Approach" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md border border-line-strong font-mono text-sm font-bold text-accent"
          >
            {"{ }"}
          </span>
          <span className="text-sm font-semibold tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "text-accent"
                  : "text-ink-soft hover:text-ink hover:bg-surface-2"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-line" />
          <ThemeToggle />
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast hover:bg-accent-ink"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "✕" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(l.href) ? "text-accent" : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
