import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  DatabaseZap,
  FileSpreadsheet,
  FileStack,
  Inbox,
  ListChecks,
  Megaphone,
  MessagesSquare,
  PenLine,
  Send,
  Star,
  Workflow,
  Zap,
} from "lucide-react";

import { Container, Section } from "@/components/container";
import { DitheredGalaxyHero } from "@/components/sections/dithered-galaxy-hero";
import { Outcomes } from "@/components/sections/outcomes";
import { BuildExamples } from "@/components/sections/build-examples";
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

/* The other pole. The Blackhole section above is about hours leaving; this one
   is only about demand arriving — marketing, pipeline and the numbers behind
   both. Nothing here is a time saving, or the two sections collapse into each
   other. */
/* The Blackhole's answer to "so what do you actually build?". Workflow
   automation, described by the job it removes rather than by the tool that
   does it — the tool is an audit outcome, not a promise made up front. */
const workflowBuilds = [
  {
    icon: FileStack,
    title: "Document and invoice intake",
    summary:
      "Files read the moment they arrive and written straight into the system of record.",
    points: [
      "Email and portal attachments",
      "Fields checked on the way in",
      "Exceptions go to a person",
    ],
  },
  {
    icon: Workflow,
    title: "Systems that don't talk",
    summary:
      "Your CRM, accounting package and scheduler kept in step without anyone retyping.",
    points: [
      "Two-way sync",
      "Rules for which side wins",
      "The most common thing we build",
    ],
  },
  {
    icon: ListChecks,
    title: "Queue and approval routing",
    summary:
      "Work assigned to whoever should have it, and escalated when it has sat too long.",
    points: [
      "Automatic assignment",
      "Alerts on ageing work",
      "Approvals that don't stall",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Reports and reconciliations",
    summary:
      "The month-end pack assembled from source on a schedule and delivered finished.",
    points: [
      "Pulled from the live systems",
      "Same definitions every cycle",
      "Discrepancies flagged",
    ],
  },
  {
    icon: Inbox,
    title: "Inbox and enquiry triage",
    summary:
      "Incoming mail sorted, categorised and routed with the history already attached.",
    points: [
      "Sorted by what it actually is",
      "Straight to the right person",
      "Context attached on arrival",
    ],
  },
  {
    icon: DatabaseZap,
    title: "Data entry and record hygiene",
    summary:
      "Forms and portals filled from the record you already hold, then kept clean.",
    points: [
      "No retyping what you have",
      "Duplicates merged",
      "Typos caught before reporting",
    ],
  },
];

/* The case for staying small. Sits ahead of both poles: it is the premise the
   rest of the page argues from — a small team can now run the output of a
   department — and The Blackhole and The Rocket are then the two halves of
   how that is done. */
/* The Rocket's answer to the same question. Campaign machinery specifically —
   paid, outbound, organic and the follow-up behind all three. */
const marketingBuilds = [
  {
    icon: Megaphone,
    title: "Meta and Google ads",
    summary:
      "Creative generated and rotated, with audiences built from your own customer list.",
    points: [
      "Variants tested continuously",
      "Audiences from real customers",
      "Judged on revenue",
    ],
  },
  {
    icon: Send,
    title: "Cold email that gets replies",
    summary:
      "Verified lists, personalised per account, paced so your domain survives it.",
    points: [
      "Lists built and verified",
      "Research per account",
      "Replies land with a human",
    ],
  },
  {
    icon: PenLine,
    title: "Social post generation",
    summary:
      "A week of posts drafted in your voice from work you have already done.",
    points: [
      "Written from your own material",
      "Approval before it posts",
      "Scheduled across your channels",
    ],
  },
  {
    icon: Zap,
    title: "Lead capture to first reply",
    summary:
      "Every enquiry enriched, scored and answered within minutes, at whatever hour it arrives.",
    points: [
      "Enriched and scored on arrival",
      "Written into the CRM",
      "Minutes, not next morning",
    ],
  },
  {
    icon: MessagesSquare,
    title: "Nurture and re-engagement",
    summary:
      "Sequences that keep a lead warm for as long as the deal is realistically alive.",
    points: [
      "Paced to the stage they're at",
      "Stops the moment they reply",
      "Win-backs on old pipeline",
    ],
  },
  {
    icon: Star,
    title: "Reviews and referrals",
    summary:
      "Asks that go out when a customer is happiest, without anyone remembering to send them.",
    points: [
      "Timed to the work finishing",
      "Referral prompts built in",
      "Win-backs on past customers",
    ],
  },
];

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
      {/* Small teams                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          {/* Left-aligned and two-column on purpose: it opens the page's
              argument, and the two centred sections that follow it read
              better against something that is not shaped like them. */}
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
      {/* The problem                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="The Blackhole"
            deck="Every business has one, and it is never the thing people complain about. Files waiting in a queue. Capable people retyping and reconciling. Decisions made on numbers that are weeks old. It appears on no timesheet, and it pulls hours in whether anyone is watching or not."
          />

          <BuildExamples items={workflowBuilds} />

          <Reveal delay={200} className="mx-auto mt-16 max-w-2xl">
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
            deck="The opposite direction, and what the saved hours are for: campaigns that go out on schedule rather than when someone remembers, enquiries qualified and routed before they reach a person, follow-up that keeps a lead warm instead of losing it to silence, and spend judged on closed business rather than on clicks. Growth compounds when it comes from something that runs every week."
          />

          <BuildExamples items={marketingBuilds} />
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
