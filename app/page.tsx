import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BlackHoleScene } from "@/components/sections/black-hole-scene";
import { HomeContinuation } from "@/components/sections/home-continuation";
import { JsonLd } from "@/components/json-ld";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { ogImage, pageMetadata, siteKeywords } from "@/lib/seo";
import "./home.css";

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

/** The opening scene leads into a complete editorial account of the offer. */
export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={[
          organizationSchema(),
          websiteSchema(),
          faqPageSchema(generalFaqs),
        ]}
      />
      <Hero />
      <BlackHoleScene />
      <HomeContinuation />
    </>
  );
}
