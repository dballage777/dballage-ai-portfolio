/**
 * The 30 researched sources, categorized by type and credibility, with the
 * single most useful thing each contributed to this portfolio's strategy.
 * Shown on /research as a transparency/credibility signal.
 *
 * `type` drives how much weight the source is given:
 *  - "Primary/Vendor": model makers' own guidance (high weight on technique)
 *  - "Academic/Community": open, peer-pressured knowledge (high on rigor)
 *  - "Tooling": evaluation platforms (high on eval practice, watch for sell)
 *  - "Marketplace/Commercial": watch for commercial incentive
 *  - "Practical/Career": portfolio & hiring advice (useful, often generic)
 *  - "Platform": hosting decisions
 */

export type SourceType =
  | "Primary/Vendor"
  | "Academic/Community"
  | "Tooling"
  | "Marketplace/Commercial"
  | "Practical/Career"
  | "Platform"
  | "Example";

export type Source = {
  n: number;
  title: string;
  org: string;
  url: string;
  type: SourceType;
  contribution: string;
};

export const sources: Source[] = [
  { n: 1, org: "Coursera", title: "How to Become a Prompt Engineer", url: "https://www.coursera.org/articles/how-to-become-a-prompt-engineer", type: "Practical/Career", contribution: "Baseline of the skills employers name; also a reminder that course-sellers frame the role broadly — treated as directional, not definitive." },
  { n: 2, org: "ObiTech Jobs", title: "Build a Prompt Engineering Portfolio That Gets You Hired", url: "https://www.obitechjobs.com/blog/prompt-engineering-portfolio", type: "Practical/Career", contribution: "Reinforced 'show, don't claim' — portfolios should contain real prompt artifacts and outcomes, not adjectives." },
  { n: 3, org: "PromptMake", title: "Prompt Engineering Portfolio Examples", url: "https://promptmake.net/blog/prompt-engineering-portfolio-examples", type: "Practical/Career", contribution: "Sampled common portfolio structures; confirmed most look alike, which motivated evaluation as the differentiator." },
  { n: 4, org: "Upwork", title: "How To Vet a Prompt Engineer", url: "https://www.upwork.com/resources/how-to-vet-prompt-engineers", type: "Marketplace/Commercial", contribution: "Buyer's-eye view: clients look for method, testing, and communication — shaped the case-study format and services." },
  { n: 5, org: "Upwork", title: "Prompt Engineering Jobs", url: "https://www.upwork.com/freelance-jobs/prompt-engineering/", type: "Marketplace/Commercial", contribution: "Real demand language; informed the freelance positioning and service naming." },
  { n: 6, org: "Indeed", title: "Prompt Engineer Jobs", url: "https://www.indeed.com/q-prompt-engineer-jobs.html", type: "Practical/Career", contribution: "Employer keywords and adjacent skills (eval, Python, workflow) that the capabilities section reflects." },
  { n: 7, org: "LinkedIn", title: "Featured Section / Work Samples", url: "https://www.linkedin.com/help/linkedin/answer/a550399/manage-featured-samples-of-your-work-on-your-linkedin-profile", type: "Platform", contribution: "Confirmed LinkedIn's role as a distribution layer that should point back to the site; drove the headline suggestion." },
  { n: 8, org: "GitHub", title: "Personal Profile Documentation", url: "https://docs.github.com/en/account-and-profile/concepts/personal-profile", type: "Platform", contribution: "Basis for the GitHub-as-proof strategy (profile README + real repos of prompts/evals)." },
  { n: 9, org: "GitHub Pages", title: "GitHub Pages Docs", url: "https://docs.github.com/en/pages", type: "Platform", contribution: "Free static hosting + custom domain option — kept as the zero-cost fallback host; drove static-export support." },
  { n: 10, org: "Vercel", title: "Portfolio Templates", url: "https://vercel.com/templates/portfolio", type: "Platform", contribution: "Confirmed Next.js + Vercel as the credible, fast default for a developer-facing portfolio (chosen primary host)." },
  { n: 11, org: "Framer", title: "Portfolio Website", url: "https://www.framer.com/solutions/portfolio-website/", type: "Platform", contribution: "Strong for visual designers; weaker for code credibility and case-study depth — considered and set aside." },
  { n: 12, org: "Notion", title: "Public Pages and Web Publishing", url: "https://www.notion.com/help/public-pages-and-web-publishing", type: "Platform", contribution: "Great for fast writing, weak on distinctiveness/SEO/branding — noted as a drafting tool, not the shopfront." },
  { n: 13, org: "Contra", title: "Freelancer Marketplace", url: "https://contra.com/discover", type: "Marketplace/Commercial", contribution: "Optional client-acquisition channel; informed the 'secondary/tertiary' hybrid strategy." },
  { n: 14, org: "Behance", title: "About / Creative Portfolio Platform", url: "https://www.behance.net/about", type: "Platform", contribution: "Creative-visual audience mismatch for technical AI work — considered and set aside." },
  { n: 15, org: "PromptBase", title: "Sell Your Prompts", url: "https://promptbase.com/sell", type: "Marketplace/Commercial", contribution: "Shows the commoditized end of 'selling prompts' — precisely the positioning to avoid; sharpened the anti-positioning." },
  { n: 16, org: "PromptBase", title: "Prompt Marketplace", url: "https://promptbase.com/marketplace", type: "Marketplace/Commercial", contribution: "Confirmed that 'prompts as products' is a race to the bottom; reinforced selling workflows & evaluation instead." },
  { n: 17, org: "Hugging Face", title: "Spaces Overview", url: "https://huggingface.co/docs/hub/main/spaces-overview", type: "Platform", contribution: "The right home for any live interactive demo (Gradio/Streamlit) linked from the site, rather than embedding heavy apps." },
  { n: 18, org: "OpenAI", title: "Prompt Engineering Guide", url: "https://help.openai.com/en/articles/6654000-comprehensive-step-by-step-guide-to-prompt-engineering-with-chatgpt", type: "Primary/Vendor", contribution: "Core techniques (clear instructions, delimiters, steps, examples) — foundational to the Prompt Lab entries." },
  { n: 19, org: "Anthropic", title: "Claude Prompting Best Practices", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", type: "Primary/Vendor", contribution: "Directly reviewed: XML structuring, examples, being explicit, and model-specific guidance — shaped the XML-tagged prompts shown throughout." },
  { n: 20, org: "Google Cloud", title: "Prompt Engineering Guide", url: "https://cloud.google.com/discover/what-is-prompt-engineering", type: "Primary/Vendor", contribution: "Vendor framing of prompt engineering as a production discipline; cross-checked technique consensus." },
  { n: 21, org: "Microsoft", title: "Prompt Engineering Techniques", url: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering", type: "Primary/Vendor", contribution: "System messages, grounding, and few-shot framing — reinforced grounding/guardrail patterns in the case studies." },
  { n: 22, org: "IBM", title: "Prompt Engineering Guide", url: "https://www.ibm.com/think/prompt-engineering", type: "Primary/Vendor", contribution: "Enterprise/business framing — informed the 'business application' section of each case study." },
  { n: 23, org: "Anthropic", title: "Building Effective Agents", url: "https://www.anthropic.com/engineering/building-effective-agents", type: "Primary/Vendor", contribution: "Workflow patterns (chaining, routing, evaluator-optimizer) and 'use the simplest thing that works' — backbone of the workflow section." },
  { n: 24, org: "OpenAI Cookbook", title: "Resilient Prompts via an Evaluation Flywheel", url: "https://github.com/openai/openai-cookbook/blob/main/examples/evaluation/Building_resilient_prompts_using_an_evaluation_flywheel.md", type: "Academic/Community", contribution: "Directly reviewed: analyze → measure → improve, open/axial coding, and validating the judge (TPR/TNR) — the spine of the evaluation case study." },
  { n: 25, org: "Promptfoo", title: "Evaluation Guides", url: "https://www.promptfoo.dev/docs/guides/", type: "Tooling", contribution: "Assertion-based testing, model comparison, and red-teaming as concrete eval practice; noted its commercial layer." },
  { n: 26, org: "Weights & Biases (Weave)", title: "Evaluations", url: "https://wandb.ai/site/evaluations/", type: "Tooling", contribution: "Tracking eval runs over time / regression thinking; reinforced fixed test sets and comparison." },
  { n: 27, org: "Humanloop", title: "Evaluators", url: "https://humanloop.com/docs/explanation/evaluators", type: "Tooling", contribution: "Human vs. automated vs. LLM-as-judge evaluator taxonomy — informed the judge-validation step." },
  { n: 28, org: "DAIR.AI", title: "Prompt Engineering Guide", url: "https://github.com/dair-ai/Prompt-Engineering-Guide", type: "Academic/Community", contribution: "Directly reviewed: broad, credible technique catalog (CoT, ReAct, RAG, adversarial) with research backing — sanity-checked terminology usage." },
  { n: 29, org: "DeepLearning.AI", title: "ChatGPT Prompt Engineering for Developers", url: "https://www.deeplearning.ai/courses/chatgpt-prompt-eng/", type: "Academic/Community", contribution: "Iterative-prompt-development mindset (start simple, refine against cases) — mirrored in the process model." },
  { n: 30, org: "Jehad Sobohai", title: "LLM Evaluation Portfolio", url: "https://github.com/jehadsobohai/LLM-Evaluation-Portfolio", type: "Example", contribution: "Directly reviewed: a real evaluation portfolio. Its standardized methodology + documented limitations validated the 'evaluation as differentiator' thesis; its narrowness motivated broader workflow coverage here." },
];

export const sourcesByType = (t: SourceType) => sources.filter((s) => s.type === t);
