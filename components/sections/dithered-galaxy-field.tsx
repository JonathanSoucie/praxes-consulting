"use client";

import * as React from "react";

import { GALAXY_POSTER } from "@/components/sections/galaxy-poster";
import { useResolvedTheme } from "@/lib/use-resolved-theme";
import { cn } from "@/lib/utils";

/**
 * public/galaxy.mp4 re-rendered every frame as an ordered-dither dot field,
 * with a rotational warp that follows the pointer.
 *
 * This is the background layer on its own — no copy, no layout. It fills
 * whatever positioned box it is dropped into, which is what lets the home hero
 * and every other page's masthead share one engine instead of two.
 *
 * ---------------------------------------------------------------------------
 * Tonal direction — read this before touching INVERT.
 *
 * The clip is an oil painting of a galaxy on bare linen: *dark pigment on a
 * light cream ground*, mean luma 0.64, with 69% of every frame sitting above
 * 0.6. It is not an astrophotograph, so the usual "bright subject on black
 * sky" reasoning is exactly backwards here.
 *
 * Ink therefore has to track darkness, which is why tone is inverted below.
 * With INVERT off, the empty sky fills solid and the galaxy punches out as a
 * hole — the dots land on the cream, which is the one part of the frame that
 * is supposed to stay bare.
 *
 * The ground you see is the canvas background colour, not a light tone: cells
 * that quantise to level 0 simply draw nothing and the page shows through.
 *
 * That is also what makes the hero theme-aware. Which cells take ink never
 * changes — it is always the painted galaxy, never the bare canvas. Only the
 * ground and the ink ramp swap: dark ink on white-smoke in light mode, light
 * ink on carbon black in dark mode. Flipping the ramp rather than the tone is
 * why the galaxy stays a galaxy in both.
 * ---------------------------------------------------------------------------
 */

/** Ground colour per theme — the page background, so the hero has no edge.
    Empty cells are simply this, because nothing is drawn over them. */
const GROUND = { light: "#f5f5f2", dark: "#181818" } as const;

const PIXEL_SIZE_DESKTOP = 6;
/** Small canvases need a *finer* grid, not a coarser one, or the arms merge. */
const PIXEL_SIZE_MOBILE = 4;
const MOBILE_BREAKPOINT = 768;

const SPACING = 0.2; // packed field — dots very nearly touch
const DOT_SCALE = 0.9;
const LEVELS = 5;
const COLOR_MIX = 0.18;

/* Contrast and brightness are retuned from the usual values for this asset.
   Auto-levelling maps the cream ground to tone ~0.05; a contrast of 25 with a
   negative brightness drives that below zero, which clips the linen weave to
   flat white and takes the faint speckle across the empty area with it. The
   speckle is the weave, so it has to survive the floor. */
const CONTRAST = 10;
const BRIGHTNESS = 4;

/** Deliberately low, so the weave reads as grain. Raise toward 0.03 only if
    the empty area goes muddy rather than speckled. */
const BLACK_FLOOR = 0.012;

/* Auto-level percentiles. The top is p99.5 rather than p98 because the frame
   is two-thirds cream: p98 lands *inside* the cream plateau and clips most of
   the ground, where a spread histogram would have put it above. */
const LEVEL_LO_PCT = 2;
const LEVEL_HI_PCT = 99.5;

/* Measured across ten timestamps of the shipped clip. Used for the poster and
   as the fallback if the sampling pass below fails, so the very first paint is
   already levelled correctly. */
const FALLBACK_LO = 0.2212;
const FALLBACK_HI = 0.8082;

const LEVEL_SAMPLE_COUNT = 10;
const LEVEL_SAMPLE_TIMEOUT_MS = 2500;

/**
 * Playback speed. The clip is four seconds long, which as an ambient
 * background cycled fast enough to read as motion rather than as drift. At a
 * quarter speed the same loop takes about fourteen seconds wall-clock.
 *
 * The wrap logic below is all in media time (currentTime), so it is unaffected
 * by this — the crossfade just takes proportionally longer in real seconds,
 * which suits it.
 */
const PLAYBACK_RATE = 0.25;

/**
 * Time constant for the per-cell temporal smoothing, in milliseconds.
 *
 * Ordered dither quantises into a handful of levels, so any cell whose tone
 * sits near a threshold flips level between consecutive frames and the field
 * crawls. Averaging each cell's luma over roughly this long damps that without
 * visibly lagging the motion. Set to 0 to disable.
 */
const FLICKER_DAMPING_MS = 120;

