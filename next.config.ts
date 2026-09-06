import type { NextConfig } from "next";

/**
 * The site is authored to be fully static so it can be hosted on Vercel
 * (recommended) OR exported to plain HTML for GitHub Pages / any static host.
 *
 * - For Vercel / Node hosting: `npm run build` works as-is.
 * - For a static export (GitHub Pages, Netlify static, S3, etc.):
 *     set STATIC_EXPORT=true at build time -> `npm run build:static`
 *   If deploying to a GitHub Pages *project* site (username.github.io/repo),
 *   also set BASE_PATH=/repo so asset URLs resolve correctly.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  basePath: basePath || undefined,
  trailingSlash: isStaticExport,
  images: {
    // Static export cannot use the Next image optimizer.
    unoptimized: isStaticExport,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
