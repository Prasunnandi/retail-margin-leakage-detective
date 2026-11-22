import React, { useState } from 'react';
import { Sliders, TrendingUp, DollarSign, ShieldCheck, Zap, ArrowRight, BarChart3 } from 'lucide-react';
import { simulateRecovery } from '../services/api';

export default function DiscountElasticityView() {
  const [maxCap, setMaxCap] = useState(20);
  const [freightRecovery, setFreightRecovery] = useState(60);
  const [result, setResult] = useState({
    maxDiscountCapPct: 20,
    recoveredDiscountDollars: 67028,
    recoveredFreightDollars: 17460,
    totalRecoveredProfit: 84488,
    newOperatingProfit: 975088,
    marginExpansionBasisPoints: 290,
    newMarginPct: 33.7
  });

  const handleSimulate = async (cap, freight) => {
    setMaxCap(cap);
    setFreightRecovery(freight);
    const res = await simulateRecovery(cap, freight);
    if (res) {
      setResult(res);
    } else {
      // Offline fallback
      const discRec = Math.round(156400 * Math.max(0.1, (35 - cap) / 35 * 0.7));
      const frRec = Math.round(58200 * (freight / 100) * 0.5);
      const tot = discRec + frRec;
      const newProf = 890600 + tot;
      const newMargin = Number(((newProf / 2894500) * 100).toFixed(1));
      setResult({
        maxDiscountCapPct: cap,
        recoveredDiscountDollars: discRec,
        recoveredFreightDollars: frRec,
        totalRecoveredProfit: tot,
        newOperatingProfit: newProf,
        marginExpansionBasisPoints: Math.round((newMargin - 30.8) * 100),
        newMarginPct: newMargin
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-rose-400" />
          <span>Discount Elasticity & Margin Recovery Simulator</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Model the financial impact of enforcing ceiling caps on promotional discounts and passing through freight surcharges on oversized items.
        </p>
      </div>

      {/* Simulator Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h3 className="font-semibold text-slate-200 text-sm">Policy Levers</h3>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Max Discount Ceiling:</span>
              <span className="font-mono text-rose-400 font-bold">{maxCap}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="35"
              step="5"
              value={maxCap}
              onChange={(e) => handleSimulate(Number(e.target.value), freightRecovery)}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>Strict (10%)</span>
              <span>Moderate (20%)</span>
              <span>Lenient (35%)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">Oversized Freight Recovery:</span>
              <span className="font-mono text-cyan-400 font-bold">{freightRecovery}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={freightRecovery}
              onChange={(e) => handleSimulate(maxCap, Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>0% (Full Subsidy)</span>
              <span>50% Split</span>
              <span>100% Pass-through</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            Economic rule: Discounting elasticity requires volume to increase by <span className="text-amber-300 font-mono font-semibold">+33.3%</span> for a 20% price cut to maintain constant dollar gross profit.
          </div>
        </div>

        {/* Simulator Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-semibold text-xs text-slate-300 uppercase tracking-wide mb-4">
              Projected Annualized Profit Recovery
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-xs block">Recovered Discount Bleed:</span>
                <span className="font-mono text-xl font-bold text-emerald-400 mt-1 block">
                  +${result.recoveredDiscountDollars.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">From capped promo codes</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-xs block">Recouped Freight Subsidy:</span>
                <span className="font-mono text-xl font-bold text-cyan-300 mt-1 block">
                  +${result.recoveredFreightDollars.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Oversized shipping pass-through</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
                <span className="text-slate-500 text-xs block">Total Bottom-Line Lift:</span>
                <span className="font-mono text-xl font-bold text-white mt-1 block">
                  +${result.totalRecoveredProfit.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">+{result.marginExpansionBasisPoints} bps expansion</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Baseline Margin:</span>{' '}
                <span className="font-mono text-slate-300">30.8% ($890,600)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <div>
                <span className="text-slate-400">Optimized Operating Margin:</span>{' '}
                <span className="font-mono text-emerald-400 font-bold">{result.newMarginPct}% (${result.newOperatingProfit.toLocaleString()})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
