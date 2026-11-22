import React from 'react';
import { Database, Table, ExternalLink } from 'lucide-react';

export default function SuperstoreDatasetView() {
  const sampleItems = [
    { lineId: 1, orderId: 'CA-2013-152156', productId: 'FUR-BO-10001798', name: 'Bush Birmingham Bookcase', sales: '$261.96', discount: '0%', profit: '+$41.91', qty: 2 },
    { lineId: 2, orderId: 'CA-2013-152156', productId: 'FUR-CH-10000454', name: 'HON 5400 Series Chair', sales: '$731.94', discount: '0%', profit: '+$219.58', qty: 3 },
    { lineId: 3, orderId: 'CA-2013-138688', productId: 'OFF-LA-10000240', name: 'Self-Adhesive Address Labels', sales: '$14.62', discount: '0%', profit: '+$6.87', qty: 2 },
    { lineId: 4, orderId: 'US-2015-108966', productId: 'FUR-TA-10000577', name: 'Bretford CR4500 Series Table', sales: '$957.57', discount: '45%', profit: '-$383.03', qty: 5 },
    { lineId: 5, orderId: 'US-2015-108966', productId: 'OFF-ST-10000760', name: 'Eldon Fold \'N Roll Cart', sales: '$22.36', discount: '20%', profit: '+$2.51', qty: 2 },
    { lineId: 6, orderId: 'CA-2014-115812', productId: 'FUR-FU-10001487', name: 'Eldon Expressions Desk Pad', sales: '$48.86', discount: '0%', profit: '+$14.16', qty: 7 },
    { lineId: 7, orderId: 'CA-2014-115812', productId: 'OFF-AR-10002833', name: 'Newell 322 Ballpoint Pen', sales: '$7.28', discount: '0%', profit: '+$1.96', qty: 4 },
    { lineId: 8, orderId: 'CA-2014-115812', productId: 'TEC-PH-10002275', name: 'Mitel 5320 IP Phone', sales: '$907.15', discount: '20%', profit: '+$90.71', qty: 6 },
    { lineId: 9, orderId: 'CA-2014-115812', productId: 'OFF-BI-10003910', name: 'GBC Binding Spines 1/2"', sales: '$18.50', discount: '20%', profit: '+$5.55', qty: 3 },
    { lineId: 10, orderId: 'CA-2014-115812', productId: 'OFF-AP-10002892', name: 'Belkin F8E888 SurgeMaster', sales: '$114.90', discount: '0%', profit: '+$34.47', qty: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-xs font-medium mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Official Tableau Hyper / CSV Benchmark</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Tableau Superstore Retail Transactions Dataset</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Real line-item commercial sales, discounts, and profitability records across 9,995 transactions and 1,876 unique catalog products.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Total Line Items</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">9,995</div>
          <div className="text-[11px] text-slate-500 mt-1">In data/ directory</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Catalog Products</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">1,876</div>
          <div className="text-[11px] text-slate-500 mt-1">Normalized SKU metadata</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Discount Leakage Events</div>
          <div className="text-2xl font-bold text-rose-400 font-mono mt-1">3,799</div>
          <div className="text-[11px] text-slate-500 mt-1">Transactions with &gt; 20% discount</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="text-xs text-slate-400">Total File Footprint</div>
          <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">1.02 MB</div>
          <div className="text-[11px] text-slate-500 mt-1">CSV (UTF-8) raw data</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Table className="w-4 h-4 text-rose-400" />
            <h3 className="font-semibold text-xs text-slate-200">Sample Line Items (First 10 of 9,995)</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">tableau_superstore_lineitems.csv</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 font-mono">
              <tr>
                <th className="py-2.5 px-4">Line ID</th>
                <th className="py-2.5 px-4">Order ID</th>
                <th className="py-2.5 px-4">Product ID</th>
                <th className="py-2.5 px-4">Product Description</th>
                <th className="py-2.5 px-4 text-right">Sales</th>
                <th className="py-2.5 px-4 text-center">Discount</th>
                <th className="py-2.5 px-4 text-right">Profit</th>
                <th className="py-2.5 px-4 text-center">Qty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-[11px]">
              {sampleItems.map((item) => (
                <tr key={item.lineId} className="hover:bg-slate-800/40">
                  <td className="py-2 px-4 text-slate-400">{item.lineId}</td>
                  <td className="py-2 px-4 text-slate-300">{item.orderId}</td>
                  <td className="py-2 px-4 font-mono text-cyan-300">{item.productId}</td>
                  <td className="py-2 px-4 text-slate-200 max-w-xs truncate">{item.name}</td>
                  <td className="py-2 px-4 text-right font-medium text-slate-100">{item.sales}</td>
                  <td className="py-2 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      parseInt(item.discount) > 30 ? 'bg-rose-500/20 text-rose-300' :
                      parseInt(item.discount) > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.discount}
                    </span>
                  </td>
                  <td className={`py-2 px-4 text-right font-bold ${
                    item.profit.startsWith('-') ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'
                  }`}>
                    {item.profit}
                  </td>
                  <td className="py-2 px-4 text-center text-slate-400">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
