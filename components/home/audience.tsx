import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { audience } from "@/content/positioning";

/**
 * Who this is for.
 *
 * Three columns, no exclusion panel. The "who we turn down" card that used to
 * close this section is still in content/positioning.ts as
 * `audience.notForWho` — it is good copy and it belongs on a page where
 * someone has asked the question, which is /about or the audit page, not
 * three screens into the home page where it reads as pre-emptive.
 */
export function Audience() {
  return (
    <Section id="who-its-for">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Businesses big enough to feel it, small enough to"
            accent="fix it."
          />
        </Reveal>

        <div className="mt-16 grid gap-px border-t border-line lg:mt-20 lg:grid-cols-3">
          {audience.forWho.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="h-full border-b border-line py-10 lg:border-b-0 lg:border-r lg:pr-10 lg:last:border-r-0 lg:[&:not(:first-child)]:pl-10">
                <h3 className="display-md text-pink-ink">{item.title}</h3>
                <p className="mt-5 text-ink-soft">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </Section>
  );
}
