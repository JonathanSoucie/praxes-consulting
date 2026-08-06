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
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-surface/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-line shadow-[0_1px_0_rgba(16,4,16,0.02)]"
          : "border-b border-transparent"
      )}
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
                      "rounded-full px-3.5 py-2 text-sm transition-colors",
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-ink"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookACall size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
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
        className="border-t border-line bg-surface lg:hidden"
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
                      : "text-ink hover:bg-surface-2"
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
