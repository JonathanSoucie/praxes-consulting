import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NeuralField } from "@/components/sections/neural-field";

/**
 * Standard page masthead — the short version of the hero treatment, used on
 * every page except Home. The navbar overlays the top of it.
 */
export function PageHeader({
  eyebrow,
  title,
  deck,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  deck?: React.ReactNode;
  /** Optional trailing content — CTAs, a stat strip, etc. */
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-surface">
      <NeuralField className="pointer-events-none absolute inset-0" />

      <Container className="relative pt-36 pb-20 sm:pt-40 sm:pb-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            {title}
          </h1>

          {deck ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {deck}
            </p>
          ) : null}

          {children}
        </Reveal>
      </Container>
    </div>
  );
}
