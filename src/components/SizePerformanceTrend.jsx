import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Sparkles } from 'lucide-react'
import { SIZE_PERFORMANCE, SIZE_PERFORMANCE_INSIGHT } from '../utils/dataHelpers'

const METRICS = [
  { key: 'sellThrough', label: 'Sell-Thru', color: '#6D5DFC', formatValue: (v) => `${v}%` },
  { key: 'returns', label: 'Returns', color: 'var(--color-danger)', formatValue: (v) => `${v}%` },
  { key: 'growth', label: 'Growth', color: 'var(--color-success)', formatValue: (v) => `${v}%` },
]

export default function SizePerformanceTrend() {
  const [metric, setMetric] = useState('sellThrough')
  const activeMetric = METRICS.find((m) => m.key === metric)

  const data = SIZE_PERFORMANCE.sizes.map((size, i) => ({
    size,
    value: SIZE_PERFORMANCE[metric][i],
  }))

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-[16px] font-semibold text-ink">Size Performance Trend</p>
          <p className="mt-1 text-[13px] text-muted">Sell-through, returns &amp; demand by size</p>
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

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 20, left: 4, bottom: 0 }}>
            <CartesianGrid stroke="#E4E8ED" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="size"
              tick={{ fontSize: 11, fill: '#6B7785' }}
              axisLine={{ stroke: '#D6DCE3' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7785' }}
              axisLine={false}
              tickLine={false}
              width={40}
              tickFormatter={activeMetric.formatValue}
            />
            <Tooltip
              formatter={(value) => [activeMetric.formatValue(value), activeMetric.label]}
              contentStyle={{ borderRadius: 12, border: '1px solid #D6DCE3', fontSize: 12 }}
              cursor={{ fill: 'rgba(11,16,21,0.04)' }}
            />
            <Bar dataKey="value" fill={activeMetric.color} radius={[6, 6, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#EEEBFF] px-3.5 py-3">
        <Sparkles size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-[#6D5DFC]" />
        <p className="text-[12.5px] leading-snug text-ink">
          <span className="font-semibold">AI:</span> {SIZE_PERFORMANCE_INSIGHT}
        </p>
      </div>
    </div>
  )
}
