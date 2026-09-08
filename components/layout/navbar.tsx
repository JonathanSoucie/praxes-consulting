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
import styles from "./navbar.module.css";

const serviceNotes: Record<string, string> = {
  "channel-census": "Map your distributor network",
  "displacement-mapping": "See which competitors hold the shelf",
  "whitespace-mapping": "Find gaps in category coverage",
  "change-monitoring": "Track what changes across your channel",
  "distributor-qualification": "Assess your next distributor",
};

// Keep the bar in the hero's existing space; it scrolls away with the page.
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = Array.from(
          headerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
        ).filter((element) => element.getClientRects().length && !element.closest("[inert]"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      className={styles.header}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpen(false);
      }}
    >
      <Container>
        <div className={styles.row}>
          <Logo markSize={34} className={styles.logo} />
          <nav aria-label="Primary" className={styles.desktopNav}>
            <ul className={styles.links}>
              {nav.map((item) =>
                item.href === "/services" ? (
                  <ServicesItem
                    key={`${item.href}:${pathname}`}
                    label={item.label}
                    href={item.href}
                    pathname={pathname}
                    active={isActive(item.href)}
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(styles.link, isActive(item.href) && styles.active)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className={styles.actions}>
            <div className={styles.desktopBooking} onClick={() => setOpen(false)}>
              <BookACall variant="outline" className={styles.booking} withArrow />
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={styles.toggle}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>
      </Container>
      <div id="mobile-nav" inert={!open} className={cn(styles.mobileSheet, open && styles.mobileOpen)}>
        <div className={styles.mobileClip}>
          <div className={styles.mobileScroll}>
            <Container>
              <nav
                aria-label="Mobile primary"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a, button")) setOpen(false);
                }}
              >
                <ul className={styles.mobileLinks}>
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(styles.mobileLink, isActive(item.href) && styles.mobileActive)}
                      >
                        {item.label}
                        <ArrowRight aria-hidden />
                      </Link>
                      {item.href === "/services" ? (
                        <ul className={styles.mobileServices}>
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
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
                <div className={styles.mobileFooter}>
                  <BookACall variant="outline" className={styles.booking} withArrow />
                  <p>Free · 30 minutes · no obligation</p>
                </div>
              </nav>
            </Container>
          </div>
        </div>
      </div>
    </header>
  );
}

function ServicesItem({ label, href, pathname, active }: {
  label: string;
  href: string;
  pathname: string;
  active: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelId = React.useId();

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnMobile = () => {
      if (!desktop.matches) setExpanded(false);
    };
    desktop.addEventListener("change", closeOnMobile);
    return () => desktop.removeEventListener("change", closeOnMobile);
  }, []);

  return (
    <li
      className={styles.servicesItem}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setExpanded(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setExpanded(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <div className={cn(styles.servicesTrigger, active && styles.active)}>
        <Link href={href} aria-current={active ? "page" : undefined} className={styles.link}>
          {label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-label="Explore services"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((value) => !value)}
          className={styles.disclosure}
        >
          <ChevronDown aria-hidden className={expanded ? styles.chevronOpen : undefined} />
        </button>
      </div>
      <div id={panelId} inert={!expanded} className={cn(styles.dropdown, expanded && styles.dropdownOpen)}>
        <div className={styles.dropdownPanel}>
          <p className={styles.dropdownLabel}>Channel Intelligence</p>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                  className={styles.serviceLink}
                >
                  <span>
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.serviceNote}>{serviceNotes[service.slug] ?? service.summary}</span>
                  </span>
                  <ArrowRight aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={href} className={styles.allServices}>
            View all services
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </li>
  );
}
