import { Container, Section } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { howItWorks } from "@/content/positioning";

/**
 * How the engagement runs.
 *
 * The condensed version. Each of the three services carries its own, more
 * specific process on its page — this is the shape of the whole thing, and
 * its job is to make the commercial terms legible before anyone has to ask:
 * what is free, what is paid, how long it takes, and when we stop.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four steps. The second one is where we"
            accent="tell you the truth."
            standfirst="Nothing gets built before it has been measured, and nothing gets measured before you have been told what it will cost to measure it."
          />
        </Reveal>

        <ol className="mt-16 lg:mt-24">
          {howItWorks.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 70}>
              <div className="grid gap-5 border-t border-line py-10 last:border-b lg:grid-cols-[auto_1fr_1.3fr] lg:gap-14 lg:py-14">
                <span className="figure-num text-3xl text-pink-2 lg:text-4xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="display-md">{step.title}</h3>
                  <p className="mt-3 font-display text-sm tracking-wide text-pink-ink">
                    {step.tag}
                  </p>
                </div>
                <p className="text-lg text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
