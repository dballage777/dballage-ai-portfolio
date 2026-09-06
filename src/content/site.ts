/**
 * ============================================================================
 *  SITE CONFIGURATION  —  EDIT THIS FILE FIRST
 * ============================================================================
 *  This is the single source of truth for your personal details and the
 *  brand/positioning language across the whole site. Everything below marked
 *  with `TODO` is a placeholder you should replace with your real information.
 *
 *  Nothing here is fabricated on your behalf: names, contact details and links
 *  are left as clearly-marked placeholders so the site never misrepresents you.
 * ============================================================================
 */

export const site = {
  // ---- IDENTITY (replace the TODO placeholders) --------------------------
  /** TODO: your full name, e.g. "Jordan Rivera". Used in the hero, footer, metadata. */
  name: "Your Name",
  /** TODO: shorter form used in casual copy. */
  firstName: "Your",

  /**
   * Positioning role line. This is deliberately specific — it is NOT
   * "prompt engineer" or "AI expert". Edit to taste, but keep it concrete.
   */
  role: "AI Workflow & Prompt Systems Designer",

  /** One-line tagline (the hero sub-headline). */
  tagline:
    "I turn vague, messy problems into structured, tested AI workflows — and I can show you whether they actually work.",

  // ---- CONTACT & LINKS (replace the TODO placeholders) -------------------
  /**
   * TODO: the email you want prospective clients/employers to use.
   * Left blank on purpose — set your preferred public contact address.
   * (Your login email was intentionally NOT auto-published here.)
   */
  email: "you@example.com",

  links: {
    /** Known from this repository. Update if you use a different account. */
    github: "https://github.com/dballage777",
    /** TODO: your LinkedIn profile URL. */
    linkedin: "https://www.linkedin.com/in/your-handle",
    /** OPTIONAL: freelance profile (Contra, Upwork, etc.). Leave "" to hide. */
    contra: "",
    /** OPTIONAL: X/Twitter. Leave "" to hide. */
    twitter: "",
  },

  /** Where the site is (or will be) deployed. Used for canonical URLs, OG, sitemap. */
  url: "https://your-domain.example",

  location: "Remote · Available worldwide",

  // ---- POSITIONING LANGUAGE (Part 17) -----------------------------------
  // Reusable copy blocks. Kept here so tone stays consistent everywhere.
  positioning: {
    short:
      "I design AI workflows and prompt systems that turn complex tasks into repeatable, reliable, and evaluable processes.",

    long:
      "Most people can get an answer out of an AI model. Fewer can turn a fuzzy business problem into a structured AI workflow, engineer prompts that behave consistently across real-world inputs, and prove the result actually works. That gap — between a clever one-off prompt and a dependable system — is where I work. I analyze the problem, design the workflow, engineer and iterate the prompts against test cases, evaluate outputs against explicit criteria, and document the whole method so it can be trusted, handed off, and improved.",

    elevatorPitch:
      "I help teams and individuals use AI reliably. Instead of one-off prompts, I build tested AI workflows: I break the problem down, design the prompts and steps, run them against real cases, score the outputs against clear criteria, and document what works and what doesn't — so you end up with a process you can trust and repeat, not a lucky guess.",

    // Suggested copy for other platforms (see README for how to use these).
    linkedinHeadline:
      "AI Workflow & Prompt Systems Designer — I turn messy problems into tested, repeatable AI processes (prompt engineering · workflow design · evaluation)",

    resumeSummary:
      "AI workflow and prompt-systems designer focused on turning ambiguous problems into structured, tested, and evaluable AI processes. Skilled in prompt engineering, multi-model prompting strategy, AI workflow decomposition, and evaluation-driven iteration. Documents methodology and measures output quality against explicit criteria rather than relying on one-off prompts.",

    freelanceSummary:
      "I design and stress-test AI workflows. You bring a task that's currently ad-hoc, inconsistent, or done by hand; I return a documented prompt system or workflow with clear steps, evaluation criteria, before/after examples, and notes on where it breaks. Ideal for teams adopting AI who need it to be reliable, not just impressive in a demo.",
  },

  // ---- HONESTY BANNER ----------------------------------------------------
  /**
   * Shown subtly on case studies / evaluation pages. This is a *feature*:
   * transparency is a credibility signal, per the research.
   */
  demoDisclaimer:
    "The projects below are independent demonstrations built to show method and thinking. Evaluation scores shown are illustrative of the review process, not benchmarks from paid client work.",
} as const;

export type Site = typeof site;
