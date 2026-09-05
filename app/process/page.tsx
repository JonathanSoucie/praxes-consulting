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
    "Five stages, from a free part-data assessment to a measured, monitored workflow: connect the sources read-only, normalize the identifiers, automate the workflow, approve before anything writes back, then measure and improve.",
  path: "/process",
  keywords: [
    "ERP integration process",
    "part data normalization",
    "RFQ automation pilot",
    "read-only ERP integration",
    "catalog data governance",
  ],
});

/**
 * What the engagement asks of the client. Sits under the steps to answer the
 * question buyers actually have at that point: how much of my team is this
 * going to eat?
 */
const clientInputs = [
  {
    title: "Time from the people who know the data",
    cost: "3–5 hrs",
    body: "Spread across the first week. The parts person who knows which cross-references are wrong, and the export coordinator who knows which field causes the exceptions every month. Their knowledge is most of what gets encoded; the software is the easy half.",
  },
  {
    title: "Read access to the source systems",
    cost: "Setup only",
    body: "ERP, WMS, PIM and the supplier files, read-only. Scoped to the specific workflow, arranged in writing before we connect anything, and revoked or handed back at the end if you decide not to proceed.",
  },
  {
    title: "Someone who can approve a fitment decision",
    cost: "Ongoing",
    body: "A technical person with the authority to say a substitute is or is not acceptable. The system routes uncertainty to a human by design, and that only works if the human exists and has the mandate.",
  },
  {
    title: "The awkward numbers, not the presentable ones",
    cost: "Once",
    body: "Wrong-part returns, unmatched RFQ lines, document exceptions, SKUs that never made it to the website. We are building the baseline you will be measured against later, so a flattering starting number only makes the final comparison look worse.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            type: "WebPage",
            name: "Our AI Consulting Process",
            description:
              "The five-step Praxes engagement, from free discovery call to measured go-live.",
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
        title="Read-only first. Approved before anything writes back."
        deck="A free assessment, then a fixed-fee week that leaves you with governed data whatever you decide next, then a scoped pilot on one workflow. Your exposure grows only after the case for it has been measured on your own data."
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
            deck="Connect, normalize, automate, approve, improve — what happens at each stage, what you receive, and how long it typically takes."
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
            deck="Not much, and almost all of it lands in the first week. The most common worry we hear is that this becomes another project your team has to carry. It doesn't — but the part that cannot be outsourced is the knowledge in your parts people's heads."
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
        title="Start with fifteen minutes."
        body="No preparation, no deck, no pricing conversation. Tell us where the work backs up and which systems hold the data, and we'll tell you which workflow is worth measuring first."
        secondary={{ href: "/about", label: "Who you\u2019d work with" }}
      />
    </>
  );
}
