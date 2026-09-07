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
  "The five subservices inside Channel Intelligence: the channel census, displacement mapping, whitespace mapping, change monitoring, and distributor qualification — one crawl of your distributor network, read five ways, every finding linked to a live listing.";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description,
  path: "/services",
});

/**
 * The services index: the five subservices of Channel Intelligence, in the
 * order they are bought, each with its commercial shape beside it and a link
 * into its own page.
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
        eyebrow="Inside Channel Intelligence"
        title="One crawl of your channel, read five ways."
        deck="These are not five products. They are five questions asked of the same harvested data — who carries you, who carries your rivals, what nobody serves at all, what changed, and whether a prospect is worth signing. Every answer links to the listing it came from."
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
              eyebrow="How it is packaged"
              title="Census first. Then the map. Then the monitor."
            />
            <Reveal delay={100}>
              <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  The pilot is a channel census over up to 25 distributor
                  domains, delivered in three to five business days. It exists
                  because nobody — including us — knows what a displacement map
                  across your network would cover until the domains have been
                  checked. It either de-risks the project behind it or tells
                  you not to buy one.
                </p>
                <p>
                  The project is displacement and whitespace mapping together,
                  over up to 10 distributors, in 10 to 15 business days. Both
                  come off one crawl, which is why they are bundled — the
                  harvest is the work, and asking it a second question adds
                  almost none.
                </p>
                <p>
                  The retainer is change monitoring over 30 to 60 domains on an
                  annual commitment: monthly change reports, a quarterly
                  displacement and whitespace refresh, up to 500 manufacturer
                  resolutions a month, sales-call briefs and distributor
                  scorecards. A census is a project; knowing what moved is a
                  standing reason to be in the account.
                </p>
                <p>
                  Above that is enterprise: 100+ domains across multiple
                  countries and languages, custom taxonomies and competitor
                  universes, CRM or BI integration, dedicated analyst support
                  and a cross-reference database of your own. Every tier is the
                  same four layers. What changes is how much of your channel
                  they are pointed at, and that is what an engagement is quoted
                  against — after the scoping call, never from a page.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection secondary={{ href: "/process", label: "See how it runs" }} />
    </>
  );
}
