import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { BlackHole } from "@/components/home/black-hole";

/**
 * The hero.
 *
 * Centred, and deliberately short: a headline naming the enemy, a second line
 * saying what it costs and what we do about it, one action, and then the
 * thing itself.
 *
 * The black hole is a full-bleed band under the copy rather than an element
 * in the stack. Two placements were tried and both were wrong for the same
 * reason — its shadow is opaque, so anything sharing those pixels is lost.
 * Above the headline it read as a graphic on a shelf, a bounded card with air
 * on either side; as a backdrop behind everything it swallowed the booking
 * note and the film cue. Given its own width at the foot of the section it is
 * the payoff to the sentence above it, and it hands off directly into the
 * dark sections that follow.
 *
 * The emphasis colours follow the brand rule rather than being chosen per
 * word: main pink carries the emphasised fragment of an H1 or H2, at display
 * size only, where its 4.0:1 on the page ground clears AA for large text.
 * The italic is a real drawn italic (see the @font-face note in globals.css),
 * not a synthesised slant.
 */
export function Hero() {
  return (
    <section className="relative pt-32 pb-0 text-center sm:pt-36 lg:pt-40">
      <Container>
        <p className="eyebrow text-muted">
          AI automation consulting · Ottawa, Canada
        </p>

        <h1 className="display-hero mx-auto mt-8 max-w-[19ch]">
          There&rsquo;s a <span className="text-pink-em">black hole</span> in
          your business.
        </h1>

        <h2 className="display-md mx-auto mt-9 max-w-[24ch] font-normal">
          It eats <span className="text-pink-em">hours</span> every week.
          <span className="mt-2 block italic">
            We find it, name it, and close it.
          </span>
        </h2>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <BookACall size="lg" withArrow />
          <Button asChild variant="outline" size="lg">
            <Link href="/services/automations-audit">How the audit works</Link>
          </Button>
        </div>
        <BookingNote className="mt-5" />
      </Container>

      {/* Full width, and outside the container on purpose — the disk runs
          nearly the whole viewport, and a gutter either side of it would put
          the object back in a box.

          Heights are per breakpoint because the object is width-constrained
          on narrow screens and height-constrained on wide ones: one value
          leaves it swimming in empty band on a phone. */}
      <div className="mt-8 h-[13rem] w-full sm:mt-10 sm:h-[18rem] lg:mt-12 lg:h-[33rem]">
        <BlackHole className="block size-full" />
      </div>

      <Container>
        <p className="inline-flex items-center gap-3 pb-16 font-ui text-sm text-muted lg:pb-20">
          <ArrowDown aria-hidden className="size-4" />
          Ninety seconds on what this actually looks like
        </p>
      </Container>
    </section>
  );
}
