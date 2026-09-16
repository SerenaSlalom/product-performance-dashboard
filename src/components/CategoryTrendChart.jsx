import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart3 } from 'lucide-react'
import {
  CATEGORY_TREND_SEASONS,
  CATEGORY_TREND_COLORS,
  CATEGORY_SEASON_TRENDS,
  SEASON_MONTHS,
  getCategorySeasonMonthlyTrend,
} from '../utils/dataHelpers'

const METRICS = [
  { key: 'sellThrough', label: 'Sell-Through', formatValue: (v) => `${v}%` },
  { key: 'returns', label: 'Returns', formatValue: (v) => `${v}%` },
  { key: 'revenueIndex', label: 'Revenue Index', formatValue: (v) => `${v}` },
]

const CATEGORIES = Object.keys(CATEGORY_TREND_COLORS)

export default function CategoryTrendChart({ selectedSeasons }) {
  const [metric, setMetric] = useState('sellThrough')
  const activeMetric = METRICS.find((m) => m.key === metric)

  const seasons = CATEGORY_TREND_SEASONS.filter((s) => selectedSeasons.has(s))
  const isSnapshot = seasons.length === 1

  const data = isSnapshot
    ? SEASON_MONTHS[seasons[0]].map((month, i) => {
        const point = { label: month }
        CATEGORIES.forEach((cat) => {
          point[cat] = getCategorySeasonMonthlyTrend(cat, seasons[0], metric)[i]
        })
        return point
      })
    : seasons.map((season) => {
        const i = CATEGORY_TREND_SEASONS.indexOf(season)
        const point = { label: season }
        CATEGORIES.forEach((cat) => {
          point[cat] = CATEGORY_SEASON_TRENDS[cat][metric][i]
        })
        return point
      })

  const subtitle =
    seasons.length === 0
      ? 'No seasons selected'
      : isSnapshot
        ? `${seasons[0]} · ${SEASON_MONTHS[seasons[0]][0]}–${SEASON_MONTHS[seasons[0]][2]}`
        : `${seasons.length}-season trend · ${seasons[0]} – ${seasons[seasons.length - 1]}`

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-ink">Category Performance Across Seasons</p>
          <p className="mt-1 text-[13px] text-muted">{subtitle}</p>
        </div>
        <div className="flex rounded-full bg-surface-inset p-1">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMetric(m.key)}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                metric === m.key ? 'bg-white text-ink shadow-[0_1px_2px_rgba(3,7,18,0.08)]' : 'text-muted'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <BarChart3 size={28} strokeWidth={1.5} className="text-border" />
          <p className="text-[14px] font-medium text-ink">No seasons selected</p>
          <p className="max-w-sm text-[13px] text-muted">Select at least one season above to see category trends.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 20, left: 4, bottom: 0 }}>
                <CartesianGrid stroke="#E4E8ED" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="label"
                  interval={0}
                  padding={{ left: 24, right: 24 }}
                  tick={{ fontSize: 11, fill: '#6B7785' }}
                  axisLine={{ stroke: '#D6DCE3' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#6B7785' }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tickFormatter={activeMetric.formatValue}
                />
                <Tooltip
                  formatter={(value, name) => [activeMetric.formatValue(value), name]}
                  contentStyle={{ borderRadius: 12, border: '1px solid #D6DCE3', fontSize: 12 }}
                />
                {CATEGORIES.map((cat) => (
                  <Line
                    key={cat}
                    type="monotone"
                    dataKey={cat}
                    stroke={CATEGORY_TREND_COLORS[cat]}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: CATEGORY_TREND_COLORS[cat], strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            {CATEGORIES.map((cat) => (
              <span key={cat} className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CATEGORY_TREND_COLORS[cat] }} />
                {cat}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
