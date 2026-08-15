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
  title: "Our AI Consulting Process",
  description:
    "Five steps from a free 15-minute discovery call to a measured go-live: discovery, deep-dive analysis, a paid ROI audit, build and integration, then go-live with measurement against the original baseline.",
  path: "/process",
  keywords: [
    "AI consulting process",
    "AI audit",
    "AI implementation steps",
    "AI discovery call",
    "AI ROI audit",
  ],
});

/**
 * What the engagement asks of the client. Sits under the steps to answer the
 * question buyers actually have at that point: how much of my team is this
 * going to eat?
 */
const clientInputs = [
  {
    title: "A few hours from the people who do the work",
    cost: "3–5 hrs",
    body: "Spread across the audit week. We sit with whoever actually runs the process — not a manager's summary of it — because the summary is usually where the real bottleneck goes missing.",
  },
  {
    title: "Read access to the systems involved",
    cost: "Setup only",
    body: "Enough to measure volumes and cycle times. Scoped to the specific workflow, arranged in writing before the audit starts, and revoked or handed back at the end if you decide not to proceed.",
  },
  {
    title: "One person who can make the call",
    cost: "Ongoing",
    body: "Somebody with authority to say yes or no at the end of the audit. Engagements stall when the findings land with a committee that has to reconvene to have an opinion.",
  },
  {
    title: "Honest numbers, including the awkward ones",
    cost: "Once",
    body: "Error rates, rework, the tasks nobody logs. We're building a baseline you'll be measured against later, so a flattering starting number only makes the final comparison look worse.",
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
        title="Stop at any point."
        deck="A free conversation, then a paid audit you keep regardless of what you decide, then a fixed-scope build. Your exposure grows only after the case for it has been measured."
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
            deck="What happens at each stage, what you receive, and how long it typically takes."
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
            deck="Not much, and almost all of it lands in the audit week. The most common worry we hear is that this will become another project your team has to carry. It doesn't."
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
        body="No preparation, no deck, no pricing conversation. Just a straight read on whether there's something here worth measuring."
        secondary={{ href: "/services", label: "What we build" }}
      />
    </>
  );
}
