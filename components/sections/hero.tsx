import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { NeuralField } from "@/components/sections/neural-field";
import { OrbitField } from "@/components/sections/orbit-field";

/**
 * Hero: a question, an answer, and the three shapes the answer takes.
 *
 * The question sits in the middle of the first screen, and everything below
 * it — headline, actions, and the three outcomes — hangs off that same centre
 * line, so the eye never has to re-find an axis on the way down.
 *
 * The outcomes are inside this section on purpose. They are the answer to the
 * question above them, and keeping them here means the orbit rings behind
 * carry unbroken from the question into the answer instead of the two reading
 * as unrelated bands.
 */

const OUTCOMES = [
  {
    label: "Save time",
    body: "Automate repetitive work and give your team hours back.",
  },
  {
    label: "Get customers",
    body: "Build systems that find, qualify and nurture better leads.",
  },
  {
    label: "Grow faster",
    body: "Connect your business with intelligent workflows that scale.",
  },
];

export function Hero() {
  // The surface colour belongs to the section, not to the first screen: an
  // opaque background on the screen would paint over the orbit rings behind.
  return (
    <section className="relative bg-surface">
      <OrbitField />

      <div className="relative flex min-h-svh items-center overflow-hidden">
        <NeuralField className="pointer-events-none absolute inset-0" />

        {/* pt-18 clears the overlaying navbar, so the copy is optically
            centred in the space actually left to it rather than in the raw
            viewport. */}
        <Container className="relative z-10 w-full pt-18 pb-14">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              {/* The base step is set by the narrowest phone, not the widest:
                  at text-5xl this line fills the gutter exactly at 390px and
                  overflows below it. */}
              <p className="font-display text-[2.5rem] leading-[0.98] font-semibold text-ink uppercase sm:text-7xl lg:text-8xl">
                Time or{" "}
                <span className="text-gradient animate-gradient-shift">
                  growth
                </span>
                ?
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mx-auto mt-7 max-w-2xl text-2xl leading-[1.2] font-medium text-ink sm:text-3xl lg:text-4xl">
                We build the systems that get you there.
              </h1>
            </Reveal>

            {/* Kept from the previous hero. The brief did not mention them,
                but a first screen with no way to act on it is a regression
                whatever else it gets right. */}
            <Reveal delay={150}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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

      {/* The answer. */}
      <div className="relative pb-24 sm:pb-28 lg:pb-32">
        <Container className="relative z-10">
          {/* Columns under a rule rather than cards — boxing the answer would
              put chrome around three short lines that do not need it. Centred
              to match the question above, so the whole section shares one
              axis instead of the eye having to re-find a new one. */}
          <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {OUTCOMES.map((outcome, i) => (
              // Staggered so the three arrive as one movement read left to
              // right, rather than three separate reveals firing at once.
              <Reveal
                key={outcome.label}
                delay={i * 110}
                className="border-t border-line-strong pt-6"
              >
                <span className="label-tech text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-display text-xl font-semibold text-ink uppercase sm:text-2xl">
                  {outcome.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {outcome.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
