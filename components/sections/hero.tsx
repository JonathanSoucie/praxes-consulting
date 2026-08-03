import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { RoiReadout } from "@/components/sections/roi-readout";

export function Hero() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-accent" />
                <span className="label-eyebrow text-muted">
                  AI consulting for established businesses
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.04]">
                AI that pays for itself.
                <span className="block text-muted">
                  And the numbers to prove it.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                We analyse how your business actually runs, find the bottleneck
                that is genuinely costing you, and implement AI to fix it. Then
                we measure the result against the baseline we started from — and
                tell you what it was, either way.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <BookACall size="lg" withArrow />
                <Button asChild variant="outline" size="lg">
                  <Link href="/process">See how it works</Link>
                </Button>
              </div>
              <BookingNote className="mt-5" />
            </Reveal>
          </div>

          <Reveal delay={140}>
            <RoiReadout />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
