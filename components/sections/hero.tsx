import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { NeuralField } from "@/components/sections/neural-field";
import { OrbitField } from "@/components/sections/orbit-field";

/**
 * Hero, in three beats.
 *
 * The first is the page proper — headline, promise, and the two calls to
 * action, all inside the first screen. The two that follow are single
 * statements that land one at a time as you scroll on, which is what lets the
 * argument be made in the visitor's own reading rhythm instead of crammed
 * into one paragraph under the headline.
 *
 * Deliberately *not* a pinned hero. The version this is modelled on holds you
 * in place for three viewport heights while the stages swap; that reads well
 * on a site whose job is reputation, but here it would put every call to
 * action three screens below the fold. So the beats simply scroll, and only
 * the background is continuous across them.
 *
 * That background does double duty: the neural field belongs to the first
 * screen, and the orbit rings — faint at the top where the field already has
 * the eye, stronger further down where it has ended — carry the remaining
 * two.
 */
export function Hero() {
  // The surface colour belongs to the section, not to the first beat: an
  // opaque background on the beat would paint straight over the orbit rings
  // sitting behind it.
  return (
    <section className="relative bg-surface">
      <OrbitField />

      {/* Beat one — the whole offer, above the fold. */}
      <div className="relative flex min-h-svh items-center overflow-hidden">
        <NeuralField className="pointer-events-none absolute inset-0" />

        {/* pt-18 clears the overlaying navbar so the copy is optically
            centred in the space actually left to it, not in the raw viewport. */}
        <Container className="relative z-10 w-full pt-18 pb-16">
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
                that is genuinely costing you, and implement AI to fix it —
                then measure the result against the baseline we started from.
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
      </div>

      <HeroBeat>
        Automation is easy to buy and hard to justify. The difference is
        knowing which hour you are actually buying back.
      </HeroBeat>

      <HeroBeat>
        So we measure first, build second, and show you the one number that
        moved.
      </HeroBeat>
    </section>
  );
}

/**
 * A single statement, given a screen most of its own.
 *
 * Sized well below the headline: this is the argument, not the banner, and
 * type this large stops being readable if it also tries to shout.
 */
function HeroBeat({ children }: { children: React.ReactNode }) {
  return (
    // Tall enough that only one statement is ever centred in the viewport.
    // At 62svh two of them fitted on one screen, which is exactly the reading
    // experience these beats exist to avoid.
    <div className="relative flex min-h-[88svh] items-center py-24">
      <Container className="relative z-10 w-full">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center font-display text-3xl leading-[1.16] font-semibold text-balance text-ink sm:text-4xl lg:text-5xl">
            {children}
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
