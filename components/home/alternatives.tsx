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
 * same three lines in the same order, and the third one is capable of sending
 * the reader elsewhere: two of the five say "do this instead of hiring us"
 * and a third proposes splitting the work. A comparison where we win every
 * row is one a reader who has actually priced these options discounts on
 * sight, and then discounts the rest of the page with it.
 */
export function Alternatives() {
  return (
    <Section tone="deep" id="alternatives">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The alternatives"
            title="We are not your only option. Here is when to take"
            accent="one of the others."
            standfirst="Nobody is choosing between us and nothing. These are the five things businesses actually weigh us against, what each one is genuinely better at, and where it stops working."
          />
        </Reveal>

        <div className="mt-16 lg:mt-24">
          {alternatives.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <article className="grid gap-8 border-t border-line py-10 last:border-b lg:grid-cols-[1fr_1.75fr] lg:gap-20 lg:py-14">
                <div>
                  <h3 className="display-md">{item.name}</h3>
                  <p className="mt-4 font-ui text-sm text-muted">{item.cost}</p>
                </div>

                <dl>
                  <Line label="Better than us at">{item.strength}</Line>
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
          <p className="measure-wide mt-14 text-lg text-ink-soft">
            The reason we can be this direct about it: the audit is the
            product, and it is priced so its conclusion does not depend on
            what you buy next. Sending you to a freelancer costs us a build
            and keeps the thing the whole firm runs on.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * One labelled line. The label sits in its own narrow column on wide screens
 * so the three run as a comparable set down the page rather than as three
 * paragraphs that happen to be near each other.
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
    <div className="flex flex-col gap-1.5 border-b border-line py-5 first:border-t last:border-b-0 sm:flex-row sm:gap-8">
      <dt className="eyebrow shrink-0 pt-1.5 text-muted sm:w-40">{label}</dt>
      <dd className={accent ? "flex-1 text-pink-ink" : "flex-1 text-ink-soft"}>
        {children}
      </dd>
    </div>
  );
}
