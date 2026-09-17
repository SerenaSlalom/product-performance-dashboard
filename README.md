# Product Inventory Dashboard

A mid-season assortment intelligence dashboard for **Maeven Label**, a
fictional women's sports apparel brand. Built for the Protogen Academy P301
case study.

A category manager gets one page that answers, top to bottom: how is the
assortment doing right now, what's driving that across categories/sizes/
returns, what customers are actually saying, and what to do about it —
ranked by impact — instead of piecing that story together across three
separate systems mid-season.

See [`BRIEF.md`](./BRIEF.md) for the full product spec and
[`.claude/project-context.md`](./.claude/project-context.md) for build
decisions.

## Features

- **Season filter**: multi-select dropdown covering the trailing year;
  every chart below it reflects the selected season(s), down to a
  month-by-month view when only one season is selected.
- **Insight KPI cards**: Sell-Through Rate, Return Rate, Customer Sentiment,
  and At-Risk Styles — each with a sparkline, a period delta, an AI-style
  insight line, and an action (jump to the relevant section) or a stat.
- **Category Performance Across Seasons**: multi-line trend chart across all
  five categories, toggled between Sell-Through, Returns, and Revenue Index.
- **Size Performance Trend** + **Why Are Sizes Trending?**: sell-through/
  returns/growth by size, paired with ranked, confidence-scored demand
  drivers.
- **What's Driving Returns?** + **Cost Impact**: return-reason breakdown
  paired with a financial summary and the single highest-leverage fix.
- **Customer Voice Insights**: switchable Positive/Neutral/Negative review
  themes, each with mention volume, delta, and which products/sizes drove it.
- **Recommended Product Actions**: four ranked, AI-generated actions with
  priority and projected impact.
- **Inventory Health Table**: full per-style table, sorted by a computed
  risk score by default, with a text filter by product or category.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4 (utility classes, theme tokens in `src/index.css`)
- Recharts for all charts (trend lines, bar charts)
- lucide-react for icons
- Local JSON mock data (`src/data/assortment.json`) plus aggregate constants
  in `src/utils/dataHelpers.js` — no backend, no API calls

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint      # oxlint
```

## Design system

Visual language follows **Voltline Analytics**: a cool platinum canvas, white
cards with soft shadows, deep-ink typography, and a single electric lime
accent reserved for CTAs and live-data highlights, with tone colors
(success/warning/danger) used deliberately for status and risk. Tokens live
in `src/index.css`.
