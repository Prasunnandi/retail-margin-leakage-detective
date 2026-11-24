/**
 * Retail Margin Leakage Tree Decomposition Engine
 * Decomposes gross margin erosion into Commercial Discounts, Customer Returns, Freight Surcharges, and Inventory Shrinkage.
 */

export class MarginLeakageTreeEngine {
  /**
   * @param {Object} [options]
   * @param {number} [options.acceptableLeakagePct=5.0] - Target acceptable leakage as % of Gross Revenue
   */
  constructor(options = {}) {
    this.acceptableLeakagePct = options.acceptableLeakagePct || 5.0;
  }

  /**
   * Decompose gross revenue and margin into realized profit and root cause leakage buckets
   * @param {Object} data
   * @param {number} data.grossRevenue - Total initial sales at list price
   * @param {number} data.cogs - Cost of Goods Sold (base manufacturing / purchase cost)
   * @param {Object} data.discounts - Commercial promotional erosions
   * @param {number} [data.discounts.promotionalMarkdowns=0] - Point-of-sale promo discounts
   * @param {number} [data.discounts.couponVouchers=0] - Marketing promo vouchers
   * @param {number} [data.discounts.uncollectedVendorRebates=0] - Expected vendor funding uncollected
   * @param {Object} data.returns - Customer return costs
   * @param {number} [data.returns.refundValue=0] - Gross refund payout
   * @param {number} [data.returns.restockDamageLoss=0] - Damaged / open-box value write-down
   * @param {number} [data.returns.reverseLogisticsCost=0] - Return shipping & handling
   * @param {Object} data.freight - Logistics & shipping overruns
   * @param {number} [data.freight.splitShipmentSurcharges=0] - Warehouse multi-fulfillment split costs
   * @param {number} [data.freight.expeditedDeliverySubsidies=0] - Carrier express subsidies
   * @param {number} [data.freight.dimensionalWeightPenalties=0] - Bulky box dimensional penalty fees
   * @param {Object} data.shrinkage - Physical inventory loss & discrepancy
   * @param {number} [data.shrinkage.damageSpoilage=0] - Expired / broken stock
   * @param {number} [data.shrinkage.theftUnknownLoss=0] - Unaccounted inventory delta
   * @param {number} [data.shrinkage.adminErrorMismatches=0] - Receiving scan count errors
   * @returns {Object} Comprehensive margin waterfall tree with root cause attribution
   */
  decompose(data) {
    const grossRev = Number(data.grossRevenue || 0);
    const cogs = Number(data.cogs || 0);
    const theoreticalMargin = grossRev - cogs;
    const theoreticalMarginPct = grossRev > 0 ? (theoreticalMargin / grossRev) * 100 : 0;

    // 1. Discount Bucket
    const d = data.discounts || {};
    const discountsTotal = (d.promotionalMarkdowns || 0) + (d.couponVouchers || 0) + (d.uncollectedVendorRebates || 0);

    // 2. Returns Bucket
    const r = data.returns || {};
    const returnsTotal = (r.refundValue || 0) + (r.restockDamageLoss || 0) + (r.reverseLogisticsCost || 0);

    // 3. Freight Bucket
    const f = data.freight || {};
    const freightTotal = (f.splitShipmentSurcharges || 0) + (f.expeditedDeliverySubsidies || 0) + (f.dimensionalWeightPenalties || 0);

    // 4. Shrinkage Bucket
    const s = data.shrinkage || {};
    const shrinkageTotal = (s.damageSpoilage || 0) + (s.theftUnknownLoss || 0) + (s.adminErrorMismatches || 0);

    const totalLeakage = discountsTotal + returnsTotal + freightTotal + shrinkageTotal;
    const realizedNetMargin = theoreticalMargin - totalLeakage;
    const realizedMarginPct = grossRev > 0 ? (realizedNetMargin / grossRev) * 100 : 0;
    const leakageRatePct = grossRev > 0 ? (totalLeakage / grossRev) * 100 : 0;

    // Identify primary leakage driver
    const leakageBuckets = [
      { name: 'Discounts & Promotions', amount: discountsTotal, details: d },
      { name: 'Customer Returns & Depreciation', amount: returnsTotal, details: r },
      { name: 'Freight & Logistics Penalties', amount: freightTotal, details: f },
      { name: 'Inventory Shrinkage & Spoilage', amount: shrinkageTotal, details: s }
    ].map(b => ({
      ...b,
      shareOfLeakagePct: totalLeakage > 0 ? Number(((b.amount / totalLeakage) * 100).toFixed(1)) : 0,
      impactOnGrossRevenuePct: grossRev > 0 ? Number(((b.amount / grossRev) * 100).toFixed(2)) : 0
    })).sort((a, b) => b.amount - a.amount);

    return {
      financialSummary: {
        grossRevenue: grossRev,
        cogs,
        theoreticalGrossMargin: theoreticalMargin,
        theoreticalMarginPct: Number(theoreticalMarginPct.toFixed(2)),
        totalMarginLeakage: totalLeakage,
        leakageRatePct: Number(leakageRatePct.toFixed(2)),
        realizedNetMargin,
        realizedMarginPct: Number(realizedMarginPct.toFixed(2)),
        healthStatus: leakageRatePct <= this.acceptableLeakagePct ? 'OPTIMAL' : 'EROSION_DETECTED'
      },
      primaryLeakageDriver: leakageBuckets[0].name,
      leakageBuckets,
      waterfallSteps: [
        { step: 'Gross Revenue', value: grossRev, balance: grossRev },
        { step: 'COGS', value: -cogs, balance: theoreticalMargin },
        { step: 'Promotional Discounts', value: -discountsTotal, balance: theoreticalMargin - discountsTotal },
        { step: 'Returns & Processing', value: -returnsTotal, balance: theoreticalMargin - discountsTotal - returnsTotal },
        { step: 'Freight Overruns', value: -freightTotal, balance: theoreticalMargin - discountsTotal - returnsTotal - freightTotal },
        { step: 'Shrinkage & Damage', value: -shrinkageTotal, balance: realizedNetMargin },
        { step: 'Realized Net Margin', value: realizedNetMargin, balance: realizedNetMargin }
      ]
    };
  }
}

export default MarginLeakageTreeEngine;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarginLeakageTreeEngine;
  module.exports.MarginLeakageTreeEngine = MarginLeakageTreeEngine;
}
