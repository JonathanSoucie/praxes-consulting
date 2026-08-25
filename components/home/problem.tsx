import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { positioning, symptoms } from "@/content/positioning";

/**
 * The problem section — the named enemy, on the black ground.
 *
 * This is the section the whole page is built around, and the one most sites
 * in this category skip or reduce to a gesture. The rubric it was written
 * against draws the line at stakes: a problem section with no cost attached
 * is worth about as much as no problem section. So every symptom carries a
 * figure, and the two paragraphs above them do the work of explaining why the
 * thing has mass — why it grows rather than clears.
 */
export function Problem() {
  return (
    <Section tone="deep" id="the-black-hole">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="The problem"
                title="It has mass. That is why it"
                accent="never clears."
              />
            </Reveal>

            <Reveal delay={80}>
              <p className="measure mt-8 text-lg text-ink-soft">
                {positioning.enemy.definition}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="measure mt-6 text-lg text-ink-soft">
                {positioning.enemy.mechanic}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="measure mt-10 border-l border-pink-2 pl-6 font-display text-2xl leading-tight text-ink">
                Nobody designed any of this. It just accumulated.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div>
              <p className="eyebrow text-muted">
                What it looks like on a Tuesday
              </p>
              <ul className="mt-8">
                {symptoms.map((symptom) => (
                  <li
                    key={symptom.fix}
                    className="flex flex-col gap-2 border-b border-line py-6 first:border-t sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="flex-1 text-lg leading-snug text-ink">
                      {symptom.line}
                    </span>
                    <span className="shrink-0 font-display text-sm text-pink-ink sm:w-52 sm:text-right">
                      {symptom.cost}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                Ranges are what our audits typically find, not a promise about
                your business. Establishing your number is the audit's whole
                job.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
