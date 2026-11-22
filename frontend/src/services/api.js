const API_BASE = 'http://localhost:8003';

export async function fetchProfitBridge() {
  try {
    const res = await fetch(`${API_BASE}/api/profit-bridge`);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function fetchSubcategories() {
  try {
    const res = await fetch(`${API_BASE}/api/subcategories`);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function fetchSkus() {
  try {
    const res = await fetch(`${API_BASE}/api/skus`);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function simulateRecovery(maxCap, freightThreshold) {
  try {
    const res = await fetch(`${API_BASE}/api/simulate-recovery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maxDiscountCapPct: maxCap, freightSurchargeThreshold: freightThreshold })
    });
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) {
    return null;
  }
}
