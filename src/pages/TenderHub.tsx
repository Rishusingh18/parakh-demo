import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sandboxApi } from '../services/sandboxApi';
import type { Tender } from '../data/mockData';
import { StatCard, TableSkeleton, SectionHeader } from '../components/ui';

const statusBadge = (s: Tender['status']) => {
  const m = { OPEN: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]', EVALUATION: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]', AWARDED: 'bg-[#EFF4FF] text-[#0B2545] border border-[#B1C7F0]', CANCELLED: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]' };
  return <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${m[s]}`}>{s}</span>;
};

export const TenderHub: React.FC = () => {
  const navigate = useNavigate();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof sandboxApi.getDashboardStats>> | null>(null);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([sandboxApi.getTenders(), sandboxApi.getDashboardStats()]).then(([t, s]) => {
      setTenders(t);
      setStats(s);
      setLoading(false);
    });
  }, []);

  const filtered = tenders.filter(t => {
    const matchStatus = filter === 'ALL' || t.status === filter;
    const matchSearch = !search || t.refNo.toLowerCase().includes(search.toLowerCase()) || t.title.toLowerCase().includes(search.toLowerCase()) || t.ministry.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="gov-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>

            <h1 className="font-serif text-[28px] font-bold text-[#0B2545] leading-tight">Tender & Bid Submissions Hub</h1>
            <p className="text-[13px] text-[#44474E] mt-1">Centralized procurement evaluation workspace — Automated AI-powered bid compliance verification</p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-right shrink-0">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">Session Active Since</div>
            <div className="font-mono text-[14px] font-bold text-[#0B2545]">09:00:00 IST, 23 MAY 2025</div>
          </div>
        </div>
        {/* Tricolor divider */}
        <div className="mt-4 flex gap-1 h-0.5">
          <div className="flex-1 bg-[#FF9933]" /><div className="flex-1 bg-[#E2E8F0]" /><div className="flex-1 bg-[#138808]" />
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-lg" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Bids Ingested" value={stats?.totalBids ?? 0} icon="folder_open" sub="100% Cryptographic Decryption Complete" />
          <StatCard label="Deterministically Passed" value={stats?.passed ?? 0} icon="task_alt" color="text-[#047857]" sub="Portal Connector Checks Complete" />
          <StatCard label="Disqualified / Deficient" value={stats?.disqualified ?? 0} icon="cancel" color="text-[#B91C1C]" sub="Statutory or Turnover Non-Compliance" />
          <StatCard label="Pending Adjudication" value={stats?.pending ?? 0} icon="hourglass_top" color="text-[#D97706]" sub="Under Committee Scrutiny" />
        </div>
      )}

      {/* Tender Table */}
      <div>
        <SectionHeader title="Active Tenders" hindi="सक्रिय निविदाएं" icon="gavel" badge={`${filtered.length} RECORDS`}>
          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#74777F] text-[16px]">search</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tenders..."
                className="pl-8 pr-3 py-1.5 text-[13px] bg-white border border-[#E2E8F0] rounded focus:outline-none focus:ring-1 focus:ring-[#0B2545] w-48"
              />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="text-[13px] bg-white border border-[#E2E8F0] rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="EVALUATION">Evaluation</option>
              <option value="AWARDED">Awarded</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </SectionHeader>

        {loading ? <TableSkeleton rows={4} cols={6} /> : (
          <div className="gov-card overflow-hidden">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Bid Reference No.</th>
                  <th>Tender Title</th>
                  <th>Ministry / Authority</th>
                  <th className="text-right">Est. Value</th>
                  <th>Bid Closing</th>
                  <th>Bids</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(tender => (
                  <tr key={tender.id} onClick={() => navigate(`/verify?tender=${tender.id}`)} className="cursor-pointer">
                    <td>
                      <span className="font-mono text-[12px] font-medium text-[#0B2545]">{tender.refNo}</span>
                    </td>
                    <td>
                      <div className="max-w-[220px]">
                        <div className="text-[13px] font-semibold text-[#0D1C2F] leading-tight line-clamp-2">{tender.title}</div>
                        <div className="font-mono text-[10px] text-[#44474E] mt-0.5 uppercase">{tender.gfrRule}</div>
                      </div>
                    </td>
                    <td>
                      <div className="text-[12px] text-[#44474E] max-w-[160px] line-clamp-2">{tender.ministry}</div>
                    </td>
                    <td className="text-right">
                      <div className="font-mono text-[13px] font-semibold text-[#0B2545] tabnum whitespace-nowrap">{tender.estimatedValue}</div>
                    </td>
                    <td>
                      <div className="font-mono text-[12px] text-[#44474E] whitespace-nowrap">{tender.bidClosing}</div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0.5 font-mono text-[11px]">
                        <span className="text-[#047857]">✓ {tender.passed}</span>
                        <span className="text-[#B91C1C]">✗ {tender.disqualified}</span>
                        <span className="text-[#D97706]">⏱ {tender.pending}</span>
                      </div>
                    </td>
                    <td>{statusBadge(tender.status)}</td>
                    <td>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/verify?tender=${tender.id}`); }}
                        className="btn-primary text-[12px] px-3 py-1 whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">fact_check</span>
                          Evaluate
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="gov-card p-4 border-l-4 border-l-[#047857]">
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-1">Platform Accuracy</div>
          <div className="font-serif text-[24px] font-bold text-[#047857]">90%+</div>
          <div className="text-[12px] text-[#44474E]">Compliance check accuracy — SRS target achieved</div>
        </div>
        <div className="gov-card p-4 border-l-4 border-l-[#D97706]">
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-1">Time Saved</div>
          <div className="font-serif text-[24px] font-bold text-[#D97706]">60%</div>
          <div className="text-[12px] text-[#44474E]">Reduction in manual verification workload</div>
        </div>
        <div className="gov-card p-4 border-l-4 border-l-[#0B2545]">
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-1">Audit Coverage</div>
          <div className="font-serif text-[24px] font-bold text-[#0B2545]">100%</div>
          <div className="text-[12px] text-[#44474E]">Immutable SHA-256 audit trail for all decisions</div>
        </div>
      </div>
    </div>
  );
};
