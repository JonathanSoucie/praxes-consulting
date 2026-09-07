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

/* --- The opening frame, in CSS ------------------------------------------
   The scrub computes r0 and cy0 in JS from window.innerHeight. Two places
   draw the same frame in flow instead, where there is no JS to ask: the hero
   above the seam, and the phone layout of the scene below it, which does not
   scrub at all. Both need the *same* circle, or the halo steps at the seam —
   so the CSS is written once here rather than twice in the two files.

   `vh` rather than `svh` on purpose: it is the unit the pair agrees on, and
   a hole whose size changed as a phone's URL bar collapsed would slide
   against the copy sitting over it. */
export const HOLE_R0_CSS = `(${R0_OF_LONG_SIDE} * max(100vw, 100vh))`;
/** The hole element is HALO times the hole's radius on every side. */
export const HOLE_SIZE_CSS = `calc(2 * ${HALO} * ${HOLE_R0_CSS})`;
/**
 * The hole element's `top`, given where the seam falls in its own box: the
 * hero's seam is its bottom edge ("100%"), the scene's is its top ("0px").
 * The centre sits r0 + the crest offset below the seam, and the element
 * starts HALO * r0 above the centre.
 */
export const holeTopCss = (seam: string) =>
  `calc(${seam} + ${CREST_BELOW_TOP * 100}vh - ${HALO - 1} * ${HOLE_R0_CSS})`;

/* --- The closing frame, on a phone --------------------------------------
   Where the scrub ends, the desktop leaves the hole as a dome on the bottom
   edge with the orbit around it. There is no room for an orbit on a phone
   and nothing to scrub toward, so the dome is simply drawn once at the foot
   of the scene. These are the same proportions the scrub settles on — the
   centre a touch above the bottom edge (`0.12 * r`), which shows a little
   over half the disc.

   The band's height is the halo's full reach above that centre, so the glow
   fades out inside the box instead of being cut off at its top. Get this
   wrong in the short direction and the box crops the disc mid-face, which
   draws a hard line across it. */
export const DOME_R_CSS = "min(46vw, 200px)";
export const DOME_BAND_H_CSS = `calc((${HALO} + 0.12) * ${DOME_R_CSS})`;
export const DOME_SIZE_CSS = `calc(2 * ${HALO} * ${DOME_R_CSS})`;
