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
 * The navbar.
 *
 * Fixed rather than in flow. The previous build let it scroll away because
 * the permanent chrome was a frame around the viewport; that frame is gone
 * with the redesign, and a site with pages this long needs the way out to
 * stay reachable.
 *
 * It carries no material at the top of the page — over the hero it is just
 * type on the page colour, which is what keeps the first screen as open as
 * the design asks for. It takes on an opaque ground the moment anything
 * scrolls under it. Opaque and not translucent, deliberately: the bar passes
 * over the black sections, and a frosted bar there would drag the artwork up
 * behind the wordmark and lose the links entirely.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    // Passive: this handler never calls preventDefault, and saying so lets
    // the browser keep scrolling off the main thread.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-b border-line bg-page"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "font-ui text-[0.9375rem] transition-colors",
                      isActive(item.href)
                        ? "text-pink-ink"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <BookACall className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center text-ink lg:hidden"
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile. A full sheet rather than a dropdown: at this type size a
          dropdown holding six links and a button is most of the screen
          anyway, and the sheet lets the links be set at a size worth
          tapping. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 top-20 z-40 overflow-y-auto bg-page lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-10">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className={cn(
                    "block py-5 font-ui text-3xl transition-colors",
                    isActive(item.href) ? "text-pink-ink" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BookACall size="lg" withArrow className="w-full" />
          </div>
        </Container>
      </div>
    </header>
  );
}
