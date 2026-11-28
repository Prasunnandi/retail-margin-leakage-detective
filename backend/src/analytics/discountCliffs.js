/**
 * Retail Discount Threshold Cliff Detection & Margin Leakage Engine
 * Identifies the exact discount thresholds where product category profits invert from positive to negative,
 * quantifying total margin destruction and recommending automated pricing guardrail caps.
 */

export const DISCOUNT_BUCKETS = [
  { min: 0.0, max: 0.0, label: '0% (No Discount)' },
  { min: 0.01, max: 0.10, label: '1% - 10%' },
  { min: 0.11, max: 0.20, label: '11% - 20%' },
  { min: 0.21, max: 0.30, label: '21% - 30%' },
  { min: 0.31, max: 0.50, label: '31% - 50%' },
  { min: 0.51, max: 1.0, label: '> 50% (Extreme Discount)' }
];

export class DiscountCliffAnalyzer {
  /**
   * @param {Object} [options]
   * @param {number} [options.lossRatioWarningThreshold=0.25] - Loss-making order ratio trigger (25%)
   */
  constructor(options = {}) {
    this.lossRatioWarningThreshold = options.lossRatioWarningThreshold || 0.25;
  }

  /**
   * Helper to determine discount bucket label
   */
  _getBucketLabel(discount) {
    const d = Number(discount) || 0;
    if (d <= 0.001) return '0% (No Discount)';
    for (const b of DISCOUNT_BUCKETS) {
      if (d >= b.min && d <= b.max) return b.label;
    }
    return '> 50% (Extreme Discount)';
  }

  /**
   * Analyzes an array of retail transactions and detects category discount cliffs
   * @param {Array<Object>} transactions - [{ category, subCategory, sales, profit, discount, quantity }]
   * @returns {Object} Comprehensive discount cliff report with category breakdowns and leaked profit
   */
  analyzeTransactions(transactions = []) {
    if (!transactions || transactions.length === 0) {
      return { totalTransactions: 0, totalLeakedProfitUsd: 0, categoryCliffs: [] };
    }

    // Group transactions by category
    const categoryMap = new Map();

    transactions.forEach(tx => {
      const cat = tx.category || 'General';
      const subCat = tx.subCategory || 'General';
      const sales = Number(tx.sales) || 0;
      const profit = Number(tx.profit) || 0;
      const discount = Number(tx.discount) || 0;
      const bucket = this._getBucketLabel(discount);

      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, {
          category: cat,
          totalSales: 0,
          totalProfit: 0,
          totalOrders: 0,
          buckets: new Map(),
          subCategories: new Map()
        });
      }

      const c = categoryMap.get(cat);
      c.totalSales += sales;
      c.totalProfit += profit;
      c.totalOrders++;

      // Bucket accumulator
      if (!c.buckets.has(bucket)) {
        c.buckets.set(bucket, {
          bucket,
          ordersCount: 0,
          sales: 0,
          profit: 0,
          lossOrdersCount: 0
        });
      }
      const b = c.buckets.get(bucket);
      b.ordersCount++;
      b.sales += sales;
      b.profit += profit;
      if (profit < 0) b.lossOrdersCount++;
    });

    let totalLeakedProfit = 0;
    const categoryCliffs = [];

    for (const [catName, catData] of categoryMap.entries()) {
      const bucketSummaries = Array.from(catData.buckets.values()).map(b => {
        const avgMarginPct = b.sales > 0 ? Number(((b.profit / b.sales) * 100).toFixed(2)) : 0;
        const lossOrderRatio = b.ordersCount > 0 ? Number((b.lossOrdersCount / b.ordersCount).toFixed(3)) : 0;
        return {
          bucket: b.bucket,
          ordersCount: b.ordersCount,
          totalSalesUsd: Number(b.sales.toFixed(2)),
          totalProfitUsd: Number(b.profit.toFixed(2)),
          avgProfitMarginPct: avgMarginPct,
          lossOrderRatio,
          isProfitNegative: b.profit < 0
        };
      });

      // Find the first bucket where total profit turns negative (The Cliff Point)
      let cliffBucket = null;
      let recommendedMaxDiscountPct = 20;

      for (let i = 0; i < bucketSummaries.length; i++) {
        const b = bucketSummaries[i];
        if (b.isProfitNegative && !cliffBucket) {
          cliffBucket = b.bucket;
          // Set recommended cap to previous profitable bucket
          if (b.bucket === '11% - 20%') recommendedMaxDiscountPct = 10;
          else if (b.bucket === '21% - 30%') recommendedMaxDiscountPct = 20;
          else if (b.bucket === '31% - 50%') recommendedMaxDiscountPct = 30;
          else if (b.bucket === '> 50% (Extreme Discount)') recommendedMaxDiscountPct = 40;
        }
      }

      // Calculate total leaked margin (negative profit accumulated in loss-making buckets)
      const leakedProfitInCat = bucketSummaries
        .filter(b => b.totalProfitUsd < 0)
        .reduce((sum, b) => sum + Math.abs(b.totalProfitUsd), 0);

      totalLeakedProfit += leakedProfitInCat;

      categoryCliffs.push({
        category: catName,
        totalSalesUsd: Number(catData.totalSales.toFixed(2)),
        totalProfitUsd: Number(catData.totalProfit.toFixed(2)),
        overallMarginPct: catData.totalSales > 0 ? Number(((catData.totalProfit / catData.totalSales) * 100).toFixed(2)) : 0,
        cliffPointBucket: cliffBucket || 'NO_CLIFF_DETECTED',
        hasProfitCliff: Boolean(cliffBucket),
        recommendedMaxDiscountCapPct: recommendedMaxDiscountPct,
        leakedProfitUsd: Number(leakedProfitInCat.toFixed(2)),
        brackets: bucketSummaries
      });
    }

    return {
      totalTransactions: transactions.length,
      totalLeakedProfitUsd: Number(totalLeakedProfit.toFixed(2)),
      categoriesCount: categoryCliffs.length,
      categoryCliffs
    };
  }
}

// Dual ESM & CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DISCOUNT_BUCKETS,
    DiscountCliffAnalyzer
  };
}

export default DiscountCliffAnalyzer;
