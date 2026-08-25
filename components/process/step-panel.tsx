import { cn } from "@/lib/utils";
import type { StepPanel } from "@/content/services";

/**
 * The visual that accompanies one process step.
 *
 * Three shapes cover every step on the site — a pipeline, a list of findings,
 * a comparison — and each one is drawn from the step's own data rather than
 * being a screenshot. That is the reason to build these at all: a screenshot
 * of a product we have not built for this client yet would be a lie, and a
 * generic stock illustration says nothing. These say the specific thing the
 * step next to them is claiming.
 *
 * `active` drives the bar animation. Bars render at zero width until the step
 * becomes the live one, then grow — which is what makes scrolling through the
 * steps feel like watching a measurement happen rather than like paging
 * through slides.
 */
export function StepPanelView({
  panel,
  active,
}: {
  panel: StepPanel;
  active: boolean;
}) {
  return (
    <div className="card h-full p-7 sm:p-9">
      {panel.kind === "flow" ? <FlowPanel panel={panel} /> : null}
      {panel.kind === "rows" ? <RowsPanel panel={panel} /> : null}
      {panel.kind === "bars" ? (
        <BarsPanel panel={panel} active={active} />
      ) : null}
    </div>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-7 text-muted">{children}</p>;
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
                "flex items-center gap-4 border p-4 transition-colors",
                node.state === "live" && "border-pink-3/40 bg-pink-soft",
                node.state === "flag" && "border-dashed border-line-strong",
                (!node.state || node.state === "idle") &&
                  "border-line bg-page",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  node.state === "live" && "bg-pink",
                  node.state === "flag" && "bg-transparent ring-1 ring-pink-3",
                  (!node.state || node.state === "idle") && "bg-line-strong",
                )}
              />
              <span className="flex-1 font-display text-base leading-tight">
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
                  row.state === "ok" && "bg-pink",
                  row.state === "warn" && "bg-pink-3",
                  (!row.state || row.state === "idle") && "bg-line-strong",
                )}
              />
              {row.label}
            </dt>
            <dd
              className={cn(
                "shrink-0 text-right font-display",
                row.state === "warn" ? "text-pink-ink" : "text-ink",
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
                  "font-display text-sm",
                  bar.muted ? "text-muted" : "text-pink-ink",
                )}
              >
                {bar.note ?? `${bar.value}%`}
              </span>
            </div>
            <div className="mt-2.5 h-1.5 w-full bg-line">
              <div
                className={cn(
                  "h-full origin-left transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  bar.muted ? "bg-line-strong" : "bg-pink",
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
