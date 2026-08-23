/**
 * The flight: what the home page's scroll actually drives.
 *
 * Scroll maps to one number, t, from 0 at the top of the spine to 1 at the
 * bottom. Everything else — where the camera is, which copy is up, when the
 * cards leave the singularity — is a pure function of t. Nothing here holds
 * state, which is what lets the page be scrubbed backwards as convincingly as
 * forwards, and what lets a jump land anywhere without a transition to play.
 *
 * Beats own a slice of t proportional to the scroll height they ask for, so
 * pacing is edited in `vh` here rather than by hunting through numbers.
 */

export type BeatId =
  | "hero"
  | "small"
  | "problem"
  | "realise"
  | "plunge"
  | "crossing"
  | "build"
  | "estimator"
  | "book";

export type Beat = {
  id: BeatId;
  /** Shown in the rail. Omitted for the beats that are pure motion. */
  name?: string;
  /** Scroll height, in vh. This is the pacing control. */
  vh: number;
  t0: number;
  t1: number;
};

const SPINE: { id: BeatId; name?: string; vh: number }[] = [
  { id: "hero", name: "Start", vh: 110 },
  { id: "small", name: "The shift", vh: 150 },
  { id: "problem", name: "The problem", vh: 200 },
  { id: "realise", vh: 110 },
  { id: "plunge", vh: 100 },
  { id: "crossing", vh: 60 },
  { id: "build", name: "What we build", vh: 250 },
  { id: "estimator", name: "The cost", vh: 180 },
  { id: "book", name: "Book", vh: 90 },
];

export const BEATS: Beat[] = (() => {
  const total = SPINE.reduce((sum, b) => sum + b.vh, 0);
  let acc = 0;
  return SPINE.map((b) => {
    const t0 = acc / total;
    acc += b.vh;
    return { ...b, t0, t1: acc / total };
  });
})();

export const beatById = Object.fromEntries(
  BEATS.map((b) => [b.id, b]),
) as Record<BeatId, Beat>;

/** A point inside a beat, as a global t. */
export const at = (id: BeatId, u: number) => {
  const b = beatById[id];
  return b.t0 + u * (b.t1 - b.t0);
};

/* -------------------------------------------------------------------------- */
/* Camera                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Keyframes on an orbit around the hole: radius, elevation, azimuth, field of
 * view, and where the hole sits on screen.
 *
 * Radius is interpolated in log space — the fall covers 46 units down to 0.35,
 * and a linear ramp across that spends almost all of its time far away and
 * then crosses the last two orders of magnitude in a frame.
 *
 * The hole is parked off-centre while there is copy beside it, and pulled to
 * the middle as the fall starts, so the descent is down the axis of the frame.
 */
export type CamKey = {
  t: number;
  r: number;
  el: number;
  az: number;
  fov: number;
  cx: number;
  cy: number;
};

const KEYS_REL: ({ b: BeatId; u: number } & Omit<CamKey, "t">)[] = [
  { b: "hero", u: 0, r: 46, el: 18, az: 194, fov: 45, cx: 0.74, cy: 0.78 },
  { b: "hero", u: 1, r: 40, el: 17, az: 202, fov: 45, cx: 0.73, cy: 0.74 },
  { b: "small", u: 0, r: 38, el: 16, az: 206, fov: 45, cx: 0.73, cy: 0.72 },
  { b: "small", u: 1, r: 33, el: 15, az: 214, fov: 45, cx: 0.72, cy: 0.7 },
  { b: "problem", u: 0, r: 31, el: 14, az: 218, fov: 45, cx: 0.72, cy: 0.7 },
  { b: "problem", u: 1, r: 19, el: 10, az: 236, fov: 46, cx: 0.64, cy: 0.62 },
  { b: "realise", u: 0, r: 16, el: 8, az: 242, fov: 47, cx: 0.58, cy: 0.56 },
  { b: "realise", u: 1, r: 7, el: 3, az: 276, fov: 52, cx: 0.5, cy: 0.5 },
  { b: "plunge", u: 0, r: 5.4, el: 2.2, az: 300, fov: 57, cx: 0.5, cy: 0.5 },
  { b: "plunge", u: 0.7, r: 2.4, el: 0.6, az: 332, fov: 78, cx: 0.5, cy: 0.5 },
  { b: "crossing", u: 0, r: 1.2, el: 0, az: 344, fov: 95, cx: 0.5, cy: 0.5 },
  { b: "crossing", u: 0.53, r: 0.35, el: 0, az: 350, fov: 102, cx: 0.5, cy: 0.5 },
  { b: "build", u: 0, r: 1.6, el: 2, az: 356, fov: 98, cx: 0.5, cy: 0.5 },
  { b: "build", u: 0.5, r: 15, el: 24, az: 384, fov: 62, cx: 0.5, cy: 0.5 },
  { b: "estimator", u: 0, r: 18, el: 30, az: 392, fov: 58, cx: 0.5, cy: 0.42 },
  { b: "estimator", u: 1, r: 21, el: 40, az: 402, fov: 54, cx: 0.5, cy: 0.4 },
  { b: "book", u: 0, r: 23, el: 48, az: 410, fov: 50, cx: 0.5, cy: 0.5 },
  { b: "book", u: 1, r: 25, el: 50, az: 416, fov: 50, cx: 0.5, cy: 0.5 },
];

export const CAM_KEYS: CamKey[] = KEYS_REL.map((k) => ({
  ...k,
  t: at(k.b, k.u),
}));

/** The frame the horizon is crossed on. The flash is centred here. */
export const CROSSING = at("crossing", 0.53);

/** When the two families leave the singularity, and when they clear the frame. */
export const EMERGE_IN = at("build", 0.06);
export const EMERGE_OUT = at("build", 0.74);
export const FAMILIES_GONE_A = at("build", 0.94);
export const FAMILIES_GONE_B = at("estimator", 0.05);

/* -------------------------------------------------------------------------- */
/* Maths                                                                       */
/* -------------------------------------------------------------------------- */

export const clamp = (v: number, a: number, b: number) =>
  v < a ? a : v > b ? b : v;
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
/** Where t sits between a and b, clamped. */
export const inv = (t: number, a: number, b: number) =>
  b === a ? 0 : clamp((t - a) / (b - a), 0, 1);
export const smooth = (x: number) => x * x * (3 - 2 * x);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export function cameraAt(t: number): Omit<CamKey, "t"> {
  let i = 0;
  while (i < CAM_KEYS.length - 2 && t > CAM_KEYS[i + 1].t) i++;
  const a = CAM_KEYS[i];
  const b = CAM_KEYS[i + 1];
  const u = smooth(inv(t, a.t, b.t));
  return {
    // Log space: see the note on the keyframes above.
    r: Math.exp(lerp(Math.log(a.r), Math.log(b.r), u)),
    el: lerp(a.el, b.el, u),
    az: lerp(a.az, b.az, u),
    fov: lerp(a.fov, b.fov, u),
    cx: lerp(a.cx, b.cx, u),
    cy: lerp(a.cy, b.cy, u),
  };
}

/** Opacity for a beat's copy: up over its leading edge, down over its trailing. */
export function beatFade(t: number, id: BeatId, hold = 0.02) {
  const b = beatById[id];
  return Math.min(
    smooth(inv(t, b.t0 - hold, b.t0 + hold + 0.012)),
    1 - smooth(inv(t, b.t1 - hold - 0.012, b.t1 + hold)),
  );
}
