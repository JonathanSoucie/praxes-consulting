/**
 * Central site configuration.
 * Swap these values for the real ones — nothing else needs to change.
 */

export const site = {
  name: "Praxes",
  legalName: "Praxes Consulting",
  /** Used in <title> templates and the footer. */
  /** Used in the <title>, OG tags and the OG card. Keep it in step with the
      Home page headline in components/sections/hero.tsx. */
  tagline: "Identifying where AI automation creates measurable return",
  description:
    "Praxes is an AI consulting firm. We analyse your business, find the bottleneck that is actually costing you, implement AI to fix it, and prove the return in numbers.",
  /** Canonical origin, no trailing slash. Drives canonicals, the sitemap and
      OG URLs, so it must match the live domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxes.io",
  email: "praxesconsulting.hr@gmail.com",
  phone: "+1 343 997 6229",
  address: {
    locality: "Ottawa",
    region: "Ontario",
    country: "Canada",
  },
  /** Year the firm started — used in the footer copyright range. */
  founded: 2024,
  social: {
    linkedin: "https://www.linkedin.com/company/praxes-consulting",
  },
} as const;

/**
 * Feature flags.
 *
 * `caseStudies` is off until there are real, publishable engagements to show.
 * Flipping it to true restores, in one step: the navbar and footer links, the
 * /case-studies index and its detail pages, the featured-study blocks on Home
 * and Services, the "Read the study" links under testimonials, and the
 * sitemap entries. The content in content/case-studies/ is left untouched.
 *
 * `testimonials` is off until there are real, attributable quotes to publish.
 * Flipping it to true restores the "Clients — in their words" section on Home
 * and on the Case Studies index. The content in content/testimonials.ts is
 * left untouched.
 */
export const features = {
  caseStudies: false,
  testimonials: false,
} as const;

/** Primary navigation. Order here is the order in the navbar and footer. */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  ...(features.caseStudies
    ? [{ href: "/case-studies", label: "Case Studies" }]
    : []),
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as { href: string; label: string }[];

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

/** The one action every page funnels to. */
export const primaryCta = {
  label: "Book a Call",
  longLabel: "Book your free 15-minute call",
  /** Shown under CTAs as a risk-reducer. */
  note: "Free · 15 minutes · no obligation",
} as const;
