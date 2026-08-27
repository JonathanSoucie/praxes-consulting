import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { services } from "@/content/services";

/**
 * What we offer.
 *
 * Three things, unordered. This used to be numbered 01/02/03 under a headline
 * saying they happen in that order, with the sequence presented as the
 * argument rather than a preference — which was not true of the business. The
 * numerals went with the claim: leaving them would have had the layout assert
 * what the copy had stopped asserting, which is the worse half of the two to
 * get wrong because nobody reads it consciously.
 *
 * The audit keeps its pull in the standfirst, as what most clients start with
 * and why, rather than as a rule about what has to come first.
 */
export function Offer() {
  return (
    <Section id="what-we-offer">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="Three things, and you can start"
            accent="anywhere."
            standfirst="Most start with the audit, because it decides what the other two should be — and about a third of the time, whether they should happen at all."
          />
        </Reveal>

        <div className="mt-14 lg:mt-18">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-6 border-t border-line py-8 transition-colors last:border-b hover:bg-white lg:grid-cols-[1fr_1.1fr_auto] lg:items-baseline lg:gap-12 lg:py-10"
              >
                <h3 className="display-md transition-colors group-hover:text-pink-ink">
                  {service.name}
                </h3>
                <p className="text-lg text-ink-soft">{service.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm text-pink-ink">
                  Read more
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SeeMore href="/services" label="All three services" />
        </Reveal>
      </Container>
    </Section>
  );
}
