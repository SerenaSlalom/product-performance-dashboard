import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import TopBar from './components/TopBar'
import InsightKPICard from './components/InsightKPICard'
import SeasonMultiSelect from './components/SeasonMultiSelect'
import CategoryTrendChart from './components/CategoryTrendChart'
import SizePerformanceTrend from './components/SizePerformanceTrend'
import SizeTrendDrivers from './components/SizeTrendDrivers'
import ReturnDriversChart from './components/ReturnDriversChart'
import CostImpactCard from './components/CostImpactCard'
import CustomerVoiceInsights from './components/CustomerVoiceInsights'
import RecommendedActions from './components/RecommendedActions'
import InventoryHealthTable from './components/InventoryHealthTable'
import assortment from './data/assortment.json'
import { computeKPIs, computeMonthlyAverages, formatPct, ACTIVE_SEASON, SEASONS } from './utils/dataHelpers'

export default function App() {
  const [selectedSeasons, setSelectedSeasons] = useState(new Set([ACTIVE_SEASON]))
  const customerVoiceRef = useRef(null)
  const recommendedActionsRef = useRef(null)

  const kpis = useMemo(() => computeKPIs(assortment), [])
  const monthlyAverages = useMemo(() => computeMonthlyAverages(assortment), [])

  function handleAtRiskTileClick() {
    recommendedActionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleViewCustomerFeedback() {
    customerVoiceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-canvas">
      <TopBar />
      <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-10">
        <header>
          <p className="font-display text-[28px] font-bold leading-tight text-ink md:text-[32px]">
            Product Inventory Dashboard
          </p>
          <div className="mt-3 flex items-center gap-2">
            <label className="text-[13px] font-medium text-muted">
              Season
            </label>
            <SeasonMultiSelect
              seasons={SEASONS}
              selectedSeasons={selectedSeasons}
              onSeasonChange={setSelectedSeasons}
            />
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InsightKPICard
            label="Sell-Through Rate"
            value={formatPct(kpis.avgSellThrough, 0)}
            tone="success"
            trend={monthlyAverages.sellThrough}
            deltaIcon={ArrowUpRight}
            deltaText="+8% MoM"
            insight="Growth driven by Leggings and Sports Bras. M/L sizes represent 67% of total gains."
            footerText="+$2.4M revenue contribution"
          />
          <InsightKPICard
            label="Return Rate"
            value={formatPct(monthlyAverages.returnRate[monthlyAverages.returnRate.length - 1], 0)}
            badge="Alert"
            tone="danger"
            trend={monthlyAverages.returnRate}
            deltaIcon={ArrowUpRight}
            deltaText="+2.4 pts"
            insight="73% of return increase relates to sizing. XL and XXL have highest return frequency."
            footerText="$420K additional return costs"
          />
          <InsightKPICard
            label="Customer Sentiment"
            value={kpis.avgSentiment.toFixed(1)}
            valueSuffix="/5"
            tone="danger"
            trend={[4.1, 3.9, kpis.avgSentiment]}
            deltaIcon={ArrowDownRight}
            deltaText="-0.3 pts"
            insight="Negative reviews increased around fit consistency and fabric durability."
            footerText="View Customer Feedback"
            onFooterClick={handleViewCustomerFeedback}
          />
          <InsightKPICard
            label="At-Risk Styles"
            value={kpis.atRiskCount}
            tone="danger"
            trend={[3, 4, kpis.atRiskCount]}
            deltaIcon={ArrowUpRight}
            deltaText="+2 this month"
            insight="4 at-risk styles show low sell-through and declining sentiment simultaneously."
            footerText="$320K potential write-off risk"
            onClick={handleAtRiskTileClick}
          />
        </div>

        <div className="mt-6">
          <CategoryTrendChart selectedSeasons={selectedSeasons} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SizePerformanceTrend />
          <SizeTrendDrivers />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ReturnDriversChart />
          <CostImpactCard />
        </div>

        <div ref={customerVoiceRef} className="mt-6 scroll-mt-6">
          <CustomerVoiceInsights />
        </div>

        <div ref={recommendedActionsRef} className="mt-6 scroll-mt-6">
          <RecommendedActions />
        </div>

        <div className="mt-6">
          <InventoryHealthTable products={assortment} />
        </div>
      </div>
    </div>
  )
}
