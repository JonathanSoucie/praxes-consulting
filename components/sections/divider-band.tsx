import { Container } from "@/components/container";

/**
 * A short band between the hero and the black hole: one line of text in a
 * bordered rectangle, so the two scenes read as separate rooms rather than
 * one running into the other.
 */
export function DividerBand({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 border-y border-line-strong bg-surface">
      <Container className="flex h-16 items-center justify-center sm:h-20">
        <p className="label-section text-center text-ink-soft">{children}</p>
      </Container>
    </div>
  );
}
