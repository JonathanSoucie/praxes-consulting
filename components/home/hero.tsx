import Link from "next/link";
import { ArrowDown } from "lucide-react";

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
 * The emphasis colours follow the brand rule rather than being chosen per
 * word: main pink carries the emphasised fragment of an H1 or H2, at display
 * size only, where its 4.0:1 on the page ground clears AA for large text.
 * The italic is a real drawn italic (see the @font-face note in globals.css),
 * not a synthesised slant.
 */
export function Hero() {
  return (
    <section className="relative pt-36 pb-20 text-center sm:pt-44 lg:pt-52 lg:pb-28">
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

        <p className="mt-16 inline-flex items-center gap-3 font-ui text-sm text-muted lg:mt-20">
          <ArrowDown aria-hidden className="size-4" />
          Ninety seconds on what this actually looks like
        </p>
      </Container>
    </section>
  );
}
