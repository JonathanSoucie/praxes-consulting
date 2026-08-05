import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { features } from "@/content/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Measured outcomes from AI engagements across accounting, hospitality, logistics, healthcare and property — including the audit that recommended not building.",
  alternates: { canonical: "/case-studies" },
  // Hidden for now — don't let search engines index it while it's off.
  robots: features.caseStudies ? undefined : { index: false, follow: false },
};

export default function CaseStudiesPage() {
  // Hidden until there are real engagements to publish. See content/site.ts.
  if (!features.caseStudies) notFound();

  const featured = getFeaturedCaseStudy();
  const industries = getCaseStudyIndustries();

  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="What the measurement actually showed."
        deck="Each study states the baseline we started from, what the audit found, what we built, and the re-measured result at 90 days. Including one engagement where the answer was to build nothing."
      />

      {/* Aggregate stats — lifted into the seam under the header */}
      <Container className="relative -mt-12 pb-4">
        <Reveal>
          <StatsBlock stats={caseStudyAggregate} tone="panel" columns={3} />
        </Reveal>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/* Filterable grid                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading eyebrow="All studies" title="Filter by industry." />

          <Reveal className="mt-14">
            <CaseStudyGrid studies={caseStudies} industries={industries} />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Featured"
            title="The one that changed the brief."
            deck="The client asked us to build document extraction. The measurement said the extraction was a third of the problem — so we sequenced it last."
          />

          <Reveal className="mt-16">
            <FeaturedCaseStudy study={featured} />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading eyebrow="Clients" title="In their words." />
          <Reveal delay={80} className="mx-auto mt-16 max-w-3xl">
            <TestimonialSlider testimonials={testimonials} />
          </Reveal>
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
