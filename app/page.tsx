import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { TimeEstimator } from "@/components/sections/time-estimator";
import { SectionHeading } from "@/components/section-heading";
import { StatsBlock } from "@/components/sections/stats-block";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FeaturedCaseStudy } from "@/components/sections/case-study-card";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { ServiceIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

import { getFeaturedCaseStudy } from "@/content/case-studies";
import { generalFaqs } from "@/content/faqs";
import { headlineStats } from "@/content/stats";
import { industries, services } from "@/content/services";
import { features, site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/** Organization schema — helps search engines resolve the firm as an entity. */
function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    sameAs: [site.social.linkedin],
    areaServed: industries.map((industry) => industry.name),
    knowsAbout: services.map((service) => service.title),
  };

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const problems = [
  {
    n: "01",
    title: "Queues nobody is watching",
    body: "The cost is not the task. It is the hours or days a file spends waiting for someone to become free. That delay appears on no timesheet and in no budget line.",
  },
  {
    n: "02",
    title: "Capable people doing mechanical work",
    body: "Retyping, chasing, reconciling, reformatting. Several hours weekly, absorbed by staff hired for judgement. The alternative has never been costed against it.",
  },
  {
    n: "03",
    title: "Decisions made on stale numbers",
    body: "By the time month-end reporting is assembled, the decisions it should have informed are already made. Operations run on last month's picture, creating a gap that is untreated.",
  },
];

const solution = [
  {
    n: "01",
    title: "Find the bottleneck",
    body: "We measure the process rather than take the brief at face value. The constraint is frequently not where the team believes it to be, and the discrepancy is where the return sits.",
  },
  {
    n: "02",
    title: "Implement the fix",
    body: "We build against the audit scope, integrate into the systems you already run, and validate it on your real historical data before it touches live work.",
  },
  {
    n: "03",
    title: "Prove the return",
    body: "We re-measure against the baseline at 30 and 90 days, using the same definitions, and give you the comparison in writing — flattering or not.",
  },
];

const differentiators = [
  {
    title: "Honest ROI, including when it's negative",
    body: "Roughly one audit in three concludes that building isn't worth it. You get that answer in writing with the model behind it, because an accurate answer is the product.",
  },
  {
    title: "De-risked in stages",
    body: "Two free conversations, then a fixed-fee audit you keep whatever you decide, then a fixed-scope build. Your exposure only grows once the case is proven.",
  },
  {
    title: "You stay in control",
    body: "You own the models, the documentation and the admin access. No proprietary black box and no licence you have to keep paying for — if you ever want to take it in-house, everything you need is already yours.",
  },
  {
    title: "No vendor incentives",
    body: "We hold no reseller agreements and take no platform commissions. What we recommend is shaped by your process, not by someone else's margin.",
  },
];

export default function HomePage() {
  const featured = getFeaturedCaseStudy();

  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <TrustBar />

      {/* ---------------------------------------------------------------- */}
      {/* The problem                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="Most businesses don't have an AI problem. They have a bottleneck nobody has priced."
            deck="The constraint is usually mundane, absent from the reporting, and expensive. It is rarely the thing people complain about."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {problems.map((problem, i) => (
              <Reveal
                key={problem.title}
                delay={i * 60}
                className="hover-lift rounded-xl bg-surface-2 p-8"
              >
                <p className="figure-num text-sm text-accent">
                  {problem.n} <span className="text-line-strong">—</span>
                </p>
                <h3 className="mt-3 text-lg">{problem.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {problem.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mx-auto mt-10 max-w-2xl">
            <TimeEstimator />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The solution                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="The approach"
            title={
              <>
                Find the bottleneck. Implement the fix.{" "}
                <span className="text-gradient animate-gradient-shift">
                  Prove the return.
                </span>
              </>
            }
            deck="Three steps, in that order. The third one is the part most firms skip, and it's the only one that tells you whether the first two worked."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {solution.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 70}
                className="card-raise hover-lift rounded-2xl bg-surface p-8"
              >
                <span className="grid size-10 place-items-center rounded-full bg-accent text-sm font-semibold text-white">
                  {item.n}
                </span>
                <h3 className="mt-6 text-xl sm:text-2xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Process overview                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="Five stages. Commitment increases only after the case is established."
          />

          <div className="mt-16">
            <ProcessTimeline variant="overview" />
          </div>

          <Reveal delay={80} className="mt-10 text-center">
            <Button asChild variant="soft">
              <Link href="/process">
                See the full process
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Services snapshot                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="What we build, once we know what's actually in the way."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 50}
                className="card-raise hover-lift rounded-xl bg-surface p-7"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft">
                  <ServiceIcon
                    name={service.icon}
                    className="size-5 text-accent"
                  />
                </span>
                <h3 className="mt-5 text-lg">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80} className="mt-10 text-center">
            <Button asChild variant="soft">
              <Link href="/services">
                All services
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Results                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Results"
            title="Measured, not projected."
            deck="Every figure below comes from a re-measurement against the baseline established during that client's audit — same metrics, same definitions, 90 days after go-live."
          />

          <div className="mt-16">
            <StatsBlock stats={headlineStats} tone="panel" columns={4} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured case study — hidden with the Case Studies section        */}
      {/* ---------------------------------------------------------------- */}
      {features.caseStudies && featured ? (
        <Section tone="wash">
          <Container>
            <SectionHeading
              eyebrow="Case study"
              title="When the bottleneck isn't where the client thought it was."
            />

            <Reveal className="mt-16">
              <FeaturedCaseStudy study={featured} />
            </Reveal>

            <Reveal delay={80} className="mt-10 text-center">
              <Button asChild variant="soft">
                <Link href="/case-studies">
                  All case studies
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials — hidden behind features.testimonials               */}
      {/* ---------------------------------------------------------------- */}
      {features.testimonials ? (
        <Section tone="wash">
          <Container>
            <SectionHeading eyebrow="Clients" title="In their words." />
            <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
              <TestimonialSlider testimonials={testimonials} />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Industries                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Where we work."
            deck="Mixed verticals, one common shape: an established business with a repetitive, high-volume process that has never been properly costed."
          />

          <dl className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal
                key={industry.name}
                delay={i * 40}
                className="card-raise hover-lift rounded-xl bg-surface p-7"
              >
                <dt className="font-display text-base font-semibold text-ink">
                  {industry.name}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {industry.note}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Praxes                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Why Praxes"
            title="We are trying to be the firm that tells you the truth about your numbers."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="hover-lift flex gap-5 rounded-xl bg-surface-2 p-8"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent">
                  <Check aria-hidden className="size-4 text-white" />
                </span>
                <div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="Questions"
            title="What people ask before booking."
          />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection secondary={{ href: "/process", label: "See the process" }} />
    </>
  );
}
