/**
 * The black hole's look and its opening geometry, shared between the scene
 * that scrubs it (black-hole-scene.tsx) and the hero above, which shows the
 * top of it before the scroll starts.
 *
 * A plain module with no "use client": the scene is a client component and
 * the hero is a server component, and a value exported from a client module
 * cannot be imported into a server one — it arrives as a client reference,
 * not a string. Keeping the constants here lets both sides draw from one
 * definition, which is the only way the halo in the hero and the halo in the
 * scene can meet at the seam without a step.
 */

/** How far the halo reaches, as a multiple of the hole radius. The hole
    element is drawn this much larger than the hole, with the disc, the
    photon ring and the halo all stops of one radial gradient. */
export const HALO = 1.5;
const DISC = 1 / HALO;
const pct = (k: number) => `${(k * DISC * 100).toFixed(2)}%`;

/** A near-black disc with a hot photon ring and a soft pink halo, all stops
    of one gradient, so it stays crisp at any size the scrub puts it through.
    Percentages are of the element, so the same string on two elements of the
    same size paints the same picture. */
export const HOLE_BACKGROUND = `radial-gradient(circle farthest-side at 50% 50%, #0b0a0c 0%, #0f0d10 ${pct(0.6)}, #17131a ${pct(0.84)}, #2a1520 ${pct(0.95)}, #ff6e9e ${pct(0.985)}, #f8206d ${pct(1)}, rgba(248,32,109,0.5) ${pct(1.02)}, rgba(255,110,158,0.2) ${pct(1.1)}, rgba(181,17,91,0.08) ${pct(1.25)}, rgba(181,17,91,0) 100%)`;

/**
 * The opening frame of the scrub: the hole so large only its crown shows.
 * Radius as a fraction of the viewport's longer side, and the crest's
 * distance below the top of the scene as a fraction of its height.
 *
 * The hero reproduces this in CSS (`max(100vw, 100vh)` and `vh`), so the
 * two numbers are the contract between the two files.
 */
export const R0_OF_LONG_SIDE = 0.66;
export const CREST_BELOW_TOP = 0.05;

/* --- Stars --------------------------------------------------------------
   The scene paints its stars on a canvas, positioned in the hole's own
   coordinate space and scaled by the zoom, so they spread as the camera
   pulls back. The hero cannot reuse that: at the opening zoom the stars sit
   between 1.25 and 7.25 hole-radii out, which puts about five of them inside
   the hero's box — the density the reader actually sees is the one from the
   far end of the scrub.

   So the hero gets its own field, and what the two share is the look. These
   are the scene's own values at the end of its zoom: alpha is `m * 0.7` for
   m in 0.4-1.0, and the radius is 0.6-1.7px, quoted here as diameters. */
export const STAR_COLOR = "#f5f3f4";
const STAR_MIN_D = 1.2;
const STAR_MAX_D = 3.4;
const STAR_MIN_A = 0.28;
const STAR_MAX_A = 0.7;

/** Deterministic, so the field is identical on every render and on every
    machine. A star field that changed between the server's HTML and the
    client's would be a hydration mismatch, and one that changed per build
    would make every screenshot diff noise. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = { x: number; y: number; d: number; a: number };

/**
 * A field of `count` stars as percentages of whatever box they are placed
 * in, with a diameter in px and a final opacity.
 *
 * Percentages rather than a viewBox because the box is a different shape at
 * every viewport: scaling an SVG to fit would stretch round stars into
 * ellipses, and cropping one would leave a wide screen's edges empty.
 */
export function starField(count: number, seed = 0x9e37): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    d: +(STAR_MIN_D + rand() * (STAR_MAX_D - STAR_MIN_D)).toFixed(2),
    a: +(STAR_MIN_A + rand() * (STAR_MAX_A - STAR_MIN_A)).toFixed(3),
  }));
}
