import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

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
 * It opens on a statement on the bare page, with the black hole's halo
 * already rising into the bottom of the first screen and nothing between
 * the two. Then the hole, close enough to fill the viewport, with the pain
 * points inside it; then the
 * camera pulling back until the hole is a dome on the bottom edge with the
 * six capability areas in orbit around it. The panel under that is what you
 * can actually buy — the offers, a row each. Then what it all connects to
 * and what we do to it, who this is for, how the engagement runs, why us,
 * the usual questions, and the one action every page funnels to.
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
      {/* How it runs                                                       */}
      {/* ---------------------------------------------------------------- */}
      {/* Five stages across, one line each. It was a sticky heading beside a
          stack of five, which said the same thing at four times the height
          and made the page's third column-of-paragraphs in a row. Laid out
          this way the sequence is the point, which is what the stage names
          are for; /process carries the detail, one click away. */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How it runs"
            title="Connect, normalize, automate, approve, improve"
            deck="Nothing is matched until the identifiers are governed, and nothing writes back to your ERP until a person has approved it."
          />

          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-x-6">
            {processSteps.map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={i * 60}
                className="flex flex-col border-t border-line-strong pt-5"
              >
                <span className="label-tech text-accent">{step.n}</span>
                <h3 className="mt-4 font-heading text-lg leading-snug font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                  {step.brief}
                </p>
                <p className="label-tech mt-5 text-muted">
                  {step.tag ? (
                    <span className="text-accent">{step.tag} · </span>
                  ) : null}
                  {step.duration}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={80} className="mt-14 flex justify-center lg:mt-16">
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
      {/* Why us                                                            */}
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
            title="Built for parts businesses"
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
        title="Where is the friction?"
        body="Fifteen minutes, no preparation needed. Tell us where the work backs up — part identification, RFQs, catalog data, export documents — and we'll tell you which workflow is worth measuring first, including when the answer is none of them."
        secondary={{ href: "/process", label: "See the process" }}
      />
    </>
  );
}
