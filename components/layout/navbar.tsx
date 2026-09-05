"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { BookACall } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The navbar sits at the top of the document and scrolls away with it.
 *
 * It is `absolute`, not `fixed`: the permanent chrome is now the frame in
 * components/layout/frame.tsx, and a sticky bar on top of a fixed frame gave
 * the page two competing edges. Because it no longer follows the scroll it
 * also needs no material of its own — no fill, no blur — so it carries the
 * background of whatever it sits over.
 *
 * `top` is the frame's own thickness, so the bar lands exactly on the frame's
 * inner edge rather than being tucked under it.
 *
 * The brand mark sits in the middle of the links rather than at the left
 * end, so the bar reads as one centred cluster: half the nav, the mark, the
 * other half. The links either side come straight from `nav` and are split at
 * its midpoint, so adding an item rebalances the bar instead of breaking it.
 * The mark carries no wordmark here — the hero sets the name at 120px
 * directly beneath it.
 *
 * Type is the heading grotesk, uppercase and tracked out. The display face
 * is reserved for the hero wordmark and section titles.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* A fragment link is never the current page — "/#services" would otherwise
     match every route by prefix and sit permanently underlined on Home. */
  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  const split = Math.ceil(nav.length / 2);
  const leftNav = nav.slice(0, split);
  const rightNav = nav.slice(split);

  const linkClass = (href: string) =>
    cn(
      "font-heading text-base font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ease-out-soft",
      isActive(href)
        ? "text-ink underline decoration-1 underline-offset-[6px]"
        : // Ink at 90%, not --color-muted. Muted is a slate that reads
          // grey-blue against the dot field; ink is the near-white on the
          // dark theme and the near-black on the light one. The 10% it gives
          // up is only enough to keep the active link ahead of the rest —
          // any further down and the bar goes grey against the hero.
          "text-ink/90 hover:text-ink",
    );

  return (
    <header
      className="absolute inset-x-0 z-50"
      style={{ top: "var(--frame-y)" }}
    >
      <div className="relative">
        <Container>
          {/* Three tracks, the outer two equal, so the centre cluster is
              centred on the page rather than on whatever is left over after
              the CTA. The outer cells are placed explicitly because the one
              on the left is empty on desktop — auto-placement would slide
              the nav into it the moment its only child is display:none. */}
          <div className="grid h-18 grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="col-start-1 flex items-center lg:hidden">
              <Logo wordmark={false} />
            </div>

            <nav
              aria-label="Primary"
              className="col-start-2 hidden lg:block"
            >
              <ul className="flex items-center gap-8">
                {leftNav.map((item) => (
                  <li key={item.href}>
                    {/* No pill, no fill. At this size a filled active state is
                        heavier than the mark next to it; colour alone carries
                        the state, with an underline for anyone who cannot
                        rely on colour. */}
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                <li className="mx-2 flex items-center">
                  <Logo wordmark={false} markSize={34} />
                </li>

                {rightNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-start-3 flex items-center justify-end gap-2">
              <BookACall size="sm" className="hidden sm:inline-flex" />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="-mr-2 inline-flex size-10 items-center justify-center rounded-sm text-ink transition-[background-color,transform] duration-150 ease-out-soft active:scale-90 active:bg-accent-soft lg:hidden"
              >
                {open ? (
                  <X aria-hidden className="size-5" />
                ) : (
                  <Menu aria-hidden className="size-5" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* The rule under the bar.

            Inset to exactly where the hero's panel draws its own verticals
            (components/sections/spacetime-hero.tsx), so the three lines meet
            at two corners and read as one frame around the page rather than
            as a bar with a rule under it. Same hairline colour, same pair of
            gutters — if one moves, both move. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[calc(var(--frame-x)+1.25rem)] bottom-0 border-t border-line-strong md:inset-x-[calc(var(--frame-x)+3rem)]"
        />
      </div>

      {/* Mobile sheet.

          Opens and closes along the same path — it grows down out of the bar
          it belongs to and retracts back into it, rather than being switched
          out of existence with `hidden`. The grid-rows 0fr/1fr pair is what
          makes that animatable without hard-coding a height that would be
          wrong the moment a nav item is added.

          It stays in the DOM and uses `inert` while closed, so it is properly
          removed from the tab order and the accessibility tree without
          costing the transition.

          Unlike the bar, this does need a fill: it opens over live page
          content, and the links have to stay readable against whatever is
          behind them. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "supports-frost grid overflow-hidden bg-surface/95 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-out-soft lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <Container className="py-5">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3.5 font-heading text-base font-semibold tracking-[0.1em] uppercase transition-[background-color,color,transform] duration-150 ease-out-soft active:scale-[0.99]",
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-ink"
                        : "text-ink hover:bg-surface-2 active:bg-accent-soft active:text-accent-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <BookACall size="lg" className="mt-4 w-full" withArrow />
          </Container>
        </div>
      </div>
    </header>
  );
}
