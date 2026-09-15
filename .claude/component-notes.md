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

## Data (`src/data/assortment.json`)
- 15 products (exceeds the 12–16 minimum), split 5/5/5 across
  `action_needed` / `watch` / `on_track` for a balanced demo.
- Each product's return reasons, review themes, and AI insight were written
  together so they tell one consistent story — e.g. a style with a high "Fit"
  return share also has "runs small" in its negative themes and a sizing
  callout in its AI insight signals.
