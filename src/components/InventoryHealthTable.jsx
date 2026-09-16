import { useMemo, useState } from 'react'
import { Star, Sparkles, Search } from 'lucide-react'
import {
  ACTIVE_SEASON,
  INVENTORY_METRICS,
  getRiskScore,
  getRiskTier,
  getSellThroughTone,
  getReturnRateTone,
} from '../utils/dataHelpers'

const TONE_TEXT = {
  danger: 'text-danger',
  warning: 'text-warning',
  success: 'text-success',
}

const TONE_BAR = {
  danger: 'bg-danger',
  warning: 'bg-warning',
  success: 'bg-success',
}

const RISK_PILL = {
  High: 'bg-danger/10 text-danger',
  Medium: 'bg-warning/15 text-[#966400]',
  Low: 'bg-success/10 text-success',
}

const COLUMNS = ['Product', 'Category', 'Units Sold', 'Sell-Thru', 'Return %', 'Sentiment', 'Revenue', 'Risk Score', 'AI Recommendation']

export default function InventoryHealthTable({ products }) {
  const [filter, setFilter] = useState('')

  const rows = useMemo(() => {
    const withMetrics = products.map((p) => ({
      product: p,
      metrics: INVENTORY_METRICS[p.id],
      riskScore: getRiskScore(p),
      riskTier: getRiskTier(p),
    }))
    const sorted = withMetrics.sort((a, b) => b.riskScore - a.riskScore)
    const query = filter.trim().toLowerCase()
    if (!query) return sorted
    return sorted.filter(
      ({ product }) => product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
    )
  }, [products, filter])

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-ink">Inventory Health Table</p>
          <p className="mt-1 text-[13px] text-muted">All active styles · {ACTIVE_SEASON}</p>
        </div>
        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter products..."
            className="w-full rounded-input rounded-xl border border-border bg-white py-2 pl-8 pr-3 text-[13px] text-ink outline-none focus:border-accent-deep sm:w-56"
          />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted first:pl-0 last:pr-0"
                >
                  {col}
                  {col === 'Risk Score' && ' ↓'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ product, metrics, riskScore, riskTier }) => {
              const sellThroughTone = getSellThroughTone(product.sell_through_pct)
              const returnTone = getReturnRateTone(product.return_rate_pct)
              const rounded = Math.round(product.reviews.avg_rating)

              return (
                <tr key={product.id} className="border-b border-border-soft last:border-0">
                  <td className="py-3 pl-0 pr-3 text-[13.5px] font-semibold text-ink">{product.name}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-surface-inset px-2.5 py-1 text-[12px] text-muted">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono-tab text-[13px] text-ink">
                    {metrics.unitsSold.toLocaleString()}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-surface-inset-deep">
                        <div
                          className={`h-full rounded-full ${TONE_BAR[sellThroughTone]}`}
                          style={{ width: `${product.sell_through_pct}%` }}
                        />
                      </div>
                      <span className={`font-mono-tab text-[13px] font-medium ${TONE_TEXT[sellThroughTone]}`}>
                        {product.sell_through_pct}%
                      </span>
                    </div>
                  </td>
                  <td className={`px-3 py-3 font-mono-tab text-[13px] font-semibold ${TONE_TEXT[returnTone]}`}>
                    {product.return_rate_pct}%
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          strokeWidth={0}
                          className={i < rounded ? 'fill-warning text-warning' : 'fill-border text-border'}
                        />
                      ))}
                      <span className="ml-1 font-mono-tab text-[13px] text-ink">
                        {product.reviews.avg_rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-mono-tab text-[13px] font-semibold text-ink">{metrics.revenue}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${RISK_PILL[riskTier]}`}
                      title={`Score: ${riskScore.toFixed(1)}`}
                    >
                      {riskTier}
                    </span>
                  </td>
                  <td className="px-3 py-3 pr-0 text-[12.5px] text-ink">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={12} strokeWidth={2} className="shrink-0 text-[#6D5DFC]" />
                      {metrics.recommendation}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="py-10 text-center text-[13px] text-muted">No styles match “{filter}”.</p>
        )}
      </div>
    </div>
  )
}