/** Crossfade length at the wrap, in seconds. */
const FADE_SECONDS = 0.7;

/* The blend reaches full head slightly before the swap, rather than still
   carrying a few percent of the tail when the elements change places. Without
   it the swap drops that remainder in one frame, which is the only visible
   step left in the wrap: it roughly halves how many cells change level there
   (measured on this clip, 3.4% -> 2.4%, against 1.7% for an ordinary frame). */
const FADE_SATURATE_SECONDS = 0.08;

/* Where to anchor the crop, in source coordinates.
   The galaxy's core sits at roughly (0.72, 0.68) of the frame, so a centred
   cover crop walks it off the edge as soon as the panel is taller than 16:9 —
   which it is on every phone. Anchoring near the core keeps the spiral in
   frame at any aspect, and keeps it low and right where the composition wants
   it, rather than centring on empty sky. */
const FOCUS_X = 0.66;
const FOCUS_Y = 0.62;

/* Pointer response: a small patch of the field moves under the cursor, and
   nothing else does.

   The warp is a rotation of the *sampling* coordinates about the pointer, so
   it costs nothing per frame — the grid itself never moves, it just reads from
   somewhere slightly different.

   What matters here is the radius, not the angle. Spread over 60% of the
   canvas the displacement is real but the gradient across any few centimetres
   is far too shallow to see, which is why the previous setting looked like
   nothing was happening at all. Concentrated into ~64px it peaks at about two
   cells of travel roughly 27px out from the cursor, and reads as the dots
   right under the pointer shifting. */
const WARP_RADIUS_PX = 64;
const MAX_TWIST = 0.7; // radians, at the pointer
/* Tight, because the effect is meant to sit under the cursor rather than
   trail behind it. */
const POINTER_LERP = 0.3;
const BLOOM_CELL_RADIUS = 5;
const BLOOM_DECAY_MS = 250;
const BLOOM_DOT_SWELL = 0.18;

const HUE_BINS = 12;
const ACHROMATIC_BIN = HUE_BINS;
const INK_SLOTS = HUE_BINS + 1;
const MIN_SATURATION = 0.04;

/**
 * Tone level -> ink, one ramp per theme. Sampling the dot colour from the
 * source does not work here: the painting's mid-tones are pale, and pale dots
 * disappear against either ground. The ramp carries the contrast; the source
 * only gets to push the hue (see buildInkTable).
 *
 * Both are stepped so each level roughly doubles its contrast against its own
 * ground. Taking the palette colours in their given order instead left a hole
 * between levels 2 and 3 — 3.9:1 straight to 10.2:1 — and the field banded
 * visibly where tone crossed it.
 *
 * Light runs periwinkle -> prussian blue, hitting #c4b5fd exactly at level 1
 * and topping out at 15.5:1.
 *
 * Dark runs carbon black -> powder blue, hitting #a7b1c5 exactly at level 4
 * and stopping at 12:1 rather than carrying on to white. Bright ink on a dark
 * ground asserts itself far harder than dark ink on a light one, and a peak at
 * full white-smoke made the core a glare that outshone the headline sitting at
 * 16.3:1. Capping the field below the type keeps the reading order right.
 */
const RAMP_LIGHT = [
  "#c4b5fd",
  "#a686f9",
  "#7956dc",
  "#3d4386",
  "#0a1c3b",
] as const;
const RAMP_DARK = [
  "#36373a",
  "#575b63",
  "#7b828f",
  "#a7b1c5",
  "#d0d5dd",
] as const;

const TAU = Math.PI * 2;

/* -------------------------------------------------------------------------- */
/* Dither matrix                                                              */
/* -------------------------------------------------------------------------- */

/**
 * 8x8 Bayer, built by recursing the 4x4 into each quadrant.
 *
 * Ordered dither rather than error diffusion on purpose: the regular grid is
 * the look, and a galaxy is all soft gradients, which is precisely where
 * Floyd–Steinberg starts worming.
 */
function buildBayer8(): Float32Array {
  const base = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const quadrant = [0, 2, 3, 1];
  const out = new Float32Array(64);
  for (let qy = 0; qy < 2; qy++) {
    for (let qx = 0; qx < 2; qx++) {
      const offset = quadrant[qy * 2 + qx];
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          out[(qy * 4 + y) * 8 + (qx * 4 + x)] = base[y * 4 + x] * 4 + offset;
        }
      }
    }
  }
  for (let i = 0; i < 64; i++) out[i] = (out[i] + 0.5) / 64;
  return out;
}

