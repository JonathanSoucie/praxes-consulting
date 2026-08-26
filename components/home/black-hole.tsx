"use client";

import * as React from "react";

/**
 * The accretion disk behind the hero headline.
 *
 * On a white page the hole is the page. There is no dark disc painted in the
 * middle — the middle is simply left empty, the disk is drawn as pink density
 * orbiting around it, and the headline sits in the void. That reads as a
 * black hole for the same reason the real ones are visible at all (you see
 * what is falling in, never the thing itself), and it is the only version
 * that keeps dark type over the artwork fully legible.
 *
 * Nothing here is a shader or a physics sim. It is a few hundred particles on
 * circular orbits, projected with a tilt and drawn as short streaks along
 * their direction of travel — streaks rather than dots, which is what reads
 * as orbital motion instead of as a field of speckles. Keplerian falloff
 * (speed goes as r^-1.5) does the rest: the inner orbits shear past the outer
 * ones, and the eye reads the shear as mass at the centre. The technique is
 * carried over from the retired flight home page (archive/flight/), retuned
 * for a light ground.
 *
 * Retuned specifically means: no additive blending. On black, additive is how
 * you get glow; on white it drives everything toward the paper and the disk
 * disappears. Here the particles are alpha-composited pink, so brightness
 * becomes ink density — where orbits crowd (the inner edge) the pink
 * accumulates and darkens, which is the same visual cue arriving by the
 * opposite route.
 */

/** Matches --color-page. The trail fade paints this over the last frame. */
const PAGE = "#fafafa";

/* Inner to outer. The logo's three pinks, densest at the inner edge where the
   orbits crowd — no fourth colour, and nothing paler than #FF6E9E, which is
   already close to invisible on this ground. */
const COLORS = ["#b5115b", "#d4145f", "#f8206d", "#ff6e9e"];

/** Disk extent, in orbital units. Scaled to the container at draw time. */
const R_IN = 1.0;
const R_OUT = 2.55;
/**
 * How flat the disk sits — lower is more edge-on. Responsive, because a
 * fixed value does not survive the aspect change: 0.3 across a desktop hero
 * is a wide shallow disk, and the same 0.3 in a phone-width column collapses
 * to a 140px band whose arcs read as tufts of scribble at the left and right
 * edges rather than as one orbit. Narrow viewports get a rounder disk.
 */
function tiltFor(w: number) {
  return w < 700 ? 0.5 : 0.3;
}

/**
 * Particles are bucketed by (colour, weight) at build time and drawn one
 * bucket per path. A disk dense enough to read as a surface rather than as
 * scratches needs a few thousand streaks, and a few thousand individual
 * stroke() calls is where a canvas stops holding 60fps. Batching turns that
 * into ALPHAS.length * COLORS.length strokes per frame — twelve — regardless
 * of how many particles are in them.
 */
type Particle = {
  r: number;
  az: number;
  spd: number;
  /** Index into BUCKETS. */
  b: number;
};

/** Per-bucket weight. Index within a colour band. */
const ALPHAS = [0.13, 0.21, 0.31];
const WIDTHS = [0.8, 1.1, 1.6];
const BUCKETS = COLORS.length * ALPHAS.length;

function buildDisk(n: number): Particle[] {
  const out: Particle[] = new Array(n);
  for (let i = 0; i < n; i++) {
    // Biased inward: an even radial spread reads as a ring, not a disk.
    const q = Math.pow(Math.random(), 1.6);
    const r = R_IN + q * (R_OUT - R_IN);
    // Colour tracks radius, with a little bleed so the bands do not stripe.
    const t = (r - R_IN) / (R_OUT - R_IN);
    // Colour tracks radius, with a little bleed so the bands do not stripe.
    const ci = Math.min(
      COLORS.length - 1,
      Math.max(0, Math.round(t * (COLORS.length - 1) + (Math.random() - 0.5))),
    );
    // Inner orbits carry more weight; outer ones thin toward the rim.
    const wi = Math.min(
      ALPHAS.length - 1,
      Math.max(0, Math.floor((1 - t) * ALPHAS.length * 0.85 + Math.random() * 0.9)),
    );
    out[i] = {
      r,
      az: Math.random() * Math.PI * 2,
      spd: Math.pow(r, -1.5),
      b: ci * ALPHAS.length + wi,
    };
  }
  return out;
}

