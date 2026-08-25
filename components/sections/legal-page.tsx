import { Container, Section } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";

/**
 * Shared shell for /privacy and /terms.
 *
 * Legal copy is the one place on this site where the type gets smaller rather
 * than larger. Everything else is set to be read across a room; this is set
 * to be read closely, at a comfortable measure, with the headings doing the
 * navigating and nothing competing for attention.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  /** ISO date, e.g. "2026-08-03". */
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        standfirst={`Last updated ${new Date(`${updated}T12:00:00Z`).toLocaleDateString(
          "en-GB",
          { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
        )}.`}
      />

      <Section size="sm">
        <Container>
          <div className="measure-wide">
            {/* Kept, and kept prominent. These documents are templates and
                shipping them as though they were reviewed advice is the
                actual risk here. */}
            <p className="border border-line bg-white p-6 text-ink-soft">
              <strong>Template notice.</strong> This document is a starting
              point, not legal advice. Have it reviewed against your
              jurisdiction and your actual data practices before you rely on
              it.
            </p>
            <div className="mt-14 space-y-14">{children}</div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl">{heading}</h2>
      <div className="mt-5 space-y-5 leading-[1.7] text-ink-soft [&_a]:link-underline [&_a]:text-pink-ink [&_li]:leading-[1.7] [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
