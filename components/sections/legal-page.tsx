import { Container } from "@/components/container";
import { PageHeader } from "@/components/sections/page-header";

/**
 * Shared shell for /privacy and /terms. Narrow measure, plain typography —
 * these pages are for reading, not for selling.
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
        deck={
          <>
            Last updated{" "}
            <time dateTime={updated} className="figure-num text-ink">
              {new Date(updated).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </>
        }
      />

      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl space-y-10">
          <div className="rounded-sm border border-line bg-surface-2 p-5 text-sm leading-relaxed text-muted">
            <strong className="text-ink">Template notice.</strong> This document
            is a starting point, not legal advice. Have it reviewed against your
            jurisdiction and actual data practices before you rely on it.
          </div>
          {children}
        </div>
      </Container>
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
      <h2 className="text-xl sm:text-2xl">{heading}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
