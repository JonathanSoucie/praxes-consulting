import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getDontBuildStudy, getGlanceStudies } from "@/content/case-studies";
import { features } from "@/content/site";

/**
 * Results — four engagements, at a glance.
 *
 * This used to be a band of aggregate figures: average first-year return,
 * median payback, median hours removed. Those are the numbers a firm reports
 * about itself, and a reader discounts them accordingly, because a median has
 * no client attached and cannot be checked. Nobody has ever been persuaded by
 * a median payback period.
 *
 * So each tile is now one engagement: the system we built, the figure it
 * produced, and the client it belongs to — with the full study a click away.
 * The pairing is the point. A number with no build behind it is a claim; a
 * build with no number behind it is a feature list.
 *
 * The closing line is the engagement that concluded "don't build". It is the
 * only item here that costs us something to publish, which is exactly why it
 * is what makes the other four believable.
 *
 * ⚠️ Every client and figure below is currently a PLACEHOLDER — see the
 * warnings in content/case-studies/*.ts.
 */
export function Results() {
  if (!features.caseStudies) return null;

  const studies = getGlanceStudies();
  const dontBuild = getDontBuildStudy();
  if (studies.length === 0) return null;

  return (
    <Section tone="deep" id="results">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="What came out the"
            accent="other side."
            standfirst="Four engagements, each measured against the baseline its audit established — same metric, same definition, ninety days after go-live."
          />
        </Reveal>

        <div className="mt-16 grid border-t border-line lg:mt-20 lg:grid-cols-2 lg:[&>*:nth-child(n+3)]:border-t lg:[&>*:nth-child(n+3)]:border-line">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 2) * 90}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col border-b border-line py-10 lg:border-b-0 lg:py-14 lg:even:pl-14 lg:odd:pr-14"
              >
                <p className="eyebrow text-muted">
                  {study.client} · {study.industry}
                </p>

                <p className="figure-num mt-8 text-6xl text-pink-2 sm:text-7xl">
                  {study.glance!.unit === "€" ? (
                    <span className="mr-0.5 text-4xl sm:text-5xl">€</span>
                  ) : null}
                  {study.glance!.value}
                  {study.glance!.unit && study.glance!.unit !== "€" ? (
                    <span className="ml-1.5 text-2xl sm:text-3xl">
                      {study.glance!.unit}
                    </span>
                  ) : null}
                </p>

                <p className="mt-6 max-w-[30ch] text-lg text-ink">
                  {study.glance!.label}
                </p>

                <div className="mt-auto pt-10">
                  <p className="eyebrow text-muted">What we built</p>
                  <p className="mt-3 flex items-start gap-3 text-ink-soft">
                    <span className="flex-1">{study.glance!.built}</span>
                    <ArrowRight
                      aria-hidden
                      className="mt-1.5 size-4 shrink-0 text-pink-ink transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {dontBuild ? (
          <Reveal>
            <div className="mt-16 border-t border-line pt-10 lg:mt-20">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="measure-wide text-lg text-ink-soft">
                  The fifth engagement from this run does not have a figure,
                  because we told them not to build. The audit measured 310
                  hours a year of the work they wanted automated, projected a
                  0.6× return, and recommended against it.
                </p>
                <Link
                  href={`/case-studies/${dontBuild.slug}`}
                  className="group inline-flex shrink-0 items-center gap-2 font-ui text-pink-ink"
                >
                  Read that one
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
