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
        <div className="mt-10 flex flex-col items-center gap-4">
          <BookACall size="lg" variant="onDark" withArrow />
          <BookingNote className="text-white/55" />
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------- */}
      {/* The five steps                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The engagement"
            title="Five steps, start to finish."
            deck="What happens at each stage, what you receive, and how long it typically takes."
          />

          <div className="mt-16">
            <ProcessTimeline variant="full" />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Investment framing                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Investment"
            title="Where money enters, and what it buys."
            deck="We don't publish fixed prices, because scope varies too much for a number here to mean anything. What doesn't vary is the structure — and you know the total before the build starts."
          />

          <Reveal className="mt-16 overflow-x-auto">
            <table className="w-full min-w-2xl border-collapse text-left">
              <caption className="sr-only">
                Investment structure by engagement stage
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="pb-4 pr-6 text-xs font-medium text-muted"
                  >
                    Stage
                  </th>
                  <th
                    scope="col"
                    className="pb-4 pr-6 text-xs font-medium text-muted"
                  >
                    Cost
                  </th>
                  <th scope="col" className="pb-4 text-xs font-medium text-muted">
                    What that means
                  </th>
                </tr>
              </thead>
              <tbody>
                {investmentModel.map((row) => (
                  <tr key={row.stage}>
                    <th
                      scope="row"
                      className="rounded-l-xl bg-surface-2 px-6 py-6 align-top font-display text-base font-semibold text-ink"
                    >
                      {row.stage}
                    </th>
                    <td className="bg-surface-2 py-6 pr-6 align-top">
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium whitespace-nowrap text-accent-ink">
                        {row.cost}
                      </span>
                    </td>
                    <td className="max-w-xl rounded-r-xl bg-surface-2 py-6 pr-6 align-top text-sm leading-relaxed text-muted">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={60}>
            <p className="mx-auto mt-12 max-w-2xl rounded-2xl bg-accent-soft p-7 text-center text-sm leading-relaxed text-accent-ink">
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
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="Questions"
            title="Process questions, answered plainly."
          />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <FaqList items={processFaqs} />
          </Reveal>
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
