import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies } from "@/content/case-studies";
import { features } from "@/content/site";
import { caseStudyAggregate } from "@/content/stats";
import { testimonials } from "@/content/testimonials";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const description =
  "Engagements with the numbers attached: what the audit measured, what it found, what we built, and what changed against the baseline.";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  if (!features.caseStudies) notFound();

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "CollectionPage",
            name: "Case Studies",
            description,
            path: "/case-studies",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="The work"
        title="What the audit found, and what it was"
        accent="worth."
        standfirst="Every one of these includes the number the process cost before we touched it. A case study without a baseline is a feature list with a client's name on it."
        breadcrumbs={[{ label: "Case Studies", href: "/case-studies" }]}
      >
        <dl className="grid gap-px border-t border-line sm:grid-cols-3">
          {caseStudyAggregate.map((stat) => (
            <div key={stat.label} className="pt-8 sm:pr-8">
              <dd className="figure-num text-4xl text-pink-ink sm:text-5xl">
                {stat.value}
                {stat.unit ? (
                  <span className="ml-1 text-2xl sm:text-3xl">{stat.unit}</span>
                ) : null}
              </dd>
              <dt className="mt-4 text-ink-soft">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section size="sm">
        <Container>
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 70}>
              <article className="border-t border-line last:border-b">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group grid gap-6 py-10 lg:grid-cols-[1fr_1.4fr_auto] lg:items-baseline lg:gap-16 lg:py-16"
                >
                  <div>
                    <p className="eyebrow text-muted">{study.industry}</p>
                    <p className="mt-4 font-display text-xl text-ink">
                      {study.client}
                    </p>
                    <p className="mt-1 text-sm text-muted">{study.duration}</p>
                  </div>
                  <div>
                    <h2 className="display-md transition-colors group-hover:text-pink-ink">
                      {study.headline}
                    </h2>
                    <p className="mt-4 text-lg text-ink-soft">
                      {study.summary}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-pink-ink">
                    Read
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </Container>
      </Section>

      {features.testimonials ? (
        <Section tone="deep">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="In their words"
                title="What clients say when we are not"
                accent="in the room."
              />
            </Reveal>
            <div className="mt-16 grid gap-px sm:grid-cols-2 lg:mt-20">
              {testimonials.map((quote, i) => (
                <Reveal key={quote.name} delay={(i % 2) * 90}>
                  <figure className="flex h-full flex-col border-t border-line py-9 sm:even:pl-10 sm:odd:pr-10">
                    <blockquote className="flex-1 text-lg leading-[1.6] text-ink">
                      “{quote.quote}”
                    </blockquote>
                    <figcaption className="mt-7">
                      <p className="font-display text-ink">{quote.name}</p>
                      <p className="mt-1 text-sm text-muted">
                        {quote.title}, {quote.company}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Cta />
    </>
  );
}
