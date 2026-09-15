# Assortment Intelligence Dashboard

A mid-season assortment management tool for **Maeven Label**, a fictional
women's sports apparel brand. Built for the Protogen Academy P301 case study.

Category managers and buyers get one view of how their active styles are
performing — sell-through, returns, customer sentiment — with an AI-generated
insight and one recommended action per style, instead of piecing that story
together across three separate systems mid-season.

See [`BRIEF.md`](./BRIEF.md) for the full product spec and
[`.claude/project-context.md`](./.claude/project-context.md) for build
decisions.

## Features

- **Header KPIs**: average sell-through, styles at risk, average return rate,
  average sentiment — always visible, computed live from the dataset.
- **Product table**: sortable, filterable by season/category/at-risk status,
  with an AI Insight status badge per row.
- **Inline detail panel**: click a row to expand a three-column breakdown —
  performance charts, customer voice (returns + reviews), and an AI Insight
  card with a plain-language summary, driving signals, and one recommended
  action.
- **Mark as reviewed**: track which AI recommendations you've already acted
  on (session-only state).

## Tech stack

- React 19 + Vite
- Tailwind CSS v4 (utility classes, theme tokens in `src/index.css`)
- Recharts for the sell-through trend and return-reason donut
- Local JSON mock data (`src/data/assortment.json`) — no backend, no API calls

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
cards with hairline borders, deep-ink typography, and a single electric lime
accent reserved for CTAs and live-data highlights. Tokens live in
`src/index.css`.
