import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/** Index/grid card: client · problem · result metric. */
export function CaseStudyCard({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group card-raise flex h-full flex-col rounded-xl bg-surface p-7 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:card-float",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">
          {study.industry}
        </span>
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 text-line-strong transition-colors group-hover:text-accent"
        />
      </div>

      <h3 className="mt-5 text-xl transition-colors group-hover:text-accent">
        {study.client}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {study.summary}
      </p>

      <div className="mt-6 border-t border-line pt-5">
        <p className="figure-num text-lg text-accent">{study.metric}</p>
        <p className="mt-1 text-xs text-muted">{study.duration} engagement</p>
      </div>
    </Link>
  );
}

/** Wide, higher-emphasis card for the "featured study" slot. */
export function FeaturedCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <div className="card-raise grid overflow-hidden rounded-2xl bg-surface lg:grid-cols-[1.25fr_1fr]">
      <div className="p-8 sm:p-12">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">
          Featured · {study.industry}
        </span>

        <h3 className="mt-6 text-2xl leading-snug sm:text-3xl">
          {study.headline}
        </h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {study.summary}
        </p>

        <p className="mt-8 text-sm text-ink">
          {study.client}
          <span className="text-muted"> · {study.duration}</span>
        </p>

        <Link
          href={`/case-studies/${study.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-70"
        >
          Read the full study
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>

      <div className="gradient-deep relative overflow-hidden p-8 sm:p-12">
        <div
          aria-hidden
          className="grid-rule-dark pointer-events-none absolute inset-0"
        />
        <div className="relative">
          <span className="label-tech text-white/50">Measured result</span>
          <dl className="mt-6 space-y-6">
            {study.results.slice(0, 3).map((result) => (
              <div key={result.label}>
                <dt className="sr-only">{result.label}</dt>
                <dd>
                  <span className="figure-num text-3xl text-white">
                    {result.value}
                  </span>
                  {result.unit ? (
                    <span className="figure-num ml-1 text-base text-white/60">
                      {result.unit}
                    </span>
                  ) : null}
                  <span className="mt-1 block text-sm text-white/70">
                    {result.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
