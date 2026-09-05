import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { DitheredGalaxyField } from "@/components/sections/dithered-galaxy-field";
import { Reveal } from "@/components/reveal";
import { hero } from "@/content/manufacturing";
import { site } from "@/content/site";

/**
 * The home hero: the wordmark, centred, on the dithered galaxy.
 *
 * The field is the same one every other masthead on the site sits on —
 * About, Services, Process, the closing CTA — so the home page opens in the
 * same room the rest of the site is in rather than in a different one. The
 * hero that stood here before drew its own picture (a perspective grid with
 * the brand mark in a gravity well) and was the one screen on the site with
 * a texture nothing else shared; the mark, which is a spiral galaxy, is also
 * the subject of this field, so it does not need to be drawn twice.
 *
 * The composition is the page masthead's, at full height: a centred stack,
 * the name in the display face blended into the dots, the one line under it,
 * the one action. Nothing else — the argument starts in the scene beneath.
 *
 * HOW IT HANDS OFF
 *
 * The section stops short of the viewport, on purpose. The black hole scene
 * under it starts with the hole's crest a few percent below its own top edge,
 * so with the hero at 86svh the top of that scene shows in the last stretch
 * of the first screen: the crest, and the pink halo above it, rising under
 * the copy. The reader sees the next thing coming before they move. The band
 * that used to sit between the two — a bordered strip carrying a second copy
 * of the sub-header's claim — was a wall between the two scenes; the page's
 * own description of itself is "one continuous picture", and now it is.
 *
 * `fadeBottom` on the field does the other half: the dots dissolve into the
 * page colour before the halo arrives, so the join is dark-into-glow rather
 * than dots-into-glow.
 */
export function DitheredGalaxyHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-surface-2"
      aria-labelledby="hero-title"
    >
      <DitheredGalaxyField scrim="center" intensity={0.8} />

      {/* Copy is centred in the box, with the nav's height taken off the top
          so "centred" is centred in what is visible under the bar. */}
      <Container className="relative z-10 flex min-h-[86svh] flex-col items-center justify-center pt-28 pb-24 text-center sm:pt-32 sm:pb-28">
        <Reveal className="flex flex-col items-center">
          {/* The name blends into the field rather than punching a hole in
              it — screen on the dark theme, multiply on the light. See
              --hero-type-blend, and the same class on every page masthead. */}
          <h1
            id="hero-title"
            className="hero-type font-display text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl xl:text-[5.75rem]"
          >
            {site.name}
          </h1>

          {/* The sub-header. Set well below the wordmark's size and weight —
              close to it in either and the line reads as a continuation of
              the name rather than as what the name does. */}
          <h2 className="mt-5 max-w-3xl text-lg leading-snug font-semibold text-ink sm:text-xl lg:text-[1.375rem]">
            {hero.subhead}
          </h2>

          <div className="mt-9 flex flex-col items-center gap-3">
            <BookACall size="lg" withArrow />
            <BookingNote />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
