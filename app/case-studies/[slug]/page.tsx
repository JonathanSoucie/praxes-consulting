import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Container, Section } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StatsBlock } from "@/components/sections/stats-block";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";

import {
  caseStudies,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/content/case-studies";

type PageProps = { params: Promise<{ slug: string }> };

/** One static route per entry in the collection. */
export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return { title: "Case study not found" };

  return {
    title: `${study.client} — ${study.headline}`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.client} — ${study.headline}`,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const related = getRelatedCaseStudies(slug);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-line bg-surface pt-10 pb-16 sm:pb-20">
        <Container>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All case studies
          </Link>

          <Reveal className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label-eyebrow text-accent">{study.client}</span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="label-eyebrow text-muted">
                {study.industry}
              </span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="label-eyebrow text-muted">
                {study.duration}
              </span>
            </div>

            <h1 className="mt-6 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
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
              eyebrow="S.01 — The challenge"
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
      <Section tone="muted">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              eyebrow="S.02 — The bottleneck"
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
          <SectionHeading
            eyebrow="S.03 — What we built"
            title="The implementation."
          />

          <ol className="mt-14 grid gap-px border-t border-line bg-line sm:grid-cols-2">
            {study.built.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 60}
                className="bg-surface p-8 lg:p-10"
              >
                <span className="figure-num text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg">{item.title}</h3>
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
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.04 — The return"
            title="Measured against the audit baseline."
            deck="Same metrics, same definitions, re-measured 90 days after go-live."
          />

          <div className="mt-14">
            <StatsBlock stats={study.results} tone="panel" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Client quote                                                      */}
      {/* ---------------------------------------------------------------- */}
      {study.quote ? (
        <Section>
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <blockquote>
                <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl sm:leading-[1.35]">
                  <span aria-hidden className="text-accent">
                    “
                  </span>
                  {study.quote.text}
                  <span aria-hidden className="text-accent">
                    ”
                  </span>
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
        <Section tone={study.quote ? "muted" : "default"}>
          <Container>
            <SectionHeading
              eyebrow="S.05 — Related"
              title="Other engagements."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
