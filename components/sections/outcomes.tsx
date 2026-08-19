import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * The two outcomes, directly under the hero.
 *
 * Two because that is the actual choice the hero puts to you — time or growth
 * — and a third column would blur the fork it is trying to draw. They are the
 * shortest possible statement of the two long sections further down the page:
 * the black hole that takes the time, and the rocket that spends it on growth.
 *
 * Columns under a rule rather than cards — boxing two short paragraphs would
 * put chrome around copy that does not need it, and the hero above now
 * dissolves into the page rather than ending on an edge, so a row of boxes
 * immediately below would reintroduce exactly the hard boundary that removing
 * the hero's frame got rid of.
 */

const OUTCOMES = [
  {
    label: "Save time",
    body: "Repetitive tasks pull time away from your business like a black hole. Files sitting in a queue. Data entry.",
  },
  {
    label: "Grow",
    body: "Growth pulls the other way. Marketing that runs without being remembered, leads that get found and followed up, and a pipeline that keeps moving while you work on the business.",
  },
];

export function Outcomes() {
  return (
    <div className="bg-surface-2 pt-4 pb-20 sm:pb-24">
      <Container>
        <p className="label-tech text-muted">Outcomes</p>

        {/* Held to max-w-4xl: across the full page width two columns stretch to
            a measure that reads as a wall of text rather than two statements. */}
        <div className="mt-8 grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-12 lg:gap-16">
          {OUTCOMES.map((outcome, i) => (
            // Staggered so the two arrive as one movement read left to right,
            // rather than two separate reveals firing at once.
            <Reveal
              key={outcome.label}
              delay={i * 110}
              className="border-t border-line-strong pt-6"
            >
              <span className="label-tech text-accent-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-display text-xl font-semibold tracking-[0.04em] text-ink uppercase sm:text-2xl">
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
  );
}
