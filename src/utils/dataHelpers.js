export const SEASONS = ['Fall 2026', 'Summer 2026', 'Spring 2026', 'Winter 2025']
export const ACTIVE_SEASON = 'Fall 2026'
export const ACTIVE_SEASON_MONTHS = ['Sep', 'Oct', 'Nov']

const AT_RISK_GAP_PTS = 10

export function isAtRisk(product) {
  return product.sell_through_target_pct - product.sell_through_pct > AT_RISK_GAP_PTS
}

export function getMonthlySellThrough(product) {
  const t = product.sell_through_trend
  return [t[1], t[3], t[5]]
}

export function getMonthlyReturnRate(product) {
  const final = product.return_rate_pct
  const round1 = (n) => Math.round(n * 10) / 10
  return [round1(final * 0.55), round1(final * 0.8), final]
}

const RISK_TIER_BY_STATUS = {
  action_needed: 'High',
  watch: 'Medium',
  on_track: 'Low',
}

export function getRiskTier(product) {
  return RISK_TIER_BY_STATUS[product.ai_insight.status] ?? 'Low'
}

export function getRiskScore(product) {
  const gap = product.sell_through_target_pct - product.sell_through_pct
  return gap + product.return_rate_pct - (product.reviews.avg_rating - 3) * 5
}

export function getSellThroughTone(pct) {
  if (pct < 45) return 'danger'
  if (pct < 65) return 'warning'
  return 'success'
}

export function getReturnRateTone(pct) {
  if (pct > 15) return 'danger'
  if (pct >= 10) return 'warning'
  return 'success'
}

// Illustrative business metrics not modeled per-product elsewhere, keyed by product id
export const INVENTORY_METRICS = {
  'ml-005': { unitsSold: 890, revenue: '$270K', recommendation: 'Consider discontinue or redesign' },
  'ml-012': { unitsSold: 760, revenue: '$310K', recommendation: 'Priority fix — seam & zipper quality' },
  'ml-015': { unitsSold: 1180, revenue: '$340K', recommendation: 'Redesign fit for M/L/XL sizes' },
  'ml-008': { unitsSold: 1050, revenue: '$380K', recommendation: 'Fix color/image mismatch in listing' },
  'ml-001': { unitsSold: 1420, revenue: '$360K', recommendation: 'Priority redesign — armhole/shoulder fit' },
  'ml-014': { unitsSold: 1960, revenue: '$610K', recommendation: 'Address fabric thinning/sheerness' },
  'ml-011': { unitsSold: 1780, revenue: '$420K', recommendation: 'Adjust L/XL fit — boxy cut feedback' },
  'ml-004': { unitsSold: 2140, revenue: '$480K', recommendation: 'Review product photography accuracy' },
  'ml-006': { unitsSold: 1890, revenue: '$640K', recommendation: 'Monitor Q4 sell-through pacing' },
  'ml-009': { unitsSold: 2260, revenue: '$520K', recommendation: 'Watch emerging size complaints' },
  'ml-013': { unitsSold: 2980, revenue: '$980K', recommendation: 'Maintain current trajectory' },
  'ml-007': { unitsSold: 3340, revenue: '$1.1M', recommendation: 'Stable — monitor demand' },
  'ml-002': { unitsSold: 3620, revenue: '$1.2M', recommendation: 'Evaluate reorder opportunity' },
  'ml-010': { unitsSold: 3890, revenue: '$890K', recommendation: 'Increase production volume' },
  'ml-003': { unitsSold: 4760, revenue: '$1.7M', recommendation: 'Expand allocation — top performer' },
}

export function computeKPIs(products) {
  const count = products.length || 1
  const avgSellThrough = products.reduce((sum, p) => sum + p.sell_through_pct, 0) / count
  const atRiskCount = products.filter(isAtRisk).length
  const avgReturnRate = products.reduce((sum, p) => sum + p.return_rate_pct, 0) / count
  const avgSentiment = products.reduce((sum, p) => sum + p.reviews.avg_rating, 0) / count

  return {
    avgSellThrough,
    atRiskCount,
    avgReturnRate,
    avgSentiment,
  }
}

export function computeMonthlyAverages(products) {
  const count = products.length || 1
  const round1 = (n) => Math.round(n * 10) / 10
  const sellThrough = [0, 0, 0]
  const returnRate = [0, 0, 0]
  let targetSum = 0

  products.forEach((p) => {
    getMonthlySellThrough(p).forEach((v, i) => {
      sellThrough[i] += v
    })
    getMonthlyReturnRate(p).forEach((v, i) => {
      returnRate[i] += v
    })
    targetSum += p.sell_through_target_pct
  })

  return {
    sellThrough: sellThrough.map((v) => round1(v / count)),
    returnRate: returnRate.map((v) => round1(v / count)),
    sellThroughTarget: round1(targetSum / count),
  }
}

