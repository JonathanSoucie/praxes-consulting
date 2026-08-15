import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DitheredGalaxyField } from "@/components/sections/dithered-galaxy-field";
import { cn } from "@/lib/utils";

/**
 * The home hero: the dithered galaxy at full height, with the copy in the
 * upper-left negative space the galaxy leaves empty.
 *
 * Laid out to the reference: a bordered label chip, an oversized uppercase
 * display headline set in the accent and broken deliberately across three
 * lines, two short paragraphs rather than one, and a filled/outlined pair of
 * actions. The artwork sits to the right, which is where the galaxy already
 * is, so the copy and the subject never fight for the same space.
 *
 * Everything that draws is in <DitheredGalaxyField>. This file is only the
 * composition.
 */
export function DitheredGalaxyHero({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative isolate overflow-hidden bg-surface-2", className)}
    >
      <DitheredGalaxyField scrim="upper-left" />

      {/* pt clears the overlaying navbar. */}
      <Container className="relative z-10 flex min-h-svh flex-col justify-center pt-28 pb-32 sm:pt-32 sm:pb-40">
        <div className="max-w-xl lg:max-w-3xl">
          <Eyebrow className="mb-7">Praxes</Eyebrow>

          {/*
            The headline blends into the field rather than punching a hole in
            it — multiply on the light theme, screen on the dark, which is its
            mirror once the polarity flips. See --hero-type-blend.

            Line breaks are authored, not left to the measure: at these sizes
            the question sets to two balanced lines, where wrapping it
            naturally would break after "or" and leave "growth?" stranded.

            Sentence case in the markup — the caps come from `uppercase`, so
            the accessible name and the page source stay readable.
          */}
          <h1 className="hero-type font-display text-[2.75rem] leading-[0.95] font-semibold text-accent uppercase sm:text-6xl lg:text-7xl xl:text-8xl">
            Time or
            <br />
            growth?
          </h1>

          {/* Two sentences, one thought — the break is authored so "You
              choose." lands on its own line and the promise answers it
              underneath. The wrapper is a plain div now: with the second
              paragraph gone there is nothing left for space-y-4 to space. */}
          <div className="mt-9 max-w-lg">
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              You choose.
              <br />
              We build the systems that get you there.
            </p>
          </div>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <BookACall size="lg" withArrow />
            <Button asChild variant="outline" size="lg">
              <Link href="/process">See how it works</Link>
            </Button>
          </div>
          {/* A step darker than the usual muted grey: this line sits lowest in
              the copy stack, which on a phone is where the field is densest
              and a light secondary colour stops being readable. */}
          <BookingNote className="mt-5 text-ink-soft" />
        </div>
      </Container>
    </section>
  );
}
