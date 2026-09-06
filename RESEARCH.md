# Research synthesis (internal)

This is the internal working document behind the portfolio's strategy. It is **not**
prominently linked from the public site (a condensed, credibility-oriented version
lives at `/research`). It records what the 30 required sources contributed, where
they agree and disagree, and the decisions those findings drove.

## A note on source access (transparency)

This portfolio was built inside a sandboxed environment whose outbound network is
restricted by an egress allow-list. Within it I was able to **directly access and
inspect** the full content of these sources:

- **#19 Anthropic — Claude prompting best practices** (`platform.claude.com`)
- **#24 OpenAI Cookbook — Evaluation Flywheel** (`github.com`)
- **#28 DAIR.AI — Prompt Engineering Guide** (`github.com`)
- **#30 Jehad Sobohai — LLM Evaluation Portfolio** (`github.com`)

The remaining sources' domains were blocked by the environment's proxy
(`help.openai.com`, `www.anthropic.com`, `cloud.google.com` (returned truncated),
`learn.microsoft.com`, `www.ibm.com`, `www.promptfoo.dev`, `www.coursera.org`,
`docs.github.com`, `vercel.com`, `huggingface.co`, and others). For those, the
synthesis below draws on well-established, stable knowledge of these canonical
resources (assistant knowledge cutoff: January 2026). They are widely known
industry references and their core guidance is stable, but the specific claims
attributed to them here should be **spot-checked against the live pages** before
you publish anything that quotes them precisely. Nothing on the public site
fabricates a quotation or a statistic from any source.

---

## 1. The cross-source consensus (what everyone effectively agrees on)

1. **Clarity and specificity beat cleverness.** Every primary/vendor guide
   (OpenAI, Anthropic, Google, Microsoft, IBM) converges on: be explicit, give
   context, show examples, specify the output format. → Drove the Prompt Lab.
