import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { site } from "@/content/site";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.top}`}>
        <div className={styles.brand}>
          <Logo href="/#main" className={styles.logo} markSize={29} />
          <p>A clearer view of your channel.<br />A stronger next move.</p>
        </div>
        <nav className={styles.column} aria-label="Footer navigation">
          <span>Explore</span>
          <a href="/#platform">Platform</a>
          <Link href="/industries/manufacturers">Manufacturers</Link>
          <a href="/#how-it-works">How it works</a>
        </nav>
        <div className={styles.column}>
          <span>Get in touch</span>
          <Link href="/contact">Contact us <ArrowUpRight size={13} aria-hidden="true" /></Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
          <p>{site.address.locality}, {site.address.country}</p>
        </div>
      </div>
      <div className={`${styles.container} ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
