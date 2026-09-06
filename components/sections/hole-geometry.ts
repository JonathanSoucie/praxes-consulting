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
