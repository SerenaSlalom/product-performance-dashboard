import { LayoutGrid, ShoppingBag, MessagesSquare, Settings, Zap } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Assortment', icon: LayoutGrid, active: true },
  { label: 'Purchase Orders', icon: ShoppingBag, active: false },
  { label: 'Customer Voice', icon: MessagesSquare, active: false },
  { label: 'Settings', icon: Settings, active: false },
]

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col bg-ink px-4 py-6 md:flex">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
          <Zap size={16} strokeWidth={2} className="text-ink" fill="currentColor" />
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold leading-tight text-white">Maeven Label</p>
          <p className="text-[11px] leading-tight text-white/50">Assortment Intelligence</p>
        </div>
      </div>

      <nav className="mt-9 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            type="button"
            className={`flex items-center gap-3 rounded-full px-3 py-2.5 text-left text-[14px] font-medium transition-colors ${
              active ? 'bg-accent text-ink' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={17} strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-[13px] font-medium text-white">Buyer sign-in</p>
        <p className="mt-1 text-[12px] text-white/50">Serena Engquist</p>
        <p className="text-[12px] text-white/50">Category Manager</p>
      </div>
    </aside>
  )
}
