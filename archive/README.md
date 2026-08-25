# Archive

Code that is no longer routed but was kept rather than deleted.

## `flight/`

The previous home page: a scroll-driven black hole, built as one fixed canvas
with the copy laid over it. Retired in the 2026 redesign, which moved the same
argument — the black hole of repetitive work, and what is on the other side of
it — into a conventional document so it could be read, crawled, and linked to
section by section.

It still depends on `content/builds.ts`, which is otherwise unused by the live
site and is annotated to say so.

Nothing in here is compiled. `tsconfig.json` excludes this directory and no
route imports it. Restoring it means moving `flight/` back under `components/`,
restoring `time-estimator.tsx` to `components/sections/`, and pointing
`app/page.tsx` at `<Flight />` again — but note that it was written against the
old dark-only token set, so it would need its colours revisited first.
