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

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Hairline border appears only once the page has moved — keeps the top of
  // the page clean without the header ever floating unanchored.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
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
        "sticky top-0 z-50 bg-surface/90 backdrop-blur-sm transition-shadow",
        scrolled ? "border-b border-line" : "border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-17 items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-sm transition-colors",
                      isActive(item.href)
                        ? "text-ink"
                        : "text-muted hover:text-ink"
                    )}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-px bg-accent"
                      />
                    ) : null}
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
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-sm text-ink lg:hidden"
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
        <Container className="py-4">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-3.5 font-serif text-lg",
                    isActive(item.href) ? "text-accent" : "text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <BookACall size="lg" className="mt-5 w-full" withArrow />
        </Container>
      </div>
    </header>
  );
}
