# Component Notes

Decisions made while building components that the brief left open.

## `KPITile`
- The "Average Sell-Through Rate" tile uses the ink/accent (`accent`) variant
  to lead the eye, per the design system's rule of one elevated moment per
  region. The other three tiles stay on plain white surfaces.
- "Styles At Risk" is the only clickable tile (brief nice-to-have): it sets
  `statusFilter` to `at-risk` and jumps the season back to Fall 2026 so the
  filter always has data to show.

## `ProductTable` / `ProductRow`
- Sort and category/status filters are independent and composable (e.g.
  "Sports Bras" + "At-Risk Only" + "Return Rate desc" all apply together).
- Row hover uses a lighter tint (`surface-inset/60`) than the expanded-row
  background (`surface-inset` at full opacity) so an open row stays visually
  distinct from a hovered one.
- A small red dot next to Sell-Through marks at-risk styles inline, so the
  signal is visible even when the table isn't filtered to At-Risk Only.

## `AIInsightCard`
- Left border uses the CSS variable `--color-accent` directly (not a Tailwind
  utility) since Tailwind v4 doesn't generate a `border-l-accent` shorthand
  for arbitrary widths — kept as inline style to avoid a one-off utility class.
- "Recommended action" sits in an ink-filled sub-card, not the lime card
  background, per the design system's rule that lime should highlight status/
  CTAs, not surround body copy.

## `SizeCurveChart`
- "Sold out" is a computed threshold (units sold ÷ purchased ≥ 90%), not a
  literal `sold_out` boolean in the data — the JSON only stores raw counts.

## `SentimentPanel` / `ReturnBreakdown`
- Sentiment star color reuses the same red/amber/green thresholds as the
  table's sentiment color-coding nice-to-have (`getSentimentTone` in
  `dataHelpers.js`), so the table and the expanded panel never disagree.
- The return-reason donut uses a muted slate/ink palette with two lime tones
  reserved for whichever reason ranks highest, echoing the "reserve lime for
  the current-period highlight" rule for charts.

## `TopBar` / layout (post-launch feedback round)
- The fixed sidebar nav was removed per stakeholder feedback and replaced
  with a horizontal top bar: brand wordmark top-left, buyer identity
  (initials avatar + name + title) top-right. No nav links were added back
  in — the feedback asked for the sidebar gone, not relocated.
- The brand mark is a static SVG (`public/maeven-logo.svg`) sized from the
  supplied `maeven_logo_v3_final.html` asset, colored to the design system's
  ink token instead of pure black.

## `MiniTrendBars` (`ProductRow` Sell-Through / Return Rate columns)
- Stakeholder feedback asked to replace the flat percentage text in these two
  columns with charts broken out by month of the active season. Neither field
  has real monthly data in `assortment.json`, so:
  - **Sell-Through**: reuses the existing 6-week `sell_through_trend` array,
    sampling weeks 2/4/6 as three month-end snapshots
    (`getMonthlySellThrough`). Week 6 always equals the row's authoritative
    `sell_through_pct`, so the chart's current-month bar never disagrees with
    the KPI tiles or sorting.
  - **Return Rate**: has no trend array at all, only a final `return_rate_pct`.
    `getMonthlyReturnRate` synthesizes a plausible ramp (55% → 80% → 100% of
    the final value) rather than inventing new JSON fields — the final bar
    still always equals the real `return_rate_pct`.
  - Month labels are hardcoded to `ACTIVE_SEASON_MONTHS` (Sep/Oct/Nov) since
    only Fall 2026 has row data; other seasons never render a row.
  - The sell-through chart keeps a dashed target line (`sell_through_target_pct`)
    since that comparison was the main thing lost by dropping the "/ NN% plan"
    text; return rate has no equivalent target in the brief, so it's omitted there.
- The Season filter was expanded from 2 to 4 options spanning the trailing
  year (`Winter 2025` → `Fall 2026`) per feedback to "filter by season over
  the past year." Only `Fall 2026` (`ACTIVE_SEASON`) has real rows; the other
  three intentionally fall through to the existing empty state rather than
  fabricating a second season's worth of products.

## Data (`src/data/assortment.json`)
- 15 products (exceeds the 12–16 minimum), split 5/5/5 across
  `action_needed` / `watch` / `on_track` for a balanced demo.
- Each product's return reasons, review themes, and AI insight were written
  together so they tell one consistent story — e.g. a style with a high "Fit"
  return share also has "runs small" in its negative themes and a sizing
  callout in its AI insight signals.
