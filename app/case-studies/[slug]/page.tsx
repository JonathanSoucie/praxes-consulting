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
import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/content/case-studies";
import { features } from "@/content/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return features.caseStudies
    ? caseStudies.map((study) => ({ slug: study.slug }))
    : [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return pageMetadata({
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  if (!features.caseStudies) notFound();

  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(study.slug);

  return (
    <>
      <JsonLd
        schema={[
          articleSchema({
            headline: `${study.client} — ${study.headline}`,
            description: study.summary,
            path: `/case-studies/${study.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: study.client, path: `/case-studies/${study.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={study.industry}
        title={study.headline}
        standfirst={study.summary}
        breadcrumbs={[
          { label: "Case Studies", href: "/case-studies" },
          { label: study.client, href: `/case-studies/${study.slug}` },
        ]}
      >
        <dl className="grid gap-px border-t border-line sm:grid-cols-3">
          <div className="pt-6 sm:pr-8">
            <dt className="eyebrow text-muted">Client</dt>
            <dd className="mt-3 font-display text-lg">{study.client}</dd>
          </div>
          <div className="pt-6 sm:pr-8">
            <dt className="eyebrow text-muted">Engagement</dt>
            <dd className="mt-3 font-display text-lg">{study.duration}</dd>
          </div>
          <div className="pt-6">
            <dt className="eyebrow text-muted">Headline result</dt>
            <dd className="mt-3 font-display text-lg text-pink-ink">
              {study.metric}
            </dd>
          </div>
        </dl>
      </PageHeader>

      <Section size="sm">
        <Container>
          <div className="grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:pt-20">
            <Reveal>
              <h2 className="display-md lg:sticky lg:top-32">The challenge</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="measure-wide space-y-6 text-lg text-ink-soft">
                {study.challenge.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What the audit found. On the black ground, because this is the
          section where the client's assumption turns out to be wrong. */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="The audit"
                title="What the measurement"
                accent="found."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="measure-wide space-y-6 text-lg text-ink-soft">
                {study.bottleneck.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The build"
              title="What we"
              accent="built."
            />
          </Reveal>
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {study.built.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <div className="h-full border-t border-line py-9 sm:even:pl-10 sm:odd:pr-10">
                  <h3 className="font-display text-xl text-pink-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-ink-soft">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="deep">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Measured at 90 days"
              title="Against the baseline the audit"
              accent="established."
              standfirst="Same metrics, same definitions, same method. This is the comparison we deliver whether or not it flatters us."
            />
          </Reveal>
          <dl className="mt-16 grid gap-px sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {study.results.map((stat) => (
              <div key={stat.label} className="border-t border-line pt-8 pr-8">
                <dd className="figure-num text-4xl text-pink-2 sm:text-5xl">
                  {stat.value}
                  {stat.unit ? (
                    <span className="ml-1 text-2xl sm:text-3xl">
                      {stat.unit}
                    </span>
                  ) : null}
                </dd>
                <dt className="mt-4 text-ink">{stat.label}</dt>
                {stat.note ? (
                  <p className="mt-2 text-sm text-muted">{stat.note}</p>
                ) : null}
              </div>
            ))}
          </dl>

          {study.quote ? (
            <Reveal>
              <figure className="mt-20 border-t border-line pt-14">
                <blockquote className="display-md max-w-[24ch] font-normal">
                  “{study.quote.text}”
                </blockquote>
                <figcaption className="mt-10">
                  <p className="font-display text-lg text-ink">
                    {study.quote.name}
                  </p>
                  <p className="mt-1 text-ink-soft">{study.quote.title}</p>
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      {related.length ? (
        <Section size="sm">
          <Container>
            <p className="eyebrow text-muted">More engagements</p>
            <div className="mt-8 grid gap-px sm:grid-cols-2">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="group border-t border-line py-9 sm:even:pl-10 sm:odd:pr-10"
                >
                  <p className="eyebrow text-muted">{other.industry}</p>
                  <h2 className="display-md mt-4 transition-colors group-hover:text-pink-ink">
                    {other.headline}
                  </h2>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm text-pink-ink">
                    {other.client}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Cta />
    </>
  );
}
