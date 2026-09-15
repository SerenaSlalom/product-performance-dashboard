# BRIEF.md — Assortment Intelligence Dashboard
**Project:** P301 Case Study — Operational Dashboard
**Fictional Company:** Maeven Label *(a mid-size women's sports apparel brand)*
**Author:** Serena Engquist
**Last Updated:** 2026-09-15

---

## Summary

Maeven Label's buying and merchandising team manages 80–120 active styles per season across performance categories like training, running, and studio. Performance data — sell-through, returns, customer reviews — lives across three separate systems. By the time anyone surfaces a problem, they're already mid-markdown. This dashboard gives a category manager or buyer a single view of how their assortment is performing right now, with AI-generated insights and recommended actions for each product.

This is a mid-season management tool, not an end-of-season autopsy.

---

## Target User

**Primary user:** Category manager or buyer at Maeven Label
**Context:** Sits at a desk, checks this daily or a few times per week during an active season
**What they care about:**
- Which styles are trending toward a markdown problem before it's too late to act
- Whether customer sentiment is tracking with sell-through (or telling a different story)
- Why things are being returned — and whether it's a product issue or a sizing/expectation issue
- What they should actually do about any of it

**What they do NOT need:**
- Raw data tables they have to interpret themselves
- Graphs without context or action hooks
- Information that arrives after the window to act has closed

---

## Key Features

### 1. Assortment Overview (Header KPIs)
Four summary tiles at the top of the page, across the active season:

| Metric | Description |
|---|---|
| Average Sell-Through Rate | % of units sold vs. units purchased, across all active styles |
| Styles At Risk | Count of styles below sell-through target by more than 10 points |
| Average Return Rate | Returns as a % of units sold, across all active styles |
| Average Sentiment Score | Mean customer rating (1–5) across all reviewed styles |

These tiles are always visible. They give the buyer a pulse before they drill into any individual style.

---

### 2. Product Table with Expandable Detail

A sortable, filterable table showing all active styles. Each row displays:

| Column | Description |
|---|---|
| Style Name + Image Thumbnail | Name and small product photo |
| Category | e.g., Training Tops, Sports Bras, Leggings, Shorts, Outerwear |
| Colorway | Primary color of this SKU |
| Sell-Through % | Units sold / units purchased (show vs. plan target) |
| Size Curve Status | Flag if any size is severely over- or under-indexed (e.g., "M/L shortage", "XS excess") |
| Markdown Depth | Current markdown %, and how many weeks since first markdown |
| Weeks of Supply | Estimated weeks until sellout at current velocity |
| Return Rate % | Returns as % of units sold |
| Top Return Reason | The most common reason selected at return (e.g., "Fit", "Quality", "Color inaccurate") |
| Sentiment Score | Average star rating from site reviews (show count, e.g., "4.1 ★ (38 reviews)") |
| AI Insight Badge | A small label indicating insight status: "Action needed", "On track", "Watch" |

Clicking a row expands an inline Product Detail Panel (see below). The table does not navigate away from the page.

**Filters (persistent at top of table):**
- Season (dropdown): Fall 2026, Spring 2026, etc.
- Category (multi-select): All, Training Tops, Sports Bras, Leggings, Shorts, Outerwear, Accessories
- Status (toggle): All Styles / At-Risk Only
- Sort by: Sell-Through (asc/desc), Return Rate (asc/desc), Sentiment Score (asc/desc)

---

### 3. Product Detail Panel (Expanded Row)

When a row is expanded, it reveals a three-column panel:

**Column 1 — Performance Metrics**
- Sell-through trend line (last 6 weeks vs. plan)
- Markdown timeline: when markdowns were taken and at what depth
- Weeks of supply remaining
- Size availability by size band (a simple bar or dot chart showing in-stock vs. sold-out sizes)

**Column 2 — Customer Voice**
- Return rate breakdown: a donut or bar showing return reasons by % (Fit, Size, Quality, Color/Image Mismatch, Changed Mind, Other)
- Review sentiment panel:
  - Average star rating with count
  - Top 3 positive themes extracted from reviews (e.g., "Great fabric," "True to size," "Flattering cut")
  - Top 3 negative themes extracted from reviews (e.g., "Runs small," "Fabric thinner than expected," "Color looks different in person")
  - 2–3 representative review excerpts (short quotes, with star rating shown)

**Column 3 — AI Insights**
A distinct card with a slightly elevated visual treatment. Contains:

- **What's happening:** 2–4 sentence plain-language summary of this style's current performance, combining sell-through trajectory, return signals, and customer sentiment into a single narrative. Written as if a knowledgeable colleague is briefing you.
- **Signals driving this:** A short bulleted list (2–4 bullets) of the specific data points behind the summary (e.g., "Return rate is 2.3× category average," "Reviews mention sizing 67% of the time," "Sell-through is 8 points below plan at week 4")
- **Recommended action:** One clear, specific recommended next step, written in plain language. This is not a suggestion menu — it is one recommendation. Examples:
  - "Consider a size-run reorder on M and L before week 6 sell-out."
  - "Rewrite product description to address fit — customer photos show the style photographs darker than product images."
  - "Take a 20% markdown now. At current velocity, full-price sell-through target is unachievable."
  - "No action needed. Style is tracking 4 points above plan with strong sentiment."

---

### 4. Mock Data

All data is invented. No real brand, vendor, or customer data is used.

Create a JSON file at `src/data/assortment.json` with an array of 12–16 product objects. Each product should include:

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

Include a spread of statuses in the mock data: at least 4 "action_needed", 4 "watch", and 4 "on_track" styles. Make the data realistic and internally consistent — if return rate is high and reviews mention fit problems, the AI insight should reflect that.

---

## Design System

**Reference:** Voltline Analytics (https://uiverse.io/design/systems/voltline-analytics)

**System character:** Light, analytical, premium. A cool platinum canvas with crisp white cards, deep near-black typography, and a bold electric chartreuse/lime accent for live data, status indicators, and calls to action. Generous corner rounding. Soft card depth via subtle shadow, not border. Confident display typography for numbers.

### Color Tokens

| Role | Value |
|---|---|
| Background (canvas) | `#F4F5F7` (cool platinum) |
| Surface (cards) | `#FFFFFF` |
| Text primary | `#030712` (deep ink) |
| Text secondary | `#6B7280` |
| Accent / CTA | `#BFFF00` (electric chartreuse/lime) |
| Accent text on lime | `#030712` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Border / divider | `#E5E7EB` |

### Typography

| Role | Spec |
|---|---|
| Dashboard title | Display weight, 28–32px, deep ink |
| Section header | Semibold, 16–18px |
| KPI tile value | Bold or black weight, 32–40px, deep ink |
| KPI tile label | Regular, 12–13px, secondary text |
| Body / table text | Regular, 14px |
| AI Insight summary | Regular, 14px, slightly elevated card |
| Badge / tag labels | Medium, 11–12px, all-caps or small-caps |

### Component Style

- **Card radius:** 12–16px
- **Card shadow:** `0 2px 8px rgba(0,0,0,0.06)`, no border
- **Table rows:** Subtle hover state (`#F9FAFB`), expanded rows use a slightly warmer surface
- **AI Insight card:** Lime left-border accent (`4px solid #BFFF00`) to visually distinguish from data cards
- **Badges:**
  - `action_needed` → red background, white text
  - `watch` → amber background, dark text
  - `on_track` → green background, white text
- **Buttons / interactive elements:** Use lime accent for primary action, dark ink for secondary
- **Charts:** Use a muted palette (slate blues, grays) for trend lines; reserve lime for current-period highlight or targets

### Layout

- Fixed sidebar navigation (collapsed by default on smaller screens)
- Main content area: max-width 1280px, centered
- Header KPI tiles: 4-column grid, responsive to 2-column on tablet
- Product table: full width with horizontal scroll on small screens
- Expanded panel: 3-column grid inside the row, collapses to stacked on mobile

---

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (utility classes only — no custom config required)
- **Charts:** Recharts
- **Data:** Local JSON file (`src/data/assortment.json`) — no external API calls
- **AI Insights:** Populated from the JSON file (pre-written per product); no live LLM calls required
- **Deployment:** Vercel (add password protection before sharing publicly)

---

## Folder Structure

```
/
├── BRIEF.md                  ← this file
├── README.md                 ← project overview and local setup instructions
├── LICENSE
├── .claude/                  ← AI scaffolding context
│   ├── project-context.md    ← high-level project goals and design intent
│   └── component-notes.md    ← notes on component decisions made during build
├── src/
│   ├── data/
│   │   └── assortment.json   ← mock product data
│   ├── components/
│   │   ├── KPITile.jsx
│   │   ├── ProductTable.jsx
│   │   ├── ProductRow.jsx
│   │   ├── ProductDetailPanel.jsx
│   │   ├── SentimentPanel.jsx
│   │   ├── ReturnBreakdown.jsx
│   │   ├── SellThroughChart.jsx
│   │   ├── SizeCurveChart.jsx
│   │   └── AIInsightCard.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## Build Instructions for AI Assistant

Work through the build in this order. Commit to GitHub after each major step with a descriptive message.

1. **Scaffold the project.** Create a React + Vite project. Install Tailwind CSS and Recharts. Confirm the dev server runs.

2. **Create mock data.** Build `src/data/assortment.json` with 12–16 realistic product objects following the schema above. Ensure a mix of statuses and internally consistent signals across each product's metrics, reviews, return reasons, and AI insight.

3. **Build the header KPI tiles.** Create a `KPITile` component. Wire it to computed values from the data file (average sell-through, count of at-risk styles, average return rate, average sentiment score). Style per the design system.

4. **Build the product table.** Create `ProductTable` and `ProductRow` components. Display all required columns. Add sort and filter controls. Style rows with hover states. No expand behavior yet.

5. **Add the expandable detail panel.** On row click, expand `ProductDetailPanel` inline. Build all three columns: Performance Metrics (with `SellThroughChart` and `SizeCurveChart`), Customer Voice (with `ReturnBreakdown` and `SentimentPanel`), and AI Insights (`AIInsightCard`). Collapse on second click or when another row is opened.

6. **Polish and QA.** Check visual consistency against the design system. Test sort/filter behavior. Confirm the panel opens and closes cleanly. Check layout at 1280px, 1024px, and 768px widths.

7. **Finalize repo.** Add `README.md` with setup instructions. Populate `.claude/project-context.md` with a summary of what was built and any design decisions made. Commit with message "Final build — ready for review." Deploy to Vercel and confirm the live URL works.

---

## What Success Looks Like

| Criterion | Pass |
|---|---|
| Site loads and is accessible | Live Vercel URL works, optionally password-protected |
| Core flows work end to end | KPI tiles display computed values; table sorts and filters; row expands to show all three panel columns; AI insight card is present and readable |
| Build matches this brief | Industry (women's sports apparel), user (buyer/category manager), and features match what's described here |
| Design reflects the industry | Layout, color, and tone feel appropriate for an internal merchandising tool — analytical but not cold; premium but not decorative |
| Repo is organized | Folder structure matches above; README is present; commit history shows real progress |
| AI scaffolding is in place | `.claude/` directory exists with context files |

---

## Nice to Haves (Go Further)

- Empty state: if all filters return no results, show a helpful message rather than a blank table
- Styles at-risk count in the header tile is clickable and pre-filters the table to at-risk styles only
- Sentiment score in the table row has a subtle color coding (green above 4.0, amber 3.0–3.9, red below 3.0)
- The AI Insight card's recommended action has a one-click "Mark as reviewed" toggle so the buyer can track what they've already acted on (state lives in memory for the session)
- Responsive behavior at 768px: table scrolls horizontally, detail panel stacks vertically

---

*This brief is the design spec. The build should reflect the intent described here. If the AI assistant makes a decision not covered in the brief, document it in `.claude/component-notes.md`.*
