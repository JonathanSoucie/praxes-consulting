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
  "Five offers, each scoped to one workflow with success measures agreed before it starts: part intelligence, RFQ-to-quote, catalog intelligence, export operations, and integration with managed operations once a pilot has proved itself.";

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
        title="One workflow. One product family. Measures agreed up front."
        deck="Every offer here is scoped small enough to prove or disprove on your own data, and every one names what it will be judged on before it starts. Nothing writes back to your ERP until your people have approved it."
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
                        <dd className="text-right font-sans text-sm font-semibold text-ink">
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
              title="Part data first. Everything else depends on it."
            />
            <Reveal delay={100}>
              <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  This is the one sequencing rule we do not bend, and it is
                  worth saying why rather than presenting it as a preference.
                </p>
                <p>
                  Quoting, catalog publishing and export checks are all the
                  same question asked in different places: which part is this,
                  and what is true about it? Automate the quote before the part
                  relationships are governed and you have built something that
                  produces confident wrong answers faster than a person could
                  produce careful right ones. The catalog publishes the same
                  error to every channel at once. The export documents disagree
                  in a way nobody catches until the shipment is held.
                </p>
                <p>
                  So the identifiers get resolved first, with the
                  non-interchangeable pairs recorded and the uncertain cases
                  routed to a person. After that, the other three are largely a
                  question of where the answer needs to appear.
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
