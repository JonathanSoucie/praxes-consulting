import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { audience } from "@/content/positioning";

/**
 * Who this is for.
 *
 * The exclusion at the bottom is the load-bearing part. Three cards saying
 * who we work with are three cards a reader skims; the paragraph saying who
 * we turn down is the one that makes the other three credible, and it is the
 * only part of this section anyone quotes back to us on a call.
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

        <Reveal delay={120}>
          <div className="card mt-16 p-8 sm:p-12 lg:mt-20">
            <h3 className="font-display text-2xl">
              {audience.notForWho.title}
            </h3>
            <p className="measure-wide mt-5 text-lg text-ink-soft">
              {audience.notForWho.body}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
