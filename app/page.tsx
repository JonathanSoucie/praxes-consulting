import type { Metadata } from "next";

import { Flight } from "@/components/flight/flight";
import { JsonLd } from "@/components/json-ld";
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
 * Home: the flight.
 *
 * Everything visible is rendered by one client component, because the whole
 * page is driven by a single scroll value and splitting that across server
 * boundaries would buy nothing. The metadata and the structured data stay
 * here, on the server, where they belong.
 *
 * The FAQ schema is gone with the FAQ list: FAQPage markup is only valid on a
 * page that actually shows those questions, and this one no longer does.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Flight />
    </>
  );
}
