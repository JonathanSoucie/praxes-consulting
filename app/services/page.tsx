import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/services";
import { positioning } from "@/content/positioning";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Three services, in sequence: an Automations Audit that measures and prices the repetitive work, then operations automations, then marketing automations. You buy the first one.";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description,
  path: "/services",
});

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
        title="You buy the measurement."
        accent="The build is what it recommends."
        standfirst="Most firms in this category sell you a build and give the assessment away. We do it the other way round, and it changes what the assessment is allowed to conclude."
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      <Section size="sm">
        <Container>
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <article className="grid gap-8 border-t border-line py-12 last:border-b lg:grid-cols-[auto_1fr] lg:gap-16 lg:py-20">
                <span className="figure-num text-4xl text-pink-2 lg:text-5xl">
                  0{i + 1}
                </span>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <h2 className="display-lg">{service.name}</h2>
                    <p className="mt-6 text-lg text-ink-soft">
                      {service.standfirst}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-8 inline-flex items-center gap-2 text-pink-ink"
                    >
                      How it works
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                  <dl className="grid gap-px self-start">
                    {service.shape.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 first:border-t"
                      >
                        <dt className="text-muted">{item.label}</dt>
                        <dd className="text-right font-display text-ink">
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

      <Section tone="deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="Why this order"
                title="Operations first. Marketing"
                accent="second."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-6 text-lg text-ink-soft">
                <p>
                  This is the one sequencing rule we do not bend, and it is
                  worth saying why rather than presenting it as a preference.
                </p>
                <p>
                  Marketing automation manufactures demand. Demand lands on
                  the operation, and if the operation is still spending its
                  week on {positioning.enemy.name}, the new volume goes into
                  the same queue everything else is stuck in. You have then
                  paid to make your response times worse, which shows up as a
                  reputation problem about six weeks later.
                </p>
                <p>
                  Free the week first. Then fill it deliberately. A business
                  that has crossed{" "}
                  <strong>{positioning.coinage.term}</strong> on its
                  operations work can absorb what marketing automation
                  produces — one that has not, cannot, and no amount of
                  pipeline fixes that.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
