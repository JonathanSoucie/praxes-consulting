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
 * Overlay navbar. Transparent over the dark hero gradient, then resolves to a
 * solid light bar once the page scrolls past it.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
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

  // Once the bar is solid — or the mobile sheet is open — it is a light
  // surface, so its contents switch to dark ink.
  const onLight = solid || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        onLight
          ? "border-b border-line bg-surface-2/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-8">
          <Logo tone={onLight ? "default" : "inverse"} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors",
                      onLight
                        ? isActive(item.href)
                          ? "bg-accent-soft text-accent-ink"
                          : "text-muted hover:text-ink"
                        : isActive(item.href)
                          ? "bg-white/15 text-white"
                          : "text-white/70 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookACall
              size="sm"
              variant={onLight ? "primary" : "onDark"}
              className="hidden sm:inline-flex"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "-mr-2 inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
                onLight ? "text-ink" : "text-white"
              )}
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

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-surface-2 lg:hidden"
      >
        <Container className="py-5">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center rounded-lg px-4 py-3.5 font-display text-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-accent-soft text-accent-ink"
                      : "text-ink hover:bg-white"
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
    </header>
  );
}
