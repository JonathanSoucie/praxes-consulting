"use client";

import * as React from "react";

import { cameraAt, clamp, inv, lerp, smooth, CROSSING } from "./config";

/**
 * The black hole: an accretion disk in perspective, and the shadow it casts.
 *
 * Nothing here is a shader or a physics sim. The disk is a few thousand
 * particles on circular orbits, projected by hand and drawn as short streaks
 * along their direction of travel — which is what reads as orbital motion
 * rather than as a field of dots. Keplerian falloff (speed goes as r^-1.5)
 * does most of the work: the inner disk shears past the outer one, and the
 * eye reads the shear as mass at the centre.
 *
 * The shadow is a filled circle at the projected origin, drawn last. Anything
 * whose projected depth is behind it and whose screen position lands inside it
 * is skipped, so the disk is genuinely occluded rather than painted over.
 *
 * The site's own <DitheredGalaxyField> is untouched; the other pages still use
 * it. This is only the home page's engine.
 */

/* The page's ground, deeper than --color-surface-2: the disk is drawn in
   light on top of it, and every step darker here is a step more glow. */
export const VOID = "#050406";

/* Tone ramp for the disk, hot core to cold rim. The logo's three pinks with a
   near-white above them, because the innermost orbits have to outrun the glow
   they sit inside. */
const COLORS = ["#FFF1F6", "#FFC2D8", "#FF6E9E", "#F8206D", "#8E0C45"];

/** Far side: the two families' colours, before either has a card. */
const OPS = "#FF6E9E";
const MKT = "#A07CFF";

const R_SHADOW = 2.6;
const R_IN = 3.3;
const R_OUT = 30;
const RINGS = [5.2, 8.4, 12.2, 16.6];

type Particle = { r: number; az: number; y: number; spd: number; j: number };

function buildDisk(n: number): Particle[] {
  const out: Particle[] = new Array(n);
  for (let i = 0; i < n; i++) {
    // Biased inward: an even radial spread looks like a ring, not a disk.
    const q = Math.pow(Math.random(), 1.7);
    const r = R_IN + q * (R_OUT - R_IN);
    out[i] = {
      r,
      az: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * (0.05 + r * 0.022),
      spd: Math.pow(r, -1.5),
      j: 0.6 + Math.random() * 0.8,
    };
  }
  return out;
}

const NODES = RINGS.flatMap((r, ri) =>
  Array.from({ length: 8 }, (_, i) => ({
    r,
    az: (i / 8) * Math.PI * 2 + ri * 0.45,
    spd: Math.pow(r, -1.5),
    fam: ri < 2 ? "ops" : "mkt",
  })),
);

/** Where the hole is on screen this frame, for the cards to fly out of. */
export type Singularity = { x: number; y: number; r: number };