export function formatPct(value, digits = 0) {
  return `${value.toFixed(digits)}%`
}

export const CATEGORY_TREND_SEASONS = [...SEASONS].reverse()

export const SEASON_MONTHS = {
  'Winter 2025': ['Dec', 'Jan', 'Feb'],
  'Spring 2026': ['Mar', 'Apr', 'May'],
  'Summer 2026': ['Jun', 'Jul', 'Aug'],
  'Fall 2026': ACTIVE_SEASON_MONTHS,
}

const MONTHLY_RAMP = {
  sellThrough: [0.85, 0.93, 1],
  returns: [0.55, 0.8, 1],
  revenueIndex: [0.82, 0.91, 1],
}

export const CATEGORY_TREND_COLORS = {
  Leggings: '#6D5DFC',
  'Sports Bras': '#E0459C',
  Outerwear: '#F59E0B',
  'Training Tops': '#2BB673',
  Shorts: '#38BDF8',
}

// Values ordered chronologically to match CATEGORY_TREND_SEASONS (Winter 2025 -> Fall 2026)
export const CATEGORY_SEASON_TRENDS = {
  Leggings: {
    sellThrough: [64, 68, 60, 73],
    returns: [8.2, 7.9, 8.6, 7.9],
    revenueIndex: [100, 108, 101, 124],
  },
  'Sports Bras': {
    sellThrough: [58, 62, 65, 68],
    returns: [10.0, 9.6, 9.2, 9.0],
    revenueIndex: [100, 107, 114, 121],
  },
  Outerwear: {
    sellThrough: [52, 40, 28, 50],
    returns: [13.5, 15.8, 18.9, 13.8],
    revenueIndex: [100, 79, 58, 98],
  },
  'Training Tops': {
    sellThrough: [50, 55, 61, 57],
    returns: [7.2, 6.9, 6.4, 6.3],
    revenueIndex: [100, 111, 124, 116],
  },
  Shorts: {
    sellThrough: [30, 55, 72, 40],
    returns: [12.8, 10.4, 8.7, 11.6],
    revenueIndex: [100, 150, 190, 125],
  },
}

export function getCategorySeasonMonthlyTrend(category, season, metric) {
  const seasonIndex = CATEGORY_TREND_SEASONS.indexOf(season)
  const finalValue = CATEGORY_SEASON_TRENDS[category][metric][seasonIndex]
  const round1 = (n) => Math.round(n * 10) / 10
  return MONTHLY_RAMP[metric].map((mult) => round1(finalValue * mult))
}

export const SIZE_PERFORMANCE = {
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  sellThrough: [58, 71, 76, 72, 61, 47],
  returns: [9, 11, 10, 13, 19, 22],
  growth: [4, 8, 6, 10, 24, 18],
}

export const SIZE_PERFORMANCE_INSIGHT =
  'Demand for XL increased 24% this season while inventory allocation only increased 8%, resulting in stockouts.'

export const SIZE_TREND_DRIVERS = [
  {
    title: 'Social media demand',
    pct: 94,
    color: '#6D5DFC',
    description: 'XL and XXL sizes trending on fitness content, +180% mention volume',
  },
  {
    title: 'Fit improvements',
    pct: 87,
    color: '#2BB673',
    description: "New paneling in F'26 Elite Legging rated 4.6 stars in XL by early adopters",
  },
  {
    title: 'Regional demand shifts',
    pct: 78,
    color: '#F59E0B',
    description: 'Southeast and Midwest showing strongest demand growth for inclusive sizing',
  },
  {
    title: 'New customer acquisition',
    pct: 71,
    color: '#E0459C',
    description: '37% of XL/XXL purchasers are first-time buyers with higher LTV potential',
  },
]

export const RETURN_DRIVERS = [
  { name: 'Fit', pct: 33, color: '#E25555' },
  { name: 'Sizing', pct: 26, color: '#F59E0B' },
  { name: 'Fabric', pct: 17, color: '#EAB308' },
  { name: 'Quality', pct: 11, color: '#A8CC22' },
  { name: 'Color', pct: 8, color: '#2BB673' },
  { name: 'Style', pct: 5, color: '#38BDF8' },
]

