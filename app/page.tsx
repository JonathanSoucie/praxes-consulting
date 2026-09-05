import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { DitheredGalaxyHero } from "@/components/sections/dithered-galaxy-hero";
import { BlackHoleScene } from "@/components/sections/black-hole-scene";
import { SectionHeading } from "@/components/section-heading";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";

import { generalFaqs } from "@/content/faqs";
import { whyManufacturing } from "@/content/manufacturing";
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
 * The first three screens are one continuous picture: the wordmark on the
 * galaxy, with the black hole's crest already rising into the bottom of the
 * screen; then the hole, close enough to fill the viewport, with the plant's
 * pain points inside it; then the camera pulling back until the hole is a
 * dome on the bottom edge with the solutions arranged in orbit around it.
 * There is nothing between the hero and the scene — no band, no rule — so
 * the descent is one movement. Everything after that is the ordinary
 * argument: how the engagement runs, why it holds for a plant, the usual
 * questions, and the one action every page funnels to.
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

      <DitheredGalaxyHero />
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
      {/* The one section on the page with a ground of its own: the page
          colour at the top running into the logo's deep pink at the foot,
          with the four reasons as a row of cards over it. */}
      <Section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, var(--color-surface-2) 0%, var(--color-surface-2) 28%, #3a0f2a 68%, #8e0c48 100%)",
          }}
        />
        <Container>
          <SectionHeading
            align="left"
            eyebrow="Why Praxes"
            title="Return in your own numbers"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {whyManufacturing.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="flex h-full flex-col rounded-[18px] border border-line-strong bg-surface/90 p-7 backdrop-blur-sm"
              >
                <h3 className="font-heading text-lg leading-snug font-semibold text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <span className="figure-num text-3xl text-ink sm:text-4xl">
                    0{i + 1}
                  </span>
                  <Link
                    href="/process"
                    className="text-sm text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    See the process &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">See our services</Link>
            </Button>
          </Reveal>
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
