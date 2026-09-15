import { useMemo, useState } from 'react'
import { TrendingUp, AlertTriangle, RotateCcw, Star } from 'lucide-react'
import Sidebar from './components/Sidebar'
import KPITile from './components/KPITile'
import ProductTable from './components/ProductTable'
import assortment from './data/assortment.json'
import { computeKPIs, formatPct } from './utils/dataHelpers'

export default function App() {
  const [season, setSeason] = useState('Fall 2026')
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [expandedId, setExpandedId] = useState(null)
  const [reviewedIds, setReviewedIds] = useState(new Set())

  const kpis = useMemo(() => computeKPIs(assortment), [])

  function handleToggleCategory(category) {
    if (category === null) {
      setSelectedCategories(new Set())
      return
    }
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  function handleToggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  function handleToggleReviewed(id) {
    setReviewedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAtRiskTileClick() {
    setStatusFilter('at-risk')
    setSeason('Fall 2026')
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="md:pl-60">
        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-10">
          <header>
            <p className="font-display text-[28px] font-bold leading-tight text-ink md:text-[32px]">
              Assortment Intelligence
            </p>
            <p className="mt-1 text-[14px] text-muted">
              Fall 2026 season · How your active styles are performing right now, with what to do about it.
            </p>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KPITile
              label="Average Sell-Through Rate"
              value={formatPct(kpis.avgSellThrough, 0)}
              sublabel="Across all active styles"
              icon={TrendingUp}
              accent
            />
            <KPITile
              label="Styles At Risk"
              value={kpis.atRiskCount}
              sublabel="More than 10 pts below plan"
              icon={AlertTriangle}
              onClick={handleAtRiskTileClick}
            />
            <KPITile
              label="Average Return Rate"
              value={formatPct(kpis.avgReturnRate, 1)}
              sublabel="Returns as % of units sold"
              icon={RotateCcw}
            />
            <KPITile
              label="Average Sentiment Score"
              value={kpis.avgSentiment.toFixed(1)}
              sublabel="Mean customer rating (1–5)"
              icon={Star}
            />
          </div>

          <div className="mt-8">
            <ProductTable
              products={assortment}
              season={season}
              onSeasonChange={setSeason}
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              expandedId={expandedId}
              onToggleExpand={handleToggleExpand}
              reviewedIds={reviewedIds}
              onToggleReviewed={handleToggleReviewed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
