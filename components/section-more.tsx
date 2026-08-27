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
 * It takes no `tone`. The outline variant is built entirely from tokens that
 * `on-deep` redefines, so it inverts by itself — black on white in the page's
 * bands, white on black inside the dark ones — which is why the separate
 * ghost variant it used to need on the deep ground is gone.
 */
export function SeeMore({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="outline"
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
