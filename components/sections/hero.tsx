import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { TimeEstimator } from "@/components/sections/time-estimator";

/**
 * Hero. Deep indigo at the top resolving into the page background, with the
 * navbar overlaying the dark end of the gradient.
 */
export function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Faint grid on the dark portion only */}
      <div
        aria-hidden
        className="grid-rule-dark pointer-events-none absolute inset-x-0 top-0 h-[60%] mask-[linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow tone="onDark">AI consulting</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Identifying where AI automation
              <span className="block text-white/60">
                creates measurable return.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              We analyse how your business actually runs, find the bottleneck
              that is genuinely costing you, and implement AI to fix it — then
              measure the result against the baseline we started from.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BookACall size="lg" variant="onDark" withArrow />
              <Button asChild variant="onDarkGhost" size="lg">
                <Link href="/process">See how it works</Link>
              </Button>
            </div>
            <BookingNote className="mt-5 text-white/55" />
          </Reveal>
        </div>

        <Reveal delay={220}>
          <TimeEstimator className="mx-auto mt-20 max-w-2xl" />
        </Reveal>
      </Container>
    </section>
  );
}
