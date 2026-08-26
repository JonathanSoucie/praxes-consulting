import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import { VideoBand } from "@/components/home/video-band";
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
 * The home page is an index. Every band states its point in as few words as
 * it can and hands off to the page that argues it — the long version of the
 * problem is a post, of the audience a set of segment pages, of the results
 * the case studies. Nothing here should be the only place a thing is said.
 *
 * The order is the argument, and it is worth stating because it is easy to
 * rearrange into something worse:
 *
 *   hero        — the enemy is named in the first six words
 *   film        — the same thing, for people who would rather watch it
 *   problem     — the enemy, with stakes attached (the black ground)
 *   audience    — who this is and is not for, including a real exclusion
 *   offer       — the three things, numbered, because the order matters
 *   results     — numbers, one of which does not flatter us
 *   quote       — a named person at a named company
 *   how         — the commercial mechanics, before anyone has to ask
 *   systems     — what it connects to and whose keys it runs on
 *   cta         — one action
 *
 * The two black bands (problem, results) and the dark closers are what carry
 * the metaphor structurally: the page falls into the black hole twice and
 * comes back out into the white both times.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Hero />
      <VideoBand />
      <Problem />
      <Audience />
      <Offer />
      <Results />
      <QuoteBand />
      <HowItWorks />
      <Systems />
      <Cta />
    </>
  );
}
