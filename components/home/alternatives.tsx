import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { alternatives } from "@/content/alternatives";

/**
 * What you would consider instead of us.
 *
 * On the deep ground, which on this site is where the uncomfortable material
 * goes — this is a sibling of the problem section, not of the sales ones.
 *
 * The parallel structure is doing the persuading. Every alternative gets the
 * same three lines in the same order, and the third is capable of sending the
 * reader elsewhere: two of the five say "do this instead of hiring us" and a
 * third proposes splitting the work. A comparison where we win every row is
 * one a reader who has actually priced these options discounts on sight, and
 * then discounts the rest of the page with it.
 *
 * Kept deliberately tight. The first version gave each alternative three full
 * paragraphs on bordered sub-rows, which ran to about three screens and turned
 * a scannable comparison into something nobody finishes — an honest section
 * that does not get read is worth no more than a dishonest one. One sentence
 * per field, no internal rules, and the labels sit in a fixed column so the
 * fifteen lines read as a grid rather than as five stacked essays.
 */
export function Alternatives() {
  return (
    <Section tone="deep" size="sm" id="alternatives">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The alternatives"
            title="We are not your only option. Here is when to take"
            accent="one of the others."
            standfirst="Nobody is choosing between us and nothing. These are the five things businesses actually weigh us against, and when each one beats us."
          />
        </Reveal>

        <div className="mt-12 lg:mt-16">
          {alternatives.map((item, i) => (
            <Reveal key={item.name} delay={i * 50}>
              <article className="grid gap-4 border-t border-line py-6 last:border-b lg:grid-cols-[1fr_2.2fr] lg:gap-16 lg:py-7">
                <div className="lg:pt-0.5">
                  <h3 className="font-display text-xl sm:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 font-ui text-sm text-muted">
                    {item.cost}
                  </p>
                </div>

                <dl className="space-y-2">
                  <Line label="Better at">{item.strength}</Line>
                  <Line label="Until">{item.breaks}</Line>
                  <Line label="Choose it if" accent>
                    {item.verdict}
                  </Line>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="measure-wide mt-8 text-sm text-muted">
            We can be this direct because the audit is the product, priced so
            its conclusion does not depend on what you buy next.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * One labelled line. The label sits in a fixed narrow column on wide screens
 * so the three run as a comparable set down the page rather than as three
 * sentences that happen to be near each other.
 */
function Line({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <dt className="eyebrow shrink-0 pt-1.5 text-muted sm:w-28">{label}</dt>
      <dd className={accent ? "flex-1 text-pink-ink" : "flex-1 text-ink-soft"}>
        {children}
      </dd>
    </div>
  );
}
