/**
 * Central site configuration.
 * Swap these values for the real ones — nothing else needs to change.
 */

export const site = {
  name: "Praxes",
  legalName: "Praxes Consulting",
  /** Used in <title> templates and the footer. */
  tagline: "AI that pays for itself — measured, not promised.",
  description:
    "Praxes is an AI consulting firm. We analyse your business, find the bottleneck that is actually costing you, implement AI to fix it, and prove the return in numbers.",
  /** Canonical origin, no trailing slash. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxes.consulting",
  email: "praxesconsulting.hr@gmail.com",
  phone: "+385 91 44 55 021",
  address: {
    locality: "Pula",
    region: "Istria",
    country: "Croatia",
  },
  /** Year the firm started — used in the footer copyright range. */
  founded: 2024,
  social: {
    linkedin: "https://www.linkedin.com/company/praxes-consulting",
  },
} as const;

/** Primary navigation. Order here is the order in the navbar and footer. */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

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
