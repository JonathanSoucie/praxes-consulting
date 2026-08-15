"use client";

import * as React from "react";

import type { CaseStudy } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { cn } from "@/lib/utils";

const ALL = "All industries";

/** Filterable grid. Client-side because the filter is pure UI state. */
export function CaseStudyGrid({
  studies,
  industries,
}: {
  studies: CaseStudy[];
  industries: string[];
}) {
  const [active, setActive] = React.useState(ALL);
  const filters = [ALL, ...industries];

  const visible =
    active === ALL
      ? studies
      : studies.filter((study) => study.industry === active);

  return (
    <div>
      {/* Filters sit in one row above the grid. */}
      <div
        role="group"
        aria-label="Filter case studies by industry"
        className="flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => {
          const selected = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={selected}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                selected
                  ? "bg-accent text-on-accent"
                  : "border border-line bg-surface text-muted hover:border-accent hover:text-accent",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-center text-xs text-muted">
        Showing {visible.length} of {studies.length} case studies
        {active === ALL ? "" : ` in ${active}`}.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}
