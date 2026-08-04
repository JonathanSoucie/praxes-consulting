import Image from "next/image";
import type { Metadata } from "next";

import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/section-heading";
import { StatsBlock } from "@/components/sections/stats-block";
import { CtaSection } from "@/components/sections/cta";
import { Reveal } from "@/components/reveal";

import { credibilityStats } from "@/content/stats";
import { team, values } from "@/content/team";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Praxes is an AI consulting firm built around one commitment: measure the business honestly, and say so when AI isn't the answer. Meet the team and how we think.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We exist because most AI advice is sold by people paid to say yes."
        deck="Praxes was built around a narrower promise than most consultancies make: we will measure your business honestly, and we will tell you when the answer is no."
      />

      {/* ---------------------------------------------------------------- */}
      {/* Story                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <SectionHeading
              align="left"
              eyebrow="Story"
              title="How we got here."
            />
            <Reveal delay={60} className="max-w-2xl space-y-5">
              <p className="text-base leading-relaxed text-muted">
                We started out doing automation assessments for manufacturers —
                walking factory floors, timing processes, and building the
                financial case for whether a piece of equipment would pay for
                itself. The discipline that work demanded turned out to be the
                whole business: measure first, model the return conservatively,
                and be willing to say the investment isn&apos;t worth it.
              </p>
              <p className="text-base leading-relaxed text-muted">
                When clients started asking about AI, we found the same market
                failure, only worse. The technology was newer, the claims were
                larger, and almost nobody was establishing a baseline before
                building — which meant almost nobody could say afterwards
                whether it had worked. Businesses were buying capability and
                hoping.
              </p>
              <p className="text-base leading-relaxed text-muted">
                So we brought the same method across. Find the constraint. Price
                it. Build only what the numbers justify. Then re-measure and
                report what actually happened. It is not a novel idea — it is
                just ordinary engineering discipline applied to a field that
                currently runs on enthusiasm.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes is the Greek for practice — action informed by theory
                rather than theory on its own. That is roughly the whole point.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Team                                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="Team"
            title="Who does the work."
            deck="Three people, each responsible for a different part of the answer. You will be talking to us directly, not to an account manager."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal
                as="article"
                key={member.name}
                delay={i * 70}
                className="card-raise flex flex-col overflow-hidden rounded-2xl bg-surface"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {member.role}
                  </p>
                  {/* flex-1 on the bio pushes the credential row to the card
                      base, so all three align regardless of bio length. */}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                    {member.bio}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                    {member.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Values                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="wash">
        <Container>
          <SectionHeading
            eyebrow="How we think"
            title="Four commitments we'd rather be held to."
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 60}
                className="card-raise rounded-2xl bg-surface p-8 lg:p-9"
              >
                <span
                  aria-hidden
                  className="block h-1 w-10 rounded-full bg-accent"
                />
                <h3 className="mt-6 text-xl">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Credibility                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="card">
        <Container>
          <SectionHeading
            eyebrow="By the numbers"
            title="Where we stand."
            deck={`Based in ${site.address.locality}, ${site.address.region}. Working with clients across Europe and North America.`}
          />

          <div className="mt-16">
            <StatsBlock stats={credibilityStats} columns={4} />
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Talk to the people who'd actually do the work."
        body="No account manager, no discovery deck. Fifteen minutes with the person who would run your audit."
        secondary={{ href: "/process", label: "See the process" }}
      />
    </>
  );
}
