import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { NeuralField } from "@/components/sections/neural-field";

/**
 * Hero. White, with a faint interconnected network tracing behind the copy —
 * signals occasionally firing along it. The navbar overlays the top of it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <NeuralField className="pointer-events-none absolute inset-0" />

      <Container className="relative pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>AI consulting</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-6xl leading-[1.02] text-ink sm:text-7xl lg:text-8xl lg:leading-[0.98]">
              We sell{" "}
              <span className="text-gradient animate-gradient-shift">
                Time
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We analyse how your business actually runs, find the bottleneck
              that is genuinely costing you, and implement AI to fix it — then
              measure the result against the baseline we started from.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BookACall size="lg" withArrow />
              <Button asChild variant="outline" size="lg">
                <Link href="/process">See how it works</Link>
              </Button>
            </div>
            <BookingNote className="mt-5" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
