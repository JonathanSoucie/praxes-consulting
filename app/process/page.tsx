import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { BookACall, BookingNote } from "@/components/book-a-call";

import { investmentModel } from "@/content/process";
import { processFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five steps from a free 15-minute discovery call to a measured go-live: discovery, deep-dive analysis, a paid ROI audit, build and integration, then go-live with measurement against the original baseline.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A sequence designed so you can stop at any point."
        deck="Two free conversations, a paid audit you keep regardless of what you decide, then a fixed-scope build. Your exposure grows only after the case for it has been measured."
      >
        <div className="mt-10">
          <BookACall size="lg" withArrow />
          <BookingNote className="mt-4" />
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------- */}
      {/* The five steps                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="S.01 — The engagement"
            title="Five steps, start to finish."
            deck="What happens at each stage, what you receive, and how long it typically takes."
          />

          <div className="mt-14">
            <ProcessTimeline variant="full" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Investment framing                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.02 — Investment"
            title="Where money enters, and what it buys."
            deck="We don't publish fixed prices, because scope varies too much for a number here to mean anything. What doesn't vary is the structure — and you know the total before the build starts."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-2xl border-collapse text-left">
              <caption className="sr-only">
                Investment structure by engagement stage
              </caption>
              <thead>
                <tr className="border-y border-line-strong">
                  <th
                    scope="col"
                    className="label-eyebrow py-4 pr-6 text-muted"
                  >
                    Stage
                  </th>
                  <th
                    scope="col"
                    className="label-eyebrow py-4 pr-6 text-muted"
                  >
                    Cost
                  </th>
                  <th scope="col" className="label-eyebrow py-4 text-muted">
                    What that means
                  </th>
                </tr>
              </thead>
              <tbody>
                {investmentModel.map((row) => (
                  <tr key={row.stage} className="border-b border-line">
                    <th
                      scope="row"
                      className="py-6 pr-6 align-top font-serif text-base font-normal text-ink"
                    >
                      {row.stage}
                    </th>
                    <td className="py-6 pr-6 align-top">
                      <span className="figure-num text-sm whitespace-nowrap text-accent">
                        {row.cost}
                      </span>
                    </td>
                    <td className="max-w-xl py-6 align-top text-sm leading-relaxed text-muted">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal delay={60}>
            <p className="mt-10 max-w-2xl border-l-2 border-accent pl-6 text-sm leading-relaxed text-ink">
              The audit is deliberately the first paid step. Charging for it is
              what makes the recommendation independent — we are paid for the
              analysis, not for the outcome the analysis points to.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Process FAQ                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow="S.03 — Questions"
              title="Process questions, answered plainly."
            />
            <Reveal delay={80}>
              <FaqList items={processFaqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Start with the free fifteen minutes."
        body="No preparation, no deck, no pricing conversation. Just a straight read on whether there's something here worth measuring."
        secondary={{ href: "/case-studies", label: "See the results" }}
      />
    </>
  );
}
