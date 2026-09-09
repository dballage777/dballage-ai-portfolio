# CLAUDE.md — context for AI coding sessions

This is an anonymous, evidence-first **AI prompt-engineering / workflow portfolio**.
Its whole thesis is **demonstrate, don't claim**. Keep that bar.

## Stack
Next.js (App Router) + TypeScript + Tailwind v4. Static-export capable.
- `npm run dev` · `npm run build` · `npm run build:static` · `npm run lint` · `npm run typecheck`
- Deploys to Vercel (primary) or GitHub Pages (`build:static`, workflow in `.github/`).

## Where things live
- **Content is data.** Edit `src/content/*`, not components:
  - `site.ts` — identity, links, positioning copy (currently anonymous alias).
  - `caseStudies.ts` — the case studies (the core evidence).
  - `promptLab.ts`, `promptPack.ts`, `capabilities.ts`, `services.ts`,
    `process.ts`, `sources.ts`.
- Pages in `src/app/*`; shared UI in `src/components/*`.
- Adding a case study: see `docs/CASE_STUDY_CHECKLIST.md` and copy
  `src/content/_case-study-template.ts` (that file is NOT imported — scratch only).

## Non-negotiable rules (this is a portfolio built on trust)
- **Never fabricate**: no invented clients, metrics, testimonials, credentials.
- Each case study is labeled `real: true` (anonymized real work) OR a
  **demonstration**. Don't mislabel.
- **Never invent evaluation numbers.** Default to qualitative Fail/Partial/Pass;
  use numeric rows only for genuinely scored work, labeled illustrative.
- **Anonymity**: no real name, employer, location, students, clients, or personal
  data on the public site. The owner's raw AI-history exports live in `_private/`
  which is git-ignored — never commit or publish them.
- Empty gallery categories stay hidden — don't advertise unproven skills.

## Owner to-do (not code — values only they have)
- `site.email` and `site.url` are placeholders; set before launch.
- Name intentionally omitted (anonymous by choice).
