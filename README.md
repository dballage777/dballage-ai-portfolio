# AI Portfolio — Workflow & Prompt Systems

A professional portfolio website that positions its owner as someone who **designs
tested AI workflows and prompt systems and can prove they work** — not "someone who
writes prompts." Built to *demonstrate* skill (real prompts, iterations, failures,
and evaluations) rather than merely claim it.

Built with **Next.js + TypeScript + Tailwind CSS**. Fast, responsive, accessible,
SEO-ready, dark/light themed, and hostable on Vercel **or** as a static export on
GitHub Pages.

---

## 1. First thing to do: make it yours

Open **`src/content/site.ts`** and replace the `TODO` placeholders:

| Field | What to set |
|---|---|
| `name`, `firstName` | Your real name |
| `email` | Your preferred **public** contact email (your login email was intentionally *not* auto-published) |
| `links.linkedin` | Your LinkedIn URL |
| `links.github` | Pre-filled to `github.com/dballage777` — change if needed |
| `url` | Your final deployed domain (used for SEO/sitemap/OG) |
| `role`, `tagline`, `positioning.*` | Tune the wording if you like — it's already written |

That one file drives the hero, metadata, footer, contact, and all positioning copy.

Everything else the site presents is honest by construction: case studies are
labelled **independent demonstrations**, and all evaluation scores are labelled
**illustrative** — never fabricated benchmarks or client results.

---

## 2. Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (Vercel / Node hosting)
npm run build:static # static export to ./out (GitHub Pages / any static host)
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

Requires Node 18.18+ (developed on Node 22).

---

## 3. Deploy

### Recommended — Vercel (primary)
1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) → it auto-detects Next.js.
3. Add your custom domain in the Vercel dashboard and update `site.url`.

No environment variables are required (the contact form uses a `mailto:` draft — no
backend, no secrets).

### Zero-cost fallback — GitHub Pages
A workflow is included at `.github/workflows/deploy-pages.yml`.
1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`. The workflow runs `build:static` and publishes `./out`.
3. **Project sites** (`username.github.io/repo`) need a base path — the workflow
   sets `BASE_PATH=/<repo>` automatically. A **user site** or custom domain needs
   no base path (edit the workflow's `BASE_PATH` to empty).

---

## 4. Project structure

```
src/
  app/                 # routes (App Router)
    page.tsx           # home
    work/              # case-study index + [slug] detail pages
    prompt-lab/        # side-by-side prompt technique demos
    approach/          # method loop + workflow diagrams
    services/  capabilities/  about/  research/  contact/
    opengraph-image.tsx  sitemap.ts  robots.ts  not-found.tsx
  components/          # Nav, Footer, ThemeToggle, PromptBlock, EvalTable, …
  content/             # >>> EDIT CONTENT HERE (typed, no component edits needed)
    site.ts            # profile + all positioning copy  ← start here
    caseStudies.ts     # the case studies
    promptLab.ts       # prompt technique demos
    capabilities.ts  services.ts  process.ts  sources.ts
RESEARCH.md            # internal research synthesis (the 30 sources)
```

### To add a case study
Append an object to the `caseStudies` array in `src/content/caseStudies.ts`
(the type guides every field). Routes, the index card, sitemap, and the featured
grid update automatically.

---

## 5. Recommended overall strategy (evidence-based — see `RESEARCH.md`)

- **Hosting:** Custom Next.js site on **Vercel** (primary) → **GitHub** (proof) →
  **LinkedIn** (distribution) → optional **Contra** / **Hugging Face Space** (leads
  / live demo). Rationale in `RESEARCH.md §4`.
- **Domain:** buy a `yourname.com` (or `.dev` / `.ai`) — a custom domain is a
  cheap, outsized credibility signal. Set it in Vercel and in `site.url`.
- **GitHub:** create a **profile README** (a repo named exactly your username) with
  a one-line positioning statement + links to the site and top case studies. Then
  publish the case-study **artifacts** (prompts, eval sets) as real repos and set
  each `repoUrl` in `caseStudies.ts`. Inspectable code is the strongest proof you
  can offer. Never commit API keys or private/client prompts.
- **LinkedIn headline** (in `site.ts` → `positioning.linkedinHeadline`):
  > AI Workflow & Prompt Systems Designer — I turn messy problems into tested,
  > repeatable AI processes (prompt engineering · workflow design · evaluation)
  Use the **Featured** section to pin the site and 1–2 case studies.
- **Freelance profile** (Contra/Upwork): use `positioning.freelanceSummary`. Lead
  with outcomes ("tested, documented workflows") not "I write prompts."
- **Résumé:** use `positioning.resumeSummary` as the summary line.

## 6. Maintenance strategy
- Content lives in `src/content/*` — edit data, not components.
- Add one case study or Prompt Lab entry when you do genuinely new work; quality
  over quantity.
- Re-run `npm run build` before deploying; Vercel does this automatically on push.
- Revisit model-specific claims periodically (models change); keep claims about
  *strategy*, which ages well.

---

## 7. Major design decisions
1. **Demonstrate, not claim** — every capability is backed by a visible artifact.
2. **Evaluation as the spine** — the clearest differentiator from generic "prompt
   engineer" portfolios (strongest signal across the research).
3. **Reusable case-study format** — Problem → Approach → Prompt → Iteration →
   Evaluation → Result → Lessons, applied consistently so reasoning is comparable.
4. **Honesty by construction** — demonstrations and illustrative scores are labelled
   as such; no fabricated clients, metrics, or credentials.
5. **Restrained "consultant/researcher" aesthetic** — warm paper, ink text, one
   teal accent, monospaced "measured" labels; no neon, robots, or hype imagery.
6. **Content/presentation separation** — typed data files for easy maintenance.
7. **Host-portable** — works on Vercel and as a static export.

## 8. Research findings that shaped it
See `RESEARCH.md` for the full synthesis of all 30 sources (consensus, conflicts,
commercial bias, and the platform/positioning/evaluation decisions they drove),
including a transparent note on which sources were directly accessible in the build
environment vs. synthesized from established knowledge. A public, condensed version
is at `/research`.

---

## 9. What you still need to provide
- [ ] Your name, public contact email, and LinkedIn URL (`src/content/site.ts`).
- [ ] Your real background paragraph on the About page (`src/app/about/page.tsx`) —
      optional, but recommended; nothing there currently claims experience for you.
- [ ] A custom domain, then set `site.url`.
- [ ] (Strongly recommended) Publish case-study artifacts as GitHub repos and set
      each `repoUrl` to convert "demonstration" into inspectable proof.
- [ ] (Optional) A live interactive demo on Hugging Face Spaces, linked from a
      case study.
- [ ] Spot-check any source you intend to quote publicly against its live page.
