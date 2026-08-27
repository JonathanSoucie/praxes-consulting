import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { symptoms } from "@/content/positioning";

/**
 * The problem — the named enemy, on the black ground.
 *
 * Condensed to a claim and its evidence. The two explanatory paragraphs that
 * used to sit here are the opening of the post this now links to, so keeping
 * them was publishing the same argument twice and making the reader finish it
 * before they had decided they cared.
 *
 * The costs stay. They are what separates a problem section from a gesture at
 * one, and they are the only part of the band that is not also elsewhere.
 */
export function Problem() {
  return (
    <Section tone="deep" id="the-black-hole">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <Reveal>
              {/* The accent starts at "more", not at "the". This column is
                  too narrow for the line to set in two, so it breaks after
                  "the" — and beginning the pink on an orphaned article at the
                  end of a line reads as a mistake. Split here and the
                  emphasis is a whole line. */}
              <SectionHeading
                eyebrow="The problem"
                title="The busier you get, the"
                accent="more it takes."
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="measure mt-8 text-lg text-ink-soft">
                Nobody designed any of this. It accumulated one workaround at a
                time, and it takes a fixed cut of every week.
              </p>
              <SeeMore
                href="/blog/nobody-designed-your-workflow"
                label="Read the argument"
              />
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div>
              <p className="eyebrow text-muted">
                What it looks like on a Tuesday
              </p>
              <ul className="mt-8">
                {symptoms.slice(0, 4).map((symptom) => (
                  <li
                    key={symptom.fix}
                    className="flex flex-col gap-1 border-b border-line py-5 first:border-t sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="flex-1 leading-snug text-ink">
                      {symptom.line}
                    </span>
                    <span className="shrink-0 font-ui text-sm text-pink-ink sm:w-48 sm:text-right">
                      {symptom.cost}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
