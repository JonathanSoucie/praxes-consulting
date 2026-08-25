"use client";

import * as React from "react";

import { buildsByFamily, families, type Build, type FamilyKey } from "@/content/builds";
import type { Singularity } from "./black-hole";
import {
  EMERGE_IN,
  EMERGE_OUT,
  FAMILIES_GONE_A,
  FAMILIES_GONE_B,
  clamp,
  easeOut,
  inv,
  lerp,
  smooth,
} from "./config";

/**
 * The two families coming out of the singularity.
 *
 * Every card is positioned imperatively from the scroll position, not from
 * React state: twelve elements re-rendering on every frame of a scroll is the
 * one thing guaranteed to make this stutter. React owns the markup, the frame
 * loop owns the transforms.
 *
 * The families arrive one after the other rather than together. Six cards
 * flying out at once is a swarm; six then six is two statements, and it gives
 * the family header something to say between them — which is the actual
 * argument, that operations comes before marketing.
 */

const FAMILY_ORDER: FamilyKey[] = ["operations", "marketing"];

export function useEmergence(
  singularity: React.RefObject<Singularity>,
  cards: React.RefObject<Map<string, HTMLElement>>,
  headers: React.RefObject<Map<FamilyKey, HTMLElement>>,
) {
  /** Called once per frame with the eased scroll position. */
  return React.useCallback(
    (t: number) => {
      const W = innerWidth;
      const H = innerHeight;
      const wide = W > 900;
      const gap = Math.min(24, W * 0.022);
      const cardW = wide
        ? Math.min(330, (Math.min(W - 80, 940) - gap) / 2)
        : Math.min(340, W * 0.88);
      const cols = wide ? 2 : 1;
      /* Row pitch has to clear the tallest card, not the average one: three
         of the twelve summaries set to three lines at this width, and at the
         old pitch those overlapped the row beneath them. */
      /* Row pitch has to clear the tallest card, not the average one: three
         of the twelve summaries set to three lines at this width, and at the
         old pitch those overlapped the row beneath them. */
      const rowH = wide ? Math.min(126, H * 0.158) : Math.min(132, H * 0.155);
      const headY = wide ? H * 0.2 : H * 0.15;
      const rowY = wide ? H * 0.38 : H * 0.42;

      const gone = 1 - smooth(inv(t, FAMILIES_GONE_A, FAMILIES_GONE_B));
      const span = EMERGE_OUT - EMERGE_IN;

      /* Six cards fit a desktop column and do not fit a phone. Rather than
         shrinking them until the copy goes, a narrow screen takes the family
         in sub-waves of three: same choreography, twice as many arrivals. */
      const perWave = wide ? 6 : 3;

      FAMILY_ORDER.forEach((family, fi) => {
        const list = buildsByFamily[family];
        const waves = Math.ceil(list.length / perWave);
        // Two waves, back to back, with the first clearing as the second lands.
        const famA = EMERGE_IN + fi * span * 0.52;
        const famB = famA + span * 0.48;
        const header = headers.current?.get(family);
        if (header) {
          const u = easeOut(inv(t, famA, famA + (famB - famA) * 0.18));
          let out = gone;
          if (fi === 0) out *= 1 - smooth(inv(t, famB - span * 0.04, famB + span * 0.1));
          header.style.opacity = (u * out).toFixed(3);
          header.style.transform = `translate3d(0,${((1 - u) * 22).toFixed(1)}px,0)`;
        }

        list.forEach((build, i) => {
          const el = cards.current?.get(build.slug);
          if (!el) return;

          const wave = Math.floor(i / perWave);
          const slot = i % perWave;
          // Each wave owns an equal share of the family's window.
          const waveA = famA + ((famB - famA) / waves) * wave;
          const waveB = famA + ((famB - famA) / waves) * (wave + 1);
          const rows = Math.min(perWave, list.length - wave * perWave);
          const stagger = (waveB - waveA) * 0.07;
          const cardSpan = Math.max(0.001, waveB - waveA - stagger * rows);

          let alive = gone;
          // A wave clears as the next one starts; the family's last wave is
          // held until the family itself is done.
          const isLastWave = wave === waves - 1;
          const isLastFamily = fi === FAMILY_ORDER.length - 1;
          if (!(isLastWave && isLastFamily))
            alive *= 1 - smooth(inv(t, waveB - span * 0.03, waveB + span * 0.07));

          const start = waveA + stagger * (slot + 1);
          const u = inv(t, start, start + cardSpan);
          const e = easeOut(u);

          const col = wide ? slot % 2 : 0;
          const row = wide ? Math.floor(slot / 2) : slot;
          const cx = wide
            ? W / 2 + (col === 0 ? -(cardW + gap) / 2 : (cardW + gap) / 2)
            : W / 2;
          const cy = rowY + row * rowH;

          /* The flight path. The card starts at wherever the hole is on
             screen this frame and travels out to its slot — so it is thrown
             by the thing you just fell through, not merely revealed near it.
             The travel finishes at 55% of the card's window, leaving the rest
             for it to settle. */
          const s0 = singularity.current;
          const path = smooth(clamp(u / 0.55, 0, 1));
          const x = lerp(s0?.x ?? W / 2, cx, path);
          const y = lerp(s0?.y ?? H / 2, cy, path);
          const scale = lerp(0.45, 1, e);

          el.style.width = `${cardW}px`;
          el.style.opacity = (Math.min(1, u * 4.5) * alive).toFixed(3);
          el.style.transform = `translate3d(${(x - cardW / 2).toFixed(1)}px,${(y - 34).toFixed(1)}px,0) scale(${scale.toFixed(3)})`;

          /* backdrop-filter on a moving element forces the compositor to
             re-sample the blur every frame, for twelve elements at once. It is
             switched on only once the card has stopped. */
          el.classList.toggle("is-settled", u > 0.92 && alive > 0.6);
          const live = u > 0.96 && alive > 0.9;
          el.classList.toggle("is-live", live);
          el.tabIndex = live ? 0 : -1;
        });
      });
    },
    [singularity, cards, headers],
  );
}

export function FamilyHeader({
  family,
  refCb,
}: {
  family: FamilyKey;
  refCb: (el: HTMLElement | null) => void;
}) {
  const f = families[family];
  return (
    <div
      ref={refCb}
      className="pointer-events-none fixed inset-x-0 z-20 mx-auto max-w-xl px-6 text-center opacity-0"
      style={{ top: "16vh" }}
    >
      <p className="label-tech text-muted">{f.kicker}</p>
      <p className="card-title mt-4 text-2xl sm:text-3xl">{f.name}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        {f.line}
      </p>
    </div>
  );
}

export function EmergenceCard({
  build,
  family,
  onOpen,
  refCb,
}: {
  build: Build;
  family: FamilyKey;
  onOpen: (slug: string) => void;
  refCb: (el: HTMLElement | null) => void;
}) {
  const Icon = build.icon;
  return (
    <div
      ref={refCb}
      role="link"
      tabIndex={-1}
      onClick={() => onOpen(build.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(build.slug);
        }
      }}
      data-family={family}
      className="glass-card fixed top-0 left-0 z-20 opacity-0"
    >
      <span aria-hidden className="glass-card-edge" />
      <span className="flex items-center gap-3">
        <Icon aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-accent" />
        <b className="card-title text-base">{build.title}</b>
      </span>
      <i className="mt-2 block text-sm leading-snug text-ink-soft not-italic">
        {build.summary}
      </i>
    </div>
  );
}
