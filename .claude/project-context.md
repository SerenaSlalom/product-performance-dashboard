# Project Context — Product Inventory Dashboard

## What this is

A mid-season merchandising dashboard for Maeven Label, a fictional women's
sports apparel brand. It gives a category manager one page that reads as a
briefing — assortment health, what's driving it, and what to do about it —
before they ever need to open a single product's detail. Full spec lives in
[`BRIEF.md`](../BRIEF.md).

## Build history and the pivot (read this before touching component-notes.md)

The first build (2026-09-15, commits `3dcf153`–`fd98b44`) followed the
original brief closely: a header KPI row plus a sortable/filterable product
table where clicking a row expanded a 3-column detail panel (performance
charts, return/review breakdown, one AI insight card) per SKU.

Later the same day, iterative feedback moved the product in a different
direction — from "drill into any one style" to "show me the assortment's
story at a glance, then let me act." That took several steps, each a
separate commit:

1. Season filter converted from single-select to multi-select (`b880320`).
2. The row-click detail panel and its whole component tree (`ProductTable`,
   `ProductRow`, `ProductDetailPanel`, `AIInsightCard`, `SentimentPanel`,
   `ReturnBreakdown`, `SellThroughChart`, `SizeCurveChart`, `StatusBadge`,
   plus the original `KPITile`/`TrendKPICard`) were removed entirely.
3. In their place: four insight-style KPI cards, a multi-season category
   trend chart, size performance + demand-driver breakdowns, a return-driver
   chart + cost-impact card, a customer-voice sentiment panel, a ranked
   recommended-actions list, and a single risk-sorted inventory table
   (`60a0212`).

**If you're picking this project back up:** the current component list and
data model are documented below and in `component-notes.md`. Don't reference
the old `ProductTable`/`ProductRow`/`ProductDetailPanel` family — those files
no longer exist. `BRIEF.md` was rewritten on 2026-09-17 to match this
architecture; keep it in sync going forward instead of letting it drift like
it did here.

## Build goals

- Answer "how is the assortment doing, and what should I do about it" in
  one scroll, without requiring the user to open individual products first.
- Every chart and KPI should be traceable to either a real field in
  `src/data/assortment.json` (per-product metrics, risk scoring) or an
  explicitly-documented aggregate constant in `src/utils/dataHelpers.js`
  (category/size/return-driver/customer-voice rollups) — no numbers invented
  ad hoc inside a component.
- The season filter is the one control that affects the whole page: it
  drives the Category Performance chart's data and should be the first
  thing extended if a future session adds more season-aware sections.

## Design intent

Visual language follows the **Voltline Analytics** design system
(`design-systems/voltline-analytics.zip`): cool platinum canvas, white paper
cards with soft shadows (no heavy borders), deep-ink typography, and a
single electric lime accent reserved for CTAs and live-data highlights.
Status/tone color (red/amber/green for danger/warning/success) is the one
deliberate exception to "one accent color" — used for risk badges, sell-
through/return-rate coloring, and alert cards, so anything requiring
attention is scannable without reading every number.

Multi-series charts (category trend lines, return-driver bars, action rank
badges) use one fixed five-color categorical palette (indigo, pink, plus the
existing warning/success/cyan tones) so the whole page reads as one system
instead of each new chart inventing its own colors.

## Key decisions not spelled out in the brief

- **Season filter**: only "Fall 2026" has full per-product data loaded in
  `assortment.json`; the Category Performance chart is the one section that
  can render other seasons, because its data comes from the
  `CATEGORY_SEASON_TRENDS` aggregate in `dataHelpers.js`, not per-product
  data. Selecting a single season shows that season's three months
  (`SEASON_MONTHS` + `getCategorySeasonMonthlyTrend`); selecting multiple
  seasons shows one point per season.
- **At-risk threshold**: sell-through more than 10 points below plan target
  (`isAtRisk` in `src/utils/dataHelpers.js`), matching the brief's KPI
  definition exactly so the header card and risk scoring never disagree.
- **Risk tier vs. risk score**: risk *tier* (High/Medium/Low, shown as a
  badge) is a direct mapping of each product's existing `ai_insight.status`
  — it's not re-derived, to avoid the table ever disagreeing with the
  AI-insight data it was written against. Risk *score* (a weighted number
  combining sell-through gap, return rate, and rating) exists only to break
  ties and produce a stable sort order within and across tiers.
- **Illustrative business metrics** (units sold, revenue, category/size/
  return-driver rollups, customer-voice theme counts): none of these exist
  as raw fields in `assortment.json`. They're modeled as a separate
  aggregate/lookup layer in `dataHelpers.js`, scaled to stay internally
  consistent with the per-product data (e.g. the highest-risk product also
  has the lowest units-sold/revenue figures). Documented per-section in
  `component-notes.md`.

See [`component-notes.md`](./component-notes.md) for component-level decisions.
