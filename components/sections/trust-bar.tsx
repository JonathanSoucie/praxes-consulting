import { Container } from "@/components/container";
import { industries } from "@/content/services";

/**
 * Trust bar. Deliberately typographic rather than a row of client logos —
 * naming sectors we actually serve is more credible than borrowed marks, and
 * it stays honest until there are real logos to show.
 *
 * To switch to logos: replace the <li> contents with next/image marks in
 * /public/logos and keep the same grid.
 */
export function TrustBar() {
  return (
    <div className="border-b border-line bg-surface-2">
      <Container className="py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="label-eyebrow shrink-0 text-muted">
            Engagements delivered across
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {industries.map((industry) => (
              <li key={industry.name} className="text-sm text-ink">
                {industry.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
