export const SEASONS = ['Fall 2026', 'Spring 2026']
export const CATEGORIES = [
  'Training Tops',
  'Sports Bras',
  'Leggings',
  'Shorts',
  'Outerwear',
]

const AT_RISK_GAP_PTS = 10
const SIZE_INDEX_THRESHOLD_PTS = 15

export function isAtRisk(product) {
  return product.sell_through_target_pct - product.sell_through_pct > AT_RISK_GAP_PTS
}

export function getSizeCurveStatus(sizeCurve) {
  const rates = Object.entries(sizeCurve).map(([size, { purchased, sold }]) => ({
    size,
    rate: purchased > 0 ? (sold / purchased) * 100 : 0,
  }))
  const avg = rates.reduce((sum, r) => sum + r.rate, 0) / rates.length

  const shortages = rates.filter((r) => r.rate - avg >= SIZE_INDEX_THRESHOLD_PTS).map((r) => r.size)
  const excesses = rates.filter((r) => avg - r.rate >= SIZE_INDEX_THRESHOLD_PTS).map((r) => r.size)

  const parts = []
  if (shortages.length) parts.push(`${shortages.join('/')} shortage`)
  if (excesses.length) parts.push(`${excesses.join('/')} excess`)
  return parts.length ? parts.join(', ') : null
}

export function getTopReturnReason(returnReasons) {
  return Object.entries(returnReasons).sort((a, b) => b[1] - a[1])[0][0]
}

export function getSentimentTone(avgRating) {
  if (avgRating >= 4.0) return 'success'
  if (avgRating >= 3.0) return 'warning'
  return 'danger'
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

export function formatPct(value, digits = 0) {
  return `${value.toFixed(digits)}%`
}

export const STATUS_LABELS = {
  action_needed: 'Action needed',
  watch: 'Watch',
  on_track: 'On track',
}
