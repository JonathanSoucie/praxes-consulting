import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { DitheredGalaxyField } from "@/components/sections/dithered-galaxy-field";
import { cn } from "@/lib/utils";

/**
 * The home hero: the dithered galaxy at full height, with the copy in the
 * upper-left negative space the galaxy leaves empty.
 *
 * Everything that draws is in <DitheredGalaxyField>. This file is only the
 * composition — which is the whole reason the field was split out, since the
 * page mastheads now sit on the same background at a different size and with
 * the copy somewhere else entirely.
 *
 * Full bleed, on the page colour, with no frame. The field's own ground is
 * that same colour, so there is no edge anywhere: it simply thins out into the
 * page wherever tone falls to level 0.
 */
export function DitheredGalaxyHero({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative isolate overflow-hidden bg-surface-2", className)}
    >
      <DitheredGalaxyField scrim="upper-left" />

      {/* pt clears the overlaying navbar. */}
      <Container className="relative z-10 flex min-h-svh flex-col justify-center pt-28 pb-32 sm:pt-32 sm:pb-40">
        <div className="max-w-xl lg:max-w-2xl">
          {/*
            The type blends into the field rather than punching a hole in it —
            multiply on the light theme, screen on the dark, which is its
            mirror once the polarity flips. See --hero-type-blend.
          */}
          <p className="hero-type font-display text-[2.5rem] leading-[0.98] font-semibold text-ink uppercase sm:text-7xl lg:text-8xl">
            Time or <span className="text-accent-ink">growth</span>?
          </p>

          <h1 className="hero-type mt-7 max-w-lg text-2xl leading-[1.2] font-medium text-ink sm:text-3xl lg:text-4xl">
            We build the systems that get you there.
          </h1>

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
