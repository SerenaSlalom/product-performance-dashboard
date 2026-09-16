import { SIZE_TREND_DRIVERS } from '../utils/dataHelpers'

export default function SizeTrendDrivers() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(3,7,18,0.06)]">
      <p className="font-display text-[16px] font-semibold text-ink">Why Are Sizes Trending?</p>
      <p className="mt-1 text-[13px] text-muted">AI-identified demand drivers with confidence scores</p>

      <div className="mt-5 space-y-5">
        {SIZE_TREND_DRIVERS.map((driver) => (
          <div key={driver.title}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13.5px] font-semibold text-ink">{driver.title}</p>
              <p className="font-mono-tab text-[13px] font-semibold" style={{ color: driver.color }}>
                {driver.pct}%
              </p>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-inset-deep">
              <div
                className="h-full rounded-full"
                style={{ width: `${driver.pct}%`, backgroundColor: driver.color }}
              />
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{driver.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
