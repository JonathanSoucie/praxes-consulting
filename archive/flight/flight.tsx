"use client";

import * as React from "react";

import { BookACall, BookingNote } from "@/components/book-a-call";
import { TimeEstimator } from "@/components/sections/time-estimator";
import { buildsByFamily, type FamilyKey } from "@/content/builds";
import { BlackHole, type Singularity } from "./black-hole";
import { DetailPanel } from "./detail-panel";
import { EmergenceCard, FamilyHeader, useEmergence } from "./emergence";
import {
  BEATS,
  CROSSING,
  beatById,
  beatFade,
  clamp,
  inv,
  smooth,
  type BeatId,
} from "./config";

/**
 * The home page.
 *
 * A tall empty "spine" provides the scroll; everything you see is fixed on
 * top of it. One rAF loop reads the scroll position, eases it, and writes the
 * frame — canvas, copy opacity, card transforms, rail — from that single
 * number. React renders the markup once and then stays out of the way, which
 * is the only way twelve cards and 2,800 particles hold a frame budget.
 *
 * The copy is real markup in the document, not painted into the canvas, so
 * it is selectable, translatable, and there for a crawler that runs no
 * JavaScript at all — which is also why the page still carries its schema.
 */

const FAMILY_ORDER: FamilyKey[] = ["operations", "marketing"];

