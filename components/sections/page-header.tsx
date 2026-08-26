import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/**
 * The top of every page that is not Home.
 *
 * Generous top padding rather than a coloured band: the navbar is fixed and
 * transparent until you scroll, so the first thing under it should be the
 * page's own headline sitting in space. A tinted hero strip here would put a
 * seam across the top of every route and undo the openness the home page
 * spends its first screen establishing.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  standfirst,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Emphasised tail of the headline, in the main pink. */
  accent?: string;
  standfirst?: string;
  /** Trail excluding Home, which is prepended. */
  breadcrumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("pt-36 pb-16 sm:pt-44 lg:pt-52 lg:pb-24", className)}>
      <Container>
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight aria-hidden className="size-3.5" />
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-ink-soft">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ink"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow text-pink-ink">{eyebrow}</p> : null}

        <h1 className={cn("display-hero max-w-[15ch]", eyebrow && "mt-7")}>
          {title}
          {accent ? (
            <>
              {" "}
              <span className="text-pink-em">{accent}</span>
            </>
          ) : null}
        </h1>

        {standfirst ? (
          <p className="measure-wide mt-10 text-xl leading-[1.5] text-ink-soft sm:text-2xl">
            {standfirst}
          </p>
        ) : null}

        {children ? <div className="mt-12">{children}</div> : null}
      </Container>
    </header>
  );
}
