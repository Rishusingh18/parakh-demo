import React, { useEffect, useState } from 'react';
import { sandboxApi } from '../services/sandboxApi';
import type { AuditEntry } from '../data/mockData';
import { SectionHeader, Skeleton } from '../components/ui';

const outcomeColor = (o: AuditEntry['outcome']) => ({
  SUCCESS: 'text-[#047857]', WARNING: 'text-[#D97706]', CRITICAL: 'text-[#B91C1C]',
}[o]);

const outcomeIcon = (o: AuditEntry['outcome']) => ({
  SUCCESS: 'check_circle', WARNING: 'warning', CRITICAL: 'report_problem',
}[o]);

const actionLabel = (action: string) => {
  const map: Record<string, string> = {
    SYSTEM_DISQUALIFY: 'Auto Disqualify',
    API_VERIFY_GSTN: 'GSTN API Check',
    SCORE_COMPUTED: 'Score Computed',
    OFFICER_QUALIFY: 'Officer Qualified',
    FLAGGED_REVIEW: 'Flagged for Review',
    REQUEST_CLARIFICATION: 'Clarification Requested',
    API_VERIFY_PAN: 'PAN API Check',
    API_VERIFY_MCA21: 'MCA21 API Check',
  };
  return map[action] ?? action;
};