const BAYER = buildBayer8();

/* -------------------------------------------------------------------------- */
/* Colour                                                                     */
/* -------------------------------------------------------------------------- */

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d < 1e-9) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s < 1e-9) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    t = ((t % 1) + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(channel(h + 1 / 3) * 255),
    Math.round(channel(h) * 255),
    Math.round(channel(h - 1 / 3) * 255),
  ];
}

/**
 * Every ink the field can use: one per (tone level x source hue bin).
 *
 * Each entry is the ramp colour nudged COLOR_MIX of the way toward the hue of
 * the pixel underneath, keeping the ramp's own saturation and lightness. That
 * small mix is what gives the field its internal variation — the browns and
 * blues of the paint come through — without the artwork's palette taking over
 * the page. Quantising the hue lets the whole table be built once, so the draw
 * loop never touches HSL.
 */
function buildInkTable(ramp: readonly string[]): string[] {
  const table: string[] = new Array(LEVELS * INK_SLOTS);
  for (let level = 0; level < LEVELS; level++) {
    const [br, bg, bb] = hexToRgb(ramp[level]);
    const [bh, bs, bl] = rgbToHsl(br, bg, bb);
    for (let bin = 0; bin < INK_SLOTS; bin++) {
      if (bin === ACHROMATIC_BIN) {
        table[level * INK_SLOTS + bin] = ramp[level];
        continue;
      }
      const srcHue = (bin + 0.5) / HUE_BINS;
      // Shortest way round the wheel, so red and magenta don't mix through green.
      const delta = ((srcHue - bh + 0.5) % 1) - 0.5;
      const [r, g, b] = hslToRgb(bh + delta * COLOR_MIX, bs, bl);
      table[level * INK_SLOTS + bin] = `rgb(${r},${g},${b})`;
    }
  }
  return table;
}

/* Both built once at module load — two arrays of 65 colour strings, so a
   theme change is a lookup rather than a rebuild. */
const INK_TABLES = {
  light: buildInkTable(RAMP_LIGHT),
  dark: buildInkTable(RAMP_DARK),
} as const;

/** Hue bucket of a source pixel, or ACHROMATIC_BIN when there's no hue to speak of. */
function hueBinOf(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  if (max < 6) return ACHROMATIC_BIN;
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d / max < MIN_SATURATION) return ACHROMATIC_BIN;
  let h: number;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h /= 6;
  const bin = Math.floor(h * HUE_BINS);
  return bin < 0 ? 0 : bin >= HUE_BINS ? HUE_BINS - 1 : bin;
}

/* -------------------------------------------------------------------------- */
/* Engine                                                                     */
/* -------------------------------------------------------------------------- */

/** Contrast factor, the standard -255..255 curve. */
const CONTRAST_F = (259 * (CONTRAST + 255)) / (255 * (259 - CONTRAST));

/** cos/sin of the twist, sampled over the falloff so the loop does no trig. */
const TWIST_LUT_SIZE = 64;
const TWIST_COS = new Float32Array(TWIST_LUT_SIZE);
const TWIST_SIN = new Float32Array(TWIST_LUT_SIZE);
for (let i = 0; i < TWIST_LUT_SIZE; i++) {
  const angle = (MAX_TWIST * i) / (TWIST_LUT_SIZE - 1);
  TWIST_COS[i] = Math.cos(angle);
  TWIST_SIN[i] = Math.sin(angle);
}

type Grid = {
  cols: number;
  rows: number;
  pixelSize: number;
  buffer: HTMLCanvasElement;
  bufferCtx: CanvasRenderingContext2D;
  radii: Float32Array;
  bloom: Float32Array;
  /** Per-cell running average of luma — see FLICKER_DAMPING_MS. */
  lumaEma: Float32Array;
  /** False until the first frame has seeded lumaEma with real values. */
  emaSeeded: boolean;
  buckets: number[][];
};

/** Where the scrim is weighted — see the comment on the elements below. */
export type GalaxyScrim = "upper-left" | "center" | "none";

