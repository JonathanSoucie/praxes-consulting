"use client";

import * as React from "react";

import { BookACall } from "@/components/book-a-call";
import { cn } from "@/lib/utils";

/**
 * Visitor-driven estimator: three inputs, one honest range.
 *
 * Deliberately not a "ROI calculator" — it doesn't claim a return. It shows
 * how many hours are in scope and a conservative band of what is plausibly
 * recoverable, with the assumptions printed underneath rather than buried.
 * The audit replaces the estimate with measurement.
 *
 * Every figure here is derived from the visitor's own three inputs — none of
 * it is a claim about our results.
 *
 * Laid out as a band, not a widget. It used to be a bordered card held to
 * max-w-2xl and centred, which on a page where every other section runs the
 * full container read as something embedded from somewhere else — the eye hit
 * a narrow box in the middle of a wide page and the column of the argument
 * broke. Now it is two columns under a rule, the same shape the small-team
 * section uses: what you set on the left, what it comes to on the right, and
 * no frame around either.
 */

/** Weeks per year used for the annualisation. */
const WEEKS_PER_YEAR = 52;
/** Reduction band typical of well-scoped automation. Keep it conservative. */
const RECOVERY_LOW = 0.2;
const RECOVERY_HIGH = 0.4;

const PEOPLE = { min: 1, max: 60, step: 1, initial: 8 };
const HOURS = { min: 1, max: 30, step: 1, initial: 9 };
/** Loaded cost — salary plus employer burden, not the hourly wage. */
const RATE = { min: 20, max: 150, step: 5, initial: 45 };

const nf = new Intl.NumberFormat("en-CA");
const cf = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function TimeEstimator({
  className,
  /** The rule that separates the estimator from the cards above it on a page.
      Inside a panel of its own there is nothing above it to separate from,
      and the rule reads as a stray line across the top. */
  divider = true,
}: {
  className?: string;
  divider?: boolean;
}) {
  const [people, setPeople] = React.useState(PEOPLE.initial);
  const [hours, setHours] = React.useState(HOURS.initial);
  const [rate, setRate] = React.useState(RATE.initial);

  const hoursInScope = people * hours * WEEKS_PER_YEAR;
  const low = Math.round(hoursInScope * RECOVERY_LOW);
  const high = Math.round(hoursInScope * RECOVERY_HIGH);
  const annualCost = hoursInScope * rate;
  const lowCost = low * rate;
  const highCost = high * rate;

  return (
    <div className={cn("text-left", className)}>
      {/* Ruled off from the cards above rather than boxed — the same edge the
          outcomes and the small-team list open on. */}
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16",
          divider && "border-t border-line-strong pt-10",
        )}
      >
        {/* What you set. */}
        <div>
          <p className="label-section text-muted">Estimator</p>

          <h3 className="card-title mt-5 text-2xl sm:text-[1.75rem]">
            Where does the time go?
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Three inputs, one honest range. Assumptions shown, not hidden.
          </p>

          <div className="mt-9 space-y-6">
            <Slider
              id="est-people"
              label="People affected"
              value={people}
              onChange={setPeople}
              {...PEOPLE}
            />
            <Slider
              id="est-hours"
              label="Manual hrs / week each"
              value={hours}
              onChange={setHours}
              {...HOURS}
            />
            <Slider
              id="est-rate"
              label="Loaded hourly cost"
              value={rate}
              format={(v) => cf.format(v)}
              onChange={setRate}
              {...RATE}
            />
          </div>
        </div>

        {/* What it comes to. */}
        <div className="flex flex-col">
          {/* gap-px over the line colour, so the four figures are divided by
              hairlines rather than floating apart — the page rules things
              off, it does not space them out. */}
          <div className="grid gap-px bg-line sm:grid-cols-2">
            <Figure
              label="Hours in scope / year"
              value={nf.format(hoursInScope)}
            />
            <Figure
              label="What that time costs / year"
              value={cf.format(annualCost)}
            />
            <Figure
              label="Plausibly recoverable"
              value={`${nf.format(low)}–${nf.format(high)} hrs`}
            />
            <Figure
              label="Recoverable / year"
              value={`${cf.format(lowCost)}–${cf.format(highCost)}`}
              accent
            />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Assumes {WEEKS_PER_YEAR} weeks and a {RECOVERY_LOW * 100}–
            {RECOVERY_HIGH * 100}% reduction band typical of well-scoped
            automation, applied to a loaded cost you supply. An audit replaces
            this estimate with measurement.
          </p>

          {/* The estimate is the highest-intent moment on the page — the next
              step belongs here, not only in the band at the bottom. mt-auto
              pins it to the foot of the column, so on a wide screen it lands
              level with the last slider rather than halfway up beside it.

              Stacked, not side by side. This column is half the width the
              estimator had as a centred card, and a nowrap button that long
              beside a sentence overflowed it — the button held its width, the
              note collapsed to its longest word, and the row ran past the
              column edge. */}
          <div className="mt-auto flex flex-col items-start gap-4 border-t border-line pt-6">
            <BookACall label="Get this measured, not estimated" withArrow />
            <p className="text-xs leading-relaxed text-muted">
              Fifteen minutes. We&apos;ll tell you whether these assumptions
              hold for your operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** Renders the readout — used for the currency input. */
  format?: (value: number) => string;
  /** Present on the config objects; not used here. */
  initial?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    // Below sm the label and value share a row and the track sits full-width
    // underneath — inline, the long labels squeeze the track to nothing.
    <div className="sm:grid sm:grid-cols-[auto_1fr_3.5rem] sm:items-center sm:gap-4">
      <div className="flex items-baseline justify-between gap-4 sm:contents">
        <label htmlFor={id} className="text-sm text-ink sm:col-start-1">
          {label}
        </label>
        <output
          htmlFor={id}
          className="figure-num text-sm tabular-nums text-ink sm:col-start-3 sm:text-right"
        >
          {format ? format(value) : value}
        </output>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        // The filled portion is painted with a gradient stop at the current
        // value, so the track reads as progress in every browser.
        style={{
          background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${pct}%, var(--color-line) ${pct}%, var(--color-line) 100%)`,
        }}
        className="range-track mt-3 sm:col-start-2 sm:row-start-1 sm:mt-0"
      />
    </div>
  );
}

function Figure({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-surface p-6">
      <p className="text-xs text-muted">{label}</p>
      {/* Sized for the longest value this can hold — a currency range like
          "$33,700–$67,400" — so the figures never wrap mid-number. Two of
          these now sit side by side in half the width they had as a centred
          card, which is why the display step is gone: at text-2xl the range
          broke across two lines and took the tile's height with it. */}
      <p
        className={cn(
          "figure-num mt-2 text-xl",
          accent ? "text-accent" : "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}
