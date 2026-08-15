"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { BookACall } from "@/components/book-a-call";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/container";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The navbar sits at the top of the document and scrolls away with it.
 *
 * It is `absolute`, not `fixed`: the permanent chrome is now the frame in
 * components/layout/frame.tsx, and a sticky bar on top of a fixed frame gave
 * the page two competing edges. Because it no longer follows the scroll it
 * also needs no material of its own — no fill, no blur, no hairline that
 * appears once you move — so it carries the background of whatever it sits
 * over. On the home page that is the hero's dot field, uninterrupted.
 *
 * `top` is the frame's own thickness, so the bar lands exactly on the frame's
 * inner edge rather than being tucked under it.
 *
 * Type is the display serif, uppercase and tracked out, matching the hero
 * headline it sits above.
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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="absolute inset-x-0 z-50"
      style={{ top: "var(--frame-y)" }}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-8">
          <Logo className="tracking-[0.14em] uppercase" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  {/* No pill, no fill. At this size a filled active state is
                      heavier than the wordmark next to it; colour alone
                      carries the state, with an underline for anyone who
                      cannot rely on colour. */}
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "font-display text-[0.9375rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-150 ease-out-soft",
                      isActive(item.href)
                        ? "text-ink underline decoration-1 underline-offset-[6px]"
                        : // Ink at 72%, not --color-muted. Muted is a slate
                          // that reads grey-blue against the dot field; ink is
                          // the near-white on the dark theme and the near-black
                          // on the light one, so this brightens the bar in the
                          // dark without inverting it in the light.
                          "text-ink/72 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="-mr-1" />
            <BookACall size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-150 ease-out-soft active:scale-90 active:bg-accent-soft lg:hidden"
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
                      "flex items-center rounded-lg px-4 py-3.5 font-display text-base font-semibold tracking-[0.1em] uppercase transition-[background-color,color,transform] duration-150 ease-out-soft active:scale-[0.99]",
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
