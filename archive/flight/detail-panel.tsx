"use client";

import * as React from "react";
import { X } from "lucide-react";

import { BookACall } from "@/components/book-a-call";
import { buildBySlug, families, type FamilyKey } from "@/content/builds";
import { operationsBuilds } from "@/content/builds";

/**
 * The panel a card opens.
 *
 * An overlay rather than a route, deliberately. /services was removed from
 * this site, and re-adding twelve URLs would put pages back in the sitemap
 * that nothing links to from anywhere but here. This is the detail behind a
 * card, not a page in its own right.
 */
export function DetailPanel({
  slug,
  onClose,
}: {
  slug: string | null;
  onClose: () => void;
}) {
  const build = slug ? buildBySlug(slug) : undefined;
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!slug) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", onKey);
    // The flight keeps running underneath; stop the scroll driving it while a
    // panel is up, or dismissing lands you somewhere else on the timeline.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [slug, onClose]);

  if (!build) return null;

  const family: FamilyKey = operationsBuilds.some((b) => b.slug === build.slug)
    ? "operations"
    : "marketing";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={build.title}
      data-family={family}
      className="glass-card-family fixed inset-0 z-80 overflow-y-auto bg-[color:var(--void)]/92 backdrop-blur-xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-auto min-h-full max-w-2xl px-6 py-24 sm:px-10">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass-pill fixed top-6 right-6 z-10 inline-flex items-center gap-2 px-4 py-2.5 text-muted transition-colors hover:text-ink"
        >
          <X aria-hidden className="size-3.5" />
          <span className="label-tech">Close</span>
        </button>

        <p className="label-tech text-muted">
          {families[family].kicker} · {families[family].name}
        </p>
        <h2 className="card-title mt-5 text-3xl sm:text-4xl">{build.title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          {build.summary}
        </p>

        <p className="label-section mt-14 text-muted">What it does</p>
        <ul className="mt-6 space-y-3">
          {build.points.map((point) => (
            <li key={point} className="flex gap-3 text-base text-ink-soft">
              <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-accent" />
              {point}
            </li>
          ))}
        </ul>

        <p className="label-section mt-14 text-muted">How it fits</p>
        <p className="mt-6 leading-relaxed text-muted">
          One line item in a {families[family].name.toLowerCase()}{" "}
          build. We won&apos;t build it in isolation unless the audit says it
          is the bottleneck — which is the point of measuring first.
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <BookACall withArrow />
        </div>
      </div>
    </div>
  );
}
