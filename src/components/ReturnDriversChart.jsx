import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from 'recharts'
import { Sparkles } from 'lucide-react'
import { RETURN_DRIVERS, RETURN_DRIVERS_INSIGHT, ACTIVE_SEASON } from '../utils/dataHelpers'

export default function ReturnDriversChart() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <p className="font-display text-[16px] font-semibold text-ink">What&apos;s Driving Returns?</p>
      <p className="mt-1 text-[13px] text-muted">Return reason distribution · {ACTIVE_SEASON}</p>

      <div className="mt-4 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={RETURN_DRIVERS}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 4, bottom: 0 }}
            barCategoryGap={14}
          >
            <CartesianGrid stroke="#E4E8ED" strokeDasharray="4 4" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 36]}
              tick={{ fontSize: 11, fill: '#6B7785' }}
              axisLine={{ stroke: '#D6DCE3' }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: '#0B1015', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Bar dataKey="pct" radius={[0, 6, 6, 0]} isAnimationActive={false} barSize={20}>
              {RETURN_DRIVERS.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FDF3E3] px-3.5 py-3">
        <Sparkles size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-warning" />
        <p className="text-[12.5px] leading-snug text-ink">
          <span className="font-semibold">AI:</span> {RETURN_DRIVERS_INSIGHT}
        </p>
      </div>
    </div>
  )
}
