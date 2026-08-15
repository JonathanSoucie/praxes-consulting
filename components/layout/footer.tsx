import Link from "next/link";

import { Container } from "@/components/container";
import { Logo } from "@/components/layout/logo";
import { legalNav, nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // The page colour, not the card colour: the footer sits outside and below
    // the content card, on the same margin that surrounds it. Filling it with
    // the card colour would put a full-bleed slab under the card and undo the
    // sheet-on-a-desk read.
    <footer className="bg-surface-2">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-medium text-ink">Site</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-ink">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
              <li className="text-muted">
                {site.address.locality}, {site.address.region}
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {site.founded === year ? year : `${site.founded}–${year}`}{" "}
            {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
