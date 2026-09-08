import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { BlackHoleScene } from "@/components/sections/black-hole-scene";
import { ServicesPanel } from "@/components/sections/services-panel";
import { IntegrationsBand } from "@/components/sections/integrations-band";
import { IndustriesBand } from "@/components/sections/industries-band";
import { HomeClosing } from "@/components/sections/home-closing";
import { JsonLd } from "@/components/json-ld";

import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/schema";
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
    locale: "en_US",
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
 * It opens on a statement on the bare page, with the black hole's halo
 * already rising into the bottom of the first screen and nothing between
 * the two. Then the hole, close enough to fill the viewport, with the
 * questions nobody can answer inside it; then the camera pulling back until
 * the hole is a dome on the bottom edge with the six parts of Channel
 * Intelligence in orbit around it. The panel under that is what you can
 * actually buy — the five subservices, a row each. Then how we work,
 * who this is for, the usual questions,
 * and the one action every page funnels to.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={[
          organizationSchema(),
          websiteSchema(),
          // Valid because <FaqList> below renders these exact items.
          faqPageSchema(generalFaqs),
        ]}
      />

      <Hero />
      <BlackHoleScene />
      <ServicesPanel />
      <IntegrationsBand />
      <IndustriesBand />

      <HomeClosing />
    </>
  );
}
