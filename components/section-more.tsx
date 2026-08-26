import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The way out of a home page section.
 *
 * The home page is an index: every band states its point in as few words as
 * it can and then hands off to the page that actually argues it. This is that
 * hand-off, and it is one component rather than a link written six ways so
 * the affordance is identical each time — a reader who learns it in the first
 * section should not have to notice it again.
 *
 * `tone` has to be passed because the button variants are ground-specific and
 * an outline button inherits nothing useful from `on-deep`: its border and
 * label are set from the light palette and both disappear on black.
 */
export function SeeMore({
  href,
  label,
  tone = "light",
  className,
}: {
  href: string;
  label: string;
  tone?: "light" | "deep";
  className?: string;
}) {
  return (
    <Button
      asChild
      variant={tone === "deep" ? "onDeepGhost" : "outline"}
      className={cn("group mt-12 lg:mt-14", className)}
    >
      <Link href={href}>
        {label}
        <ArrowRight
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </Button>
  );
}
