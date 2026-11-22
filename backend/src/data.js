// Retail Profit Bridge, SKU Drain Quadrant, and Leakage Benchmarks

export const profitBridge = {
  grossListRevenue: 2894500,
  baseGrossMargin: 1157800, // 40.0% of list
  grossMarginPct: 40.0,
  leakages: [
    { id: 'discounting', name: 'Unhedged Promotional Discounts', amount: 156400, pctOfRevenue: 5.4, severity: 'CRITICAL', description: 'Discounts exceeding 25% threshold without corresponding volume elasticity' },
    { id: 'freight_subsidy', name: 'Expedited Freight Subsidies', amount: 58200, pctOfRevenue: 2.0, severity: 'HIGH', description: 'Under-recovered two-day shipping charges on low-density oversized furniture' },
    { id: 'return_restock', name: 'Customer Return Restocking & Damage', amount: 34100, pctOfRevenue: 1.2, severity: 'MEDIUM', description: 'Restocking cost and refurbished markdowns on consumer electronics' },
    { id: 'payment_take_rate', name: 'Payment Gateway Surcharge Skew', amount: 18500, pctOfRevenue: 0.6, severity: 'LOW', description: 'Card processing take-rates on micro-orders below $20 basket size' }
  ],
  realizedOperatingProfit: 890600,
  realizedMarginPct: 30.8,
  totalMarginLeakage: 267200
};

export const subcategoryLeakage = [
  { subcategory: 'Binders & Accessories', sales: 203412, rawGrossProfit: 81364, discountLeakage: 46210, netProfit: 35154, avgDiscountPct: 37.2, leakageSeverity: 'CRITICAL' },
  { subcategory: 'Tables & Desks', sales: 206965, rawGrossProfit: 82786, discountLeakage: 38400, netProfit: 44386, avgDiscountPct: 26.1, leakageSeverity: 'CRITICAL' },
  { subcategory: 'Machines & Automation', sales: 189238, rawGrossProfit: 75695, discountLeakage: 28900, netProfit: 46795, avgDiscountPct: 20.6, leakageSeverity: 'HIGH' },
  { subcategory: 'Chairs & Ergonomics', sales: 328449, rawGrossProfit: 131379, discountLeakage: 24500, netProfit: 106879, avgDiscountPct: 17.0, leakageSeverity: 'MODERATE' },
  { subcategory: 'Storage Units', sales: 223843, rawGrossProfit: 89537, discountLeakage: 18200, netProfit: 71337, avgDiscountPct: 7.5, leakageSeverity: 'LOW' },
  { subcategory: 'Phones & Telecom', sales: 330007, rawGrossProfit: 132002, discountLeakage: 15400, netProfit: 116602, avgDiscountPct: 15.4, leakageSeverity: 'LOW' },
  { subcategory: 'Copiers & High-End Tech', sales: 149528, rawGrossProfit: 89716, discountLeakage: 4800, netProfit: 84916, avgDiscountPct: 11.0, leakageSeverity: 'HEALTHY' }
];

export const skuDrainQuadrant = [
  {
    skuId: 'FUR-TA-10000198',
    productName: 'Chromcraft Bull-Nose Executive Conference Table',
    category: 'Furniture',
    quadrant: 'MARGIN_VAMPIRE',
    sales: 23480,
    unitsSold: 32,
    avgDiscount: 42.5,
    netProfit: -4820,
    freightCost: 3120,
    action: 'Impose strict 15% discount floor; eliminate free freight.'
  },
  {
    skuId: 'OFF-BI-10003527',
    productName: 'Fellowes PB500 Heavy-Duty Electric Punch & Binder',
    category: 'Office Supplies',
    quadrant: 'MARGIN_VAMPIRE',
    sales: 19840,
    unitsSold: 64,
    avgDiscount: 55.0,
    netProfit: -3950,
    freightCost: 1480,
    action: 'Halt promotional coupon stacking; verify supplier margin.'
  },
  {
    skuId: 'TEC-MA-10000822',
    productName: 'Bady 8-Port Desktop High-Speed Multi-Interface Terminal',
    category: 'Technology',
    quadrant: 'MARGIN_VAMPIRE',
    sales: 14200,
    unitsSold: 18,
    avgDiscount: 35.0,
    netProfit: -2140,
    freightCost: 890,
    action: 'Discontinue promo codes on low-margin hardware.'
  },
  {
    skuId: 'TEC-CO-10004722',
    productName: 'Canon imageCLASS 2200 Advanced Copier',
    category: 'Technology',
    quadrant: 'CASH_COW',
    sales: 61599,
    unitsSold: 8,
    avgDiscount: 12.0,
    netProfit: 25199,
    freightCost: 1200,
    action: 'Scale targeted ad spend; protect premium pricing.'
  },
  {
    skuId: 'OFF-PA-10002365',
    productName: 'Xerox 198 Heavy Duty Laser Paper (5000 Sheets)',
    category: 'Office Supplies',
    quadrant: 'CASH_COW',
    sales: 42800,
    unitsSold: 410,
    avgDiscount: 5.0,
    netProfit: 18400,
    freightCost: 2800,
    action: 'Bundle with toner cartridges for subscription delivery.'
  },
  {
    skuId: 'FUR-CH-10002024',
    productName: 'HON Valutask Low Back Mesh Ergonomic Chair',
    category: 'Furniture',
    quadrant: 'TRAFFIC_DRIVER',
    sales: 38400,
    unitsSold: 190,
    avgDiscount: 20.0,
    netProfit: 6400,
    freightCost: 4100,
    action: 'Optimize palletized distribution to reduce freight overhead.'
  }
];
