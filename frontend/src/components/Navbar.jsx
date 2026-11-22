import React from 'react';
import { RefreshCw, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Navbar({ onRefresh }) {
  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="font-medium">Total Margin Bleed:</span>
          <span className="text-rose-400 font-mono font-bold">-$267,200 / Year</span>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Realized Margin: 30.8% (Target: 35.0%)</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onRefresh}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Re-audit P&L Bridge</span>
        </button>

        <a
          href="/data/tableau_superstore_lineitems.csv"
          download
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-medium transition shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Line Items</span>
        </a>
      </div>
    </header>
  );
}
