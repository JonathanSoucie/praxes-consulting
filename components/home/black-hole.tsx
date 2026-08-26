"use client";

import * as React from "react";

/**
 * A black hole: shadow, photon ring, and a lensed accretion disk.
 *
 * The first version of this drew only an accretion disk and left the middle
 * empty, on the reasoning that on a white page the hole can be the page. It
 * was wrong, and the reason is worth writing down: what makes an image read
 * as a black hole is not the disk. It is the SHADOW, and specifically the
 * disk appearing to bend up over the top of it and under the bottom. Without
 * that, a tilted ring of particles is a tilted ring of particles.
 *
 * So this draws the real thing, in five passes:
 *
 *   1. bloom       a soft wash so the object sits on the page
 *   2. back-top    the far side of the disk, lensed UP over the shadow
 *   3. back-under  its second image, bent DOWN beneath the shadow
 *   4. shadow      the event horizon, opaque, plus the photon ring
 *   5. front       the near side, passing in front of the shadow
 *
 * The lensing is faked, not traced. Rather than integrating null geodesics,
 * far-side particles get a Gaussian lift whose width is about the shadow
 * radius: far from centre the arc is an ordinary ellipse, and as it passes
 * behind the hole it rises over it. That single term is what produces the
 * silhouette everyone recognises, and it costs one exp() per sample.
 *
 * Keplerian falloff (speed goes as r^-1.5) makes the inner disk shear past
 * the outer one, and the Doppler term brightens the limb turning toward the
 * viewer — both carried over from the retired flight page in archive/.
 *
 * It is drawn above the headline rather than behind it. An opaque shadow and
 * legible dark type cannot occupy the same pixels, and of the two the shadow
 * is the part that is not negotiable.
 */

/** Matches --color-page. */
const PAGE = "#fafafa";
/** The event horizon. Near-black, carrying a trace of the accent's hue. */
const VOID = "#141014";

/* Inner to outer. The logo's three pinks and nothing else — on a white ground
   "hotter" has to mean more saturated rather than paler, so the vivid middle
   pink sits at the inner edge and the pale one carries the rim. */
const DISK = ["#f8206d", "#ff6e9e", "#ff6e9e"];
/** Per-colour weight, inner to outer. */
const BAND_A = [1, 0.8, 0.46];

/* Geometry, in units of the shadow radius.
 *
 * The disk has to run a long way wider than the lensing bends it, or the two
 * envelopes meet and the silhouette closes into an eye. R_OUT at 3.3 against
 * a LIFT of 1.3 did exactly that. At 6.2 the disk reads as a long flat band
 * with a halo arcing over the middle of it, which is the shape everyone
 * recognises.
 *
 * R_IN sits at 2.1 rather than against the horizon because a real disk stops
 * at the innermost stable orbit, several times the shadow radius — the gap
 * between the black disc and the first light is part of the look. */
const R_SHADOW = 1;
const R_IN = 2.1;
const R_OUT = 6.2;
/** How edge-on the disk sits. */
const TILT = 0.14;
/** How far the far side is lifted over the shadow, and how wide that bend is.
 *  Tuned so the inner edge of the lensed arc clears the horizon by a little
 *  and then hugs it, rather than floating clear of the shadow entirely. */
const LIFT = 0.98;
const SPREAD = 2;

/** Points sampled along each streak. The lensed arc curves; two would chord it. */
const SAMPLES = 3;

const BACK_TOP = 0;
const BACK_UNDER = 1;
const FRONT = 2;
/** Per-pass weight. The second image of the far side is the dimmer one, and
 *  the near side is the brightest: it crosses the shadow, and against
 *  near-black a low alpha turns pink into muddy dark streaks rather than the
 *  bright band that is supposed to cut across the horizon. */
const PASS_A = [0.55, 0.3, 0.95];

type Particle = { r: number; az: number; spd: number; ci: number; w: number };

