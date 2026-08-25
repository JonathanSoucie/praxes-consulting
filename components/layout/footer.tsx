import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { services } from "@/content/services";
import { segments } from "@/content/segments";
import { legalNav, nav, site } from "@/content/site";

/**
 * The footer, on the deep ground.
 *
 * It closes the page on black on every route, which is the last beat of the
 * same argument the home page makes: the black hole is where you end up if
 * nothing changes. It is also the only sitemap-shaped thing on the site, so
 * it carries the full service and segment lists rather than a condensed nav.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const range = year > site.founded ? `${site.founded}–${year}` : `${year}`;

  return (
    <footer className="on-deep">
      <Container>
        <div className="grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12 lg:py-28">
          <div>
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="inline-flex items-center gap-2.5 font-display text-xl font-medium text-ink transition-opacity hover:opacity-80"
            >
              <LogoMark size={30} />
              {site.name}
            </Link>
            <p className="measure mt-6 text-ink-soft">
              We find the repetitive work eating your week, price it at your
              own labour cost, and automate it. Roughly a third of our audits
              recommend not building at all.
            </p>
            <div className="mt-8 space-y-1.5 text-sm text-muted">
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="link-underline transition-colors hover:text-ink"
                >
                  {site.phone}
                </a>
              </p>
              <p>
                {site.address.locality}, {site.address.region},{" "}
                {site.address.country}
              </p>
            </div>
          </div>

          <FooterColumn title="What we offer">
            {services.map((service) => (
              <FooterLink
                key={service.slug}
                href={`/services/${service.slug}`}
                label={service.name}
              />
            ))}
          </FooterColumn>

          <FooterColumn title="Who we work with">
            {segments.map((segment) => (
              <FooterLink
                key={segment.slug}
                href={`/industries/${segment.slug}`}
                label={segment.name}
              />
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {nav
              .filter((item) => item.href !== "/services")
              .map((item) => (
                <FooterLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                />
              ))}
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {range} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
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

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="eyebrow text-muted">{title}</h2>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-ink-soft transition-colors hover:text-ink"
      >
        {label}
      </Link>
    </li>
  );
}
