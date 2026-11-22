import React from 'react';
import { Layers, ArrowDownRight, TrendingDown, AlertOctagon, CheckCircle2, DollarSign, Table } from 'lucide-react';

export default function ProfitBridgeView({ bridge, subcategories }) {
  const leakages = bridge?.leakages || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-red-950/20 to-slate-900 border border-rose-800/40 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-rose-500/10 border border-rose-400/30 rounded-full text-rose-300 text-xs font-medium mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Forensic Profit Waterfall</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Retail Profit Margin Bridge & Leakage Audit
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Forensic analysis of the gap between theoretical catalog list gross margin (<span className="text-emerald-400 font-semibold font-mono">40.0% / $1,157,800</span>) and realized cash operating margin (<span className="text-amber-400 font-semibold font-mono">30.8% / $890,600</span>). Over <span className="text-rose-400 font-bold font-mono">$267,200</span> leaks to discount erosion and subsidized freight.
          </p>
        </div>
      </div>

      {/* Waterfall KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Gross List Margin</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            ${bridge?.baseGrossMargin?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">40.0% standard catalog margin</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Total Profit Leaked</div>
          <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
            -${bridge?.totalMarginLeakage?.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-300 mt-1">23.1% of gross profit eroded</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Realized Operating Profit</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            ${bridge?.realizedOperatingProfit?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">30.8% net realized margin</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Recoverable Margin Pool</div>
          <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
            +$114,800
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Via automated discount capping</div>
        </div>
      </div>

      {/* Waterfall Visual Bridge Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-xs text-slate-300 uppercase tracking-wider">
          Waterfall Leakage Dissection
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
            <div>
              <span className="font-semibold text-emerald-300">1. Baseline List Gross Margin</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Catalog price minus manufacturer COGS</span>
            </div>
            <span className="font-mono text-base font-bold text-emerald-400">+${bridge?.baseGrossMargin?.toLocaleString()}</span>
          </div>

          {leakages.map((leak) => (
            <div key={leak.id} className="flex items-center justify-between text-xs p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-200">(-) {leak.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    leak.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                    leak.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {leak.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{leak.description}</div>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-bold text-rose-400">-${leak.amount.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block font-mono">-{leak.pctOfRevenue}% of rev</span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-indigo-950/30 border border-indigo-700/50">
            <div>
              <span className="font-semibold text-indigo-200">(=) Final Realized Operating Net Profit</span>
              <span className="text-[11px] text-indigo-300/80 block mt-0.5">Net cash retained from commercial orders</span>
            </div>
            <span className="font-mono text-lg font-bold text-slate-100">${bridge?.realizedOperatingProfit?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Subcategory Margin Leakage Ranking */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Table className="w-4 h-4 text-rose-400" />
            <h3 className="font-semibold text-xs text-slate-200">Sub-Category Margin Leakage Ranking</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Source: Tableau Superstore Line Items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 font-mono">
              <tr>
                <th className="py-2.5 px-4">Sub-Category</th>
                <th className="py-2.5 px-4 text-right">Gross Sales</th>
                <th className="py-2.5 px-4 text-right">Raw Margin</th>
                <th className="py-2.5 px-4 text-right text-rose-400">Discount Leakage</th>
                <th className="py-2.5 px-4 text-right font-bold text-white">Net Realized Margin</th>
                <th className="py-2.5 px-4 text-center">Avg Discount</th>
                <th className="py-2.5 px-4 text-center">Leakage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
              {subcategories?.map((s) => (
                <tr key={s.subcategory} className="hover:bg-slate-800/40">
                  <td className="py-2 px-4 font-semibold text-slate-200">{s.subcategory}</td>
                  <td className="py-2 px-4 text-right text-slate-400">${s.sales.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right text-slate-300">${s.rawGrossProfit.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right text-rose-400 font-semibold">-${s.discountLeakage.toLocaleString()}</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-100">${s.netProfit.toLocaleString()}</td>
                  <td className="py-2 px-4 text-center text-amber-300">{s.avgDiscountPct}%</td>
                  <td className="py-2 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      s.leakageSeverity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      s.leakageSeverity === 'HIGH' ? 'bg-amber-500/20 text-amber-300' :
                      s.leakageSeverity === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.leakageSeverity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
