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

export function TimeEstimator({ className }: { className?: string }) {
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
    <div
      className={cn(
        "card-float rounded-2xl bg-surface p-7 text-left sm:p-9",
        className
      )}
    >
      <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
        Estimator
      </p>

      <h2 className="mt-4 text-2xl sm:text-[1.75rem]">
        Where is your time going?
      </h2>
      <p className="mt-2 text-sm text-muted">
        Three inputs, one honest range. Assumptions shown, not hidden.
      </p>

      <div className="mt-8 space-y-6">
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Figure label="Hours in scope / year" value={nf.format(hoursInScope)} />
        <Figure label="What that time costs / year" value={cf.format(annualCost)} />
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

      <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        Assumes {WEEKS_PER_YEAR} weeks and a {RECOVERY_LOW * 100}–
        {RECOVERY_HIGH * 100}% reduction band typical of well-scoped
        automation, applied to a loaded cost you supply. An audit replaces
        this estimate with measurement.
      </p>

      {/* The estimate is the highest-intent moment on the page — the next
          step belongs here, not only in the band at the bottom. */}
      <div className="mt-7 flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-5">
        <BookACall label="Get this measured, not estimated" withArrow />
        <p className="text-xs leading-relaxed text-muted">
          Fifteen minutes. We&apos;ll tell you whether these assumptions hold
          for your operation.
        </p>
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
    <div className="rounded-xl bg-surface-2 p-5">
      <p className="text-xs text-muted">{label}</p>
      {/* Sized for the longest value this can hold — a currency range like
          "$33,700–$67,400" — so the figures never wrap mid-number. */}
      <p
        className={cn(
          "figure-num mt-2 text-xl sm:text-2xl",
          accent ? "text-accent" : "text-ink"
        )}
      >
        {value}
      </p>
    </div>
  );
}