export function DitheredGalaxyField({
  className,
  scrim = "upper-left",
  fadeBottom = true,
  intensity = 1,
  zoom = 1,
}: {
  className?: string;
  /** "upper-left" for copy in the corner, "center" for a centred masthead. */
  scrim?: GalaxyScrim;
  /** Dissolve the field into the page along the bottom edge. */
  fadeBottom?: boolean;
  /** 0-1. Below 1 the dots fade toward the ground, so the field reads as
      texture rather than subject — used by the shorter page mastheads. */
  intensity?: number;
  /**
   * Multiplier on the cover scale. Above 1 the source is drawn larger than the
   * box, so the galaxy fills more of it. Short, wide bands need this: a plain
   * cover fit puts the whole 16:9 frame across the width and leaves the
   * subject as a smear at one end.
   */
  zoom?: number;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // Two elements, same asset, so the wrap can crossfade without either one
  // being seeked while it is the thing on screen.
  const videoARef = React.useRef<HTMLVideoElement>(null);
  const videoBRef = React.useRef<HTMLVideoElement>(null);

  /* The draw loop reads the theme through a ref rather than taking it as a
     dependency: rebuilding the effect on a toggle would tear down both video
     elements and restart playback from zero, which is a very visible way to
     change a colour. Selecting the ground and ink table per frame costs two
     property lookups. */
  const theme = useResolvedTheme();
  const themeRef = React.useRef(theme);
  const repaintRef = React.useRef<((now: number) => void) | null>(null);

  React.useEffect(() => {
    themeRef.current = theme;
    // Under reduced motion nothing is scheduled, so the new palette would not
    // appear until the next resize without an explicit repaint.
    repaintRef.current?.(performance.now());
  }, [theme]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const panel = rootRef.current;
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!canvas || !panel || !videoA || !videoB) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // No hover means no cursor to react to; the warp would only ever fire on
    // tap, which reads as a glitch rather than a response.
    const pointerEnabled =
      !reduceMotion && window.matchMedia("(hover: hover)").matches;

    let grid: Grid | null = null;
    let frameId = 0;
    let disposed = false;
    let lastFrameTime = 0;

    let levelLo = FALLBACK_LO;
    let levelHi = FALLBACK_HI;

    // Which element is currently on screen; they swap at every wrap.
    let primary = videoA;
    let secondary = videoB;
    let fadeAlpha = 0;
    let fading = false;

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerInside = false;

    let onScreen = true;
    let poster: HTMLImageElement | null = null;
    let lastFrameUsedPoster = true;

    /* ---------------------------------------------------------------- */
    /* Grid                                                              */
    /* ---------------------------------------------------------------- */

    // Arrow consts rather than hoisted declarations: these close over `canvas`
    // and `ctx`, and TypeScript only carries the null-narrowing above into a
    // closure that is assigned after it.
    const buildGrid = (): Grid | null => {
      const rect = panel.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return null;

      const pixelSize =
        rect.width < MOBILE_BREAKPOINT ? PIXEL_SIZE_MOBILE : PIXEL_SIZE_DESKTOP;
      const cols = Math.max(1, Math.ceil(rect.width / pixelSize));
      const rows = Math.max(1, Math.ceil(rect.height / pixelSize));

      // Capped at 2: the grid is already the resolution limit, so a 3x backing
      // store costs fill rate and buys nothing you can see.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // One buffer pixel per output block. Everything is measured on this
      // small buffer, which is what makes a per-frame dither affordable.
      const buffer = document.createElement("canvas");
      buffer.width = cols;
      buffer.height = rows;
      const bufferCtx = buffer.getContext("2d", {
        alpha: false,
        willReadFrequently: true,
      });
      if (!bufferCtx) return null;
      bufferCtx.fillStyle = GROUND[themeRef.current];
      bufferCtx.fillRect(0, 0, cols, rows);

      const buckets: number[][] = new Array(LEVELS * INK_SLOTS);
      for (let i = 0; i < buckets.length; i++) buckets[i] = [];

      return {
        cols,
        rows,
        pixelSize,
        buffer,
        bufferCtx,
        radii: new Float32Array(cols * rows),
        bloom: new Float32Array(cols * rows),
        lumaEma: new Float32Array(cols * rows),
        emaSeeded: false,
        buckets,
      };
    };

    /* ---------------------------------------------------------------- */
    /* Frozen auto-levels                                                */
    /* ---------------------------------------------------------------- */

    /**
     * Sample the clip once, then never measure again.
     *
     * Re-levelling per frame makes the dot density visibly pulse, and on this
     * clip it would pulse hard: the painting fills in as it plays, so mean
     * brightness genuinely drifts over the four seconds. Freezing at init is
     * what keeps the density constant across the loop.
     */
    async function measureLevels() {
      const probe = document.createElement("video");
      probe.src = primary.currentSrc || primary.src;
      probe.muted = true;
      probe.playsInline = true;
      probe.preload = "auto";

      const scratch = document.createElement("canvas");
      scratch.width = 160;
      scratch.height = 90;
      const scratchCtx = scratch.getContext("2d", {
        alpha: false,
        willReadFrequently: true,
      });
      if (!scratchCtx) return;

      const ready = new Promise<void>((resolve, reject) => {
        probe.onloadeddata = () => resolve();
        probe.onerror = () => reject(new Error("probe failed"));
      });
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("probe timed out")),
          LEVEL_SAMPLE_TIMEOUT_MS,
        ),
      );

      try {
        await Promise.race([ready, timeout]);
        const duration = probe.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;

        const histogram = new Float64Array(256);
        let counted = 0;

        for (let i = 0; i < LEVEL_SAMPLE_COUNT; i++) {
          if (disposed) return;
          const t = (duration * i) / (LEVEL_SAMPLE_COUNT - 1);
          await Promise.race([
            new Promise<void>((resolve) => {
              probe.onseeked = () => resolve();
              probe.currentTime = Math.min(t, duration - 0.01);
            }),
            timeout,
          ]);
          scratchCtx.drawImage(probe, 0, 0, scratch.width, scratch.height);
          const { data } = scratchCtx.getImageData(
            0,
            0,
            scratch.width,
            scratch.height,
          );
          for (let p = 0; p < data.length; p += 4) {
            const luma =
              0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2];
            histogram[Math.min(255, Math.round(luma))]++;
            counted++;
          }
        }

        if (!counted) return;
        const at = (pct: number) => {
          const target = (counted * pct) / 100;
          let acc = 0;
          for (let i = 0; i < 256; i++) {
            acc += histogram[i];
            if (acc >= target) return i / 255;
          }
          return 1;
        };
        const lo = at(LEVEL_LO_PCT);
        const hi = at(LEVEL_HI_PCT);
        if (hi - lo > 0.05) {
          levelLo = lo;
          levelHi = hi;
        }
      } catch {
        // Keep the baked-in constants; they were measured from this same clip.
      } finally {
        probe.removeAttribute("src");
        probe.load();
      }
    }

    /* ---------------------------------------------------------------- */
    /* Source composition                                                */
    /* ---------------------------------------------------------------- */

    /** object-fit: cover with an object-position, in buffer space. */
    function drawCover(
      target: CanvasRenderingContext2D,
      source: CanvasImageSource,
      sw: number,
      sh: number,
      cols: number,
      rows: number,
    ) {
      if (!sw || !sh) return;
      const scale = Math.max(cols / sw, rows / sh) * zoom;
      const w = sw * scale;
      const h = sh * scale;
      target.drawImage(
        source,
        (cols - w) * FOCUS_X,
        (rows - h) * FOCUS_Y,
        w,
        h,
      );
    }

    /**
     * Advance the wrap crossfade.
     *
     * The clip does not loop: it is a painting being painted, so the last
     * frame carries strokes the first one does not — a hard cut back to zero
     * is a visible jump, not a seam you can hunt for. So the tail dissolves
     * into the head instead, and playback resumes at FADE_SECONDS, which is
     * the point the head reached. Nothing is ever seeked while it is the
     * element being displayed, so the swap itself costs no hitch.
     */
    function advanceLoop() {
      const duration = primary.duration;
      // Short or still sources have no room for a crossfade; let the element
      // loop natively and leave the blend out of it.
      if (!Number.isFinite(duration) || duration < FADE_SECONDS * 2 + 0.5) {
        primary.loop = true;
        fading = false;
        fadeAlpha = 0;
        return;
      }
      primary.loop = false;

      const fadeStart = duration - FADE_SECONDS;
      const t = primary.currentTime;

      if (t >= fadeStart) {
        if (!fading) {
          fading = true;
          secondary.currentTime = 0;
          secondary.playbackRate = PLAYBACK_RATE;
          void secondary.play().catch(() => {});
        }
        fadeAlpha = Math.min(
          1,
          (t - fadeStart) /
            Math.max(FADE_SECONDS - FADE_SATURATE_SECONDS, 0.01),
        );

        if (t >= duration - 0.05 || primary.ended) {
          // The head is fully faded in and sitting at FADE_SECONDS. Promote it
          // and park the old primary; it becomes the head next time round.
          primary.pause();
          const spent = primary;
          primary = secondary;
          secondary = spent;
          primary.loop = false;
          fading = false;
          fadeAlpha = 0;
        }
      } else {
        fading = false;
        fadeAlpha = 0;
      }
    }

    /* ---------------------------------------------------------------- */
    /* Draw                                                              */
    /* ---------------------------------------------------------------- */

    const renderFrame = (now: number) => {
      if (!grid) return;
      const {
        cols,
        rows,
        pixelSize,
        bufferCtx,
        radii,
        bloom,
        buckets,
        lumaEma,
      } = grid;
      // lastFrameTime is zeroed by start(), so this is true on the first frame
      // of every run — including after the tab or the observer paused us.
      const resumed = lastFrameTime === 0;
      const dt = lastFrameTime ? Math.min(now - lastFrameTime, 100) : 16;
      lastFrameTime = now;
      // Framerate-independent: the same wall-clock smoothing whether the
      // browser is serving 60fps or throttling to 30.
      const emaK =
        FLICKER_DAMPING_MS > 0 ? 1 - Math.exp(-dt / FLICKER_DAMPING_MS) : 1;

      // 1. Compose the source into the small buffer.
      let usedPoster = false;
      const ready = primary.readyState >= 2;
      if (ready) {
        drawCover(
          bufferCtx,
          primary,
          primary.videoWidth,
          primary.videoHeight,
          cols,
          rows,
        );
        if (fading && fadeAlpha > 0 && secondary.readyState >= 2) {
          bufferCtx.globalAlpha = fadeAlpha;
          drawCover(
            bufferCtx,
            secondary,
            secondary.videoWidth,
            secondary.videoHeight,
            cols,
            rows,
          );
          bufferCtx.globalAlpha = 1;
        }
        usedPoster = false;
      } else if (poster) {
        usedPoster = true;
        drawCover(
          bufferCtx,
          poster,
          poster.naturalWidth,
          poster.naturalHeight,
          cols,
          rows,
        );
      } else {
        return;
      }

      const source = bufferCtx.getImageData(0, 0, cols, rows).data;

      /* Snap rather than average when the running value cannot be trusted: on
         the first frame of a run, and on the handover from the low-resolution
         poster to the video. Crawling 13% per frame out of a stale value left
         the field looking washed out for the first few hundred milliseconds —
         and under reduced motion, where exactly one frame is ever drawn, it
         would have stayed that way. */
      const sourceChanged = usedPoster !== lastFrameUsedPoster;
      lastFrameUsedPoster = usedPoster;
      const emaSeeded = grid.emaSeeded && !resumed && !sourceChanged;

      // 2. Pointer easing, so the field lags the cursor slightly.
      if (pointerEnabled && pointerInside) {
        pointerX += (targetX - pointerX) * POINTER_LERP;
        pointerY += (targetY - pointerY) * POINTER_LERP;
      }

      // 3. Bloom decays everywhere, then is re-lit around the cursor. Doing it
      //    as a field rather than a distance test is what makes it trail.
      const decay = Math.exp(-dt / BLOOM_DECAY_MS);
      const warpOn = pointerEnabled && pointerInside;
      for (let i = 0; i < bloom.length; i++) bloom[i] *= decay;
      if (warpOn) {
        const pcx = pointerX / pixelSize;
        const pcy = pointerY / pixelSize;
        const reach = Math.ceil(BLOOM_CELL_RADIUS) + 1;
        const gx0 = Math.max(0, Math.floor(pcx - reach));
        const gx1 = Math.min(cols - 1, Math.ceil(pcx + reach));
        const gy0 = Math.max(0, Math.floor(pcy - reach));
        const gy1 = Math.min(rows - 1, Math.ceil(pcy + reach));
        for (let gy = gy0; gy <= gy1; gy++) {
          for (let gx = gx0; gx <= gx1; gx++) {
            const d = Math.hypot(gx + 0.5 - pcx, gy + 0.5 - pcy);
            if (d > BLOOM_CELL_RADIUS) continue;
            const v = 1 - d / BLOOM_CELL_RADIUS;
            const i = gy * cols + gx;
            if (v > bloom[i]) bloom[i] = v;
          }
        }
      }

      // 4. Ground. Empty cells are simply this — the page colour, so the
      //    hero has no edge against the section below. Measured in CSS pixels,
      //    since the context is already scaled by the device pixel ratio.
      const theme = themeRef.current;
      const inkTable = INK_TABLES[theme];
      const viewW = canvas.clientWidth;
      const viewH = canvas.clientHeight;
      ctx.fillStyle = GROUND[theme];
      ctx.fillRect(0, 0, viewW, viewH);

      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length) buckets[i].length = 0;
      }

      const warpRadius = WARP_RADIUS_PX;
      const cell = pixelSize * (1 - SPACING);
      const half = pixelSize / 2;
      const levelSpan = 1 / Math.max(levelHi - levelLo, 1e-6);

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const index = gy * cols + gx;

          // 5. Warp displaces where we *read*, never what we draw, so the
          //    twist is free: the grid itself never moves.
          let sx = gx;
          let sy = gy;
          if (warpOn) {
            const px = gx * pixelSize + half;
            const py = gy * pixelSize + half;
            const dx = px - pointerX;
            const dy = py - pointerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < warpRadius) {
              const u = dist / warpRadius;
              // Smoothstep, so the edge of the affected area has no seam.
              const ease = 1 - u * u * (3 - 2 * u);
              const li = (ease * (TWIST_LUT_SIZE - 1)) | 0;
              const c = TWIST_COS[li];
              const s = TWIST_SIN[li];
              sx = ((pointerX + dx * c - dy * s) / pixelSize) | 0;
              sy = ((pointerY + dx * s + dy * c) / pixelSize) | 0;
              sx = sx < 0 ? 0 : sx >= cols ? cols - 1 : sx;
              sy = sy < 0 ? 0 : sy >= rows ? rows - 1 : sy;
            }
          }

          const p = (sy * cols + sx) * 4;
          const r = source[p];
          const g = source[p + 1];
          const b = source[p + 2];

          const rawLuma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // Damp on the way in, so the smoothing happens in continuous luma
          // rather than after quantisation — averaging discrete levels would
          // just trade flicker for smearing.
          const luma = emaSeeded
            ? lumaEma[index] + (rawLuma - lumaEma[index]) * emaK
            : rawLuma;
          lumaEma[index] = luma;

          let n = (luma / 255 - levelLo) * levelSpan;
          n = n < 0 ? 0 : n > 1 ? 1 : n;

          // The inversion. See the header note.
          let tone = 1 - n;
          tone = (tone - 0.5) * CONTRAST_F + 0.5 + BRIGHTNESS / 255;
          tone = tone < 0 ? 0 : tone > 1 ? 1 : tone;
          if (tone < BLACK_FLOOR) tone = 0;

          const threshold = BAYER[(gy & 7) * 8 + (gx & 7)];
          let level = (tone * LEVELS + threshold) | 0;

          const glow = bloom[index];
          if (level < 1) continue;
          if (level > LEVELS) level = LEVELS;

          radii[index] =
            cell *
            0.5 *
            DOT_SCALE *
            (0.45 + (0.55 * level) / LEVELS) *
            (1 + BLOOM_DOT_SWELL * glow);

          buckets[(level - 1) * INK_SLOTS + hueBinOf(r, g, b)].push(index);
        }
      }

      grid.emaSeeded = true;

      // 6. One fillStyle and one path per ink per frame, rather than per dot.
      for (let i = 0; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (!bucket.length) continue;
        ctx.fillStyle = inkTable[i];
        ctx.beginPath();
        for (let k = 0; k < bucket.length; k++) {
          const index = bucket[k];
          const gx = index % cols;
          const gy = (index / cols) | 0;
          const radius = radii[index];
          const cx = gx * pixelSize + half;
          const cy = gy * pixelSize + half;
          ctx.moveTo(cx + radius, cy);
          ctx.arc(cx, cy, radius, 0, TAU);
        }
        ctx.fill();
      }
    };

    /* ---------------------------------------------------------------- */
    /* Loop                                                              */
    /* ---------------------------------------------------------------- */

    function tick(now: number) {
      if (disposed) return;
      advanceLoop();
      renderFrame(now);
      frameId = requestAnimationFrame(tick);
    }

    function start() {
      if (disposed || reduceMotion || frameId) return;
      primary.playbackRate = PLAYBACK_RATE;
      void primary.play().catch(() => {});
      lastFrameTime = 0;
      frameId = requestAnimationFrame(tick);
    }

    function stop() {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      primary.pause();
      secondary.pause();
    }

    /* ---------------------------------------------------------------- */
    /* Wiring                                                            */
    /* ---------------------------------------------------------------- */

    grid = buildGrid();
    repaintRef.current = renderFrame;

    // Poster first, so the hero is never a bare ground while the video decodes.
    poster = new Image();
    poster.onload = () => {
      if (disposed || !grid) return;
      if (primary.readyState < 2) renderFrame(performance.now());
    };
    poster.src = GALAXY_POSTER;

    /* `autoPlay` starts the element on its own, before start() ever runs, so
       setting the rate only there left the first pass playing at 1x. Both
       elements get it as soon as they can accept it, and start() re-applies
       it because a load() resets the property. */
    const applyRate = () => {
      videoA.playbackRate = PLAYBACK_RATE;
      videoB.playbackRate = PLAYBACK_RATE;
    };
    applyRate();
    videoA.addEventListener("loadedmetadata", applyRate);
    videoB.addEventListener("loadedmetadata", applyRate);

    const onLoaded = () => {
      if (disposed) return;
      applyRate();
      renderFrame(performance.now());
      if (!reduceMotion && onScreen && !document.hidden) start();
    };
    primary.addEventListener("loadeddata", onLoaded);

    if (primary.readyState >= 2) onLoaded();

    void measureLevels();

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (disposed) return;
        grid = buildGrid();
        renderFrame(performance.now());
      }, 150);
    });
    resizeObserver.observe(panel);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(panel);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* Bound to the window, not to this element.

       Two reasons, both of which silently killed the interaction when the
       field was split out of the hero. The field's own root is
       `pointer-events: none` — it has to be, since it covers the whole
       section — so it never receives a pointer event at all. And it is now a
       *sibling* of the copy rather than an ancestor of it, so nothing bubbles
       up from the headline or the buttons either.

       Listening on the window and testing the canvas rect sidesteps both, and
       keeps working whatever a consumer layers on top. */
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointerInside = false;
        return;
      }
      targetX = x;
      targetY = y;
      if (!pointerInside) {
        // Snap on entry rather than easing in from wherever it last was,
        // which would drag a visible ripple across the field.
        pointerInside = true;
        pointerX = x;
        pointerY = y;
      }
    };
    // Pointer left the document entirely; no further moves will arrive, so the
    // effect would otherwise freeze wherever it was last seen.
    const onPointerLeave = () => {
      pointerInside = false;
    };

    if (pointerEnabled) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave, {
        passive: true,
      });
    }

    return () => {
      disposed = true;
      repaintRef.current = null;
      stop();
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      primary.removeEventListener("loadeddata", onLoaded);
      videoA.removeEventListener("loadedmetadata", applyRate);
      videoB.removeEventListener("loadedmetadata", applyRate);
      if (pointerEnabled) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, []);

  const groundColor = GROUND[theme];

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={intensity < 1 ? { opacity: intensity } : undefined}
      />

      {/*
        Directional scrim. Weighted to wherever the copy actually sits, and
        gone well before the far edge, so it lifts the words off the field
        without flattening it. A gradient rather than a backing panel: the
        dots keep showing through, they just stop competing.

        "upper-left" is the home hero, whose copy sits in the corner the
        galaxy leaves empty. "center" is the page mastheads and the short
        bands, where the copy is centred and has no empty corner to sit in.

        That one is deliberately tight rather than wide: it needs to be opaque
        where the words are and gone everywhere else. Spread across the full
        box it protected the text but erased the field with it, leaving dots
        only in the corners — and light text over bright dots measures 1.5:1,
        so simply weakening it is not an option either.
      */}
      {scrim === "upper-left" ? (
        <>
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background: `linear-gradient(180deg, ${groundColor}F7 0%, ${groundColor}EE 36%, ${groundColor}D6 56%, ${groundColor}8A 70%, ${groundColor}00 86%)`,
            }}
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background: `linear-gradient(112deg, ${groundColor}E6 0%, ${groundColor}B3 26%, ${groundColor}4D 44%, ${groundColor}00 62%)`,
            }}
          />
        </>
      ) : null}

      {scrim === "center" ? (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 62% at 50% 48%, ${groundColor}F2 0%, ${groundColor}DB 44%, ${groundColor}8C 70%, ${groundColor}00 94%)`,
          }}
        />
      ) : null}

      {fadeBottom ? (
        // The field dissolves into the page instead of stopping on a line, so
        // the section hands off to the one below rather than ending.
        <div
          className="absolute inset-x-0 bottom-0 h-24 sm:h-40"
          style={{
            background: `linear-gradient(180deg, ${groundColor}00 0%, ${groundColor}A6 55%, ${groundColor} 100%)`,
          }}
        />
      ) : null}

      {/* Present but invisible rather than `display: none` — a hidden video
          is allowed to stop decoding, and these two exist only to be read
          into the buffer. Kept at 1px in the corner, under the canvas. */}
      <video
        ref={videoARef}
        className="absolute top-0 left-0 -z-10 size-px opacity-0"
        src="/galaxy.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />
      <video
        ref={videoBRef}
        className="absolute top-0 left-0 -z-10 size-px opacity-0"
        src="/galaxy.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
