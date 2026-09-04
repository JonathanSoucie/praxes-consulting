import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { Container, Section } from "@/components/container";
import { SpacetimeHero } from "@/components/sections/spacetime-hero";
import { BlackHoleScene } from "@/components/sections/black-hole-scene";
import { DividerBand } from "@/components/sections/divider-band";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";

import { generalFaqs } from "@/content/faqs";
import { dividerLine, whyManufacturing } from "@/content/manufacturing";
import { processSteps } from "@/content/process";
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
 * The first three screens are one continuous picture: the wordmark over a
 * sheet of spacetime with the brand mark resting in its own well; then the
 * black hole, close enough to fill the screen, with the plant's pain points
 * inside it; then the camera pulling back until the hole is a dome on the
 * bottom edge with the solutions arranged in orbit around it. Everything
 * after that is the ordinary argument — how the engagement runs, why it
 * holds for a plant, the usual questions, and the one action every page
 * funnels to.
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

      <SpacetimeHero />
      <DividerBand>{dividerLine}</DividerBand>
      <BlackHoleScene />

      {/* ---------------------------------------------------------------- */}
      {/* How it runs                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="How it runs"
              title="Measured before, measured after"
              deck="No build starts until the number it has to beat is written down. Discovery is free, the audit is fixed-fee and yours to keep, and the build is fixed-scope against the baseline the audit set."
              className="lg:sticky lg:top-28 lg:self-start"
            />

            <ol className="grid gap-8">
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.n}
                  as="li"
                  delay={i * 70}
                  className="grid gap-x-6 border-t border-line-strong pt-6 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]"
                >
                  <span className="label-tech text-accent">{step.n}</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-ink sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      {step.summary}
                    </p>
                  </div>
                  <div className="label-tech mt-3 flex gap-3 text-muted sm:mt-1 sm:flex-col sm:items-end sm:gap-1.5">
                    {step.tag ? (
                      <span className="text-accent">{step.tag}</span>
                    ) : null}
                    <span>{step.duration}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={80} className="mt-12 lg:mt-16">
            <Button asChild variant="outline">
              <Link href="/process">
                The full process
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why it holds for a plant                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why Praxes"
            title="Return in your own numbers"
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {whyManufacturing.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="hover-lift flex gap-5 bg-surface p-8"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent">
                  <Check aria-hidden className="size-4 text-on-accent" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Questions" title="Common questions" />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="What is it costing the floor?"
        body="Fifteen minutes, no preparation needed. Tell us how the plant runs and we'll say whether there's a case worth measuring — including when there isn't."
        secondary={{ href: "/process", label: "See the process" }}
      />
    </>
  );
}
