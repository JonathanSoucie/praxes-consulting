import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { EngagementTimeline } from "@/components/sections/engagement-timeline";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { BookACall, BookingNote } from "@/components/book-a-call";

import { JsonLd } from "@/components/json-ld";

import { processFaqs } from "@/content/faqs";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How an Engagement Runs",
  description:
    "Five stages, from a free channel scoping call to a monitored distributor network: reconnaissance on every domain, harvest of the published catalogs, manufacturer resolution, evidence-backed reporting, then monthly change monitoring.",
  path: "/process",
  keywords: [
    "distributor network audit",
    "distributor catalog crawl",
    "competitor brand monitoring",
    "channel census manufacturers",
    "distributor whitespace analysis",
  ],
});

/**
 * What the engagement asks of the client. Sits under the steps to answer the
 * question buyers actually have at that point: how much of my team is this
 * going to eat?
 */
const clientInputs = [
  {
    title: "A list of distributor domains",
    cost: "Once",
    body: "A spreadsheet is fine, and an out-of-date one is fine too — which entries are dead is one of the things the census reports. No system access, no integration, and nothing asked of the distributors themselves: every page we read is one their customers can already open.",
  },
  {
    title: "Your categories, in your own words",
    cost: "1–2 hrs",
    body: "The category taxonomy you actually sell against. Whitespace measured against a generic industry tree returns a list of things you do not make, which is noise dressed as opportunity. Yours is the only version worth counting.",
  },
  {
    title: "The competitor brands you want counted",
    cost: "1 hr",
    body: "A displacement map without a named competitor universe is just an inventory of your own listings. Two or three obvious rivals is a start; the crawl usually surfaces several more you had not been tracking, and you decide which of those stay in.",
  },
  {
    title: "What you currently believe about the channel",
    cost: "1 hr",
    body: "Which distributors you think are active, who you think carries you, where you think you are strong. Say it before the crawl rather than after — the value of the first report is largely in which of those beliefs it confirms and which it does not.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "WebPage",
            name: "How a Channel Intelligence Engagement Runs",
            description:
              "The five-stage Praxes engagement, from a free channel scoping call to monthly change monitoring across a distributor network.",
            path: "/process",
          }),
          // Valid because <FaqList> below renders these exact items.
          faqPageSchema(processFaqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Process", path: "/process" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Process"
        title="Reconnaissance first. Evidence on every claim."
        deck="A free scoping call, then a census that tells you what your channel actually publishes, then the harvest and reporting built on top of it. Your exposure grows only after a cheap first layer has shown what is there to be found."
      >
        <div className="mt-10 flex flex-col items-center gap-4">
          <BookACall size="lg" withArrow />
          <BookingNote />
        </div>
      </PageHeader>
      {/* ---------------------------------------------------------------- */}
      {/* The five steps                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The engagement"
            title="Five stages."
            deck="Scope, reconnaissance, harvest and resolution, evidence, then monitoring — what happens at each stage, what you receive, and how long it typically takes."
          />

          <div className="mt-16">
            <ProcessTimeline variant="full" />
          </div>

          <Reveal delay={60} className="mt-6">
            <EngagementTimeline />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What we need from you                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Your side"
            title="What we need from you."
            deck="Less than any engagement you have run before, because nothing here touches your systems. A domain list and a few hours of channel knowledge is the whole ask — the part that cannot be outsourced is knowing which categories and which rivals are worth counting."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {clientInputs.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 60}
                className="border border-line bg-surface p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="card-title text-lg">{item.title}</h3>
                  <span className="figure-num shrink-0 text-xs text-accent">
                    {item.cost}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-accent-soft p-7 text-center text-sm leading-relaxed text-accent-ink">
              If at any point we need more of your team&apos;s time than this,
              we&apos;ll tell you before it happens and explain why. Surprise
              effort is how internal projects lose their sponsor.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Process FAQ                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Questions" title="Process questions." />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <FaqList items={processFaqs} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Start with thirty minutes."
        body="No preparation, no deck, no pricing conversation. Tell us how many distributors you sell through and which categories you are contesting, and we'll tell you what a census of your channel would cover."
        secondary={{ href: "/about", label: "Who you\u2019d work with" }}
      />
    </>
  );
}
