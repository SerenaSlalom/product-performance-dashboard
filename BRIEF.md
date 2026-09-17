# BRIEF.md — Product Inventory Dashboard

**Project:** P301 Case Study — Operational Dashboard
**Fictional Company:** Maeven Label *(a mid-size women's sports apparel brand)*
**Author:** Serena Engquist
**Last Updated:** 2026-09-17 (revision 2 — see note below)

> **Revision note:** The original brief (2026-09-15) specified a row-level tool:
> a product table where clicking a style expanded a 3-column detail panel
> (performance charts, customer voice, one AI insight card per SKU). Early
> review of that build showed the more valuable view for a category manager
> is portfolio-level, not SKU-level — "where is the assortment as a whole
> trending, and what are the two or three things I should act on this week,"
> answered before ever opening a single product. The brief below reflects
> that pivot. The per-SKU detail (sell-through trend, size curve, return
> reasons, review themes) still exists, just rolled up into category- and
> size-level breakdowns and a single risk-sorted table, rather than gated
> behind a per-row click.

---

## Summary

Maeven Label's buying and merchandising team manages 15 active styles per
season across performance categories like training tops, sports bras,
leggings, shorts, and outerwear. Performance data — sell-through, returns,
customer reviews — lives across three separate systems. By the time anyone
surfaces a problem, they're already mid-markdown.

This dashboard gives a category manager one page that answers, in order:
*How is the assortment doing right now? Which sizes and categories are
driving that? Why are returns happening, and what would fixing the top
driver be worth? What is customer sentiment actually saying? What should I
do about all of this, ranked by impact?* — then backs every answer with a
full per-style table for anyone who wants to check the underlying data.

This is a mid-season management tool, not an end-of-season autopsy.

---

## Target User

**Primary user:** Category manager at Maeven Label
**Context:** Sits at a desk, checks this daily or a few times per week during an active season
**What they care about:**
- Which styles and sizes are trending toward a markdown problem before it's too late to act
- Whether customer sentiment is tracking with sell-through (or telling a different story)
- Why things are being returned — and whether it's a product issue or a sizing/expectation issue
- What they should actually do about any of it, and in what order

**What they do NOT need:**
- Raw data tables they have to interpret themselves, as the *first* thing they see
- Graphs without context or action hooks
- Information that arrives after the window to act has closed

---

## Key Features

The page reads top to bottom as a briefing: headline health, what's driving
it, then what to do about it, with the full underlying data available at the
bottom for anyone who wants to verify a claim.

### 1. Season filter
A multi-select dropdown (`SeasonMultiSelect`) covering the trailing year
(Winter 2025 → Fall 2026, with `Fall 2026` selected by default). Selecting
one season shows that season's three months on every trend chart below it;
selecting multiple seasons shows one point per season instead. Only Fall
2026 has full per-product data loaded — other seasons are supported by the
category-level trend data described below.

### 2. Insight KPI cards
Four cards, each pairing a headline metric with a sparkline, a
period-over-period delta, a one-line AI-style insight, and a footer that is
either a static stat or a click-through action:

| Card | Metric | Footer behavior |
|---|---|---|
| Sell-Through Rate | Average sell-through, live from data | Static revenue-impact stat |
| Return Rate | Latest month's average return rate | "Alert" badge + tinted red card |
| Customer Sentiment | Average review rating (/5) | "View Customer Feedback" scrolls to Customer Voice Insights |
| At-Risk Styles | Count of styles >10 pts below plan (`isAtRisk`) | Clicking the card scrolls to Recommended Product Actions |

### 3. Category Performance Across Seasons
A multi-line trend chart (`CategoryTrendChart`) plotting Sell-Through,
Returns, or Revenue Index (toggle) for all five categories, filtered to
whichever seasons are selected in the header. One season selected shows a
month-by-month breakdown for that season; multiple seasons shows a
season-over-season trend line instead.

### 4. Size Performance Trend + Why Are Sizes Trending?
A bar chart (`SizePerformanceTrend`) of Sell-Thru / Returns / Growth by size
(XS–XXL), with an AI-style callout below it, paired with a ranked list of
demand drivers (`SizeTrendDrivers`) — each with a confidence score and a
one-line explanation.

### 5. What's Driving Returns? + Cost Impact
A horizontal bar chart of return reasons (`ReturnDriversChart`) with an
AI-style callout naming the highest-leverage fix, paired with a financial
summary (`CostImpactCard`): annual return cost, potential recoverable
savings, a cost breakdown by driver, and the single top recommended action.

### 6. Customer Voice Insights
Review sentiment (`CustomerVoiceInsights`) as three switchable tabs —
Positive / Neutral / Negative — each showing the top themes behind that
tab's reviews: mention volume, period delta, which products drove it, and
which sizes.

### 7. Recommended Product Actions
A ranked list of four AI-generated actions (`RecommendedActions`), each with
a priority badge (High/Medium), a one-line rationale, and a projected
dollar or return-rate impact.

### 8. Inventory Health Table
A full per-style table (`InventoryHealthTable`) — the underlying data behind
everything above it. Columns: Product, Category, Units Sold, Sell-Through
(colored bar), Return %, Sentiment (stars), Revenue, Risk Score (High/
Medium/Low, sorted descending by default), and a one-line AI recommendation
per style. Includes a text filter by product name or category. Risk tier is
derived directly from each product's `ai_insight.status`; risk score is a
weighted combination of sell-through gap, return rate, and rating, used only
for sort order.

---

### 4. Mock Data

All data is invented. No real brand, vendor, or customer data is used.

`src/data/assortment.json` holds 15 product objects (exceeds the 12–16
brief minimum), split 5/5/5 across `action_needed` / `watch` / `on_track`.
Each product includes:

```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "colorway": "string",
  "image_url": "string (placeholder image OK)",
  "sell_through_pct": number,
  "sell_through_target_pct": number,
  "sell_through_trend": [array of 6 weekly values],
  "markdown_depth_pct": number,
  "markdown_weeks_ago": number,
  "weeks_of_supply": number,
  "size_curve": {
    "XS": { "purchased": number, "sold": number },
    "S": { "purchased": number, "sold": number },
    "M": { "purchased": number, "sold": number },
    "L": { "purchased": number, "sold": number },
    "XL": { "purchased": number, "sold": number }
  },
  "return_rate_pct": number,
  "return_reasons": {
    "Fit": number,
    "Size": number,
    "Quality": number,
    "Color/Image Mismatch": number,
    "Changed Mind": number,
    "Other": number
  },
  "reviews": {
    "avg_rating": number,
    "count": number,
    "positive_themes": ["string", "string", "string"],
    "negative_themes": ["string", "string", "string"],
    "excerpts": [
      { "rating": number, "text": "string" },
      { "rating": number, "text": "string" },
      { "rating": number, "text": "string" }
    ]
  },
  "ai_insight": {
    "status": "action_needed | watch | on_track",
    "summary": "string",
    "signals": ["string", "string", "string"],
    "recommendation": "string"
  }
}
```

**Data layered on top of the per-product schema, in `src/utils/dataHelpers.js`:**
The category-, size-, and return-driver-level numbers used in sections 3–7
above (e.g. "Category Performance Across Seasons," "Size Performance
Trend") are not literal fields on each product — they're aggregate,
illustrative business metrics (season trends, size-band performance,
return-reason mix, review theme counts, units sold, revenue) defined
alongside the per-product data, scaled to stay internally consistent with
it (e.g. the worst-performing product by risk score also has the lowest
units-sold/revenue figures). This mirrors how a real category manager's
dashboard would blend a merchandising system feed (the per-SKU JSON) with a
separately-computed analytics layer (season/size/return rollups) — it is
not meant to imply those rollups come from the same raw table.

---

## Design System

**Reference:** Voltline Analytics (https://uiverse.io/design/systems/voltline-analytics)

**System character:** Light, analytical, premium. A cool platinum canvas with crisp white cards, deep near-black typography, and a bold electric chartreuse/lime accent for live data, status indicators, and calls to action. Generous corner rounding. Soft card depth via subtle shadow, not border. Confident display typography for numbers.

### Color Tokens (as implemented, `src/index.css`)

| Role | Value |
|---|---|
| Background (canvas) | `#E6EAEE` |
| Surface (cards) | `#FFFFFF` |
| Surface inset | `#F2F5F8` / `#E8EDF2` |
| Text primary (ink) | `#0B1015` |
| Text secondary (muted) | `#6B7785` |
| Accent / CTA | `#D6FF3D` (electric lime) |
| Accent deep (bars, links) | `#A8CC22` |
| Success | `#2BB673` |
| Warning | `#F59E0B` |
| Danger | `#E25555` |
| Border / divider | `#D6DCE3` / `#E4E8ED` |

Categorical chart color (category trend lines, return-driver bars, action
badges) uses a fixed five-color palette layered on top of the tokens above —
indigo `#6D5DFC`, pink `#E0459C`, and reuses `warning`/`success`/`#38BDF8`
cyan — so every multi-series chart on the page reads as one consistent
system rather than each chart inventing its own colors.

### Typography

| Role | Spec |
|---|---|
| Dashboard title | Display weight, 28–32px, deep ink |
| Section header | Semibold, 16px |
| KPI tile value | Bold, 30–34px, deep ink |
| KPI tile label | Semibold, 11–13px, uppercase, secondary text |
| Body / table text | Regular, 12.5–13.5px |
| AI-style insight callouts | Regular, 12.5px, on a tinted surface, sparkle icon |
| Badge / tag labels | Medium, 10.5–12px, uppercase |

### Component Style

- **Card radius:** 16px (`rounded-2xl`)
- **Card shadow:** `0 2px 8px rgba(3,7,18,0.06)`, no border (alert cards get a 1px tinted border)
- **Table rows:** hairline dividers, no zebra striping
- **AI-style callouts:** tinted background matching the section's accent color (lime-tinted, amber-tinted, indigo-tinted) with a small sparkle icon, not a left-border treatment
- **Status/risk badges:**
  - `action_needed` / High risk → red-tinted pill
  - `watch` / Medium risk → amber-tinted pill
  - `on_track` / Low risk → green-tinted pill
- **Buttons / interactive elements:** lime/ink for primary actions; tone-matched text links (e.g. indigo "View full breakdown") for section-level actions
- **Charts:** Recharts throughout; muted grid lines, tone-based bar/line colors (success/warning/danger) where the metric has a clear good/bad direction, categorical palette where it doesn't

### Layout

- Horizontal top bar (brand wordmark left, user identity right) — no sidebar nav
- Main content area: max-width 1280px, centered
- KPI cards: 4-column grid, 2-column on tablet, 1-column on mobile
- Chart pairs (Size Performance / Why Trending, Return Drivers / Cost Impact): 2-column on desktop, stacked on mobile
- Inventory Health Table: full width with horizontal scroll below ~980px

---

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (utility classes; design tokens in `src/index.css` `@theme` block)
- **Charts:** Recharts
- **Icons:** lucide-react
- **Data:** Local JSON file (`src/data/assortment.json`) plus static aggregate constants in `src/utils/dataHelpers.js` — no external API calls
- **AI Insights:** Pre-written/derived from the data (no live LLM calls required)
- **Deployment:** Vercel — auto-deploys on push to `main`

---

## Folder Structure

```
/
├── BRIEF.md                        ← this file
├── README.md                       ← project overview and local setup instructions
├── LICENSE
├── .claude/                        ← AI scaffolding context
│   ├── project-context.md          ← high-level project goals and design intent
│   └── component-notes.md          ← notes on component decisions made during build
├── src/
│   ├── data/
│   │   └── assortment.json         ← mock per-product data
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── SeasonMultiSelect.jsx
│   │   ├── InsightKPICard.jsx
│   │   ├── CategoryTrendChart.jsx
│   │   ├── SizePerformanceTrend.jsx
│   │   ├── SizeTrendDrivers.jsx
│   │   ├── ReturnDriversChart.jsx
│   │   ├── CostImpactCard.jsx
│   │   ├── CustomerVoiceInsights.jsx
│   │   ├── RecommendedActions.jsx
│   │   └── InventoryHealthTable.jsx
│   ├── utils/
│   │   └── dataHelpers.js          ← KPI math, risk scoring, category/size/return aggregate data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   ← Voltline Analytics design tokens
├── package.json
└── vite.config.js
```

---

## What Success Looks Like

| Criterion | Pass |
|---|---|
| Site loads and is accessible | Live Vercel URL works |
| Core flows work end to end | Season filter updates every chart on the page; KPI card actions scroll to the right section; chart metric toggles work; the inventory table filters and stays sorted by risk |
| Build matches this brief | Industry (women's sports apparel), user (category manager), and the eight sections above match what's on the live site |
| Design reflects the industry | Layout, color, and tone feel appropriate for an internal merchandising analytics tool — analytical but not cold; premium but not decorative |
| Repo is organized | Folder structure matches above; README is present; commit history shows real progress |
| AI scaffolding is in place | `.claude/` directory exists with context files that match the current build |

---

## Nice to Haves (Go Further)

- [x] Empty state: Category Performance chart shows a message if no seasons are selected
- [x] At-risk KPI card is clickable and jumps to Recommended Product Actions
- [x] Sell-through and return-rate cells in the inventory table are color-coded by value (green/amber/red)
- [x] Inventory table stays sorted by computed risk score, not just status
- [ ] Vercel deployment password protection (recommended in Tech Stack above; not yet enabled)
- [ ] Inventory Health Table on narrow screens still requires horizontal scroll rather than a stacked/card layout

---

*This brief is the design spec. The build should reflect the intent described
here. If a future session makes a decision not covered here, document it in
`.claude/component-notes.md` and update this file's revision note — don't
let the two drift apart again.*
