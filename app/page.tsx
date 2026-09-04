import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Audience } from "@/components/home/audience";
import { Offer } from "@/components/home/offer";
import { Results } from "@/components/home/results";
import { QuoteBand } from "@/components/home/quote-band";
import { HowItWorks } from "@/components/home/how-it-works";
import { Systems } from "@/components/home/systems";
import { Cta } from "@/components/sections/cta";
import { site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { ogImage, pageMetadata, siteKeywords } from "@/lib/seo";

/* Home leads with the brand rather than taking the "— Praxes" suffix, so its
   titles are set absolutely instead of going through the shared helper. */
const homeTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.tagline,
    description: site.description,
    path: "",
    keywords: siteKeywords,
  }),
  title: { absolute: homeTitle },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_CA",
    title: homeTitle,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
    images: [ogImage],
  },
};

/**
 * Home.
 *
 * The page opens inside the hole and climbs out of it.
 *
 * It used to open white and drop into two black bands, so the reader fell in
 * twice and came back out twice. With the hero carrying a black hole that no
 * longer works — the object needs a dark ground, and a dark ground at the top
 * inverts everything under it. The inversion is the better structure anyway:
 * one descent, one ascent, and the climb is something the reader performs by
 * scrolling rather than something the copy asserts.
 *
 *   hero        — deep. the enemy is named in the first six words
 *   problem     — deep. the same enemy with its costs attached
 *   [spacetime] — deep. the costs as mass. arrives in a later step
 *   ————————————— the only hard ground change on the page —————————————
 *   offer       — light. the three things
 *   audience    — light. who this is and is not for
 *   how         — light. the commercial mechanics
 *   results     — light. the numbers are the payoff, so they belong here
 *                 rather than on the black where they used to sit
 *   quote       — light. a named person at a named company
 *   systems     — light. what it connects to and whose keys it runs on
 *   cta         — deep. closes back to dark, as every page does
 *
 * The opening bands are one continuous dark run with no seam between them:
 * no border, no background step, nothing that reads as a join. They are
 * separate components for editing, one surface for reading.
 *
 * The home page is still an index — every band states its point in as few
 * words as it can and hands off to the page that argues it. The audience band
 * is the exception and has no way out; there is no page that says more about
 * who this is for than its three lines do.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <Problem />
      <Offer />
      <Audience />
      <HowItWorks />
      <Results />
      <QuoteBand />
      <Systems />
      <Cta />
    </>
  );
}
