import React from 'react';
import { Layers, ShieldAlert, TrendingDown, Database, Sliders, DollarSign, PieChart } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const items = [
    { id: 'bridge', label: 'Profit Bridge Waterfall', icon: Layers, badge: '$267k Bleed' },
    { id: 'quadrant', label: 'SKU Margin Vampires', icon: ShieldAlert, badge: 'Negative P&L' },
    { id: 'elasticity', label: 'Discount Cap Simulator', icon: Sliders, badge: '+420 bps' },
    { id: 'superstore', label: 'Tableau Superstore Data', icon: Database, badge: '9,995 Rows' }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-rose-600 rounded-lg shadow-lg shadow-rose-500/20 text-white">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm tracking-wide">MarginGuard</h1>
            <p className="text-xs text-rose-400 font-mono">Retail Profit Forensics</p>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Forensic P&L Modules
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 m-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Margin Leakage Detected</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Unhedged discounting and oversized furniture freight consume <span className="text-rose-300 font-semibold">23.1%</span> of baseline gross profit.
        </p>
      </div>
    </aside>
  );
}
