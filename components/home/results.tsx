import Link from "next/link";

import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { getGlanceStudies } from "@/content/case-studies";
import { features } from "@/content/site";

/**
 * Results — four engagements, at a glance.
 *
 * A figure, what it measures, and whose it is. Each is a link to the study,
 * and the band closes with the way into all of them. What used to sit under
 * each tile — the system we built, in a sentence — is the first thing the
 * study itself says, so it was a preview of a page one click away.
 *
 * ⚠️ Every client and figure is a PLACEHOLDER — see content/case-studies/*.ts.
 */
export function Results() {
  if (!features.caseStudies) return null;

  const studies = getGlanceStudies();
  if (studies.length === 0) return null;

  return (
    <Section tone="deep" id="results">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="What came out the"
            accent="other side."
            standfirst="Each measured against the baseline its audit established, ninety days after go-live."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 70}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col border-b border-line py-8 sm:pr-8 lg:border-b-0"
              >
                <p className="figure-num text-5xl text-pink-2 transition-colors group-hover:text-page">
                  {study.glance!.unit === "€" ? (
                    <span className="mr-0.5 text-3xl">€</span>
                  ) : null}
                  {study.glance!.value}
                  {study.glance!.unit && study.glance!.unit !== "€" ? (
                    <span className="ml-1 text-xl">{study.glance!.unit}</span>
                  ) : null}
                </p>
                <p className="mt-4 flex-1 text-ink">{study.glance!.label}</p>
                <p className="mt-5 font-ui text-sm text-muted">
                  {study.client}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="measure-wide mt-10 text-sm text-muted">
            A fifth has no figure, because we told them not to build.
          </p>
          <SeeMore
            tone="deep"
            href="/case-studies"
            label="Read the case studies"
            className="mt-8"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
