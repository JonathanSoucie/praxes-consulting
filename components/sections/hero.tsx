import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { NeuralField } from "@/components/sections/neural-field";
import { OrbitField } from "@/components/sections/orbit-field";
import { cn } from "@/lib/utils";

/**
 * Hero: a question, an answer, and the three shapes the answer takes.
 *
 * The question sits at the bottom-left of the first screen rather than
 * centred in it — the eye lands on the type, then travels down the left edge
 * into the headline and straight on into the outcomes, which share that same
 * edge. One column, one reading path, no re-centring.
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

        {/* Not the page Container. The rest of the site sits in a centred
            78rem column, which on a wide screen leaves a gutter far too deep
            for type this size to feel anchored. The hero breaks out and
            measures from the left edge instead — and the outcomes below use
            the same inset, so the section keeps one edge even though it no
            longer shares the page's. pt-18 clears the overlaying navbar so
            the copy is optically centred in the space left to it. */}
        <HeroInset className="relative z-10 pt-18 pb-14">
          <div className="max-w-4xl">
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
              <h1 className="mt-7 max-w-2xl text-2xl leading-[1.2] font-medium text-ink sm:text-3xl lg:text-4xl">
                We build the systems that get you there.
              </h1>
            </Reveal>

            {/* Kept from the previous hero. The brief did not mention them,
                but a first screen with no way to act on it is a regression
                whatever else it gets right. */}
            <Reveal delay={150}>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <BookACall size="lg" withArrow />
                <Button asChild variant="outline" size="lg">
                  <Link href="/process">See how it works</Link>
                </Button>
              </div>
              <BookingNote className="mt-5" />
            </Reveal>
          </div>
        </HeroInset>
      </div>

      {/* The answer. */}
      <div className="relative pb-24 sm:pb-28 lg:pb-32">
        <HeroInset className="relative z-10">
          {/* Columns under a rule rather than cards: the hero above is
              editorial and left-aligned, and boxing the answer would break
              the single reading edge the whole composition is built on.

              Capped and left-anchored so the columns stop growing on a very
              wide screen — three lines of body text stretched across 1900px
              stop being readable long before the grid stops being able to
              stretch them. */}
          <div className="grid max-w-6xl gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
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
        </HeroInset>
      </div>
    </section>
  );
}

/**
 * The hero's own gutter: full width, measured from the left edge rather than
 * centred on the page. Shared by the question and the outcomes so the two
 * stay on one line even though neither sits in the page container.
 */
function HeroInset({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full px-6 sm:px-10 lg:px-16", className)}>
      {children}
    </div>
  );
}
