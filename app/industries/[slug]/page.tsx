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
import { getSegment, segments } from "@/content/segments";
import { services } from "@/content/services";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return segments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) return {};

  return pageMetadata({
    // The segment's own headline is the title, not "AI for <industry>".
    // Every competitor's page is titled the second thing.
    title: `${segment.name} — ${segment.title}`,
    description: segment.standfirst,
    path: `/industries/${segment.slug}`,
  });
}

export default async function SegmentPage({ params }: Params) {
  const { slug } = await params;
  const segment = getSegment(slug);
  if (!segment) notFound();

  const others = segments.filter((s) => s.slug !== segment.slug);

  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "WebPage",
            name: `${segment.name} — ${segment.title}`,
            description: segment.standfirst,
            path: `/industries/${segment.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: segment.name, path: `/industries/${segment.slug}` },
          ]),
        ]}
      />

      <PageHeader
        eyebrow={segment.who}
        title={segment.title}
        standfirst={segment.standfirst}
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: segment.name, href: `/industries/${segment.slug}` },
        ]}
      />

      <Section tone="deep">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="The problem"
                  title={segment.blackHole.title}
                />
                <p className="measure mt-8 text-lg text-ink-soft">
                  {segment.blackHole.body}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="eyebrow text-muted">What it costs</p>
                <ul className="mt-8">
                  {segment.symptoms.map((symptom) => (
                    <li
                      key={symptom.line}
                      className="flex flex-col gap-2 border-b border-line py-6 first:border-t sm:flex-row sm:items-baseline sm:gap-8"
                    >
                      <span className="flex-1 text-lg leading-snug text-ink">
                        {symptom.line}
                      </span>
                      <span className="shrink-0 font-display text-sm text-pink-ink sm:w-56 sm:text-right">
                        {symptom.cost}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-muted">
                  Typical findings in this vertical, not a projection for your
                  business. Your number comes out of the audit.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we build here"
              title="Usually in"
              accent="this order."
              standfirst="Which of these comes first is decided by your audit, not by this page. But across engagements in this vertical, this is how the ranking tends to come out."
            />
          </Reveal>

          <div className="mt-16 lg:mt-20">
            {segment.builds.map((build, i) => (
              <Reveal key={build.title} delay={i * 80}>
                <div className="grid gap-5 border-t border-line py-10 last:border-b lg:grid-cols-[auto_1fr_1.4fr] lg:gap-14 lg:py-14">
                  <span className="figure-num text-2xl text-pink-2 lg:text-3xl">
                    0{i + 1}
                  </span>
                  <h3 className="display-md">{build.title}</h3>
                  <p className="text-lg text-ink-soft">{build.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <dl className="mt-20 grid gap-px border-t border-line sm:grid-cols-3">
              {segment.proof.map((item) => (
                <div key={item.label} className="pt-8 sm:pr-8">
                  <dd className="figure-num text-4xl text-pink-ink sm:text-5xl">
                    {item.value}
                  </dd>
                  <dt className="mt-4 text-ink">{item.label}</dt>
                  {item.note ? (
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* The objection. One question, named plainly, answered without
          softening it — this is the sentence the reader has been holding
          since the headline, and burying it in a general FAQ answers it for
          nobody in particular. */}
      <Section tone="deep" size="sm">
        <Container>
          <Reveal>
            <div className="border-t border-line pt-14 lg:pt-20">
              <p className="eyebrow text-muted">The objection</p>
              <h2 className="display-md mt-6 max-w-[22ch] text-pink-ink">
                “{segment.objection.q}”
              </h2>
              <p className="measure-wide mt-8 text-lg text-ink-soft">
                {segment.objection.a}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <p className="eyebrow text-muted">Start here</p>
                <ul className="mt-8">
                  {services.map((service) => (
                    <li key={service.slug} className="border-b border-line first:border-t">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex items-baseline justify-between gap-6 py-5"
                      >
                        <span className="font-display text-xl transition-colors group-hover:text-pink-ink">
                          {service.name}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-pink-ink"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="eyebrow text-muted">Other industries</p>
                <ul className="mt-8 flex flex-wrap gap-3">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/industries/${other.slug}`}
                        className="inline-flex border border-line px-4 py-2.5 text-sm transition-colors hover:border-pink-3 hover:text-pink-ink"
                      >
                        {other.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Cta
        eyebrow="Next step"
        title={`What is it costing you?`}
        body="Fifteen minutes on how your operation actually runs. We will tell you whether there is a case worth measuring here — including when there isn't."
      />
    </>
  );
}
