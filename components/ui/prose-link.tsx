import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * An internal link set inside running copy. Underlined in a faint rule rather
 * than the accent, so a linked phrase mid-paragraph reads as text first and a
 * link second — these exist to connect related pages for crawlers and readers,
 * not to compete with the page's CTAs.
 */
export function ProseLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent",
        className
      )}
    >
      {children}
    </Link>
  );
}
