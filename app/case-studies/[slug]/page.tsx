import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Quote } from "lucide-react";

import { Container, Section } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StatsBlock } from "@/components/sections/stats-block";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NeuralField } from "@/components/sections/neural-field";

import { JsonLd } from "@/components/json-ld";

import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/content/case-studies";
import { features } from "@/content/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * One static route per entry in the collection — none while the section is
 * hidden, so nothing gets prerendered or indexed. See content/site.ts.
 */
export function generateStaticParams() {
  if (!features.caseStudies) return [];
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study || !features.caseStudies) {
    return { title: "Case study not found", robots: { index: false } };
  }

  return pageMetadata({
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  if (!features.caseStudies) notFound();

  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const related = getRelatedCaseStudies(slug);

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

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative overflow-hidden bg-surface">
        <NeuralField className="pointer-events-none absolute inset-0" />

        <Container className="relative pt-32 pb-20 sm:pt-36 sm:pb-24">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All case studies
          </Link>

          <Reveal className="mt-10 max-w-4xl">
            <Eyebrow>
              {study.client} · {study.industry} · {study.duration}
            </Eyebrow>

            <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
              {study.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {study.summary}
            </p>
          </Reveal>
        </Container>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Challenge                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="The challenge"
              title="What they came to us with."
            />
            <Reveal delay={60} className="max-w-2xl space-y-5">
              {study.challenge.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The bottleneck we found                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="The bottleneck"
              title="What the audit found."
            />
            <Reveal delay={60} className="max-w-2xl space-y-5">
              {study.bottleneck.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What we built                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="What we built" title="The implementation." />

          <ol className="mt-16 grid gap-5 sm:grid-cols-2">
            {study.built.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 60}
                className="card-raise rounded-xl bg-surface p-8"
              >
                <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The ROI                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="The return"
            title="Measured against the audit baseline."
            deck="Same metrics, same definitions, re-measured 90 days after go-live."
          />

          <div className="mt-16">
            <StatsBlock stats={study.results} tone="panel" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Client quote                                                      */}
      {/* ---------------------------------------------------------------- */}
      {study.quote ? (
        <Section tone="card">
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Quote aria-hidden className="mx-auto size-8 text-accent/40" />
              <blockquote className="mt-7">
                <p className="font-display text-2xl leading-snug font-medium text-balance text-ink sm:text-3xl sm:leading-[1.36]">
                  {study.quote.text}
                </p>
                <footer className="mt-8">
                  <cite className="text-sm font-medium not-italic text-ink">
                    {study.quote.name}
                  </cite>
                  <p className="mt-1 text-sm text-muted">{study.quote.title}</p>
                </footer>
              </blockquote>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Related                                                           */}
      {/* ---------------------------------------------------------------- */}
      {related.length ? (
        <Section tone={study.quote ? "default" : "card"}>
          <Container>
            <SectionHeading eyebrow="Related" title="Other engagements." />
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <CaseStudyCard key={item.slug} study={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        title="What would your readout say?"
        body="The only way to know is to measure it. Start with fifteen free minutes and an honest read on whether there's a case here."
        secondary={{ href: "/case-studies", label: "More case studies" }}
      />
    </>
  );
}
