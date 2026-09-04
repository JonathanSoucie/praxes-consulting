import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DitheredGalaxyField } from "@/components/sections/dithered-galaxy-field";
import { Reveal } from "@/components/reveal";

/**
 * Closing CTA band. Every page ends with this — it is the one action the
 * whole site funnels toward.
 */
export function CtaSection({
  eyebrow = "Next step",
  title = "What is it costing you?",
  body = "Fifteen minutes, no preparation needed. We'll tell you whether there's a case worth measuring — including when there isn't.",
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <Section className="relative isolate overflow-hidden">
      {/* Follows the theme like every other field on the site: dark ink on
          the light ground, light ink on the dark one. The band used to be
          pinned dark in both themes, which left it as the one place the light
          theme went black. */}
      <DitheredGalaxyField scrim="center" intensity={0.85} zoom={1.45} />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>

          <h2 className="mt-6 text-3xl leading-[1.12] text-ink sm:text-4xl lg:text-[2.875rem] lg:leading-[1.08]">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <BookACall size="lg" withArrow />
            {secondary ? (
              <Button asChild variant="outline" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>

          <BookingNote className="mt-5" />
        </Reveal>
      </Container>
    </Section>
  );
}
