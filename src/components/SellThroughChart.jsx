import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts'

export default function SellThroughChart({ trend, target }) {
  const data = trend.map((value, i) => ({ week: `W${i + 1}`, value }))

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-muted">Sell-through trend (6 weeks vs. plan)</p>
        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-3 rounded-full bg-ink" /> Actual
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-3 rounded-full bg-accent-deep" /> Target
          </span>
        </div>
      </div>
      <div className="mt-2 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: '#6B7785' }}
              axisLine={{ stroke: '#D6DCE3' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7785' }}
              axisLine={false}
              tickLine={false}
              width={32}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Sell-through']}
              contentStyle={{ borderRadius: 12, border: '1px solid #D6DCE3', fontSize: 12 }}
            />
            <ReferenceLine y={target} stroke="#A8CC22" strokeDasharray="4 4" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0B1015"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#0B1015' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
