import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

/**
 * The hero.
 *
 * Two jobs in one screen: what the problem is, and what we do about it. It
 * used to carry a third — a strip qualifying the reader on size, sequencing
 * and what we turn down — which said true things in the wrong place. The
 * qualification now happens where a reader who is still interested will
 * actually read it, in the audience section further down.
 *
 * The type is the design. There is no artwork behind it and no card around
 * it, because the section below this one is a film and two competing focal
 * points in the first two screens is one too many.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-28">
      <Container>
        <p className="eyebrow text-muted">
          AI automation consulting · Ottawa, Canada
        </p>

        <h1 className="display-hero mt-8 max-w-[16ch]">
          Every business has a <span className="text-pink-em">black hole</span>.
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <p className="text-xl leading-[1.5] text-ink-soft sm:text-2xl">
            The repetitive work nobody designed. It accumulated one workaround
            at a time, it has never been measured, and it takes its cut of
            every week — whether or not the week was profitable.
          </p>

          <div className="lg:pt-2">
            <p className="text-lg text-ink-soft">
              We find it, price it at your own labour cost, and automate it.
              Then we tell you what it was worth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookACall size="lg" withArrow />
              <Button asChild variant="outline" size="lg">
                <Link href="/services/automations-audit">
                  How the audit works
                </Link>
              </Button>
            </div>
            <BookingNote className="mt-5" />
          </div>
        </div>

        <p className="mt-16 flex items-center gap-3 font-ui text-sm text-muted lg:mt-20">
          <ArrowDown aria-hidden className="size-4" />
          Ninety seconds on what this actually looks like
        </p>
      </Container>
    </section>
  );
}
