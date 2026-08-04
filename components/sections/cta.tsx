import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";

/**
 * Closing CTA band. Every page ends with this — it is the one action the
 * whole site funnels toward.
 */
export function CtaSection({
  eyebrow = "Next step",
  title = "Find out what your bottleneck is costing you.",
  body = "Fifteen minutes, no preparation needed. We'll tell you whether there's a case worth measuring — including when there isn't.",
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <Section tone="deep" className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-rule-dark pointer-events-none absolute inset-0"
      />
      {/* Soft violet bloom, bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 size-125 rounded-full bg-accent/30 blur-3xl"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Badge tone="onDark">{eyebrow}</Badge>

          <h2 className="mt-7 text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.875rem] lg:leading-[1.08]">
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
