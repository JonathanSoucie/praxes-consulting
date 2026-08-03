import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Minus } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
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
import { site } from "@/content/site";
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
    title: "Work queues where nobody is watching",
    body: "The expensive delay is rarely the task itself — it's the days a file sits waiting for someone to be free. It doesn't show up in anyone's timesheet, so it never gets costed.",
  },
  {
    title: "Capable people doing mechanical work",
    body: "Retyping, chasing, reconciling, reformatting. Hours of it a week, done by the people you hired for judgement, because no one has ever priced the alternative.",
  },
  {
    title: "Decisions made on stale numbers",
    body: "By the time month-end reporting is assembled, the decisions it should have informed are already made. You are steering on last month's picture.",
  },
  {
    title: "AI bought, then quietly abandoned",
    body: "A tool gets purchased on a demo, half-adopted, and dropped within a quarter because nothing connected it to the actual workflow and nobody owned it.",
  },
];

const solution = [
  {
    n: "01",
    title: "Find the bottleneck",
    body: "We measure the process rather than take the brief at face value. The constraint is usually not where the team thinks it is — and that difference is where the money is.",
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
    body: "You own the models, the documentation and the admin access. No proprietary black box, no mandatory retainer, and no licence you have to keep paying us for.",
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
      <Section>
        <Container>
          <SectionHeading
            eyebrow="S.01 — The problem"
            title="Most businesses don't have an AI problem. They have a bottleneck nobody has priced."
            deck="The constraint is usually mundane, invisible in the reporting, and expensive. It rarely looks like the thing everyone complains about."
          />

          <div className="mt-14 grid gap-px border-t border-line bg-line sm:grid-cols-2">
            {problems.map((problem, i) => (
              <Reveal
                key={problem.title}
                delay={i * 60}
                className="bg-surface p-8 lg:p-10"
              >
                <Minus aria-hidden className="size-4 text-line-strong" />
                <h3 className="mt-5 text-lg">{problem.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {problem.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The solution                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.02 — The approach"
            title="Find the bottleneck. Implement the fix. Prove the return."
            deck="Three steps, in that order. The third one is the part most firms skip, and it's the only one that tells you whether the first two worked."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-10">
            {solution.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 70}
                className="border-t-2 border-accent pt-7"
              >
                <span className="figure-num text-sm text-accent">{item.n}</span>
                <h3 className="mt-4 text-xl sm:text-2xl">{item.title}</h3>
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
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="S.03 — Process"
              title="Five steps, and your risk only grows once the case is proven."
              className="max-w-2xl"
            />
            <Reveal delay={80}>
              <Button asChild variant="outline">
                <Link href="/process">
                  Full process
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-14">
            <ProcessTimeline variant="overview" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Services snapshot                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="S.04 — Services"
              title="What we build, once we know what's actually in the way."
              className="max-w-2xl"
            />
            <Reveal delay={80}>
              <Button asChild variant="outline">
                <Link href="/services">
                  All services
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 50}
                className="bg-surface p-8"
              >
                <ServiceIcon name={service.icon} className="size-5 text-accent" />
                <h3 className="mt-5 text-lg">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.summary}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Results                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="S.05 — Results"
            title="Measured, not projected."
            deck="Every figure below comes from a re-measurement against the baseline established during that client's audit — same metrics, same definitions, 90 days after go-live."
          />

          <div className="mt-14">
            <StatsBlock stats={headlineStats} tone="panel" columns={4} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured case study                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.06 — Case study"
            title="When the bottleneck isn't where the client thought it was."
          />

          <Reveal className="mt-14">
            <FeaturedCaseStudy study={featured} />
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <Button asChild variant="outline">
              <Link href="/case-studies">
                All case studies
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="S.07 — Clients" title="In their words." />
            <Reveal delay={80}>
              <TestimonialSlider testimonials={testimonials} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Industries                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.08 — Industries"
            title="Where we work."
            deck="Mixed verticals, one common shape: an established business with a repetitive, high-volume process that has never been properly costed."
          />

          <dl className="mt-14 grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal
                key={industry.name}
                delay={i * 40}
                className="bg-surface-2 p-7"
              >
                <dt className="text-base text-ink">{industry.name}</dt>
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
      <Section>
        <Container>
          <SectionHeading
            eyebrow="S.09 — Why Praxes"
            title="We are trying to be the firm that tells you the truth about your numbers."
          />

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="bg-surface p-8 lg:p-10"
              >
                <Check aria-hidden className="size-4 text-accent" />
                <h3 className="mt-5 text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="S.10 — Questions"
              title="What people ask before booking."
            />
            <Reveal delay={80}>
              <FaqList items={generalFaqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection secondary={{ href: "/process", label: "See the process" }} />
    </>
  );
}
