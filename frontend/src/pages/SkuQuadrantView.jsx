import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Layers, HelpCircle, ArrowRight } from 'lucide-react';

export default function SkuQuadrantView({ skus }) {
  const getQuadrantColor = (quad) => {
    switch (quad) {
      case 'MARGIN_VAMPIRE':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'CASH_COW':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'TRAFFIC_DRIVER':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <span>SKU Profitability Quadrant & Margin Vampires</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Classifying retail catalog SKUs by gross revenue velocity versus net realized contribution margin. Highlighting 'Margin Vampires'—products whose promotional discounting and shipping overheads actively destroy net enterprise value.
        </p>
      </div>

      {/* Quadrant Visual Matrix Legend */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Margin Vampires (Destroyers)</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
            High top-line sales masked by discounts &gt; 35% and oversized freight. Net negative P&L per unit.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Cash Cows (Value Engines)</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
            Disciplined discount rates (&lt; 15%) generating &gt; 35% net margin and strong recurring basket presence.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span>Traffic Drivers (Breakeven Anchors)</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
            Essential catalog items with low individual margins that drive multi-item basket attach rates.
          </p>
        </div>
      </div>

      {/* SKU Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skus?.map((sku) => (
          <div key={sku.skuId} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{sku.skuId} • {sku.category}</span>
                  <h3 className="font-bold text-slate-100 text-sm mt-0.5">{sku.productName}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${getQuadrantColor(sku.quadrant)}`}>
                  {sku.quadrant.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 my-4">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500">Revenue</div>
                  <div className="font-mono text-sm font-bold text-slate-200 mt-0.5">${sku.sales.toLocaleString()}</div>
                  <div className="text-[9px] text-slate-500">{sku.unitsSold} units</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500">Avg Discount</div>
                  <div className={`font-mono text-sm font-bold mt-0.5 ${sku.avgDiscount > 30 ? 'text-rose-400' : 'text-slate-300'}`}>
                    {sku.avgDiscount}%
                  </div>
                  <div className="text-[9px] text-slate-500">of list</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-500">Net Profit</div>
                  <div className={`font-mono text-sm font-bold mt-0.5 ${sku.netProfit < 0 ? 'text-rose-400 font-extrabold' : 'text-emerald-400'}`}>
                    {sku.netProfit < 0 ? `-$${Math.abs(sku.netProfit).toLocaleString()}` : `+$${sku.netProfit.toLocaleString()}`}
                  </div>
                  <div className="text-[9px] text-slate-500">${sku.freightCost} freight</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Recommended Play:</span>
              <span className="text-amber-300 font-medium text-[11px] text-right font-mono">{sku.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
