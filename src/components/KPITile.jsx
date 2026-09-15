import MiniTrendBars from './MiniTrendBars'

export default function KPITile({ label, value, sublabel, onClick, accent = false, icon: Icon, trend }) {
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <Wrapper
      onClick={onClick}
      className={`rounded-2xl p-6 text-left shadow-[0_2px_8px_rgba(3,7,18,0.06)] transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-[0_6px_20px_rgba(3,7,18,0.08)]' : ''
      } ${accent ? 'bg-ink text-white' : 'bg-white text-ink'}`}
    >
      <div className="flex items-start justify-between">
        <p className={`text-[13px] font-medium ${accent ? 'text-white/60' : 'text-muted'}`}>{label}</p>
        {Icon && (
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              accent ? 'bg-white/10' : 'bg-surface-inset'
            }`}
          >
            <Icon size={16} strokeWidth={1.75} className={accent ? 'text-accent' : 'text-ink'} />
          </span>
        )}
      </div>
      <p className="font-display mt-3 text-[34px] font-bold leading-none tracking-tight">{value}</p>
      {sublabel && (
        <p className={`mt-2 text-[13px] ${accent ? 'text-white/70' : 'text-muted'}`}>{sublabel}</p>
      )}
      {trend && (
        <div className={`mt-4 border-t pt-4 ${accent ? 'border-white/10' : 'border-border'}`}>
          <MiniTrendBars {...trend} size="md" dark={accent} />
        </div>
      )}
    </Wrapper>
  )
}
