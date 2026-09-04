import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

/**
 * The hero.
 *
 * Centred, and deliberately short: a headline naming the enemy, a second line
 * saying what it costs and what we do about it, and one action. Everything
 * that used to sit beside it — the definition of the black hole, the
 * qualification strip — is either further down the page or gone. The
 * definition in particular was duplicated verbatim in the problem section
 * two screens below, and the section is where it belongs.
 *
 * On the deep ground now, and the first of an unbroken dark run down to the
 * end of the problem section. `on-deep` rather than a hand-set background,
 * because it also remaps the ink tokens — so the headline, the muted booking
 * note and the outline button all invert without any of them being told they
 * moved.
 *
 * The emphasis colours follow the brand rule rather than being chosen per
 * word: main pink carries the emphasised fragment of an H1 or H2, at display
 * size only. It measures 4.3:1 on #181818, which clears AA for large text on
 * this ground as it did on the light one.
 *
 * The film cue went with the film band it pointed at.
 */
export function Hero() {
  return (
    <section
      data-hero="deep"
      className="on-deep relative pt-36 pb-24 text-center sm:pt-44 lg:pt-52 lg:pb-32"
    >
      <Container>
        <h1 className="display-hero mx-auto max-w-[19ch]">
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
    </section>
  );
}