export function BlackHole({
  progress,
  singularity,
  reduced,
}: {
  /** Live scroll position, 0-1. A ref so scrolling never re-renders React. */
  progress: React.RefObject<number>;
  /** Written every frame, read by the emergence. */
  singularity: React.RefObject<Singularity>;
  reduced: boolean;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let count = reduced ? 900 : 2800;
    let disk = buildDisk(count);

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth;
      H = innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    /* Camera basis and projection. Scratch objects reused every particle —
       at 2800 of them per frame, allocating a vector each is the difference
       between a smooth scroll and a sawtooth of garbage collections. */
    const V = {
      ex: 0, ey: 0, ez: 0,
      rx: 0, ry: 0, rz: 0,
      ux: 0, uy: 0, uz: 0,
      fx: 0, fy: 0, fz: 0,
      f: 1, cx: 0, cy: 0,
    };
    const P = { x: 0, y: 0, z: 0, s: 0, ok: false };

    const setCamera = (c: ReturnType<typeof cameraAt>) => {
      const el = (c.el * Math.PI) / 180;
      const az = (c.az * Math.PI) / 180;
      V.ex = c.r * Math.cos(el) * Math.cos(az);
      V.ey = c.r * Math.sin(el);
      V.ez = c.r * Math.cos(el) * Math.sin(az);
      let m = Math.hypot(V.ex, V.ey, V.ez) || 1;
      V.fx = -V.ex / m;
      V.fy = -V.ey / m;
      V.fz = -V.ez / m;
      // Right vector kept in the ground plane, so the horizon never rolls.
      const rx = V.fz;
      const rz = -V.fx;
      m = Math.hypot(rx, rz) || 1;
      V.rx = rx / m;
      V.ry = 0;
      V.rz = rz / m;
      V.ux = V.ry * V.fz - V.rz * V.fy;
      V.uy = V.rz * V.fx - V.rx * V.fz;
      V.uz = V.rx * V.fy - V.ry * V.fx;
      V.f = H / 2 / Math.tan((c.fov * Math.PI) / 360);
      /* Portrait puts the copy and the hole in the same column. The
         keyframes are authored for a landscape frame, so on a tall viewport
         the hole is pushed down and back toward the middle — enough to clear
         the copy above it without losing it off the bottom. */
      const portrait = clamp((H / W - 1.1) / 0.7, 0, 1);
      V.cx = lerp(c.cx, 0.5 + (c.cx - 0.5) * 0.45, portrait) * W;
      V.cy = lerp(c.cy, Math.min(0.92, c.cy + 0.14), portrait) * H;
    };

    const project = (px: number, py: number, pz: number) => {
      const vx = px - V.ex;
      const vy = py - V.ey;
      const vz = pz - V.ez;
      const z = vx * V.fx + vy * V.fy + vz * V.fz;
      if (z <= 0.06) {
        P.ok = false;
        return P;
      }
      const x = vx * V.rx + vy * V.ry + vz * V.rz;
      const y = vx * V.ux + vy * V.uy + vz * V.uz;
      P.z = z;
      P.s = V.f / z;
      P.x = V.cx + P.s * x;
      P.y = V.cy - P.s * y;
      P.ok = true;
      return P;
    };

    /* Streaks are batched by colour and alpha rather than stroked one at a
       time: a setState on the 2D context per particle costs more than the
       drawing does. */
    const buckets = new Map<number, number[]>();

    const drawNear = (t: number, wall: number, fade: number) => {
      const hole = project(0, 0, 0);
      const hx = hole.ok ? hole.x : V.cx;
      const hy = hole.ok ? hole.y : V.cy;
      const hr = hole.ok ? Math.min(hole.s * R_SHADOW, W * 3) : W * 3;
      singularity.current = { x: hx, y: hy, r: hr };

      // Lensed arcs above and below the shadow. They only make sense while the
      // disk is near edge-on; flat-on they would read as a target.
      const flat = 1 - clamp(Math.abs(cameraAt(t).el) / 17, 0, 1);
      if (hole.ok && flat > 0.05 && hr < H * 2) {
        for (const dir of [-1, 1]) {
          for (let k = 0; k < 5; k++) {
            const off = hr * (1.07 + k * 0.14);
            ctx.beginPath();
            ctx.ellipse(
              hx, hy, off, off * (0.28 + 0.07 * k) * flat, 0,
              dir > 0 ? Math.PI : 0,
              dir > 0 ? Math.PI * 2 : Math.PI,
            );
            ctx.strokeStyle = COLORS[Math.min(4, 1 + Math.floor(k * 0.8))];
            ctx.globalAlpha = (0.42 - k * 0.06) * flat * (dir > 0 ? 1 : 0.5) * fade;
            ctx.lineWidth = Math.max(1, hr * (0.1 - k * 0.012));
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      }

      const spin = t * 44 + wall * 0.05;
      buckets.clear();
      for (let i = 0; i < disk.length; i++) {
        const d = disk[i];
        const az = d.az + spin * d.spd * d.j;
        const ca = Math.cos(az);
        const sa = Math.sin(az);
        const px = d.r * ca;
        const pz = d.r * sa;
        const p = project(px, d.y, pz);
        if (!p.ok || p.x < -80 || p.x > W + 80 || p.y < -80 || p.y > H + 80) continue;
        // Occlusion: behind the shadow and inside its silhouette.
        if (p.z > hole.z && (p.x - hx) ** 2 + (p.y - hy) ** 2 < hr * hr) continue;
        const sx = p.x;
        const sy = p.y;
        const sc = p.s;
        // A second point a little further along the orbit gives the streak its
        // direction without any trigonometry on the screen-space vector.
        const p2 = project(px - sa * 0.5, d.y, pz + ca * 0.5);
        if (!p2.ok) continue;
        const dx = p2.x - sx;
        const dy = p2.y - sy;
        const m = Math.hypot(dx, dy) || 1;
        const len = clamp(sc * d.spd * 62, 0.9, 64);
        // Relativistic beaming, faked: the limb coming toward you is brighter.
        const beam = clamp(0.5 + (sa * V.fx - ca * V.fz) * 0.5, 0, 1);
        const ci = clamp(Math.floor((1 - (d.r - R_IN) / (R_OUT - R_IN)) * 4.4), 0, 4);
        const alpha = (0.16 + beam * 0.66) * clamp(sc * 0.4, 0.08, 1) * fade;
        if (alpha < 0.02) continue;
        const key = ci * 4 + Math.min(3, Math.floor(alpha * 4.4));
        let arr = buckets.get(key);
        if (!arr) {
          arr = [];
          buckets.set(key, arr);
        }
        arr.push(sx, sy, sx + (dx / m) * len, sy + (dy / m) * len, clamp(sc * 0.055, 0.7, 3.6));
      }

      ctx.lineCap = "round";
      for (const [key, arr] of buckets) {
        ctx.strokeStyle = COLORS[key >> 2];
        ctx.globalAlpha = (((key & 3) + 1) / 4) * 0.55;
        let lw = -1;
        for (let i = 0; i < arr.length; i += 5) {
          const w = arr[i + 4];
          if (Math.abs(w - lw) > 0.35) {
            if (lw >= 0) ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = w;
            lw = w;
          }
          ctx.moveTo(arr[i], arr[i + 1]);
          ctx.lineTo(arr[i + 2], arr[i + 3]);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (hole.ok && hr < W * 2.4) {
        const g = ctx.createRadialGradient(hx, hy, hr * 0.94, hx, hy, hr * 1.3);
        g.addColorStop(0, "rgba(255,217,230,0)");
        g.addColorStop(0.42, `rgba(255,217,230,${(0.85 * fade).toFixed(3)})`);
        g.addColorStop(1, "rgba(248,32,109,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(hx, hy, hr * 1.32, 0, 6.2832);
        ctx.fill();
      }
      // Last, over everything: the shadow is the one thing nothing is in front of.
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, 6.2832);
      ctx.fill();
    };

    /* The far side. Same projection, nothing violent: concentric orbits with a
       node on each, which is what the cards are about to fly out along. */
    const drawFar = (t: number, wall: number, fade: number) => {
      const spin = t * 26 + wall * 0.04;
      ctx.lineWidth = 1;
      for (const rr of RINGS) {
        ctx.beginPath();
        let started = false;
        for (let a = 0; a <= 64; a++) {
          const az = (a / 64) * Math.PI * 2;
          const p = project(rr * Math.cos(az), 0, rr * Math.sin(az));
          if (!p.ok) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${(0.07 * fade).toFixed(3)})`;
        ctx.stroke();
      }
      for (const n of NODES) {
        const az = n.az + spin * n.spd;
        const p = project(n.r * Math.cos(az), 0, n.r * Math.sin(az));
        if (!p.ok) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, clamp(p.s * 0.07, 1.1, 6), 0, 6.2832);
        ctx.fillStyle = n.fam === "ops" ? OPS : MKT;
        ctx.globalAlpha = clamp(p.s * 0.045, 0.14, 0.6) * fade;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      const p0 = project(0, 0, 0);
      if (p0.ok) {
        const rr = Math.max(28, p0.s * 1.5);
        const g = ctx.createRadialGradient(p0.x, p0.y, 0, p0.x, p0.y, rr);
        g.addColorStop(0, `rgba(248,32,109,${(0.6 * fade).toFixed(3)})`);
        g.addColorStop(1, "rgba(248,32,109,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, rr, 0, 6.2832);
        ctx.fill();
        singularity.current = { x: p0.x, y: p0.y, r: 8 };
      }
    };

    let raf = 0;
    let frames = 0;
    let sum = 0;
    let cheap = false;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const t = progress.current ?? 0;

      ctx.fillStyle = VOID;
      ctx.fillRect(0, 0, W, H);
      setCamera(cameraAt(t));

      /* Cross-fade rather than a cut. The near side is the disk you fall
         into; the far side is what is left once you are through it. Both are
         drawn for the few frames either side of the horizon, which is exactly
         when the flash is over the top of them and nobody can see the seam. */
      /* The wall clock is what makes the disk turn on its own. Under reduced
         motion it is dropped, so the field is still there and still parallaxes
         with the scroll, but nothing moves unless the reader moves it. */
      const wall = reduced ? 0 : now * 0.001;
      const over = smooth(inv(t, CROSSING - 0.004, CROSSING + 0.016));
      if (over < 0.995) drawNear(t, wall, 1 - over);
      if (over > 0.005) drawFar(t, wall, over);

      // Drop the particle count once, if the first second cannot hold 40fps.
      frames++;
      sum += dt;
      if (frames === 60) {
        if (sum / 60 > 25 && !cheap) {
          cheap = true;
          count = 1200;
          disk = buildDisk(count);
        }
        frames = 1;
        sum = dt;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, [progress, singularity, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 block h-full w-full"
    />
  );
}
