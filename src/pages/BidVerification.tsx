import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { sandboxApi } from '../services/sandboxApi';
import type { Bid, BidCriteria } from '../data/mockData';

import { ScoreGauge, RiskBadge, StatusPill, VerifyCard, SectionHeader, TableSkeleton, Skeleton } from '../components/ui';

const mockTenderBids = [
  { id: 'B001', bidNo: 'GEM-BID-89410', vendor: 'NexTech Infra Pvt Ltd', score: 42, status: 'DISQUALIFIED' as const },
  { id: 'B002', bidNo: 'GEM-BID-89411', vendor: 'InfoSec Systems India Ltd.', score: 91, status: 'PASSED' as const },
  { id: 'B003', bidNo: 'GEM-BID-89412', vendor: 'Quantum DataVault Pvt Ltd', score: 67, status: 'PENDING' as const },
  { id: 'B004', bidNo: 'GEM-BID-89413', vendor: 'TechNation Solutions LLP', score: 88, status: 'PASSED' as const },
];

type ApiEvidenceResult = { status: string; detail: string; timestamp: string; evidenceHash: string };

const sha256Hex = async (value: string): Promise<string> => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
};

export const BidVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedBidId, setSelectedBidId] = useState(searchParams.get('bid') ?? 'B001');
  const [bid, setBid] = useState<Bid | null>(null);
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'criteria' | 'evidence'>('overview');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiResults, setApiResults] = useState<Record<string, ApiEvidenceResult>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const currentBidRef = React.useRef(searchParams.get('bid') ?? 'B001');

  useEffect(() => {
    let active = true;
    sandboxApi.getBid(selectedBidId).then(b => {
      if (active) {
        setBid(b);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedBidId]);

  const selectBid = (bidId: string) => {
    setSelectedBidId(bidId);
    currentBidRef.current = bidId;
    setLoading(true);
    setSubmitted(false);
    setDecision('');
    setNotes('');
    setApiResults({});
    setAiResult(null);
  };

  const runApiVerification = async () => {
    if (!bid) return;
    setApiLoading(true);
    const results: Record<string, ApiEvidenceResult> = {};
    const buildEvidence = async (api: string, status: string, detail: string): Promise<ApiEvidenceResult> => {
      const timestamp = new Date().toISOString();
      const evidenceHash = await sha256Hex(`${bid.id}|${api}|${status}|${detail}|${timestamp}`);
      return { status, detail, timestamp, evidenceHash };
    };

    await sandboxApi.verifyGSTIN(bid.gstin).then(r => {
      return buildEvidence('GSTN', r.status, `${bid.gstin} → ${r.status} | Returns: ${r.returnsFiled}`);
    }).then(result => {
      results['GSTN'] = result;
    });
    await sandboxApi.verifyPAN(bid.pan).then(r => {
      return buildEvidence('PAN', r.status, `${bid.pan} → ${r.status} | Entity: ${r.entityType}`);
    }).then(result => {
      results['PAN'] = result;
    });
    await sandboxApi.verifyUdyam(bid.udyamNo).then(r => {
      return buildEvidence('UDYAM', r.isMsme ? 'VERIFIED' : 'NOT_FOUND', `${bid.udyamNo} → ${r.classification} | Valid till: ${r.validTill}`);
    }).then(result => {
      results['UDYAM'] = result;
    });
    results['MCA21'] = await buildEvidence('MCA21', 'VERIFIED', `${bid.mcaId} → Company Active | Financials fetched`);
    if (currentBidRef.current !== bid.id) return;
    setApiResults(results);
    setApiLoading(false);
  };

  const handleDecision = async () => {
    if (!decision || !bid) return;
    setSubmitting(true);
    setErrorMsg('');
    try {
      const payload = { bidId: bid.id, decision, notes, apiResults };
      const evidenceHash = await sha256Hex(JSON.stringify(payload));
      await sandboxApi.updateBidDecision(bid.id, decision as any, notes, bid, evidenceHash);
      setSubmitted(true);
    } catch (e: any) {
      setErrorMsg(e.message || 'Error saving decision');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAiExtract = async () => {
    if (!bid) return;
    setAiLoading(true);
    try {
      const res = await sandboxApi.extractAI(bid.tenderId, bid.id);
      if (currentBidRef.current !== bid.id) return;
      setAiResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      if (currentBidRef.current === bid.id) setAiLoading(false);
    }
  };

  const categoryGroups = bid ? {
    FINANCIAL: bid.criteria.filter(c => c.category === 'FINANCIAL'),
    TECHNICAL: bid.criteria.filter(c => c.category === 'TECHNICAL'),
    STATUTORY: bid.criteria.filter(c => c.category === 'STATUTORY'),
    EXPERIENCE: bid.criteria.filter(c => c.category === 'EXPERIENCE'),
  } : {};

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="bg-[#EFF4FF] border border-[#B1C7F0] rounded px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#44474E]">
          <button onClick={() => navigate('/')} className="text-[#0B2545] hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">arrow_back</span> Tender Hub
          </button>
          <span className="text-[#C4C6CF]">/</span>
          <span className="text-[#0B2545]">GEM/2025/B/984210</span>
          <span className="text-[#C4C6CF]">/</span>
          <span className="text-[#D97706]">Bid Evaluation Scrutiny</span>
        </div>
        <div className="font-mono text-[11px] text-[#44474E]">
          DOCKET: <strong className="text-[#0B2545]">NIC-EV-2025-08194</strong> • <strong>{new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })}</strong> IST
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Panel — Bid List */}
        <div className="lg:col-span-3">
          <div className="gov-card overflow-hidden">
            <div className="bg-[#0B2545] px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">Bid Submissions</span>
              <span className="font-mono text-[11px] text-[#778db2]">{mockTenderBids.length} BIDS</span>
            </div>
            <div className="divide-y divide-[#E2E8F0]">
              {mockTenderBids.map(b => (
                <button
                  key={b.id}
                  onClick={() => selectBid(b.id)}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-[#EFF4FF] ${selectedBidId === b.id ? 'bg-[#EFF4FF] border-l-4 border-l-[#D97706]' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="font-mono text-[11px] font-bold text-[#44474E] uppercase">{b.bidNo}</div>
                  <div className="text-[13px] font-semibold text-[#0D1C2F] mt-0.5 leading-tight">{b.vendor}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`font-serif text-[18px] font-bold ${b.score >= 80 ? 'text-[#047857]' : b.score >= 60 ? 'text-[#D97706]' : 'text-[#B91C1C]'}`}>{b.score}</span>
                    <StatusPill status={b.status} size="sm" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel — Detail */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <TableSkeleton rows={4} cols={4} />
            </div>
          ) : bid ? (
            <>
              {/* Bid Header */}
              <div className="gov-card p-5">
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                  {/* Score Gauge */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <ScoreGauge score={bid.complianceScore} size={130} />
                    <RiskBadge level={bid.riskLevel} />
                  </div>

                  {/* Bid Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm">BID NO: {bid.bidNo}</span>
                      <span className="font-mono text-[11px] text-[#44474E] border border-[#E2E8F0] rounded px-2 py-0.5">{bid.tenderId === 'T001' ? 'GEM/2025/B/984210' : bid.tenderId}</span>
                      {bid.isMsme && <span className="bg-[#ECFDF5] text-[#065F46] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#A7F3D0]">MSME</span>}
                      {bid.isStartup && <span className="bg-[#FFF7ED] text-[#9A3412] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#FDBA74]">DPIIT STARTUP</span>}
                    </div>
                    <h1 className="font-serif text-[22px] font-bold text-[#0B2545] leading-tight">{bid.vendorName}</h1>
                    {bid.status === 'DISQUALIFIED' && bid.disqualificationReason && (
                      <div className="mt-2 bg-[#FEF2F2] border border-[#FECACA] rounded px-3 py-2 flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#B91C1C] text-[20px] mt-0.5 shrink-0">report_problem</span>
                        <div>
                          <div className="font-mono text-[11px] font-bold uppercase text-[#B91C1C] tracking-wider">Automated Non-Compliance Interdict</div>
                          <div className="text-[13px] text-[#991B1B] mt-0.5">{bid.disqualificationReason}</div>
                        </div>
                      </div>
                    )}
                    {/* Key fields */}
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'GSTIN', value: bid.gstin, mono: true },
                        { label: 'PAN', value: bid.pan, mono: true },
                        { label: 'Udyam No.', value: bid.udyamNo, mono: true },
                        { label: 'Avg. Turnover', value: bid.financialTurnover, mono: false },
                      ].map(f => (
                        <div key={f.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded px-3 py-2">
                          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">{f.label}</div>
                          <div className={`text-[12px] font-semibold text-[#0D1C2F] mt-0.5 ${f.mono ? 'font-mono' : ''}`}>{f.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#E2E8F0] flex gap-0">
                {(['overview', 'criteria', 'evidence'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 font-semibold text-[14px] border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-[#D97706] text-[#0B2545]' : 'border-transparent text-[#44474E] hover:text-[#0B2545]'}`}
                  >
                    {tab === 'overview' ? 'Overview' : tab === 'criteria' ? 'Verification Criteria' : 'API Evidence'}
                  </button>
                ))}
              </div>

              {/* Tab: Overview */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Score Breakdown */}
                  <div className="gov-card p-4">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-3">Score Breakdown by Category</div>
                    {Object.entries(categoryGroups).map(([cat, criteria]) => {
                      const earned = (criteria as BidCriteria[]).reduce((s, c) => s + c.score, 0);
                      const max = (criteria as BidCriteria[]).reduce((s, c) => s + c.weight, 0);
                      const pct = max > 0 ? Math.round((earned / max) * 100) : 0;
                      const barColor = pct >= 80 ? '#047857' : pct >= 50 ? '#D97706' : '#B91C1C';
                      return (
                        <div key={cat} className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-[12px] font-bold text-[#0B2545] uppercase">{cat}</span>
                            <span className="font-mono text-[12px] text-[#44474E]">{earned}/{max}</span>
                          </div>
                          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Criteria Summary */}
                  <div className="gov-card p-4">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-3">Criteria Status Summary</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'VERIFIED', count: bid.criteria.filter(c => c.status === 'VERIFIED').length, color: 'text-[#047857]', bg: 'bg-[#ECFDF5]' },
                        { label: 'FAILED', count: bid.criteria.filter(c => c.status === 'FAILED').length, color: 'text-[#B91C1C]', bg: 'bg-[#FEF2F2]' },
                        { label: 'FLAGGED', count: bid.criteria.filter(c => c.status === 'FLAGGED').length, color: 'text-[#D97706]', bg: 'bg-[#FFFBEB]' },
                        { label: 'PENDING', count: bid.criteria.filter(c => c.status === 'PENDING').length, color: 'text-[#44474E]', bg: 'bg-[#F8FAFC]' },
                      ].map(s => (
                        <div key={s.label} className={`${s.bg} rounded p-3 text-center`}>
                          <div className={`font-serif text-[28px] font-bold ${s.color}`}>{s.count}</div>
                          <div className={`font-mono text-[11px] font-bold uppercase ${s.color}`}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Officer Decision Panel */}
                  <div className="gov-card p-4 md:col-span-2">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">gavel</span>
                      Officer Decision — Final Qualification Authority
                    </div>
                    {submitted ? (
                      <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded p-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#047857] text-[32px]">check_circle</span>
                        <div>
                          <div className="font-semibold text-[#065F46]">Decision recorded and committed to immutable audit ledger</div>
                          <div className="font-mono text-[12px] text-[#44474E] mt-0.5">SHA-256 hash committed at {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })} IST</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {errorMsg && (
                          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded p-2 text-[#B91C1C] text-sm">
                            {errorMsg}
                          </div>
                        )}
                        <div className="grid grid-cols-3 gap-2">
                          {(['QUALIFY', 'DISQUALIFY', 'FLAG'] as const).map(d => (
                            <button
                              key={d}
                              onClick={() => setDecision(d)}
                              className={`py-2.5 rounded font-mono text-[12px] font-bold uppercase tracking-wider border-2 transition-all ${
                                decision === d
                                  ? d === 'QUALIFY' ? 'bg-[#047857] text-white border-[#047857]'
                                  : d === 'DISQUALIFY' ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                                  : 'bg-[#D97706] text-white border-[#D97706]'
                                  : 'bg-white text-[#44474E] border-[#E2E8F0] hover:border-[#0B2545]'
                              }`}
                            >
                              {d === 'QUALIFY' ? '✓ Qualify' : d === 'DISQUALIFY' ? '✗ Disqualify' : '⚑ Flag for Review'}
                            </button>
                          ))}
                        </div>
                        <textarea
                          value={notes}
                          onChange={e => setNotes(e.target.value)}
                          rows={2}
                          placeholder="Officer remarks (mandatory for disqualification and flagging)..."
                          className="w-full text-[13px] border border-[#E2E8F0] rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0B2545] resize-none"
                        />
                        <button
                          onClick={handleDecision}
                          disabled={!decision || submitting}
                          className={`btn-primary self-end flex items-center gap-2 ${!decision ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {submitting ? <><span className="material-symbols-outlined text-[16px] animate-spin">sync</span> Committing...</> : <><span className="material-symbols-outlined text-[16px]">lock</span> Commit to Ledger</>}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: Criteria */}
              {activeTab === 'criteria' && (
                <div className="flex flex-col gap-3">
                  {Object.entries(categoryGroups).map(([cat, criteria]) => (
                    <div key={cat}>
                      <div className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#44474E] mb-2 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#0B2545]" />
                        {cat} CRITERIA
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(criteria as BidCriteria[]).map(c => (
                          <VerifyCard key={c.id} {...c} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: API Evidence */}
              {activeTab === 'evidence' && (
                <div className="gov-card p-5">
                  <SectionHeader title="Government API Verification Evidence" icon="hub">
                    <button onClick={runApiVerification} disabled={apiLoading} className="btn-primary flex items-center gap-2 text-[13px]">
                      {apiLoading
                        ? <><span className="material-symbols-outlined text-[16px] animate-spin">sync</span> Running APIs...</>
                        : <><span className="material-symbols-outlined text-[16px]">play_arrow</span> Run API Verification</>
                      }
                    </button>
                  </SectionHeader>
                  {Object.keys(apiResults).length === 0 && !apiLoading && (
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-8 text-center">
                      <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">hub</span>
                      <p className="font-mono text-[12px] font-bold uppercase text-[#44474E] mt-2">Click "Run API Verification" to trigger sandbox government portal checks</p>
                    </div>
                  )}
                  {apiLoading && (
                    <div className="flex flex-col gap-2">
                      {['GSTN', 'PAN', 'UDYAM', 'MCA21'].map(api => (
                        <div key={api} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#D97706] text-[20px] animate-spin">sync</span>
                          <span className="font-mono text-[12px] font-bold text-[#44474E]">Querying {api} sandbox...</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {Object.entries(apiResults).map(([api, result]) => (
                    <div key={api} className={`rounded p-3 mb-2 border flex items-start gap-3 ${result.status === 'VERIFIED' || result.status === 'ACTIVE' || result.status === 'VALID' ? 'bg-[#ECFDF5] border-[#A7F3D0]' : 'bg-[#FEF2F2] border-[#FECACA]'}`}>
                      <span className={`material-symbols-outlined text-[20px] ${result.status === 'VERIFIED' || result.status === 'ACTIVE' || result.status === 'VALID' ? 'text-[#047857]' : 'text-[#B91C1C]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {result.status === 'VERIFIED' || result.status === 'ACTIVE' || result.status === 'VALID' ? 'check_circle' : 'cancel'}
                      </span>
                      <div>
                        <div className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#0B2545]">{api} Sandbox Response</div>
                        <div className="font-mono text-[13px] text-[#0D1C2F] mt-0.5">{result.detail}</div>
                        <div className="font-mono text-[10px] text-[#44474E] mt-0.5 break-all">Timestamp: {result.timestamp} • Hash: sha256:{result.evidenceHash}</div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8">
                    <SectionHeader title="AI Document Extraction" icon="document_scanner">
                      <button onClick={handleAiExtract} disabled={aiLoading} className="btn-secondary flex items-center gap-2 text-[13px]">
                        {aiLoading ? <><span className="material-symbols-outlined text-[16px] animate-spin">sync</span> Processing PDF...</> : <><span className="material-symbols-outlined text-[16px]">smart_toy</span> Process PDF with AI</>}
                      </button>
                    </SectionHeader>
                    {aiResult ? (
                      <div className="bg-[#EFF4FF] border border-[#B1C7F0] rounded p-4 mt-4">
                        <div className="font-bold text-[#0B2545] mb-2 flex justify-between">
                          <span>Extraction Complete</span>
                          <span className="text-[#047857]">Confidence: {Math.round(aiResult.confidence * 100)}%</span>
                        </div>
                        <pre className="text-xs bg-white p-2 rounded border">{JSON.stringify(aiResult.extracted_data, null, 2)}</pre>
                        <div className="mt-2 text-xs font-mono text-[#44474E]">
                          <strong>Citations:</strong>
                          {aiResult.citations.map((c: any, i: number) => (
                            <div key={i}>Page {c.page}: "{c.text}"</div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-4 text-center mt-4">
                        <p className="font-mono text-[12px] text-[#44474E]">Click "Process PDF with AI" to simulate LLM extraction.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="gov-card p-8 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">search_off</span>
              <p className="text-[#44474E] mt-2">Select a bid from the left panel to begin verification</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
