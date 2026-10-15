"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Factory, Layers3, Menu, X } from "lucide-react";
import { BookACall } from "@/components/book-a-call";
import { Logo } from "./logo";
import styles from "./navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const industriesRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const navigationId = useId();
  const home = pathname === "/";

  function closeMenus() { setMobileOpen(false); setIndustriesOpen(false); }

  useEffect(() => { setMobileOpen(false); setIndustriesOpen(false); }, [pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const onOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIndustriesOpen(false); setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, []);

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled || mobileOpen || !home ? styles.solid : ""}`}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (industriesOpen) { setIndustriesOpen(false); industriesRef.current?.focus(); }
        else if (mobileOpen) { setMobileOpen(false); menuRef.current?.focus(); }
      }}>
      <div className={styles.row}>
        <Logo href="/#main" className={styles.logo} markSize={29} />
        <button ref={menuRef} type="button" className={styles.toggle}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen} aria-controls={navigationId}
          onClick={() => { setMobileOpen(!mobileOpen); setIndustriesOpen(false); }}>
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav id={navigationId} aria-label="Main navigation" className={`${styles.navigation} ${mobileOpen ? styles.navigationOpen : ""}`}>
          <div className={styles.links}>
            <a href={home ? "#demo" : "/#demo"} onClick={closeMenus}>Platform</a>
            <div className={styles.industries}
              onPointerEnter={(event) => { if (event.pointerType === "mouse" && window.matchMedia("(min-width: 901px)").matches) setIndustriesOpen(true); }}
              onPointerLeave={(event) => { if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) setIndustriesOpen(false); }}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIndustriesOpen(false); }}>
              <button ref={industriesRef} type="button" className={styles.industryTrigger}
                aria-expanded={industriesOpen} aria-controls={panelId}
                onClick={() => setIndustriesOpen(!industriesOpen)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") { event.preventDefault(); setIndustriesOpen(true); }
                }}>
                Industries <ChevronDown size={13} aria-hidden="true" className={industriesOpen ? styles.chevronOpen : ""} />
              </button>
              <div id={panelId} className={styles.dropdown} hidden={!industriesOpen}>
                <p className={styles.dropdownLabel}>Built around your channel</p>
                <Link href="/industries/manufacturers" className={styles.industryItem} onClick={closeMenus}
                  aria-current={pathname === "/industries/manufacturers" ? "page" : undefined}>
                  <span className={styles.industryIcon}><Factory size={20} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span><strong>Manufacturers</strong><small>See your range across your distributors.</small></span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <div className={`${styles.industryItem} ${styles.unavailable}`} aria-label="More industries coming soon">
                  <span className={styles.industryIcon} aria-hidden="true"><Layers3 size={20} strokeWidth={1.5} /></span>
                  <span className={styles.blurred} aria-hidden="true"><strong>More industries</strong><small>A new perspective is on the way.</small></span>
                  <span className={styles.soon}>Coming soon</span>
                </div>
              </div>
            </div>
            <a href={home ? "#how-it-works" : "/#how-it-works"} onClick={closeMenus}>How it works</a>
          </div>
          <div className={styles.actions}>
            <a href="https://app.praxes.io" className={styles.login} onClick={closeMenus}>Log in</a>
            <BookACall label="Book a call" className={styles.booking} onClick={closeMenus} />
          </div>
        </nav>
      </div>
    </header>
  );
}
