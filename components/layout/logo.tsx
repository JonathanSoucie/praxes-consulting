import Link from "next/link";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo-mark";
import { site } from "@/content/site";

/** Wordmark + brand mark. Inherits colour from its context via `tone`. */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight transition-opacity hover:opacity-80",
        inverse ? "text-white" : "text-ink",
        className
      )}
    >
      <LogoMark size={30} />
      {site.name}
    </Link>
  );
}