export function Flight() {
  const progress = React.useRef(0);
  const singularity = React.useRef<Singularity>({ x: 0, y: 0, r: 0 });
  const cards = React.useRef(new Map<string, HTMLElement>());
  const headers = React.useRef(new Map<FamilyKey, HTMLElement>());
  const beats = React.useRef(new Map<BeatId, HTMLElement>());
  const spine = React.useRef<HTMLDivElement>(null);
  const flash = React.useRef<HTMLDivElement>(null);
  const flashLine = React.useRef<HTMLDivElement>(null);
  const railFill = React.useRef<HTMLDivElement>(null);
  const railBtns = React.useRef(new Map<BeatId, HTMLElement>());
  const hint = React.useRef<HTMLParagraphElement>(null);

  const [open, setOpen] = React.useState<string | null>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const place = useEmergence(singularity, cards, headers);

  /* Scroll → t. Measured against the spine rather than the document, so the
     timeline finishes exactly when the spine does and the footer below it is
     ordinary scrolling rather than the last few percent of the flight. */
  const tOfScroll = React.useCallback(() => {
    const el = spine.current;
    if (!el) return 0;
    const range = Math.max(1, el.offsetHeight - innerHeight);
    return clamp((scrollY - el.offsetTop) / range, 0, 1);
  }, []);

  const jump = React.useCallback(
    (id: BeatId) => {
      const el = spine.current;
      if (!el) return;
      const range = Math.max(1, el.offsetHeight - innerHeight);
      scrollTo({
        top: el.offsetTop + (beatById[id].t0 + 0.014) * range,
        behavior: "smooth",
      });
    },
    [],
  );

  React.useEffect(() => {
    let raf = 0;
    let eased = tOfScroll();
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const raw = tOfScroll();
      // Critically damped follow, framerate-independent. Without it the canvas
      // reads every jitter of a trackpad as camera shake.
      eased = reduced ? raw : eased + (raw - eased) * (1 - Math.pow(1 - 0.09, dt / 16.67));
      const t = eased;
      progress.current = t;

      for (const b of BEATS) {
        const el = beats.current.get(b.id);
        if (!el) continue;
        const o = beatFade(t, b.id);
        el.style.opacity = o < 0.06 ? "0" : o.toFixed(3);
        el.style.visibility = o < 0.06 ? "hidden" : "visible";
      }

      /* The horizon. A hard white bloom for a couple of percent of the
         timeline, with the line inside it visible only at the peak — the
         palette does not stay light on the far side, so this is the whole of
         the crossing rather than the start of a new phase. */
      const w = reduced ? 0 : Math.pow(1 - clamp(Math.abs(t - CROSSING) / 0.034, 0, 1), 0.7);
      if (flash.current) flash.current.style.opacity = w.toFixed(3);
      if (flashLine.current)
        flashLine.current.style.opacity = Math.pow(clamp((w - 0.55) / 0.45, 0, 1), 0.8).toFixed(3);

      place(t);

      if (railFill.current) railFill.current.style.height = `${(t * 100).toFixed(2)}%`;
      const current = BEATS.find((b) => t >= b.t0 && t < b.t1) ?? BEATS[BEATS.length - 1];
      for (const [id, btn] of railBtns.current)
        btn.setAttribute("aria-current", id === current.id ? "true" : "false");
      if (hint.current) hint.current.style.opacity = t < 0.012 ? "1" : "0";

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [place, reduced, tOfScroll]);

  const beatRef = (id: BeatId) => (el: HTMLElement | null) => {
    if (el) beats.current.set(id, el);
    else beats.current.delete(id);
  };

  return (
    <div className="flight">
      <BlackHole progress={progress} singularity={singularity} reduced={reduced} />

      {/* The scroll. Empty on purpose — it exists to be tall. */}
      <div ref={spine} aria-hidden>
        {BEATS.map((b) => (
          <div key={b.id} style={{ height: `${b.vh}vh` }} />
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Copy                                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="pointer-events-none fixed inset-0 z-20">
        <Beat id="hero" refCb={beatRef("hero")} align="left">
          <div className="glass-panel pointer-events-auto max-w-xl p-8 sm:p-10">
            <p className="label-tech text-accent-ink">Praxes · Ottawa</p>
            <h1 className="card-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Time or growth?
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              You choose. We build the systems that get you there.
            </p>
            <div className="mt-8">
              <BookACall size="lg" withArrow />
            </div>
            <BookingNote className="mt-5" />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6">
              <span className="label-tech flex items-center gap-2 text-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                Operations first
              </span>
              <span className="label-tech flex items-center gap-2 text-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-[#A07CFF]" />
                Marketing second
              </span>
            </div>
          </div>
        </Beat>

        <Beat id="small" refCb={beatRef("small")} align="left">
          <div className="max-w-lg">
            <p className="label-section text-muted">The shift</p>
            <h2 className="card-title mt-5 text-3xl sm:text-4xl">
              Small is the advantage
            </h2>
            <p className="mt-6 leading-relaxed text-ink-soft">
              Running solo or with a handful of people is not the compromise it
              was five years ago. The repetitive half of the work no longer
              needs a person, which means a small team is no longer a smaller
              version of a big one — it is a cheaper, faster shape than the big
              one, doing the same volume.
            </p>
          </div>
        </Beat>

        <Beat id="problem" refCb={beatRef("problem")} align="left">
          <div className="max-w-xl">
            <p className="label-section text-muted">The problem</p>
            <h2 className="card-title mt-5 text-3xl sm:text-4xl">
              You already know where it is
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Four things we find in almost every operation we audit.
            </p>
            <ul className="mt-8 grid gap-2.5">
              {PROBLEMS.map((p) => (
                <li key={p.fix} className="glass-row flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:gap-5">
                  <span className="flex-1 leading-snug text-ink">{p.line}</span>
                  <span
                    className="label-tech shrink-0 text-right sm:w-28"
                    style={{ color: p.family === "marketing" ? "#A07CFF" : undefined }}
                  >
                    {p.fix}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Beat>

        <Beat id="realise" refCb={beatRef("realise")} align="center">
          <h2 className="card-title mx-auto max-w-2xl text-center text-3xl text-balance sm:text-4xl lg:text-5xl">
            Nobody designed any of this. It just accumulated.
          </h2>
        </Beat>

        <Beat id="estimator" refCb={beatRef("estimator")} align="center">
          <div className="glass-panel pointer-events-auto max-h-[78vh] w-full max-w-4xl overflow-y-auto p-7 sm:p-9">
            <TimeEstimator divider={false} />
          </div>
        </Beat>

        <Beat id="book" refCb={beatRef("book")} align="center">
          <div className="glass-panel pointer-events-auto max-w-xl p-9 text-center sm:p-11">
            <p className="label-section text-muted">Next step</p>
            <h2 className="card-title mt-5 text-3xl sm:text-4xl">
              What is it costing you?
            </h2>
            <p className="mx-auto mt-6 max-w-sm leading-relaxed text-ink-soft">
              Fifteen minutes, no preparation needed. We&apos;ll tell you
              whether there&apos;s a case worth measuring — including when
              there isn&apos;t.
            </p>
            <div className="mt-8 flex justify-center">
              <BookACall size="lg" withArrow />
            </div>
            <BookingNote className="mt-5" />
          </div>
        </Beat>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* The far side                                                      */}
      {/* ---------------------------------------------------------------- */}
      {FAMILY_ORDER.map((family) => (
        <FamilyHeader
          key={family}
          family={family}
          refCb={(el) => {
            if (el) headers.current.set(family, el);
            else headers.current.delete(family);
          }}
        />
      ))}
      {FAMILY_ORDER.flatMap((family) =>
        buildsByFamily[family].map((build) => (
          <EmergenceCard
            key={build.slug}
            build={build}
            family={family}
            onOpen={setOpen}
            refCb={(el) => {
              if (el) cards.current.set(build.slug, el);
              else cards.current.delete(build.slug);
            }}
          />
        )),
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Chrome                                                            */}
      {/* ---------------------------------------------------------------- */}
      {/* Above the navbar, which is z-50: the horizon is the one moment the
          page has no chrome, and a nav sitting on top of the bloom in white
          on white was both unreadable and beside the point. */}
      <div ref={flash} aria-hidden className="flash pointer-events-none fixed inset-0 z-60 opacity-0" />
      <div
        ref={flashLine}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center px-8 opacity-0"
      >
        <p className="card-title max-w-3xl text-center text-4xl text-[#2A0512] text-balance sm:text-6xl">
          None of that was the work.
        </p>
      </div>

      <nav
        aria-label="Sections"
        className="fixed top-1/2 right-3 z-30 hidden h-[min(44vh,340px)] -translate-y-1/2 flex-col items-center lg:flex"
      >
        <div className="relative w-0.5 flex-1 bg-line">
          <div ref={railFill} className="absolute top-0 left-0 w-0.5 bg-accent" />
        </div>
        {BEATS.filter((b) => b.name).map((b) => (
          <button
            key={b.id}
            type="button"
            ref={(el) => {
              if (el) railBtns.current.set(b.id, el);
              else railBtns.current.delete(b.id);
            }}
            onClick={() => jump(b.id)}
            style={{ top: `${b.t0 * 100}%` }}
            className="rail-dot group absolute left-1/2 grid size-6 -translate-x-1/2 place-items-center"
          >
            <span className="sr-only">Jump to {b.name}</span>
            <span aria-hidden className="rail-label label-tech">{b.name}</span>
          </button>
        ))}
      </nav>

      <p
        ref={hint}
        aria-hidden
        className="label-tech pointer-events-none fixed bottom-7 left-6 z-30 text-muted transition-opacity duration-500 sm:left-10"
      >
        Scroll
      </p>

      <DetailPanel slug={open} onClose={() => setOpen(null)} />
    </div>
  );
}

const PROBLEMS = [
  {
    line: "Somebody re-types last week's invoices into the accounting system.",
    fix: "Invoice intake",
    family: "operations",
  },
  {
    line: "Half the morning is sorting the inbox before any real work starts.",
    fix: "Enquiry triage",
    family: "operations",
  },
  {
    line: "The CRM and the accounting package disagree, so someone reconciles them by hand.",
    fix: "Systems sync",
    family: "operations",
  },
  {
    line: "A lead sits unanswered for two days, because nobody knew it was waiting.",
    fix: "Lead capture",
    family: "marketing",
  },
] as const;

function Beat({
  id,
  refCb,
  align,
  children,
}: {
  id: BeatId;
  refCb: (el: HTMLElement | null) => void;
  align: "left" | "center";
  children: React.ReactNode;
}) {
  return (
    <section
      ref={refCb}
      data-beat={id}
      style={{ visibility: "hidden", opacity: 0 }}
      className={[
        "absolute inset-0 flex px-6 transition-opacity duration-200 sm:px-10 lg:px-16",
        align === "center"
          ? "items-center justify-center"
          : "items-center justify-start",
      ].join(" ")}
    >
      {align === "left" ? <span aria-hidden className="beat-scrim" /> : null}
      <div className="relative">{children}</div>
    </section>
  );
}
