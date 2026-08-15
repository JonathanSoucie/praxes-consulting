import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

/**
 * The three outcomes, directly under the hero.
 *
 * Columns under a rule rather than cards — boxing three short lines would put
 * chrome around copy that does not need it, and the hero above now dissolves
 * into the page rather than ending on an edge, so a row of boxes immediately
 * below would reintroduce exactly the hard boundary that removing the hero's
 * frame got rid of.
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

export function Outcomes() {
  return (
    <div className="bg-surface-2 pt-4 pb-20 sm:pb-24">
      <Container>
        <p className="label-tech text-muted">Outcomes</p>

        <div className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
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
