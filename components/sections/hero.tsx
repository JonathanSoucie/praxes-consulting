import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { DashboardCluster } from "@/components/sections/dashboard-cluster";

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
            <Badge tone="onDark">AI consulting · measured, not promised</Badge>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-7 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              AI that pays for itself.
              <span className="block text-white/60">
                And the numbers to prove it.
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
          <DashboardCluster className="mx-auto mt-20 max-w-4xl" />
        </Reveal>
      </Container>
    </section>
  );
}
