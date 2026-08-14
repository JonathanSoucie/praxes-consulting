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
 * Overlay navbar. Every page top is now a light (white/neuron-field)
 * background, so the bar stays light and frosted throughout — no more
 * dark-hero colour flip. Scroll only adds a hairline border for separation.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      // `supports-frost` is the hook for the reduced-transparency and
      // increased-contrast rules in globals.css, which make this bar solid
      // for anyone who has asked for that.
      data-scrolled={scrolled || open ? "" : undefined}
      className="supports-frost scroll-edge fixed inset-x-0 top-0 z-50 bg-surface/85 backdrop-blur-md"
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-[background-color,color,transform] duration-150 ease-out-soft active:scale-[0.97]",
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-ink"
                        : "text-muted hover:bg-accent-soft/60 hover:text-ink active:bg-accent-soft active:text-accent-ink"
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
          costing the transition. And it carries the header's own material
          instead of an opaque fill, because it is the same surface. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          "supports-frost grid overflow-hidden bg-surface/85 backdrop-blur-md transition-[grid-template-rows,opacity] duration-300 ease-out-soft lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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
                      "flex items-center rounded-lg px-4 py-3.5 font-display text-lg font-medium transition-[background-color,color,transform] duration-150 ease-out-soft active:scale-[0.99]",
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-ink"
                        : "text-ink hover:bg-surface-2 active:bg-accent-soft active:text-accent-ink"
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
