import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#0B1015', '#6B7785', '#A8CC22', '#D6DCE3', '#1A2330', '#D6FF3D']

export default function ReturnBreakdown({ returnReasons, returnRatePct }) {
  const data = Object.entries(returnReasons)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-muted">Return reasons</p>
        <p className="font-mono-tab text-[13px] font-semibold text-ink">{returnRatePct.toFixed(1)}% return rate</p>
      </div>
      <div className="mt-1 flex items-center gap-4">
        <div className="h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={34} outerRadius={56} paddingAngle={2}>
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ borderRadius: 12, border: '1px solid #D6DCE3', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-1.5">
          {data.map((entry, i) => (
            <li key={entry.name} className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 text-ink">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {entry.name}
              </span>
              <span className="font-mono-tab font-medium text-muted">{entry.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
