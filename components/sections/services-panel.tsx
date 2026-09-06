import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { STAR_COLOR, starField } from "@/components/sections/hole-geometry";
import { servicesSection } from "@/content/manufacturing";
import { services } from "@/content/services";

/**
 * The services, on the home page: one card per offer, on the same ground as
 * the scene above it.
 *
 * It used to be a rounded plate a step up from the page with a pink ring
 * sweeping through it. That put three grounds in a row — the scene's, the
 * plate's, and the page's again beneath — and the plate's top edge read as a
 * lid closing over the scene rather than as the scene carrying on. Now it is
 * the page colour with the same sky on it, so the black hole's field runs
 * straight through into the cards.
 *
 * The top padding is deliberately large. The scene ends on the circle with
 * its labels around it, and starting the cards immediately under that crowds
 * both.
 *
 * The cards are the offers in content/services.ts — the engagements
 * themselves, each named for the workflow it covers rather than for a
 * category. The capability areas they draw on are a level up, orbiting the
 * black hole in the scene above. Every card goes to its own page, so
 * "Read more" is a promise the site keeps.
 */

/** A different seed from the hero's, so the two skies are not the same
    arrangement of dots twice on one page. */
const STARS = starField(90, 0x5f2d);

export function ServicesPanel() {
  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-surface-2 pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-28"
    >
      {/* The sky, faded out at the foot of the section: what follows has no
          stars, and a field that simply stopped would draw a line across the
          page where it did. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, transparent 96%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 55%, transparent 96%)",
        }}
      >
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.d}px`,
              height: `${star.d}px`,
              opacity: star.a,
              backgroundColor: STAR_COLOR,
            }}
          />
        ))}
      </div>

      <Container>
        <Reveal className="max-w-4xl">
          <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
          <h2
            id="services-title"
            className="mt-6 text-3xl leading-[1.06] text-ink sm:text-4xl lg:text-[2.875rem]"
          >
            {servicesSection.title}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              as="li"
              delay={(i % 3) * 70}
              className="flex flex-col rounded-[14px] border border-line-strong bg-surface p-7"
            >
              <h3 className="font-heading text-xl leading-snug font-semibold text-ink">
                {service.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.summary}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm text-ink-soft underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
              >
                Read more
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={240} className="mt-12 flex justify-center lg:mt-14">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View all services</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
