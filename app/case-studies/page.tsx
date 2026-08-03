import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { StatsBlock } from "@/components/sections/stats-block";
import { CaseStudyGrid } from "@/components/sections/case-study-grid";
import { FeaturedCaseStudy } from "@/components/sections/case-study-card";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";

import {
  caseStudies,
  getCaseStudyIndustries,
  getFeaturedCaseStudy,
} from "@/content/case-studies";
import { caseStudyAggregate } from "@/content/stats";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Measured outcomes from AI engagements across accounting, hospitality, logistics, healthcare and property — including the audit that recommended not building.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const featured = getFeaturedCaseStudy();
  const industries = getCaseStudyIndustries();

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="What the measurement actually showed."
        deck="Each study below states the baseline we started from, what the audit found, what we built, and the re-measured result at 90 days. Including one engagement where the answer was to build nothing."
      >
        <div className="mt-12">
          <StatsBlock stats={caseStudyAggregate} columns={3} />
        </div>
      </PageHeader>

      {/* ---------------------------------------------------------------- */}
      {/* Filterable grid                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="S.01 — All studies"
            title="Filter by industry."
          />

          <Reveal className="mt-12">
            <CaseStudyGrid studies={caseStudies} industries={industries} />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="S.02 — Featured"
            title="The one that changed the brief."
            deck="The client asked us to build document extraction. The measurement said the extraction was a third of the problem — so we sequenced it last."
          />

          <Reveal className="mt-14">
            <FeaturedCaseStudy study={featured} />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="S.03 — Clients" title="In their words." />
            <Reveal delay={80}>
              <TestimonialSlider testimonials={testimonials} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Curious what your own numbers would look like?"
        body="The discovery call is fifteen minutes and costs nothing. If there's no case, you'll hear that on the call rather than after an invoice."
        secondary={{ href: "/process", label: "How the audit works" }}
      />
    </>
  );
}
