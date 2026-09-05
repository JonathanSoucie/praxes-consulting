import Link from "next/link";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo-mark";
import { site } from "@/content/site";

/** Wordmark + brand mark. Inherits colour from its context via `tone`. */
export function Logo({
  className,
  tone = "default",
  wordmark = true,
  markSize = 30,
}: {
  className?: string;
  tone?: "default" | "inverse";
  /** Set false for the mark alone. The navbar drops the wordmark because the
      mark sits in the middle of the links there, where a second setting of
      the name would compete with the one in the hero directly beneath it. */
  wordmark?: boolean;
  markSize?: number;
}) {
  const inverse = tone === "inverse";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-base font-bold tracking-tight transition-opacity hover:opacity-80",
        inverse ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark size={markSize} />
      {wordmark ? site.name : null}
    </Link>
  );
}
