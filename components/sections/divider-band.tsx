import { Container } from "@/components/container";

/**
 * The band under the hero: one line, full width, between two hairlines.
 *
 * It is the reference's "trusted by" strip, carrying the one thing about
 * the audience that can be said plainly. A logo row belongs directly under
 * it once there are client marks that can honestly be shown; until then the
 * line stands alone, which is better than a row of invented ones.
 */
export function DividerBand({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 border-y border-line-strong bg-surface-2">
      <Container className="flex min-h-20 items-center justify-center py-5 sm:min-h-24">
        <p className="text-center text-base text-ink-soft sm:text-lg">
          {children}
        </p>
      </Container>
    </div>
  );
}
