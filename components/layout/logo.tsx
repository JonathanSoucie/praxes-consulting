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
  href = "/",
}: {
  className?: string;
  tone?: "default" | "inverse";
  /** Set false for the mark alone. */
  wordmark?: boolean;
  markSize?: number;
  href?: string;
}) {
  const inverse = tone === "inverse";
  const LogoLink = href.includes("#") ? "a" : Link;

  return (
    <LogoLink
      href={href}
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-base font-bold tracking-tight transition-opacity hover:opacity-80",
        inverse ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark size={markSize} />
      {wordmark ? <span>{site.name}</span> : null}
    </LogoLink>
  );
}
