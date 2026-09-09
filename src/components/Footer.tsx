import Link from "next/link";
import { site } from "@/content/site";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/work", label: "Case studies" },
      { href: "/prompt-lab", label: "Prompt Lab" },
      { href: "/prompt-pack", label: "Prompt Pack" },
      { href: "/approach", label: "Approach" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/services", label: "Services" },
      { href: "/research", label: "Research basis" },
      { href: "/about", label: "About" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-md border border-line-strong font-mono text-sm font-bold text-accent"
            >
              {"{ }"}
            </span>
            <span className="text-sm font-semibold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.positioning.short}
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="eyebrow mb-3">{c.title}</h3>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-soft hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="eyebrow mb-3">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-ink-soft hover:text-accent">
                Contact
              </Link>
            </li>
            {site.links.github && (
              <li>
                <a href={site.links.github} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-accent">
                  GitHub
                </a>
              </li>
            )}
            {site.links.linkedin && (
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-accent">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="mono">Built with Next.js · Designed for clarity over hype.</p>
        </div>
      </div>
    </footer>
  );
}
