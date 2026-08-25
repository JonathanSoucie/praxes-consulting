import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";
import { features } from "@/content/site";

/**
 * The reference quote.
 *
 * One quote, set large, attributed to a named person at a named company, with
 * a link through to the engagement it came from. Not a carousel of three.
 *
 * A carousel is what a site builds when it does not trust any single quote to
 * carry the weight, and the reader reads it exactly that way. One quote with
 * a name, a title and a case study behind it is the strongest version of this
 * section; anything that cannot be attributed that way should not be on the
 * page at all.
 *
 * ⚠️ The quote rendered here is currently a PLACEHOLDER — see the warning at
 * the top of content/testimonials.ts. Replace it with a real, permissioned
 * quote or set features.testimonials to false before launch.
 */
export function QuoteBand() {
  if (!features.testimonials) return null;
  const quote = testimonials[0];

  return (
    <Section size="sm" aria-label="Client reference">
      <Container>
        <Reveal>
          <figure className="border-t border-line pt-14 lg:pt-20">
            <blockquote className="display-md max-w-[22ch] font-normal sm:max-w-[26ch]">
              <span className="text-pink-2" aria-hidden>
                “
              </span>
              {quote.quote}
              <span className="text-pink-2" aria-hidden>
                ”
              </span>
            </blockquote>
            <figcaption className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-lg text-ink">{quote.name}</p>
                <p className="mt-1 text-ink-soft">
                  {quote.title}, {quote.company}
                </p>
              </div>
              {features.caseStudies && quote.caseStudy ? (
                <Link
                  href={`/case-studies/${quote.caseStudy}`}
                  className="group inline-flex items-center gap-2 text-pink-ink"
                >
                  Read the engagement
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              ) : null}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
