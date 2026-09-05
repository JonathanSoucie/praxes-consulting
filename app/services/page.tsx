import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { CtaSection } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/services";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Three services, in sequence: an Automations Audit that measures and prices the repetitive work on the floor, then operations automations, then marketing automations. You buy the first one.";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description,
  path: "/services",
});

/**
 * The services index: three offerings, in the order they are bought, each
 * with its commercial shape beside it and a link into its own page.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "CollectionPage",
            name: "Services",
            description,
            path: "/services",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="What we offer"
        title="You buy the measurement. The build is what it recommends."
        deck="Most firms in this category sell you a build and give the assessment away. We do it the other way round, and it changes what the assessment is allowed to conclude."
      />

      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <article className="grid gap-8 border-t border-line-strong py-12 last:border-b lg:grid-cols-[auto_1fr] lg:gap-16 lg:py-20">
                <span className="figure-num text-4xl text-accent lg:text-5xl">
                  0{i + 1}
                </span>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                      {service.standfirst}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-accent uppercase underline-offset-4 hover:underline"
                    >
                      How it works
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                  <dl className="grid self-start">
                    {service.shape.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 first:border-t"
                      >
                        <dt className="text-sm text-muted">{item.label}</dt>
                        <dd className="text-right font-heading text-sm font-semibold text-ink">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <SectionHeading
              align="left"
              eyebrow="Why this order"
              title="Operations first. Marketing second."
            />
            <Reveal delay={100}>
              <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  This is the one sequencing rule we do not bend, and it is
                  worth saying why rather than presenting it as a preference.
                </p>
                <p>
                  Marketing automation manufactures demand. Demand lands on the
                  floor, and if the floor is still spending its week on quoting
                  by hand, re-juggling the schedule and retyping paperwork, the
                  new volume goes into the same queue everything else is stuck
                  in. You have then paid to make your lead times worse, which
                  shows up as a reputation problem about six weeks later.
                </p>
                <p>
                  Free the week first. Then fill it deliberately. A plant that
                  has taken its hours back from the black hole can absorb what
                  marketing automation produces — one that has not, cannot, and
                  no amount of pipeline fixes that.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection secondary={{ href: "/process", label: "See the process" }} />
    </>
  );
}
