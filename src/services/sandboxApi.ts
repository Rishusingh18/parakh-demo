// ============================================================
// PARAKH — Sandbox API Service
// Simulates async government API calls with realistic delays
// ============================================================
import { mockBids, mockTenders, mockConnectors, mockRules, mockAuditLog } from '../data/mockData';
import type { Bid, Tender, GovtConnector, EligibilityRule, AuditEntry } from '../data/mockData';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const jitter = (base: number, range: number) => base + Math.floor(Math.random() * range);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const sandboxApi = {
  // ── Tenders ──────────────────────────────────────────────
  async getTenders(): Promise<Tender[]> {
    await delay(jitter(400, 300));
    return [...mockTenders];
  },

  async getTender(id: string): Promise<Tender | null> {
    await delay(jitter(200, 200));
    return mockTenders.find(t => t.id === id) ?? null;
  },

  // ── Bids ─────────────────────────────────────────────────
  async getBidsForTender(tenderId: string): Promise<Bid[]> {
    await delay(jitter(500, 400));
    return mockBids.filter(b => b.tenderId === tenderId);
  },

  async getBid(bidId: string): Promise<Bid | null> {
    await delay(jitter(300, 200));
    return mockBids.find(b => b.id === bidId) ?? null;
  },

  async updateBidDecision(bidId: string, decision: 'QUALIFY' | 'DISQUALIFY' | 'FLAG', notes: string, bidData: any, evidenceHash: string, pwd?: string): Promise<{ success: boolean; timestamp: string }> {
    const role = localStorage.getItem('officerRole') || 'ADMIN';
    try {
      const res = await fetch(`${API_BASE}/api/v1/audit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Officer-Role': role,
          ...(pwd ? { 'X-Officer-Password': pwd } : {})
        },
        body: JSON.stringify({
          bid_id: bidId,
          bid_no: bidData.bidNo,
          vendor_name: bidData.vendorName,
          action: 'DECISION_RECORDED',
          detail: notes || 'No notes provided',
          evidence_hash: evidenceHash || 'manual',
          risk_level: bidData.riskLevel,
          outcome: decision,
          idempotency_key: evidenceHash
        })
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error('Authentication failed: invalid password');
        throw new Error('Authorization failed');
      }
    } catch (e) {
      console.error(e);
      throw e;
    }

    const bid = mockBids.find(b => b.id === bidId);
    if (bid) {
      bid.officerNotes = notes;
      if (decision === 'QUALIFY') bid.status = 'PASSED';
      else if (decision === 'DISQUALIFY') bid.status = 'DISQUALIFIED';
      else bid.status = 'UNDER_REVIEW';
    }
    return { success: true, timestamp: new Date().toISOString() };
  },

  async extractAI(tenderId: string, bidId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/api/v1/ai/extract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tender_id: tenderId, bid_id: bidId })
    });
    return await res.json();
  },

  // ── Govt API Connector Checks ─────────────────────────────
  async getConnectors(): Promise<GovtConnector[]> {
    await delay(jitter(300, 200));
    // Simulate real-time status variation
    return mockConnectors.map(c => ({
      ...c,
      responseTimeMs: c.status === 'DOWN' ? 0 : jitter(c.responseTimeMs - 50, 200),
      lastChecked: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST',
    }));
  },

  async verifyGSTIN(_gstin: string): Promise<{ status: string; entityName: string; registrationDate: string; returnsFiled: number }> {
    await delay(jitter(600, 400));
    return { status: 'ACTIVE', entityName: 'Resolved Entity Name', registrationDate: '2018-04-01', returnsFiled: 9 };
  },

  async verifyPAN(_pan: string): Promise<{ status: string; entityType: string; linked: boolean }> {
    await delay(jitter(300, 200));
    return { status: 'VALID', entityType: 'COMPANY', linked: true };
  },

  async verifyUdyam(_udyamNo: string): Promise<{ classification: string; validTill: string; isMsme: boolean }> {
    await delay(jitter(500, 300));
    return { classification: 'MICRO', validTill: '2026-03-31', isMsme: true };
  },

  // ── Rules ─────────────────────────────────────────────────
  async getRules(): Promise<EligibilityRule[]> {
    await delay(jitter(300, 200));
    return [...mockRules];
  },

  async toggleRule(ruleId: string, active: boolean): Promise<{ success: boolean }> {
    await delay(jitter(400, 200));
    const rule = mockRules.find(r => r.id === ruleId);
    if (rule) rule.active = active;
    return { success: true };
  },

  // ── Audit Log ─────────────────────────────────────────────
  async getAuditLog(filters?: { bidId?: string; officerId?: string; outcome?: string }): Promise<AuditEntry[]> {
    await delay(jitter(400, 300));
    let entries = [...mockAuditLog];
    if (filters?.bidId) entries = entries.filter(e => e.bidId === filters.bidId);
    if (filters?.officerId) entries = entries.filter(e => e.officerId === filters.officerId);
    if (filters?.outcome) entries = entries.filter(e => e.outcome === filters.outcome);
    return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // ── Dashboard Stats ───────────────────────────────────────
  async getDashboardStats() {
    await delay(jitter(400, 300));
    const bids = mockBids;
    return {
      totalBids: 184,
      passed: 126,
      disqualified: 38,
      pending: 20,
      avgScore: Math.round(bids.reduce((s, b) => s + b.complianceScore, 0) / bids.length),
      apiCallsToday: 2847,
      verificationsToday: 1247,
      connectorHealth: 7, // out of 9 online
    };
  },
};
