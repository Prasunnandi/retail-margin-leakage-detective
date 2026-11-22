import express from 'express';
import cors from 'cors';
import { profitBridge, subcategoryLeakage, skuDrainQuadrant } from './data.js';

const app = express();
const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'retail-margin-leakage-detective', timestamp: new Date().toISOString() });
});

app.get('/api/profit-bridge', (req, res) => {
  res.json({
    bridge: profitBridge,
    summary: {
      grossListRevenue: profitBridge.grossListRevenue,
      baseGrossMargin: profitBridge.baseGrossMargin,
      totalMarginLeakage: profitBridge.totalMarginLeakage,
      realizedOperatingProfit: profitBridge.realizedOperatingProfit,
      leakageRatioPct: Number(((profitBridge.totalMarginLeakage / profitBridge.baseGrossMargin) * 100).toFixed(1))
    }
  });
});

app.get('/api/subcategories', (req, res) => {
  res.json({
    subcategories: subcategoryLeakage,
    criticalCategoriesCount: subcategoryLeakage.filter(s => s.leakageSeverity === 'CRITICAL').length
  });
});

app.get('/api/skus', (req, res) => {
  res.json({
    skus: skuDrainQuadrant,
    marginVampiresCount: skuDrainQuadrant.filter(s => s.quadrant === 'MARGIN_VAMPIRE').length
  });
});

// Discount Cap & Margin Recovery Simulation
app.post('/api/simulate-recovery', (req, res) => {
  const { maxDiscountCapPct = 20, freightSurchargeThreshold = 50 } = req.body;

  // Modeling savings if discounts above cap are pruned
  const originalDiscountLeakage = profitBridge.leakages.find(l => l.id === 'discounting').amount;
  const originalFreightLeakage = profitBridge.leakages.find(l => l.id === 'freight_subsidy').amount;

  const cap = Number(maxDiscountCapPct);
  // Stricter discount cap recovers 35% to 65% of discounting bleed
  const discountRecoveryRatio = Math.max(0, (35 - cap) / 35);
  const recoveredDiscountDollars = Math.round(originalDiscountLeakage * Math.min(0.7, Math.max(0.1, discountRecoveryRatio * 0.8)));

  const recoveredFreightDollars = Math.round(originalFreightLeakage * (Number(freightSurchargeThreshold) / 100) * 0.5);

  const totalRecoveredProfit = recoveredDiscountDollars + recoveredFreightDollars;
  const newOperatingProfit = profitBridge.realizedOperatingProfit + totalRecoveredProfit;
  const newMarginPct = Number(((newOperatingProfit / profitBridge.grossListRevenue) * 100).toFixed(1));

  res.json({
    maxDiscountCapPct: cap,
    recoveredDiscountDollars,
    recoveredFreightDollars,
    totalRecoveredProfit,
    newOperatingProfit,
    marginExpansionBasisPoints: Math.round((newMarginPct - profitBridge.realizedMarginPct) * 100),
    newMarginPct
  });
});

app.listen(PORT, () => {
  console.log(`Retail Margin Leakage API running on port ${PORT}`);
});
