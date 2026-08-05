import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FeaturedCaseStudy } from "@/components/sections/case-study-card";
import { StatsBlock } from "@/components/sections/stats-block";
import { CtaSection } from "@/components/sections/cta";
import { ServiceIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

import { getFeaturedCaseStudy } from "@/content/case-studies";
import { headlineStats } from "@/content/stats";
import { services } from "@/content/services";
import { features } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "We start from your bottleneck, not from a product. Document intake, client communication, knowledge retrieval, reporting and workflow integration — each with a measured baseline and a proven return.",
  alternates: { canonical: "/services" },
};

/** The differentiator section — this gets the most weight on the page. */
const measurement = [
  {
    n: "01",
    title: "We establish a baseline before we build",
    body: "During the audit we measure the current process: cycle time, touch count, error and rework rate, cost per transaction. Written down, agreed with you, and dated. Without this there is nothing to compare against, and 'it feels faster' is not a result.",
  },
  {
    n: "02",
    title: "Our projections state their assumptions",
    body: "Every ROI model comes with the assumptions listed explicitly — volumes, rates, adoption, the lot — and three scenarios: conservative, expected, optimistic. We lead with conservative. You are welcome to argue with any of it, and clients regularly do.",
  },
  {
    n: "03",
    title: "We re-measure with the same definitions",
    body: "At 30 and 90 days post go-live we run the same measurement, the same way. Not a new metric that happens to look good — the identical one, so the comparison is real.",
  },
  {
    n: "04",
    title: "You get the result either way",
    body: "The 90-day comparison goes to you in writing whether it beats the forecast or misses it. If it misses, that report says so and explains why, and we work the gap. This is the whole reason to hire us rather than someone who sells builds.",
  },
];

export default function ServicesPage() {
  const featured = getFeaturedCaseStudy();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="We don't sell a product. We start from what's in your way."
        deck="Every engagement below begins the same way: measure the process, price the waste, then build only what the numbers justify. The service categories are what that build usually turns out to be."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Positioning                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="Positioning"
              title="Bottleneck first, tooling second."
            />
            <Reveal delay={60} className="max-w-2xl space-y-5">
              <p className="text-base leading-relaxed text-muted">
                Most AI engagements start from a capability — a chatbot, an
                agent, a document reader — and then look for somewhere in the
                business to put it. That is backwards, and it is why so much of
                what gets bought is quietly abandoned within a quarter.
              </p>
              <p className="text-base leading-relaxed text-muted">
                We start from the constraint. Which process, measured in hours
                and euros, is actually costing you the most? What would removing
                it be worth? Only once that has a number do we decide what to
                build — and sometimes the answer is that nothing should be
                built, which is a legitimate outcome of the work.
              </p>
              <p className="text-base leading-relaxed text-muted">
                The categories below are the shapes this usually takes. They are
                a description of past work, not a menu to choose from.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Service categories                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Problem, solution, typical return."
          />

          <div className="mt-16 space-y-5">
            {services.map((service, i) => (
              <Reveal
                as="article"
                key={service.slug}
                delay={i * 40}
                className="rounded-2xl bg-surface-2 p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-14">
                  <div>
                    <span className="grid size-11 place-items-center rounded-xl bg-accent-soft">
                      <ServiceIcon
                        name={service.icon}
                        className="size-5 text-accent"
                      />
                    </span>
                    <h3 className="mt-5 text-2xl">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>

                  <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-surface p-5">
                      <dt className="text-xs font-medium text-muted">
                        The problem
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-ink">
                        {service.problem}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-surface p-5">
                      <dt className="text-xs font-medium text-muted">
                        What we build
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-ink">
                        {service.solution}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-accent-soft p-5 sm:col-span-2 lg:col-span-1">
                      <dt className="text-xs font-medium text-accent-ink">
                        Typical return
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-ink">
                        {service.roi}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How we measure ROI — the differentiator                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="The differentiator"
            title="How we measure ROI, and why you can check us on it."
            deck="Anyone can put a return figure on a slide. The question worth asking a consultant is what that figure is measured against, and what happens when it misses. Here is our answer, in full."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {measurement.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 60}
                className="card-raise rounded-2xl bg-surface p-8 lg:p-9"
              >
                <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
                  {item.n}
                </span>
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="gradient-deep relative mt-10 overflow-hidden rounded-2xl p-8 lg:p-12">
              <div
                aria-hidden
                className="grid-rule-dark pointer-events-none absolute inset-0"
              />
              <div className="relative mx-auto max-w-3xl text-center">
                <h3 className="text-xl text-white sm:text-2xl">
                  What we don&apos;t do: guarantee a number before we&apos;ve
                  measured anything.
                </h3>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70">
                  A firm that promises a specific ROI on a first call is either
                  guessing or selling. We commit to something narrower and more
                  useful: the measurement will be honest, the assumptions will
                  be visible, and you will get the 90-day comparison whichever
                  way it goes. That commitment is in the engagement terms, not
                  just on this page.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Process teaser                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading eyebrow="Process" title="How an engagement runs." />

          <div className="mt-16">
            <ProcessTimeline variant="overview" />
          </div>

          <Reveal delay={80} className="mt-10 text-center">
            <Button asChild variant="soft">
              <Link href="/process">
                Full process
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Proof                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Proof" title="The numbers this produces." />

          <div className="mt-16">
            <StatsBlock stats={headlineStats} tone="panel" columns={4} />
          </div>

          {/* Featured study — hidden with the Case Studies section. */}
          {features.caseStudies && featured ? (
            <Reveal className="mt-10">
              <FeaturedCaseStudy study={featured} />
            </Reveal>
          ) : null}
        </Container>
      </Section>

      <CtaSection
        title="Which of these applies to you? Let's find out properly."
        body="Fifteen free minutes to work out whether there's a bottleneck here worth measuring — and which of the above, if any, would address it."
        secondary={{ href: "/process", label: "How an engagement runs" }}
      />
    </>
  );
}
