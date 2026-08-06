import { Container } from "@/components/container";
import { industries } from "@/content/services";

/**
 * Trust bar. Typographic rather than a row of client logos — naming sectors
 * we actually serve is more credible than borrowed marks, and it stays honest
 * until there are real logos to show.
 *
 * To switch to logos: replace the <li> contents with next/image marks from
 * /public/logos and keep the same flex row.
 */
export function TrustBar() {
  return (
    <div className="bg-surface-2 py-14">
      <Container>
        <p className="text-center text-sm text-muted">
          Engagements delivered across
        </p>
        {/* Typographic, not chips — separators do the work a border used to. */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {industries.map((industry) => (
            <li key={industry.name} className="text-sm text-ink">
              {industry.name}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
