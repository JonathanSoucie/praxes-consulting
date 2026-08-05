import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FaqList } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";
import { BookACall, BookingNote } from "@/components/book-a-call";

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
      {/* Process FAQ                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
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
        secondary={{ href: "/services", label: "What we build" }}
      />
    </>
  );
}
