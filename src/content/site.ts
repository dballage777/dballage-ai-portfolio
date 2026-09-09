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
  // ---- IDENTITY ----------------------------------------------------------
  /**
   * You chose to stay anonymous for now, so this is a neutral working ALIAS,
   * not your real name. It appears in the nav, footer, and metadata.
   * Swap it for your real name or a handle you like whenever you're ready.
   */
  name: "Signal & Structure",
  /** Casual short form (currently unused in the UI; kept for convenience). */
  firstName: "the studio",

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

  // Any link left as "" is automatically hidden from the UI.
  // They start empty to keep the site anonymous — add them when you're ready.
  links: {
    /** Your GitHub profile. Left empty for anonymity (your repo is under a real handle). */
    github: "",
    /** Your LinkedIn profile URL. Left empty for anonymity. */
    linkedin: "",
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

    // The hero sub-headline. Kept as its own line so editing other copy can't
    // accidentally change it.
    heroSub:
      "Most people can get an answer out of an AI model. Fewer can turn a fuzzy problem into a structured workflow, engineer prompts that behave consistently on real inputs, and prove the result actually works. That gap is where I work.",

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
    "Projects are a mix of real, anonymized work and independent demonstrations — each is labeled. Evaluations are my own structured review (reproducible with the prompts shown), and any numeric scores are illustrative of that process — not third-party benchmarks or results from paid client work.",
} as const;

export type Site = typeof site;
