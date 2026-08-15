import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DitheredGalaxyField } from "@/components/sections/dithered-galaxy-field";

/**
 * Standard page masthead — the short version of the hero treatment, used on
 * every page except Home. The navbar overlays the top of it.
 *
 * Same dot field as the home hero, on the same page colour, so arriving on an
 * inner page reads as the same site rather than a different one. Two things
 * are dialled back for the shorter box:
 *
 * - The scrim is centred, not weighted upper-left. This copy is centred and
 *   has no empty corner to sit in, so the calm has to be in the middle.
 * - `intensity` fades the dots toward the ground. At masthead height the crop
 *   is a narrow horizontal band through the middle of the galaxy — its densest
 *   part, with none of the empty sky that gives the home hero its air — so at
 *   full strength it reads as a busy stripe behind the title rather than as a
 *   background.
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
    <div className="relative isolate overflow-hidden bg-surface-2">
      <DitheredGalaxyField scrim="center" intensity={0.55} />

      <Container className="relative z-10 pt-36 pb-20 sm:pt-40 sm:pb-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1 className="hero-type mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
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