export function BlackHole({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let byBucket: Particle[][] = [];
    let raf = 0;
    let visible = true;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      // Cap the ratio: this is a soft, blurred-looking field, and rendering
      // it at 3x on a phone costs three times the fill for no visible gain.
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = PAGE;
      ctx.fillRect(0, 0, w, h);
      // Particle count follows area, so a wide desktop disk is not made of
      // the same few hundred streaks a phone gets.
      const target = Math.round(Math.min(4200, Math.max(700, (w * h) / 190)));
      if (particles.length !== target) {
        particles = buildDisk(target);
        byBucket = Array.from({ length: BUCKETS }, () => [] as Particle[]);
        for (const p of particles) byBucket[p.b].push(p);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || w === 0) return;

      // Clamp the step so a backgrounded tab does not resume by teleporting
      // every particle a quarter turn around the disk.
      const dt = Math.min(48, now - last || 16);
      last = now;

      // Trail: paint the page colour over the last frame at LOW alpha, so
      // each streak decays behind its particle instead of being erased. At
      // full alpha this is a clear, not a fade, and the disk renders as
      // isolated specks — which is exactly what it did.
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = PAGE;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const tilt = tiltFor(w);
      const unit = Math.min(
        w / (R_OUT * 2.05),
        h / (R_OUT * 2 * tilt * 1.6),
      );

      ctx.lineCap = "round";

      // Advance everything first, then draw a path per bucket.
      for (const p of particles) p.az += p.spd * dt * 0.00042;

      for (let b = 0; b < BUCKETS; b++) {
        const bucket = byBucket[b];
        if (bucket.length === 0) continue;
        ctx.beginPath();
        for (const p of bucket) {
          const back = p.az - p.spd * dt * 0.00042;
          ctx.moveTo(
            cx + Math.cos(back) * p.r * unit,
            cy + Math.sin(back) * p.r * unit * tilt,
          );
          ctx.lineTo(
            cx + Math.cos(p.az) * p.r * unit,
            cy + Math.sin(p.az) * p.r * unit * tilt,
          );
        }
        ctx.globalAlpha = ALPHAS[b % ALPHAS.length];
        ctx.strokeStyle = COLORS[Math.floor(b / ALPHAS.length)];
        ctx.lineWidth = WIDTHS[b % ALPHAS.length];
        ctx.stroke();
      }
    };

    resize();

    if (reduced) {
      // One frame, held. The disk is still there and still says what it says;
      // it just is not moving. Advance each particle once so the streaks have
      // length rather than rendering as points.
      last = 0;
      const dt = 16;
      const cx = w / 2;
      const cy = h / 2;
      const tilt = tiltFor(w);
      const unit = Math.min(
        w / (R_OUT * 2.05),
        h / (R_OUT * 2 * tilt * 1.6),
      );
      ctx.lineCap = "round";
      for (let b = 0; b < BUCKETS; b++) {
        const bucket = byBucket[b];
        if (bucket.length === 0) continue;
        ctx.beginPath();
        for (const p of bucket) {
          const back = p.az;
          p.az += p.spd * dt * 0.02;
          ctx.moveTo(
            cx + Math.cos(back) * p.r * unit,
            cy + Math.sin(back) * p.r * unit * tilt,
          );
          ctx.lineTo(
            cx + Math.cos(p.az) * p.r * unit,
            cy + Math.sin(p.az) * p.r * unit * tilt,
          );
        }
        ctx.globalAlpha = ALPHAS[b % ALPHAS.length] * 1.9;
        ctx.strokeStyle = COLORS[Math.floor(b / ALPHAS.length)];
        ctx.lineWidth = WIDTHS[b % ALPHAS.length];
        ctx.stroke();
      }
      return;
    }

    // Stop the loop entirely once the hero has scrolled away. A canvas
    // animating off-screen is pure battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) last = 0;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      /* The hollow. A mask rather than an empty inner radius, because the
         fade has to be gradual on both edges — a hard inner cutoff draws a
         circle, which is exactly the thing that is supposed to be invisible.
         Also fades the rim so the disk resolves into the page instead of
         ending on a line. */
      style={{
        maskImage:
          "radial-gradient(ellipse 54% 64% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 55%, #000 70%, #000 84%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 54% 64% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 55%, #000 70%, #000 84%, transparent 100%)",
      }}
    />
  );
}
