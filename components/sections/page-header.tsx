import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Standard page masthead — the short version of the hero gradient, used on
 * every page except Home. The navbar overlays its dark end.
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
    <div className="gradient-hero relative overflow-hidden">
      <div
        aria-hidden
        className="grid-rule-dark pointer-events-none absolute inset-x-0 top-0 h-[70%] mask-[linear-gradient(to_bottom,black,transparent)]"
      />

      <Container className="relative pt-36 pb-20 sm:pt-40 sm:pb-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="onDark">{eyebrow}</Eyebrow>

          <h1 className="mt-6 text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            {title}
          </h1>

          {deck ? (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {deck}
            </p>
          ) : null}

          {children}
        </Reveal>
      </Container>
    </div>
  );
}
