import Link from "next/link";
import { Check } from "lucide-react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { NeuralField } from "@/components/sections/neural-field";

/**
 * What the reader gets in the first screen, in order: who we are, the
 * unexpected claim, what we actually do, one action, and the four method
 * commitments that back the claim up.
 *
 * The commitments are deliberately statements of method rather than result
 * figures — they are true on day one and don't depend on a sample size.
 */
const commitments = [
  "Baseline measured before we build",
  "Assumptions written down, not hidden",
  "Re-measured against it at 90 days",
  "You own everything we build",
];

/**
 * Hero. White, with a faint interconnected network tracing behind the copy —
 * signals occasionally firing along it. The navbar overlays the top of it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <NeuralField className="pointer-events-none absolute inset-0" />

      <Container className="relative pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>AI consulting · Ottawa</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              We&apos;ll tell you when AI
              <span className="text-gradient animate-gradient-shift block">
                isn&apos;t worth building.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We measure how your business actually runs, price the bottleneck
              nobody has costed, and build only when the numbers justify it —
              then re-measure at 90 days and give you the comparison in writing,
              flattering or not.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BookACall size="lg" withArrow />
              {/* Stays on the page — this used to route warm traffic to
                  /process before it had any reason to go. */}
              <Button asChild variant="outline" size="lg">
                <Link href="#estimator">See what it&apos;s costing you</Link>
              </Button>
            </div>
            <BookingNote className="mt-5" />
          </Reveal>

          <Reveal delay={240}>
            {/* Marks rather than separators — a wrapped "·" strands itself at
                the start of the next line. */}
            <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-line pt-8 text-sm text-muted">
              {commitments.map((commitment) => (
                <li key={commitment} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 shrink-0 text-accent" />
                  {commitment}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
