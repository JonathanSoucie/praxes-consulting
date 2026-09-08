import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { Hero } from "@/components/sections/hero";
import { BlackHoleScene } from "@/components/sections/black-hole-scene";
import { ServicesPanel } from "@/components/sections/services-panel";
import { IntegrationsBand } from "@/components/sections/integrations-band";
import { IndustriesBand } from "@/components/sections/industries-band";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
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
 * actually buy — the five subservices, a row each. Then the platforms we
 * read and how we read them, who this is for, the usual questions,
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

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section className="border-t border-white/20">
        <Container>
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <Reveal delay={80} className="mx-auto mt-10 max-w-3xl sm:mt-16">
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Which distributors carry you?"
        body="Thirty minutes, no preparation needed. Tell us roughly how many distributors you sell through, which categories you are contesting, and which competitors you worry about — and we'll tell you whether a census is worth running, including when the answer is no."
        secondary={{ href: "/services", label: "Explore our services" }}
      />
    </>
  );
}
