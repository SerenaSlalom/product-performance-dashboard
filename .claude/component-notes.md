# Component Notes

Decisions made while building components that the brief left open. See
`project-context.md` for why the component list below replaced an earlier
row-click/detail-panel architecture.

## `TopBar`
- Horizontal top bar (brand wordmark left, user identity right) — no sidebar
  nav, per stakeholder feedback on the original build. No nav links were
  added back in; the feedback asked for the sidebar gone, not relocated.
- The brand mark is a static SVG (`public/maeven-logo.svg`), colored to the
  design system's ink token instead of pure black.

## `SeasonMultiSelect`
- Custom dropdown (not a native `<select multiple>`) with checkboxes,
  "Select all," and "Clear," matching a provided mobile reference design.
  Returns the selected seasons as a `Set`, not an array, since every
  consumer only needs membership checks (`selectedSeasons.has(season)`).
- Closes on outside click via a `mousedown` listener on `document`, removed
  on unmount.

## `InsightKPICard`
- One shared component for all four header cards rather than four bespoke
  ones — label, value, sparkline, delta, an AI-style insight callout, and a
  footer that's either a static stat (`footerText`) or a click-through
  action (`footerText` + `onFooterClick`). The whole card can also be a
  button (`onClick`) — used for the At-Risk card, not the Sentiment card,
  since a card can't be both a `<button>` and contain a nested `<button>`
  footer link.
- Sparkline is a small hand-built inline SVG, not a Recharts mini-chart —
  at ~96×36px, a full chart container's tooltip/axis machinery is unneeded
  overhead for a decorative trend indicator.
- `tone` (`success`/`danger`) drives the sparkline color, delta text color,
  and static footer text color together, so a card never mixes a green
  sparkline with red delta text.
- The Return Rate card's `badge="Alert"` prop is also what triggers the
  tinted red card background/border — badge presence, not a separate flag,
  since in practice the two always travel together.

## `CategoryTrendChart`
- Reuses the app's actual `SEASONS` list (not an invented separate season
  set) so it stays in sync with the header's season filter — see
  `project-context.md` for how season selection maps to chart data.
- When exactly one season is selected, x-axis switches from season labels
  to that season's three months (`SEASON_MONTHS`), with values interpolated
  toward the season's stored end-of-season number via a fixed per-metric
  ramp (`getCategorySeasonMonthlyTrend`) — mirrors the same "ramp toward a
  known final value" approach used for the old sell-through/return-rate KPI
  trends, rather than inventing an unrelated interpolation scheme.
- `margin.left` on the Recharts `LineChart` must stay non-negative — an
  earlier `-20px` value (copied from a different chart) clipped the leading
  digit off Y-axis tick labels, leaving only the `%` visible. Fixed to a
  small positive margin plus a wider Y-axis reserved width.
- `interval={0}` + `padding` on the XAxis are both required to show every
  season/month label without Recharts auto-skipping the first/last one.

## `SizePerformanceTrend` / `SizeTrendDrivers`
- Single bar-chart component with a Sell-Thru/Returns/Growth toggle, colored
  per metric (indigo for the neutral "Sell-Thru" default, danger for
  Returns, success for Growth) rather than one fixed bar color — the color
  itself tells you whether "more" is good or bad for the selected metric.
- `SizeTrendDrivers`' confidence-score bars use the app's shared five-color
  categorical palette (see `project-context.md`) so they read as part of
  the same system as the category trend chart's lines, not a one-off list.

## `ReturnDriversChart` / `CostImpactCard`
- Return-reason bars use a six-step red→orange→gold→olive→green→cyan
  gradient built mostly from existing tokens (`danger`, `warning`,
  `accent-deep`, `success`) plus one new gold (`#EAB308`) added only because
  six visually-distinct steps needed one more stop than the existing
  palette had — documented here so it isn't mistaken for an untracked
  one-off color later.
- `CostImpactCard`'s two breakdown tiles (Fit+Size / Fabric+Quality) and its
  "Top action" callout are static illustrative figures, not computed from
  `assortment.json` — there's no per-product cost-of-return field in the
  schema. See `project-context.md`'s note on the aggregate data layer.

## `CustomerVoiceInsights`
- Three tabs (Positive/Neutral/Negative) are backed by real product names
  from `assortment.json` where the underlying review data plausibly
  supports it (e.g. Momentum Training Tank's "runs small" negative theme
  matches its actual stored `reviews.negative_themes`), invented reasonably
  for the rest — not pulled from a literal aggregation of `return_reasons`/
  `positive_themes` across all 15 products, since those fields use a
  different taxonomy per product and don't roll up cleanly into four
  named themes per tab.
- The header's "View full breakdown" button and the At-Risk KPI card's and
  Sentiment KPI card's scroll-to actions target this section and
  `RecommendedActions` by ref (`App.jsx`), not by route — everything stays
  a single page.

## `RecommendedActions`
- Rank badge colors reuse the same five-color categorical palette as the
  category trend chart and size-driver bars, in rank order — rank 1 isn't
  necessarily "the worst," just the first color in the shared sequence.
- Priority pill only has High/Medium in the current data (no Low action
  would be worth surfacing here); styled as a red/amber-tinted pill
  matching the risk-tier badge style used in `InventoryHealthTable`, so the
  same visual language means "needs attention" everywhere on the page.

## `InventoryHealthTable`
- Replaced the old row-click/expand `ProductTable` + `ProductRow` +
  `ProductDetailPanel` chain entirely — one flat table, sorted by risk
  instead of expandable, since the portfolio-level sections above it now
  carry the "why" that used to live in the per-row detail panel.
- Sorted by `getRiskScore` descending by default (matches the "Risk Score ↓"
  affordance in the reference design) — not by category or name, so the
  styles that most need attention are always the first thing the user sees
  in the table, independent of the text filter.
- `getRiskTier` maps directly from each product's existing
  `ai_insight.status` rather than re-deriving a tier from raw thresholds —
  keeps this table's risk badge and the rest of the app's `action_needed`/
  `watch`/`on_track` language (KPI cards, category insights) from ever
  disagreeing about the same product.
- Units Sold / Revenue / one-line AI Recommendation per row come from a
  small `INVENTORY_METRICS` lookup in `dataHelpers.js`, keyed by product id
  — not in the JSON schema (see `project-context.md`). Recommendations were
  written per-product from each product's actual `ai_insight.summary`
  rather than generated from a generic template, so "Priority redesign —
  armhole/shoulder fit" (Momentum Training Tank) reflects that product's
  real stated issue rather than a generic "reduce returns" placeholder.
- Table needs `overflow-x-auto` + a `min-w` below ~980px; on narrow screens
  it scrolls horizontally rather than reflowing into cards — flagged as an
  open "go further" item in `BRIEF.md` rather than solved here.

## Data (`src/data/assortment.json`)
- 15 products (exceeds the 12–16 minimum), split 5/5/5 across
  `action_needed` / `watch` / `on_track` for a balanced demo.
- Each product's return reasons, review themes, and AI insight were written
  together so they tell one consistent story — e.g. a style with a high
  "Fit" return share also has "runs small" in its negative themes and a
  sizing callout in its AI insight signals. This consistency is what makes
  it safe for `InventoryHealthTable` and `CustomerVoiceInsights` to quote
  specific products by name without contradicting the underlying data.
