import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { industries } from "@/content/manufacturing";

/**
 * Who we help: the copy deck's segments, each with the line describing what
 * the work is in that market.
 *
 * A list rather than cards. The section's job is qualification — a reader
 * either recognises their own business in one of these lines or does not —
 * and rules with the name against the line read faster for that than six
 * boxes would. It also keeps the page from becoming three card grids in a
 * row, which is what it was heading for.
 */
export function IndustriesBand() {
  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Who we help"
            title="Large catalogs, legacy systems"
            deck="Equipment-parts manufacturers, aftermarket suppliers and international distributors — the businesses where finding the right part is a skill, and where the paperwork behind it has to agree."
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <ul className="grid">
            {industries.map((industry, i) => (
              <Reveal
                key={industry.name}
                as="li"
                delay={i * 50}
                className="border-t border-line-strong py-6 last:border-b"
              >
                <h3 className="font-heading text-lg font-semibold text-ink sm:text-xl">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {industry.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
