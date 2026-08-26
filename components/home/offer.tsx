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
 * Three things, in sequence rather than as a menu — the numbering is the
 * argument. You buy the audit, and what it finds decides which of the other
 * two comes next. Marketing automation being third is not an ordering
 * accident: building it before operations work has freed the time to run it
 * is how a business ends up with more demand than week.
 */
export function Offer() {
  return (
    <Section id="what-we-offer">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="Three things, and they happen"
            accent="in this order."
            standfirst="You buy the first one. What it measures decides whether the other two are worth buying at all."
          />
        </Reveal>

        <div className="mt-14 lg:mt-18">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 80}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-6 border-t border-line py-8 transition-colors last:border-b hover:bg-white lg:grid-cols-[auto_1fr_1.1fr_auto] lg:items-baseline lg:gap-12 lg:py-10"
              >
                <span className="figure-num text-2xl text-pink-2 lg:text-3xl">
                  0{i + 1}
                </span>
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
