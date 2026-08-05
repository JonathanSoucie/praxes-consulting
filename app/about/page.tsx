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
    "Praxes is an AI consulting firm for Canadian small and mid-sized businesses, built around one commitment: measure the business honestly, and say so when AI isn't the answer. Meet the team and how we think.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built to give Canadian businesses a straight answer on AI."
        deck="Praxes makes a narrower promise than most consultancies: we will measure your business honestly, show you the numbers behind our recommendation, and tell you when the answer is no."
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
                We started out doing automation assessments — walking floors,
                timing processes, and building the financial case for whether a
                piece of equipment would pay for itself. The discipline that
                work demanded turned out to be the whole business: measure
                first, model the return conservatively, and be willing to say
                the investment isn&apos;t worth it.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Then we started looking at what AI was doing to Canadian small
                and mid-sized businesses. The pattern was hard to miss. The
                enterprise end of the market had consultants, budgets and
                people whose job was to check the maths. Everyone else — the
                accounting practices, the clinics, the clubs, the distributors,
                the firms that actually employ most Canadians — was being sold
                the same technology with none of the scrutiny, on a demo and a
                promise.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Almost nobody was establishing a baseline before building, which
                meant almost nobody could say afterwards whether it had worked.
                Owners were spending real money on capability and hoping. A few
                got lucky. Most quietly stopped using what they bought.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes exists to close that gap. We bring the same method to a
                twenty-person practice that a bank would expect for a
                seven-figure programme: find the constraint, price it, build
                only what the numbers justify, then re-measure and report what
                actually happened. It is not a novel idea. It is ordinary
                engineering discipline applied to a field that currently runs on
                enthusiasm — and applied for businesses that have rarely been
                offered it.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Praxes is the Greek for practice: action informed by theory
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

          {/* Compact cards: a small square portrait sits beside the name
              rather than a large image dominating the card. */}
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal
                as="article"
                key={member.name}
                delay={i * 70}
                className="card-raise flex flex-col rounded-2xl bg-surface p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg leading-snug">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-accent">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* flex-1 on the bio pushes the credential row to the card
                    base, so all three align regardless of bio length. */}
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                  {member.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
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
            deck="Working with owner-led small and mid-sized businesses across Canada."
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