function buildDisk(n: number): Particle[] {
  const out: Particle[] = new Array(n);
  for (let i = 0; i < n; i++) {
    // Biased inward: an even radial spread reads as a ring, not a disk.
    const q = Math.pow(Math.random(), 1.5);
    const r = R_IN + q * (R_OUT - R_IN);
    const t = (r - R_IN) / (R_OUT - R_IN);
    const ci = Math.min(
      DISK.length - 1,
      Math.max(0, Math.round(t * (DISK.length - 1) + (Math.random() - 0.5) * 0.7)),
    );
    out[i] = {
      r,
      az: Math.random() * Math.PI * 2,
      spd: Math.pow(r, -1.5),
      ci,
      w: 0.7 + Math.random() * 1.1,
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
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(3000, Math.max(650, (w * h) / 170)));
      if (particles.length !== target) particles = buildDisk(target);
    };

    /** Where a particle lands on screen, for a given pass. */
    const project = (
      pass: number,
      az: number,
      r: number,
      unit: number,
      cx: number,
      cy: number,
      out: { x: number; y: number },
    ) => {
      const px = Math.cos(az) * r;
      const py = Math.sin(az) * r * TILT;
      out.x = cx + px * unit;
      if (pass === FRONT) {
        out.y = cy + py * unit;
        return;
      }
      // The bend. Widest at x = 0, which is where the far side passes behind
      // the shadow and has to come out over the top of it.
      const bulge = LIFT * Math.exp(-((px / SPREAD) * (px / SPREAD)));
      out.y =
        pass === BACK_TOP
          ? cy + (py - bulge) * unit
          : cy + (-py + bulge * 0.86) * unit;
    };

    const p0 = { x: 0, y: 0 };

    const draw = (dt: number) => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = PAGE;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      // Vertical extent is set by the lensed arc, not by the disk.
      const unit = Math.min(w / (R_OUT * 2.1), h / 5);
      const rs = R_SHADOW * unit;

      // 1. Bloom.
      const bloom = ctx.createRadialGradient(cx, cy, rs * 0.4, cx, cy, unit * 4.2);
      bloom.addColorStop(0, "rgba(248,32,109,0.22)");
      bloom.addColorStop(0.4, "rgba(248,32,109,0.10)");
      bloom.addColorStop(1, "rgba(248,32,109,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      ctx.lineCap = "round";

      const strokePass = (pass: number) => {
        for (let ci = 0; ci < DISK.length; ci++) {
          for (let side = 0; side < 2; side++) {
            ctx.beginPath();
            let any = false;
            for (const p of particles) {
              if (p.ci !== ci) continue;
              const back = Math.sin(p.az) < 0;
              if (pass === FRONT ? back : !back) continue;
              // Doppler: the limb turning toward the viewer is the bright one.
              if ((Math.cos(p.az) > 0 ? 0 : 1) !== side) continue;
              const span = 0.05 + 0.3 / p.r;
              for (let s = 0; s < SAMPLES; s++) {
                const a = p.az - span * (1 - s / (SAMPLES - 1));
                project(pass, a, p.r, unit, cx, cy, p0);
                if (s === 0) ctx.moveTo(p0.x, p0.y);
                else ctx.lineTo(p0.x, p0.y);
              }
              any = true;
            }
            if (!any) continue;
            ctx.globalAlpha = PASS_A[pass] * BAND_A[ci] * (side === 0 ? 1 : 0.5);
            ctx.strokeStyle = DISK[ci];
            ctx.lineWidth = ci === 0 ? 1.5 : 1.1;
            ctx.stroke();
          }
        }
      };

      // 2 and 3. The far side, both of its images.
      strokePass(BACK_TOP);
      strokePass(BACK_UNDER);

      // 4. The event horizon, and the photon ring hugging it.
      ctx.globalAlpha = 1;
      ctx.fillStyle = VOID;
      ctx.beginPath();
      ctx.arc(cx, cy, rs, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 2; i >= 0; i--) {
        ctx.globalAlpha = i === 0 ? 0.95 : 0.3 / i;
        ctx.strokeStyle = i === 0 ? "#f8206d" : "#ff6e9e";
        ctx.lineWidth = unit * (0.035 + i * 0.075);
        ctx.beginPath();
        ctx.arc(cx, cy, rs + unit * (0.015 + i * 0.045), 0, Math.PI * 2);
        ctx.stroke();
      }

      // 5. The near side, in front of everything.
      strokePass(FRONT);

      if (dt > 0) for (const p of particles) p.az += p.spd * dt * 0.00075;
    };

    resize();

    if (reduced) {
      draw(0);
      return;
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || w === 0) return;
      const dt = Math.min(48, now - last || 16);
      last = now;
      draw(dt);
    };

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

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
