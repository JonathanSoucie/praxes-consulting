import { cn } from "@/lib/utils";
import type { StepPanel } from "@/content/services";

/**
 * The visual that accompanies one process step.
 *
 * Three shapes cover every step on the site — a pipeline, a list of findings,
 * a comparison — and each one is drawn from the step's own data rather than
 * being a screenshot. A screenshot of a product we have not built for this
 * client yet would be a lie, and a stock illustration says nothing; these say
 * the specific thing the step next to them is claiming.
 *
 * `active` drives the bar animation. Bars render at zero width until the step
 * becomes the live one, then grow — which is what makes scrolling through the
 * steps feel like watching a measurement happen rather than paging through
 * slides.
 */
export function StepPanelView({
  panel,
  active,
}: {
  panel: StepPanel;
  active: boolean;
}) {
  return (
    <div className="h-full rounded-[14px] border border-line-strong bg-surface p-7 sm:p-9">
      {panel.kind === "flow" ? <FlowPanel panel={panel} /> : null}
      {panel.kind === "rows" ? <RowsPanel panel={panel} /> : null}
      {panel.kind === "bars" ? (
        <BarsPanel panel={panel} active={active} />
      ) : null}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="label-tech mb-7 text-muted">{children}</p>;
}

function FlowPanel({ panel }: { panel: Extract<StepPanel, { kind: "flow" }> }) {
  return (
    <div>
      <Caption>Pipeline</Caption>
      <ol className="space-y-3">
        {panel.nodes.map((node, i) => (
          <li key={node.label} className="relative">
            {/* The connector, drawn between items rather than under the last
                one, so the chain reads as finished. */}
            {i > 0 ? (
              <span
                aria-hidden
                className="absolute -top-3 left-5 h-3 w-px bg-line-strong"
              />
            ) : null}
            <div
              className={cn(
                "flex items-center gap-4 rounded-[10px] border p-4 transition-colors",
                node.state === "live" && "border-accent/40 bg-accent-soft",
                node.state === "flag" && "border-dashed border-line-strong",
                (!node.state || node.state === "idle") &&
                  "border-line bg-surface-2",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  node.state === "live" && "bg-accent",
                  node.state === "flag" &&
                    "bg-transparent ring-1 ring-accent-bright",
                  (!node.state || node.state === "idle") && "bg-line-strong",
                )}
              />
              <span className="flex-1 font-heading text-base leading-tight font-semibold text-ink">
                {node.label}
              </span>
              {node.note ? (
                <span className="shrink-0 text-right text-xs text-muted">
                  {node.note}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RowsPanel({ panel }: { panel: Extract<StepPanel, { kind: "rows" }> }) {
  return (
    <div>
      {panel.caption ? <Caption>{panel.caption}</Caption> : null}
      <dl>
        {panel.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:border-t"
          >
            <dt className="flex items-center gap-3 text-ink-soft">
              <span
                aria-hidden
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  row.state === "ok" && "bg-accent",
                  row.state === "warn" && "bg-accent-bright",
                  (!row.state || row.state === "idle") && "bg-line-strong",
                )}
              />
              {row.label}
            </dt>
            <dd
              className={cn(
                "shrink-0 text-right font-heading font-semibold",
                row.state === "warn" ? "text-accent" : "text-ink",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BarsPanel({
  panel,
  active,
}: {
  panel: Extract<StepPanel, { kind: "bars" }>;
  active: boolean;
}) {
  return (
    <div>
      {panel.caption ? <Caption>{panel.caption}</Caption> : null}
      <ul className="space-y-6">
        {panel.bars.map((bar, i) => (
          <li key={bar.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-ink-soft">{bar.label}</span>
              <span
                className={cn(
                  "font-heading text-sm font-semibold",
                  bar.muted ? "text-muted" : "text-accent",
                )}
              >
                {bar.note ?? `${bar.value}%`}
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full rounded-full bg-line">
              <div
                className={cn(
                  "h-full origin-left rounded-full transition-[width] duration-700 ease-out-soft",
                  bar.muted ? "bg-line-strong" : "bg-accent",
                )}
                style={{
                  width: active ? `${bar.value}%` : "0%",
                  // Staggered so the bars arrive in order and the panel reads
                  // as a chart being drawn, not as four things appearing.
                  transitionDelay: active ? `${i * 90}ms` : "0ms",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
