# Project Context — Assortment Intelligence Dashboard

## What this is

A mid-season merchandising dashboard for Maeven Label, a fictional women's sports
apparel brand. It gives a category manager or buyer a single view of how their
active assortment is performing — sell-through, returns, sentiment — with an
AI-generated insight and one recommended action per style. Full spec lives in
[`BRIEF.md`](../BRIEF.md).

## Build goals

- Answer "which styles need attention right now" at a glance (header KPIs +
  AI Insight badge), then let the buyer drill into any style without leaving
  the page (inline expandable row, not a route change).
- Every data point in the AI Insight card should be traceable to a real field
  in `src/data/assortment.json` — no insight text that isn't backed by the
  underlying metrics.

## Design intent

Visual language follows the **Voltline Analytics** design system
(`design-systems/voltline-analytics.zip`): cool platinum canvas, white paper
cards with hairline borders (no heavy shadows), deep-ink typography, and a
single electric lime accent reserved for CTAs, the active sell-through target
line, and the AI Insight card's left border. Status color (red/amber/green)
is the one deliberate exception to "one accent color" — it's required by the
brief to make `action_needed` / `watch` / `on_track` scannable in a dense
table.

## Key decisions not spelled out in the brief

- **Season filter**: only "Fall 2026" has data loaded; selecting "Spring 2026"
  shows the empty state rather than fabricating a second dataset.
- **At-risk threshold**: sell-through more than 10 points below plan target
  (`isAtRisk` in `src/utils/dataHelpers.js`), matching the brief's KPI
  definition exactly so the header tile and table filter never disagree.
- **Size curve status**: a size is flagged shortage/excess when its sell-through
  rate diverges from the style's average by 15+ points — invented threshold,
  documented in `component-notes.md`.
- **"Mark as reviewed"** state lives in `App.jsx` React state only (per brief:
  "state lives in memory for the session"), not persisted.

See [`component-notes.md`](./component-notes.md) for component-level decisions.