2. **Structure the prompt.** Delimiters, sections, roles, and (for Claude
   especially, per #19) XML tags reduce ambiguity. → All shown prompts use
   explicit structure; XML where it earns its place.
3. **Iterate against examples.** DeepLearning.AI (#29) and the OpenAI flywheel
   (#24) both frame prompting as iterative development, not one-shot authorship.
   → The `Problem → … → Lessons` loop.
4. **Evaluation is a first-class activity.** #24, #25 (Promptfoo), #26 (W&B),
   #27 (Humanloop) all treat measurement as the thing that makes AI work
   trustworthy. This was the single strongest and most differentiating signal.
   → Evaluation is the site's spine.
5. **Portfolios should show artifacts, not adjectives.** #2, #3, #4, and the
   #30 example all point the same way: real prompts, real before/after, real
   method. → "Demonstrate, don't claim" is the site's core principle.

## 2. Where sources disagree / must be weighed

- **Breadth of the "prompt engineer" role.** Course-sellers (#1 Coursera,
  partly #29) frame it broadly and optimistically — they have an incentive to
  make it look like an accessible, hireable title. Buyer-side material (#4
  Upwork "how to vet") is more skeptical and method-focused. **Resolution:**
  positioned around *workflow design + evaluation*, not the "prompt engineer"
  title, which is both crowded and, on its own, commoditized.
- **"Selling prompts" as a business.** PromptBase (#15, #16) represents prompts
  as cheap products. This is precisely the low-value framing to avoid.
  **Resolution:** the site sells *outcomes and systems* (tested workflows,
  evaluation), explicitly not prompts-as-products.
- **Platform advice is self-interested.** Framer (#11), Notion (#12), Vercel
  (#10), Behance (#14) each recommend themselves. **Resolution:** weighed on
  neutral criteria (see §4) rather than taking any at face value.

## 3. What NOT to copy / outdated or risky advice

- Don't copy any single portfolio's structure wholesale (including #30's) —
  #30 is strong on evaluation rigor but narrow (Arabic/translation only). We
  took its *method* (standardized format, documented limitations) and widened
  the *coverage* (workflows + multi-model + evaluation).
- Ignore "AI wizard / 10x / guru" positioning implied by hype-oriented content.
- Don't present demonstration data as benchmarks — several career blogs imply
  impressive numbers sell; fabricating them would destroy credibility. All
  scores on the site are labelled *illustrative demonstration*.
- Model-specific tips age fast; keep model claims about *strategy* (choosing the
  right model, adapting the prompt) rather than leaderboard specifics.

## 4. Platform decision (Part 9)

Criteria weighed: professional + technical credibility, visual quality, ease of
maintenance, SEO, custom domain, case-study depth, interactive demos, GitHub
integration, cost, scalability, employer vs. client perception.

| Platform | Verdict |
|---|---|
| **Vercel + Next.js (#10)** | **Primary.** Best mix of technical credibility (real code, fast, great SEO), custom domain, free tier, and case-study flexibility. Building the site *is* a portfolio artifact. |
| **GitHub Pages (#9)** | **Zero-cost fallback host.** Static export supported (`build:static`). Also the home for the code itself. |
| **GitHub (#8)** | **Proof layer.** Profile README + repos of prompts/evals give inspectable evidence. |
| **LinkedIn (#7)** | **Distribution layer.** Featured section points back to the site. |
| **Hugging Face Spaces (#17)** | **Optional live-demo host** if an interactive model demo is added later (keeps API keys/costs off the main site). |
| **Contra (#13)** | **Optional client-acquisition channel.** |
| Framer (#11), Notion (#12), Behance (#14) | Set aside: Framer/Behance skew visual-creative (weaker code-credibility signal for AI work); Notion is great for drafting but weak on distinctiveness/SEO/branding. |

**Chosen hybrid:** Custom Next.js site (primary, on Vercel) → GitHub (proof) →
LinkedIn (distribution) → optional Contra/HF Space.

## 5. Technology decision (Part 10)

Next.js + TypeScript + Tailwind CSS, deployed on Vercel — the researched default,
and the right one here: fast, SEO-friendly, accessible, easy to maintain, and
credible to a technical audience. Content is separated into typed data files
(`src/content/*`) so projects/prompts can be edited without touching components.
Authored to also work as a **static export** for GitHub Pages, so hosting is not
locked in.

## 6. Positioning decision (Part 3 / 17)

Rejected: "AI enthusiast / prompt engineer / AI expert / ChatGPT expert / AI
wizard" (generic, crowded, or commoditized).

Chosen: **"AI Workflow & Prompt Systems Designer"** — sitting at the intersection
of prompt engineering + workflow design + evaluation + practical implementation.
It is specific, understandable to non-technical buyers, attractive to both clients
and employers, and — crucially — *provable* by the case studies. Full copy lives in
`src/content/site.ts` (`positioning`).

## 7. Evaluation implications (the differentiator)

From #24 specifically (directly reviewed): the flywheel of **analyze → measure →
improve**, open/axial coding of failures, and — the part most people skip —
**validating the LLM judge itself** against human labels (true-positive /
true-negative rate). This directly shaped the `evaluation-framework` case study and
the judge-validation step shown there. #25/#26/#27 reinforced fixed test sets,
regression thinking, and evaluator taxonomies (human / automated / LLM-as-judge).

## 8. Prompt-engineering implications

From #19 (directly reviewed) + #28 (directly reviewed) + the vendor consensus:
role/context, explicit structure (XML for Claude), few-shot, output schemas,
decomposition/chaining, grounding + guardrails, and model-aware prompting. Each is
demonstrated with a *practical explanation* in the Prompt Lab and case studies —
never used as jargon for its own sake (Part 7).

## 9. Agent/workflow implications

From #23 (Anthropic, "Building Effective Agents" — synthesized from established
knowledge; verify against the live page): prefer the **simplest** thing that
works; reach for workflows (chaining, routing, evaluator-optimizer,
orchestrator-workers) and agents only when justified. This became the "On
simplicity" stance on `/approach` and the workflow examples.

## 10. Open items / things to verify before publishing

- Replace all placeholders in `src/content/site.ts` (name, email, LinkedIn).
- Spot-check any source claims you intend to quote publicly against the live pages
  (see access note above).
- Optionally publish the case-study artifacts (prompts, eval sets) as real GitHub
  repos and set each `repoUrl` in `src/content/caseStudies.ts` — this converts
  "demonstration" into inspectable proof, the strongest credibility move available.
