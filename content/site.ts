/**
 * Central site configuration.
 *
 * The site sells one thing: Channel Intelligence — crawling a manufacturer's
 * distributor network, extracting the catalogs those distributors publish,
 * and turning that into evidence-backed commercial intelligence. Everything
 * else on the site (census, displacement, whitespace, monitoring,
 * qualification, interchange) is a layer or a subservice inside it, not a
 * separate offer.
 *
 * All of the page copy derives from the Channel Intelligence copy deck.
 */

export const site = {
  name: "Praxes",
  legalName: "Praxes Consulting",
  /** Used in the <title>, OG tags and the OG card. Keep it in step with the
      Home page hero copy in content/manufacturing.ts. */
  tagline: "Channel intelligence for manufacturers selling through distributors",
  description:
    "Praxes crawls your distributor network, extracts the catalogs those distributors publish, and turns them into commercial intelligence: who carries your products, which competitor brands they stock instead, which categories nobody supplies, and what changed since last month. Every finding links to the live listing it came from.",
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

/**
 * Primary navigation. Order here is the order in the navbar and footer.
 *
 * The navbar splits this list in half around the brand mark, so the order is
 * also the left-to-right order across it: the first half sits left of the
 * mark, the rest to its right.
 *
 * Services is a route: the index at /services and one page per subservice in
 * content/services.ts. The layers in the black-hole scene on Home are what
 * those subservices are assembled from.
 */
export const nav = [
  { href: "/process", label: "Process" },
  { href: "/services", label: "Services" },
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

/**
 * The one action every page funnels to.
 *
 * `label` is what fits in the navbar and on a card; `longLabel` is the copy
 * deck's own wording, used where there is room for it. They name the same
 * meeting — the deck's primary CTA is "Schedule a Discovery Call", which is
 * 25 characters and does not fit the bar without shrinking the type
 * everything else in it is set at.
 */
export const primaryCta = {
  label: "Book a Call",
  longLabel: "Schedule a Discovery Call",
  /** Shown under CTAs as a risk-reducer. */
  note: "Free · 30 minutes · no obligation",
} as const;
