"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { BookACall } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { nav } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The navbar, after the reference: the brand at the left, the links in the
 * middle in plain sentence case, and one outlined action at the right. The
 * bar carries its own ground and a hairline under it, so the hero's room
 * starts below the bar rather than running up behind the links.
 *
 * It is `absolute`, not `fixed`: the permanent chrome is the frame in
 * components/layout/frame.tsx, and a sticky bar on top of a fixed frame gave
 * the page two competing edges. `top` is the frame's own thickness, so the
 * bar lands exactly on the frame's inner edge.
 *
 * Services opens a menu of the three services on hover or focus, the way
 * the reference's chevroned items do. The trigger is still a link to the
 * index, so a click — and a tap, where there is no hover — goes somewhere
 * useful whether or not the menu opened.
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

  /* A fragment link is never the current page. Nothing in `nav` is one
     today, but one would otherwise match every route by prefix and sit
     permanently marked as current. */
  const isActive = (href: string) =>
    !href.includes("#") &&
    (pathname === href || pathname.startsWith(`${href}/`));

  const linkClass = (href: string) =>
    cn(
      "inline-flex items-center gap-1.5 text-[1.125rem] font-medium transition-colors duration-150 ease-out-soft",
      isActive(href) ? "text-ink" : "text-ink/85 hover:text-ink",
    );

  return (
    <header
      className="absolute inset-x-0 z-50 border-b border-line bg-surface-2"
      style={{ top: "var(--frame-y)" }}
    >
      <Container>
        {/* Three tracks, the outer two equal, so the links are centred on
            the page rather than on whatever is left between the brand and
            the button.

            The bottom pad is the frame's own thickness, and it is what makes
            the row centre correctly. The bar starts below the frame's top
            mat, but the mat is painted in the bar's own colour — so what the
            reader sees as the bar runs from the top of the screen to the
            hairline, while the row's box starts `--frame-y` down. Centring in
            the box left everything sitting half the mat's height low. Taking
            that height off the bottom of the row moves the content up by half
            of it, which lands it on the centre of the band actually visible.
            Measured: content mid 53 in a 106px band. */}
        <div className="grid h-18 grid-cols-[1fr_auto_1fr] items-center gap-6 pb-[var(--frame-y)] lg:h-22">
          <div className="col-start-1 flex items-center">
            <Logo markSize={40} className="gap-3 text-[2rem]" />
          </div>

          <nav
            aria-label="Primary"
            className="col-start-2 hidden lg:block"
          >
            <ul className="flex items-center gap-10 xl:gap-12">
              {nav.map((item) =>
                item.href === "/services" ? (
                  <ServicesItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    active={isActive(item.href)}
                    className={linkClass(item.href)}
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-2">
            {/* Outlined, not filled — the reference keeps the bar's one
                action quiet and lets the hero carry the colour. The site's
                buttons are otherwise mono; this one takes the sans so it sits
                with the links beside it. */}
            <BookACall
              variant="outline"
              size="md"
              className="hidden h-11 rounded-[8px] border-ink/85 bg-transparent px-9 font-sans text-[0.9375rem] font-bold tracking-[0.04em] text-ink hover:border-ink hover:bg-ink hover:text-surface-2 sm:inline-flex"
            />
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

      {/* Mobile sheet.

          Opens and closes along the same path — it grows down out of the bar
          it belongs to and retracts back into it, rather than being switched
          out of existence with `hidden`. The grid-rows 0fr/1fr pair is what
          makes that animatable without hard-coding a height that would be
          wrong the moment a nav item is added.

          It stays in the DOM and uses `inert` while closed, so it is properly
          removed from the tab order and the accessibility tree without
          costing the transition. The services are listed under their parent
          here, since there is no hover to open a menu with. */}
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
                      "flex items-center rounded-[8px] px-4 py-3.5 text-lg font-medium transition-[background-color,color,transform] duration-150 ease-out-soft active:scale-[0.99]",
                      isActive(item.href)
                        ? "bg-accent-soft text-accent-ink"
                        : "text-ink hover:bg-surface-2 active:bg-accent-soft active:text-accent-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/services" ? (
                    <ul className="mb-2 ml-4 border-l border-line pl-4">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="block px-2 py-2.5 text-base text-ink-soft transition-colors hover:text-ink"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
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

/**
 * The Services item and its menu.
 *
 * State is tracked rather than left to `:hover`, so `aria-expanded` is true
 * exactly when the menu is showing. It opens on pointer entry and on focus
 * moving into it, closes when either leaves, and Escape closes it and puts
 * focus back on the trigger. The gap between trigger and panel is padding
 * inside the wrapper, not a margin, so the pointer never crosses a hole on
 * the way down.
 */
function ServicesItem({
  label,
  href,
  active,
  className,
}: {
  label: string;
  href: string;
  active: boolean;
  className: string;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);
  const menuId = React.useId();

  return (
    <li
      className="relative"
      onPointerEnter={() => setExpanded(true)}
      onPointerLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setExpanded(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setExpanded(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <Link
        ref={triggerRef}
        href={href}
        aria-current={active ? "page" : undefined}
        aria-haspopup="menu"
        aria-expanded={expanded}
        aria-controls={menuId}
        className={className}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 transition-transform duration-200 ease-out-soft",
            expanded && "rotate-180",
          )}
        />
      </Link>

      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-[opacity,transform] duration-200 ease-out-soft",
          expanded
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          className="w-72 rounded-[10px] border border-line-strong bg-surface p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)]"
        >
          {services.map((service) => (
            <li key={service.slug} role="none">
              <Link
                role="menuitem"
                href={`/services/${service.slug}`}
                className="block rounded-[6px] px-3 py-2.5 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
              >
                <span className="block text-sm font-medium text-ink">
                  {service.name}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  {service.summary}
                </span>
              </Link>
            </li>
          ))}
          <li role="none" className="mt-1 border-t border-line pt-1">
            <Link
              role="menuitem"
              href={href}
              className="flex items-center justify-between rounded-[6px] px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2"
            >
              All services
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}