export const AuditLog: React.FC = () => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<AuditEntry | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    sandboxApi.getAuditLog().then(e => {
      setEntries(e);
      setSelected(e[0]);
      setLoading(false);
    });
  }, []);

  const filtered = entries.filter(e => {
    const matchOutcome = filter === 'ALL' || e.outcome === filter;
    const matchSearch = !search || e.bidNo.toLowerCase().includes(search.toLowerCase()) || e.vendorName.toLowerCase().includes(search.toLowerCase()) || e.officerName.toLowerCase().includes(search.toLowerCase());
    return matchOutcome && matchSearch;
  });

  const handleExport = async () => {
    setExporting(true);
    await new Promise(r => setTimeout(r, 1200));
    // Simulate CSV download
    const csv = ['ID,Timestamp,Bid No,Vendor,Officer,Action,Outcome', ...filtered.map(e => `${e.id},${e.timestamp},${e.bidNo},${e.vendorName},${e.officerName},${e.action},${e.outcome}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'parakh_audit_log.csv'; a.click();
    setExporting(false);
  };

  const successCount = entries.filter(e => e.outcome === 'SUCCESS').length;
  const warnCount = entries.filter(e => e.outcome === 'WARNING').length;
  const criticalCount = entries.filter(e => e.outcome === 'CRITICAL').length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="gov-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm">IMMUTABLE LEDGER</span>
              <span className="bg-[#ECFDF5] text-[#065F46] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#A7F3D0]">APPEND-ONLY</span>
            </div>
            <h1 className="font-serif text-[28px] font-bold text-[#0B2545]">Audit & Vigilance Trail</h1>
            <p className="text-[13px] text-[#44474E] mt-1">Complete immutable SHA-256 verified audit record — Every decision, API call, and officer action</p>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={handleExport} disabled={exporting} className="btn-outline flex items-center gap-2 text-[13px]">
              <span className={`material-symbols-outlined text-[16px] ${exporting ? 'animate-spin' : ''}`}>{exporting ? 'sync' : 'download'}</span>
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button className="btn-outline flex items-center gap-2 text-[13px]">
              <span className="material-symbols-outlined text-[16px]">print</span>
              Print PDF/A-1
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3">
            <div className="font-mono text-[10px] font-bold uppercase text-[#44474E]">Total Events</div>
            <div className="font-serif text-[22px] font-bold text-[#0B2545]">{entries.length}</div>
          </div>
          <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded p-3">
            <div className="font-mono text-[10px] font-bold uppercase text-[#065F46]">Success</div>
            <div className="font-serif text-[22px] font-bold text-[#047857]">{successCount}</div>
          </div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded p-3">
            <div className="font-mono text-[10px] font-bold uppercase text-[#92400E]">Warning</div>
            <div className="font-serif text-[22px] font-bold text-[#D97706]">{warnCount}</div>
          </div>
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded p-3">
            <div className="font-mono text-[10px] font-bold uppercase text-[#991B1B]">Critical</div>
            <div className="font-serif text-[22px] font-bold text-[#B91C1C]">{criticalCount}</div>
          </div>
          <div className="bg-[#EFF4FF] border border-[#B1C7F0] rounded p-3">
            <div className="font-mono text-[10px] font-bold uppercase text-[#0B2545]">Auditability</div>
            <div className="font-serif text-[22px] font-bold text-[#0B2545]">100%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Log List */}
        <div className="lg:col-span-7">
          <SectionHeader title="Event Log" icon="policy" badge={`${filtered.length} ENTRIES`}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#74777F] text-[15px]">search</span>
                <input
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search bid, vendor..." className="pl-7 pr-3 py-1.5 text-[13px] bg-white border border-[#E2E8F0] rounded focus:outline-none focus:ring-1 focus:ring-[#0B2545] w-40"
                />
              </div>
              <select
                value={filter} onChange={e => setFilter(e.target.value)}
                className="text-[13px] bg-white border border-[#E2E8F0] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
              >
                <option value="ALL">All Events</option>
                <option value="SUCCESS">Success</option>
                <option value="WARNING">Warning</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </SectionHeader>

          {loading ? (
            <TableSkeleton />
          ) : (
            <div className="gov-card overflow-hidden">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Bid / Vendor</th>
                    <th>Officer</th>
                    <th>Action</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(entry => (
                    <tr
                      key={entry.id}
                      onClick={() => setSelected(entry)}
                      className={`cursor-pointer ${selected?.id === entry.id ? 'bg-[#EFF4FF]' : ''}`}
                    >
                      <td>
                        <div className="font-mono text-[11px] text-[#44474E] whitespace-nowrap">
                          {new Date(entry.timestamp).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })}
                        </div>
                        <div className="font-mono text-[10px] text-[#74777F]">
                          {new Date(entry.timestamp).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </div>
                      </td>
                      <td>
                        <div className="font-mono text-[11px] font-semibold text-[#0B2545]">{entry.bidNo}</div>
                        <div className="text-[12px] text-[#44474E] max-w-[120px] truncate">{entry.vendorName}</div>
                      </td>
                      <td>
                        <div className="text-[12px] text-[#0D1C2F] truncate max-w-[120px]">{entry.officerName === 'PARAKH AI Engine' ? '🤖 AI Engine' : entry.officerName}</div>
                        <div className="font-mono text-[10px] text-[#44474E]">{entry.officerId}</div>
                      </td>
                      <td>
                        <span className="font-mono text-[11px] font-bold text-[#0B2545]">{actionLabel(entry.action)}</span>
                      </td>
                      <td>
                        <span className={`material-symbols-outlined text-[18px] ${outcomeColor(entry.outcome)}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                          {outcomeIcon(entry.outcome)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-5">
          {selected ? (
            <div className="gov-card overflow-hidden sticky top-[108px]">
              <div className={`px-4 py-3 border-b border-[#E2E8F0] ${selected.outcome === 'SUCCESS' ? 'bg-[#ECFDF5]' : selected.outcome === 'WARNING' ? 'bg-[#FFFBEB]' : 'bg-[#FEF2F2]'}`}>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-[20px] ${outcomeColor(selected.outcome)}`} style={{ fontVariationSettings: "'FILL' 1" }}>{outcomeIcon(selected.outcome)}</span>
                  <div>
                    <div className={`font-mono text-[12px] font-bold uppercase ${outcomeColor(selected.outcome)}`}>{actionLabel(selected.action)}</div>
                    <div className="font-mono text-[11px] text-[#44474E]">{selected.id}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {[
                  { label: 'Timestamp', value: new Date(selected.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST' },
                  { label: 'Bid Reference', value: selected.bidNo, mono: true },
                  { label: 'Vendor', value: selected.vendorName },
                  { label: 'Officer', value: selected.officerName },
                  { label: 'Officer ID', value: selected.officerId, mono: true },
                  { label: 'IP Address', value: selected.ipAddress, mono: true },
                  { label: 'Risk Level', value: selected.riskLevel },
                ].map(f => (
                  <div key={f.label} className="border-b border-[#E2E8F0] pb-2 last:border-0">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">{f.label}</div>
                    <div className={`text-[13px] font-semibold text-[#0D1C2F] mt-0.5 ${(f as any).mono ? 'font-mono text-[12px]' : ''}`}>{f.value}</div>
                  </div>
                ))}
                <div className="border-b border-[#E2E8F0] pb-2">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">Detail</div>
                  <div className="text-[13px] text-[#0D1C2F] mt-0.5 leading-relaxed">{selected.detail}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E] mb-1">Evidence Hash (SHA-256)</div>
                  <div className="bg-[#001026] rounded px-3 py-2 font-mono text-[11px] text-[#7bd8b1] break-all">{selected.evidenceHash}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="gov-card p-8 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">policy</span>
              <p className="text-[#44474E] mt-2">Select an event to view full details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Missing import helper
const TableSkeleton: React.FC = () => (
  <div className="gov-card overflow-hidden">
    <div className="bg-[#0B2545] h-10 w-full" />
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className={`flex gap-4 p-3 border-b border-[#E2E8F0] ${i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
        {Array.from({ length: 5 }).map((_, j) => (
          <div key={j} className={`skeleton h-4 ${j === 0 ? 'w-20' : j === 4 ? 'w-8' : 'flex-1'}`} />
        ))}
      </div>
    ))}
  </div>
);
