import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { headlineStats } from "@/content/stats";
import { positioning } from "@/content/positioning";
import { features } from "@/content/site";

/**
 * Results.
 *
 * Two things a numbers band has to do that most do not: say where the figures
 * came from, and include one that does not flatter the firm. The fourth stat
 * here — audits that recommend against building — is the one doing the second
 * job, and it is the reason the other three are believable.
 */
export function Results() {
  return (
    <Section tone="deep" id="results">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Results"
                title="Escape"
                accent="velocity."
              />
              <p className="measure mt-8 text-lg text-ink-soft">
                {positioning.coinage.definition}
              </p>
              <p className="measure mt-6 text-ink-soft">
                {positioning.coinage.measure}
              </p>
              {features.caseStudies ? (
                <Link
                  href="/case-studies"
                  className="mt-8 inline-flex items-center gap-2 text-pink-ink transition-colors hover:text-page"
                >
                  See the engagements behind these
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid gap-px sm:grid-cols-2">
              {headlineStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-t border-line py-8 sm:even:pl-10 sm:odd:pr-10"
                >
                  <dd className="figure-num text-5xl text-pink-2 sm:text-6xl">
                    {stat.value}
                    {stat.unit ? (
                      <span className="ml-1 text-3xl sm:text-4xl">
                        {stat.unit}
                      </span>
                    ) : null}
                  </dd>
                  <dt className="mt-5 text-lg text-ink">{stat.label}</dt>
                  {stat.note ? (
                    <p className="mt-2 text-sm text-muted">{stat.note}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
