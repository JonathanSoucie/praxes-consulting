import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { industries } from "@/content/manufacturing";

/**
 * Who we help: the segments, three across, a line each.
 *
 * It was a sticky heading beside a stack of six paragraphs, which was the
 * third section on the page built that way and the tallest of them. The
 * section's whole job is qualification — a reader either recognises their
 * own business in one line or does not — so it does not need a column of
 * prose to do it, and the heading does not need to follow the reader down
 * a list they can take in at a glance.
 *
 * Centred heading, then a grid. The rule above each cell runs the width of
 * the cell rather than the row, so the grid reads as six entries rather than
 * as two banded rows.
 */
export function IndustriesBand() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Who we help"
          title="Eight-figure manufacturers, independent distributors"
          deck="Manufacturers who sell through distributors they do not control, in categories where a rival brand can take a shelf one listing at a time — and where nobody upstream is reading what those distributors publish."
        />

        <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal
              key={industry.name}
              as="li"
              delay={(i % 3) * 60}
              className="border-t border-line-strong pt-5"
            >
              <h3 className="font-heading text-base font-semibold text-ink sm:text-lg">
                {industry.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {industry.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
