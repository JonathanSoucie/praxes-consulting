import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";

import { Container, Section } from "@/components/container";
import { DitheredGalaxyHero } from "@/components/sections/dithered-galaxy-hero";
import { Outcomes } from "@/components/sections/outcomes";
import { TimeEstimator } from "@/components/sections/time-estimator";
import { SectionHeading } from "@/components/section-heading";
import { FeaturedCaseStudy } from "@/components/sections/case-study-card";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

import { JsonLd } from "@/components/json-ld";

import { getFeaturedCaseStudy } from "@/content/case-studies";
import { generalFaqs } from "@/content/faqs";
import { features, site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { faqPageSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { ogImage, pageMetadata, siteKeywords } from "@/lib/seo";

/* Home leads with the brand rather than taking the "— Praxes" suffix, so its
   titles are set absolutely instead of going through the shared helper. */
const homeTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.tagline,
    description: site.description,
    path: "",
    keywords: siteKeywords,
  }),
  title: { absolute: homeTitle },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    title: homeTitle,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
    images: [ogImage],
  },
};

const problems = [
  {
    n: "01",
    title: "Queues nobody is watching",
    body: "The cost is not the task. It is the hours or days a file spends waiting for someone to become free. Those hours cross an event horizon: they appear on no timesheet and in no budget line, and nothing comes back out.",
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

/* The other pole. The Blackhole section above is about hours leaving; this one
   is only about demand arriving — marketing, pipeline and the numbers behind
   both. Nothing here is a time saving, or the two sections collapse into each
   other. */
const growth = [
  {
    n: "01",
    title: "Demand that does not rely on remembering",
    body: "Campaigns, follow-ups and nurture sequences that run on a schedule rather than on whoever thinks of them. Marketing stops being the thing that slips in a busy week, because nobody has to be free for it to go out.",
  },
  {
    n: "02",
    title: "Leads qualified before they reach a person",
    body: "Enquiries enriched, scored against what your good customers actually looked like, and routed to whoever should answer. Your team spends its attention on the ones worth a conversation instead of sorting the list first.",
  },
  {
    n: "03",
    title: "Follow-up that does not go cold",
    body: "Most pipeline is lost to silence rather than to a no. Sequenced, personal follow-up keeps a lead warm for as long as the deal is realistically alive, and hands it back the moment they re-engage.",
  },
  {
    n: "04",
    title: "Channels measured on revenue, not clicks",
    body: "Spend tracked to closed business rather than to traffic, so the budget moves toward what is actually producing customers. Growth is only compounding if you can tell which part of it to feed.",
  },
];

/* The case for staying small. Sits between The Rocket and the differentiators
   because it is what the two poles add up to: hours back plus demand arriving
   is a small team running an output that used to need a department. */
const smallTeam = [
  {
    n: "01",
    title: "The cost base stops tracking the workload",
    body: "Headcount is the largest line in most small businesses, and it steps up in whole people. A system that handles the repetitive half costs a fraction of a salary, doesn't step up when volume does, and takes no holiday.",
  },
  {
    n: "02",
    title: "Output stops being tied to how many of you there are",
    body: "One person can run intake, follow-up, reporting and campaigns at a volume that used to need a department — because their day goes on the judgement calls and none of it goes on the mechanics.",
  },
  {
    n: "03",
    title: "You keep the thing scale usually costs you",
    body: "No layers, no handoff between four people, no week of scheduling before a decision. A small team with systems behind it moves at a speed a large one structurally cannot, and that advantage grows rather than fades.",
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
      <JsonLd
        schema={[
          organizationSchema(),
          websiteSchema(),
          // Valid because <FaqList> below renders these exact items.
          faqPageSchema(generalFaqs),
        ]}
      />
      <DitheredGalaxyHero />
      <Outcomes />

      {/* ---------------------------------------------------------------- */}
      {/* The problem                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="The Blackhole"
            deck="Every business has one. It is usually mundane, absent from the reporting, and expensive — rarely the thing people complain about, and steadily pulling hours in whether anyone is looking at it or not."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {problems.map((problem, i) => (
              <Reveal
                key={problem.title}
                delay={i * 60}
                className="hover-lift bg-surface p-8"
              >
                <p className="label-tech text-muted">#{problem.n}</p>
                <h3 className="card-title mt-3 text-lg">{problem.title}</h3>
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
      {/* Growth                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Growth"
            title="The Rocket"
            deck="The opposite direction, and the one the saved hours are for. Marketing and pipeline built as systems, so growth comes from something that runs every week rather than from a push somebody has to find the energy for."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {growth.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 60}
                className="card-raise hover-lift rounded-2xl bg-surface p-8"
              >
                <span className="label-tech text-muted">{item.n}</span>
                <h3 className="card-title mt-6 text-xl sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Small teams                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          {/* Left-aligned and two-column on purpose: three centred card grids
              in a row flattens the page, and this section is an argument
              rather than a list, so the heading stays beside it. */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="The shift"
              title="Small is the advantage"
              deck="Running solo or with a handful of people is not the compromise it was five years ago. The repetitive half of the work no longer needs a person, which means a small team is no longer a smaller version of a big one — it is a cheaper, faster shape than the big one, doing the same volume."
              className="lg:sticky lg:top-28 lg:self-start"
            />

            <div className="grid gap-8">
              {smallTeam.map((item, i) => (
                <Reveal
                  key={item.n}
                  delay={i * 70}
                  className="border-t border-line-strong pt-6"
                >
                  <span className="label-tech text-accent-ink">{item.n}</span>
                  <h3 className="card-title mt-3 text-lg sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured case study — hidden with the Case Studies section        */}
      {/* ---------------------------------------------------------------- */}
      {features.caseStudies && featured ? (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Case study"
              title="Not where they thought."
              deck="The bottleneck the client was sure they had, and the one the audit found instead."
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
        <Section>
          <Container>
            <SectionHeading eyebrow="Clients" title="In their words." />
            <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
              <TestimonialSlider testimonials={testimonials} />
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Why Praxes                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why Praxes"
            title="The truth about your numbers."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="hover-lift flex gap-5 bg-surface p-8"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent">
                  <Check aria-hidden className="size-4 text-on-accent" />
                </span>
                <div>
                  <h3 className="card-title text-lg">{item.title}</h3>
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
      <Section>
        <Container>
          <SectionHeading eyebrow="Questions" title="Common questions." />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection secondary={{ href: "/process", label: "See the process" }} />
    </>
  );
}
