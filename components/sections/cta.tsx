import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

/**
 * The closing band, on every page.
 *
 * One action, and a line about what happens if the answer is no. The second
 * part is what makes the first one easy to press: the objection to booking a
 * consulting call is never the fifteen minutes, it is the expectation of a
 * follow-up sequence, and saying plainly that the call can end in "no" is
 * the only thing that addresses it.
 */
export function Cta({
  eyebrow = "Next step",
  title = "What is it costing you?",
  body = "Fifteen minutes, no preparation needed. We will tell you whether there is a case worth measuring — including when there isn't, which is how about a third of these end.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <Section tone="deep">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-muted">{eyebrow}</p>
            <h2 className="display-lg mt-6">{title}</h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-ink-soft">
              {body}
            </p>
            <div className="mt-10 flex justify-center">
              <BookACall variant="onDeep" size="xl" withArrow />
            </div>
            <BookingNote className="mt-5" />
            <p className="mt-10 text-sm text-muted">
              Or write to us at{" "}
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-ink-soft transition-colors hover:text-ink"
              >
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
