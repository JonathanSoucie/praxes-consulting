import type { Metadata, Viewport } from "next";

import { Homepage } from "@/components/home/homepage";
import { JsonLd } from "@/components/json-ld";

import { site } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { ogImage, pageMetadata, siteKeywords } from "@/lib/seo";

/* Home leads with the brand rather than taking the "— Praxes" suffix, so its
   titles are set absolutely instead of going through the shared helper. */
const homeTitle = `${site.name} — ${site.tagline}`;

export const viewport: Viewport = { themeColor: "#1a1c24" };

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

export default function HomePage() {
  return (
    <>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <Homepage />
    </>
  );
}