export const RETURN_DRIVERS_INSIGHT =
  'Improving waistband sizing consistency in leggings could reduce return volume by 18%, saving approximately $430K annually.'

export const RETURN_COST_IMPACT = {
  annualReturnCost: '$2.4M',
  potentialSavings: '$860K',
  recoverablePct: 36,
  breakdown: [
    { label: 'Fit + Size Issues', pct: 62, amount: '$1.5M / yr', tone: 'danger' },
    { label: 'Fabric / Quality', pct: 27, amount: '$648K / yr', tone: 'warning' },
  ],
  topAction: 'Waistband redesign on Tempo 7/8 Legging projected to reduce fit-related returns by 18%.',
}

export const CUSTOMER_VOICE = {
  reviewsAnalyzed: 3847,
  avgRating: 3.8,
  tones: [
    {
      key: 'positive',
      label: 'Positive',
      count: 936,
      color: '#2BB673',
      themes: [
        {
          title: 'Comfortable fit',
          value: '1,842',
          delta: '+12%',
          products: 'Ascent High-Waist Legging, Solstice Crop Tank',
          sizes: 'S, M, L',
        },
        {
          title: 'Durable fabric',
          value: '1,230',
          delta: '+8%',
          products: 'Verve High-Support Bra',
          sizes: 'All',
        },
        {
          title: 'Stylish design',
          value: '984',
          delta: '+22%',
          products: 'Nimbus Packable Jacket, Aero Mesh Short',
          sizes: 'XS–L',
        },
        {
          title: 'True to size',
          value: '876',
          delta: '+5%',
          products: 'Cadence Bike Short, Echo Studio Tank',
          sizes: 'XS–L',
        },
      ],
    },
    {
      key: 'neutral',
      label: 'Neutral',
      count: 273,
      color: '#F59E0B',
      themes: [
        {
          title: 'Average shipping time',
          value: '410',
          delta: '+2%',
          products: 'Ascent High-Waist Legging',
          sizes: 'All',
        },
        {
          title: 'Standard packaging',
          value: '305',
          delta: '0%',
          products: 'Solstice Crop Tank',
          sizes: 'All',
        },
        {
          title: 'Expected price point',
          value: '260',
          delta: '+3%',
          products: 'Summit Windbreaker',
          sizes: 'M, L',
        },
        {
          title: 'Color accuracy as expected',
          value: '190',
          delta: '-1%',
          products: 'Flux Studio Short',
          sizes: 'XS–L',
        },
      ],
    },
    {
      key: 'negative',
      label: 'Negative',
      count: 520,
      color: '#E25555',
      themes: [
        {
          title: 'Runs small in shoulders',
          value: '892',
          delta: '+18%',
          products: 'Momentum Training Tank',
          sizes: 'M, L, XL',
        },
        {
          title: 'Fabric pilling after wash',
          value: '640',
          delta: '+9%',
          products: 'Verve High-Support Bra',
          sizes: 'All',
        },
        {
          title: 'Inconsistent sizing',
          value: '512',
          delta: '+14%',
          products: 'Pulse Compression Legging',
          sizes: 'XL, XXL',
        },
        {
          title: 'Shipping delays',
          value: '305',
          delta: '+4%',
          products: 'Aero Mesh Short',
          sizes: 'All',
        },
      ],
    },
  ],
}

export const RECOMMENDED_ACTIONS = [
  {
    rank: 1,
    color: '#6D5DFC',
    title: 'Increase XL inventory allocation',
    priority: 'High',
    description: 'Demand exceeds forecast by 24%. Stockouts observed in 3 of 5 top SKUs.',
    impact: '+$1.3M projected revenue',
  },
  {
    rank: 2,
    color: '#2BB673',
    title: 'Redesign waistband on Tempo 7/8 Legging',
    priority: 'High',
    description: 'Largest fit-related complaint across 892 reviews. Primary return driver for XL/XXL.',
    impact: '-18% return rate, save ~$430K',
  },
  {
    rank: 3,
    color: '#E0459C',
    title: 'Increase sports bra production',
    priority: 'Medium',
    description: 'Highest multi-season growth trend. Sentiment improved +0.6 pts to 4.2.',
    impact: '+$900K projected revenue',
  },
  {
    rank: 4,
    color: '#F59E0B',
    title: 'Add extended sizing to Nimbus Packable Jacket',
    priority: 'Medium',
    description: 'Demand signals show 19% unmet demand in XL. Competitor gap opportunity.',
    impact: '+$380K projected revenue',
  },
]
