/**
 * Central site configuration.
 * Swap these values for the real ones — nothing else needs to change.
 */

import { positioning } from "./positioning";

export const site = {
  name: "Praxes",
  legalName: "Praxes Consulting",
  /** Used in <title> templates and the footer. Kept in step with the home
      page headline in components/sections/hero.tsx. */
  tagline: positioning.position,
  description:
    "Praxes finds the repetitive work eating your week, prices it at your own labour cost, and automates it. Operations first, marketing second. A third of our audits recommend not building at all.",
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
 * ⚠️ Both of these are ON so the redesigned pages render, and both are
 * currently backed by INVENTED content — see the warnings at the top of
 * content/case-studies/*.ts and content/testimonials.ts. Every client name,
 * quote and figure in them is a placeholder written so the pages could be
 * designed against realistic material.
 *
 * Before the site goes live, either replace that content with real,
 * attributable material (with written permission for the quotes) or set
 * these back to false, which removes in one step: the navbar and footer
 * links, /case-studies and its detail pages, the featured study on Home and
 * the service pages, the quote band, and the sitemap entries.
 *
 * Publishing them as-is would be presenting fabricated endorsements and
 * results as genuine.
 */
export const features = {
  caseStudies: true,
  testimonials: true,
} as const;

/** Primary navigation. Order here is the order in the navbar and footer. */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  ...(features.caseStudies
    ? [{ href: "/case-studies", label: "Case Studies" }]
    : []),
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as { href: string; label: string }[];

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
] as const;

/** The one action every page funnels to. */
export const primaryCta = {
  label: "Book a call",
  longLabel: "Book your free 15-minute call",
  /** Shown under CTAs as a risk-reducer. */
  note: "Free · 15 minutes · no obligation",
} as const;
