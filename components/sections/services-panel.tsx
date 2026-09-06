import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StepPanelView } from "@/components/process/step-panel";
import { STAR_COLOR, starField } from "@/components/sections/hole-geometry";
import { servicesSection } from "@/content/manufacturing";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The services on the home page: one row per engagement, alternating — copy
 * on the left and the output beside it, then the output on the left and the
 * copy beside it, and so on down.
 *
 * The alternation is a `lg:order-*` swap rather than two different row
 * markups. Below lg the grid collapses to one column, and there the copy
 * must lead every time: a reader on a phone should meet the name of the
 * thing before the diagram of its output, whatever side it would have sat on
 * upstairs. Source order is copy-then-panel throughout, so that is what a
 * screen reader and a narrow screen both get.
 *
 * There are five rows because there are five engagements. The sixth would
 * have to be invented.
 *
 * The output panels are drawn, not photographed. That is the same argument
 * components/process/step-panel.tsx makes about the process visuals: a
 * screenshot of a system not yet built for the client reading it would be a
 * lie, and a stock illustration says nothing. These say the specific thing
 * the copy beside them is claiming. Their figures are illustrative of shape
 * and are flagged as such in content/services.ts.
 *
 * The section sits on the page colour with the same sky as the scene above,
 * so the black hole's field runs straight through into it, and starts a long
 * way down because that scene ends on the circle and its labels.
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

        <ul className="mt-16 grid gap-20 lg:mt-24 lg:gap-28">
          {services.map((service, i) => {
            const panelFirst = i % 2 === 1;
            return (
              <Reveal
                key={service.slug}
                as="li"
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20"
              >
                <div className={cn(panelFirst && "lg:order-2")}>
                  <span className="label-tech text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl leading-snug font-semibold text-ink sm:text-3xl">
                    {service.name}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                    {service.showcase.blurb}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-7 inline-flex w-fit items-center gap-1.5 text-sm text-ink-soft underline decoration-line-strong underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent"
                  >
                    How it works
                    <ArrowRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className={cn(panelFirst && "lg:order-1")}>
                  {/* `active` is what fills the bars. There is no scrub here
                      to drive it, so they are drawn at full length. */}
                  <StepPanelView panel={service.showcase.panel} active />
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-20 flex justify-center lg:mt-28">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View all services</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
