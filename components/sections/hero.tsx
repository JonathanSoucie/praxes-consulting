import { Container } from "@/components/container";
import { hero } from "@/content/manufacturing";
import {
  HOLE_BACKGROUND,
  HOLE_SIZE_CSS,
  holeTopCss,
  STAR_COLOR,
  starField,
} from "@/components/sections/hole-geometry";

/**
 * The home hero: a statement on the page's own ground, with the black hole
 * already rising into the bottom of the screen.
 *
 * Behind the copy: the same sky the scene has, and the top of the same
 * hole. The hero stops short of the viewport so the crest of the ring shows
 * in the last stretch of the first screen, with the halo above it.
 *
 * HOW THE HALO CROSSES THE SEAM
 *
 * The scene's frame clips at its own top edge, so on its own the halo would
 * start on a straight line where the hero ends. Instead the hero draws the
 * same halo itself: the same gradient string, on an element of the same
 * size, at the same position relative to the seam that the scene's hole has
 * at the top of its scrub. The two are one picture split across two boxes,
 * and they meet with no step because they are computed from one definition
 * (hole-geometry.ts). The scene's numbers are in JS from the viewport; these
 * are the same numbers in CSS — `max(100vw, 100vh)` for the long side, `vh`
 * for the crest offset.
 *
 * The hero clips at its bottom, so only the upper reach of the halo is ever
 * visible here; the ring itself sits below the seam, in the scene.
 */

/** The sky behind the copy. Generated once at module scope rather than per
    render — it never changes, and it is the same field on every page. */
const STARS = starField(110);

/** The hole, at the top of the scrub. The seam is the hero's bottom edge,
    so the circle is placed relative to `100%` — see hole-geometry.ts, which
    the scene's phone layout draws the other half of the same picture from. */
const SIZE = HOLE_SIZE_CSS;
const TOP = holeTopCss("100%");

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-surface-2"
      aria-labelledby="hero-title"
    >
      {/* The sky. Masked away toward the bottom, where the halo takes over:
          the glow would wash the stars out there anyway, and fading them
          means there is no step in star density at the seam, where the
          scene's own field is sparse. Before the halo in the DOM so the
          halo paints over it, which is the order the scene uses too. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 42%, transparent 88%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 42%, transparent 88%)",
        }}
      >
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.d}px`,
              height: `${star.d}px`,
              opacity: star.a,
              backgroundColor: STAR_COLOR,
            }}
          />
        ))}
      </div>

      {/* The black hole's halo, continued up into the hero — see the note
          above. Centred on the section, which is full-bleed, so its centre
          is the viewport's centre, the same as the scene's. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 rounded-full"
        style={{
          width: SIZE,
          height: SIZE,
          top: TOP,
          background: HOLE_BACKGROUND,
        }}
      />

      {/* Shorter than the viewport, so the scene's crest shows beneath the
          copy. 78svh leaves the top fifth of the scene in the first screen:
          the halo, and the ring at about five percent below the seam. The
          copy is centred in what is left, with symmetric padding so the
          centre is the section's centre. */}
      <Container className="hero-container relative z-10 flex min-h-[78svh] flex-col items-center justify-center py-20 text-center sm:py-24 lg:py-28">
        <div className="hero-copy flex w-full flex-col items-center">
          <h1 id="hero-title" className="hero-headline">
            {hero.headline}{" "}
            <span className="hero-highlight">{hero.highlight}</span>
          </h1>
          <hr aria-hidden className="hero-rule hero-rule-enter mt-8 w-full max-w-3xl sm:mt-10" />
          <p className="hero-deck mt-6 max-w-3xl text-base leading-relaxed text-ink-soft sm:mt-8 sm:text-lg">
            {hero.sub}
          </p>
        </div>
      </Container>
    </section>
  );
}
