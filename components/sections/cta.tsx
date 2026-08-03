import Link from "next/link";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container, Section } from "@/components/container";
import { Button } from "@/components/ui/button";
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
    <Section tone="ink" className="relative overflow-hidden">
      <Container>
        <Reveal className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="label-eyebrow text-white/60">{eyebrow}</span>
          </div>

          <h2 className="text-3xl leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            {title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {body}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <BookACall size="lg" withArrow />
            {secondary ? (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
              >
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
