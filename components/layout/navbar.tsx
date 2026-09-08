"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";
import { BookACall, BookingNote } from "@/components/book-a-call";
import { Container } from "@/components/container";
import { nav } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import styles from "./navbar.module.css";

const serviceNotes: Record<string, string> = {
  "channel-census": "Know which distributors publish a catalog you can read.",
  "displacement-mapping": "See the competitor brands occupying your categories.",
  "whitespace-mapping": "Find category gaps your products could fill.",
  "change-monitoring": "Track what changes across your channel.",
  "distributor-qualification": "Assess your next distributor.",
};

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const servicesRef = React.useRef<HTMLButtonElement>(null);
  const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = React.useId();

  const cancelHover = React.useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }, []);
  const closeMenus = React.useCallback(() => {
    cancelHover();
    setMobileOpen(false);
    setServicesOpen(false);
  }, [cancelHover]);

  React.useEffect(() => { closeMenus(); }, [pathname, closeMenus]);
  React.useEffect(() => cancelHover, [cancelHover]);
  React.useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1024px)");
    breakpoint.addEventListener("change", closeMenus);
    return () => breakpoint.removeEventListener("change", closeMenus);
  }, [closeMenus]);

  React.useEffect(() => {
    if (!mobileOpen && !servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenus();
        (mobileOpen ? toggleRef : servicesRef).current?.focus();
      }
      if (event.key === "Tab" && mobileOpen) {
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
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, servicesOpen, closeMenus]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <div aria-hidden className={cn(styles.backdrop, servicesOpen && styles.backdropOpen)} />
      <header
        ref={headerRef}
        className={cn(styles.header, servicesOpen && styles.headerExpanded)}
        onPointerEnter={cancelHover}
        onPointerLeave={(event) => {
          cancelHover();
          if (event.pointerType === "mouse") {
            hoverTimer.current = setTimeout(() => setServicesOpen(false), 160);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false);
        }}
        onClick={(event) => {
          if ((event.target as Element).closest("a")) closeMenus();
        }}
      >
        <Container className={styles.row}>
          <Logo markSize={31} className={styles.logo} />
          <nav aria-label="Primary" className={styles.desktopNav}>
            <ul className={styles.links}>
              {nav.map((item) => (
                <li key={item.href}>
                  {item.href === "/services" ? (
                    <button
                      ref={servicesRef}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls={panelId}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") {
                          cancelHover();
                          hoverTimer.current = setTimeout(() => setServicesOpen(true), 120);
                        }
                      }}
                      onClick={() => {
                        cancelHover();
                        setServicesOpen((value) => !value);
                      }}
                      className={cn(styles.link, (isActive(item.href) || servicesOpen) && styles.active)}
                    >
                      {item.label}
                      <ArrowDown aria-hidden className={servicesOpen ? styles.arrowOpen : undefined} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onPointerEnter={() => { cancelHover(); setServicesOpen(false); }}
                      className={cn(styles.link, isActive(item.href) && styles.active)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <div className={styles.desktopBooking} onClick={closeMenus}>
              <BookACall variant="outline" className={styles.booking} />
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={styles.toggle}
            >
              {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </Container>

        <div id={panelId} inert={!servicesOpen} className={cn(styles.dropdown, servicesOpen && styles.dropdownOpen)}>
          <div className={styles.dropdownClip}>
            <div className={styles.dropdownScroll}>
              <Container>
                <nav aria-label="Services">
                  <ul className={styles.serviceCards}>
                    {services.slice(0, 3).map((service, index) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                          className={styles.serviceCard}
                        >
                          <div aria-hidden className={cn(styles.preview, styles[`preview${index}`])}>
                            {service.showcase.panel.kind === "rows" && (
                              <div className={styles.previewSheet}>
                                {service.showcase.panel.rows.slice(0, 3).map((row) => (
                                  <div key={row.label} className={cn(styles.previewRow, row.state === "ok" && styles.previewHighlight)}>
                                    <span>{row.label}</span><span>{row.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className={styles.cardTitle}><span>{service.name}</span><ArrowRight aria-hidden /></div>
                          <p className={styles.cardDescription}>{serviceNotes[service.slug]}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.dropdownFooter}>
                    {services.slice(3).map((service) => (
                      <Link key={service.slug} href={`/services/${service.slug}`} className={styles.secondaryService}>
                        <span><strong>{service.name}</strong><span>{serviceNotes[service.slug]}</span></span>
                        <ArrowRight aria-hidden />
                      </Link>
                    ))}
                    <Link href="/services" className={styles.allServices}>Explore all services <ArrowRight aria-hidden /></Link>
                  </div>
                </nav>
              </Container>
            </div>
          </div>
        </div>

        <div id="mobile-nav" inert={!mobileOpen} className={cn(styles.mobileSheet, mobileOpen && styles.mobileOpen)}>
          <div className={styles.mobileClip}>
            <div className={styles.mobileScroll}>
              <Container>
                <nav aria-label="Mobile primary" onClick={(event) => {
                  if ((event.target as Element).closest("a, button")) closeMenus();
                }}>
                  <ul className={styles.mobileLinks}>
                    {nav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn(styles.mobileLink, isActive(item.href) && styles.mobileActive)}>
                          {item.label}<ArrowRight aria-hidden />
                        </Link>
                        {item.href === "/services" && (
                          <ul className={styles.mobileServices}>
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link href={`/services/${service.slug}`} aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}>{service.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.mobileFooter}>
                    <BookACall variant="outline" className={styles.booking} />
                    <BookingNote />
                  </div>
                </nav>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
