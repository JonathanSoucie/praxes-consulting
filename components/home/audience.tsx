import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SeeMore } from "@/components/section-more";
import { audience } from "@/content/positioning";

/**
 * Who this is for.
 *
 * Three qualifiers, one line each. The paragraphs are on the segment pages,
 * written in each trade's own vocabulary — which is the version worth reading,
 * and the reason this band links to /industries rather than restating them
 * generically.
 */
export function Audience() {
  return (
    <Section id="who-its-for">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Big enough to feel it. Small enough to"
            accent="fix it."
          />
        </Reveal>

        <div className="mt-14 grid gap-px border-t border-line lg:mt-16 lg:grid-cols-3">
          {audience.forWho.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full border-b border-line py-8 lg:border-b-0 lg:border-r lg:pr-10 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-10">
                <h3 className="font-display text-xl text-pink-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-ink-soft">{item.short}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SeeMore href="/industries" label="Find your industry" />
        </Reveal>
      </Container>
    </Section>
  );
}
