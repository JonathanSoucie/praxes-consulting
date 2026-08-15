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
    <Section tone="deep" className="relative isolate overflow-hidden">
      {/* Pinned dark: this band stays dark in both themes and the type on it
          is white, so the field must not follow the page theme here. The
          blurred violet bloom that used to sit here is gone — a soft glow on
          top of a crisp dot grid was two different languages at once. */}
      <DitheredGalaxyField ground="dark" scrim="center" intensity={0.5} />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="onDark">{eyebrow}</Eyebrow>

          <h2 className="mt-6 text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.875rem] lg:leading-[1.08]">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {body}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <BookACall size="lg" variant="onDark" withArrow />
            {secondary ? (
              <Button asChild variant="onDarkGhost" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            ) : null}
          </div>

          <BookingNote className="mt-5 text-white/50" />
        </Reveal>
      </Container>
    </Section>
  );
}
