import React from 'react';
import type { VerifyStatus, BidStatus, RiskLevel, ApiStatus } from '../../data/mockData';


// ── Status Pills ─────────────────────────────────────────────
interface StatusPillProps { status: VerifyStatus | BidStatus | ApiStatus | string; size?: 'sm' | 'md'; }

const statusMap: Record<string, { cls: string; label: string; dot?: string }> = {
  VERIFIED:       { cls: 'pill-verified', label: 'VERIFIED',       dot: 'bg-[#10B981]' },
  PASSED:         { cls: 'pill-verified', label: 'PASSED',         dot: 'bg-[#10B981]' },
  ONLINE:         { cls: 'pill-verified', label: 'ONLINE',         dot: 'bg-[#10B981]' },
  FAILED:         { cls: 'pill-disqualified', label: 'FAILED',     dot: 'bg-[#EF4444]' },
  DISQUALIFIED:   { cls: 'pill-disqualified', label: 'DISQUALIFIED', dot: 'bg-[#EF4444]' },
  DOWN:           { cls: 'pill-disqualified', label: 'DOWN',       dot: 'bg-[#EF4444]' },
  FLAGGED:        { cls: 'pill-flagged', label: 'FLAGGED',         dot: 'bg-[#F59E0B] animate-pulse' },
  PENDING:        { cls: 'pill-pending', label: 'PENDING',         dot: 'bg-[#F59E0B] animate-pulse' },
  UNDER_REVIEW:   { cls: 'pill-pending', label: 'UNDER REVIEW',    dot: 'bg-[#F59E0B] animate-pulse' },
  DEGRADED:       { cls: 'pill-flagged', label: 'DEGRADED',        dot: 'bg-[#F59E0B] animate-pulse' },
  NOT_CHECKED:    { cls: 'pill-processing', label: 'NOT CHECKED',  dot: 'bg-[#B1C7F0]' },
  PROCESSING:     { cls: 'pill-processing', label: 'PROCESSING',   dot: 'bg-[#B1C7F0] animate-pulse' },
};

export const StatusPill: React.FC<StatusPillProps> = ({ status, size = 'md' }) => {
  const cfg = statusMap[status] ?? { cls: 'pill-processing', label: status, dot: 'bg-gray-400' };
  return (
    <span className={`${cfg.cls} inline-flex items-center gap-1 ${size === 'sm' ? 'text-[10px] px-1.5 py-px' : ''}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ── Risk Badge ────────────────────────────────────────────────
export const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const map: Record<RiskLevel, string> = {
    LOW: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    MEDIUM: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
    HIGH: 'bg-[#FFF7ED] text-[#9A3412] border border-[#FDBA74]',
    CRITICAL: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]',
  };
  return (
    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${map[level]}`}>
      {level} RISK
    </span>
  );
};

// ── Score Gauge ───────────────────────────────────────────────
export const ScoreGauge: React.FC<{ score: number; size?: number }> = ({ score, size = 120 }) => {
  const r = (size / 2) - 12;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score));
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 80 ? '#047857' : pct >= 60 ? '#D97706' : '#B91C1C';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif font-bold text-[#0B2545]" style={{ fontSize: size * 0.22 }}>{score}</span>
        <span className="font-mono text-[10px] font-bold uppercase text-[#44474E] tracking-widest">Score</span>
      </div>
    </div>
  );
};

// ── Stat Card ─────────────────────────────────────────────────
interface StatCardProps { label: string; value: string | number; icon: string; color?: string; sub?: string; }
export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = 'text-[#0B2545]', sub }) => (
  <div className="gov-card p-4 flex flex-col justify-between gap-1">
    <div className="flex items-center justify-between text-[#44474E] mb-1">
      <span className="font-mono text-[11px] font-bold uppercase tracking-widest">{label}</span>
      <span className={`material-symbols-outlined text-[20px] ${color}`}>{icon}</span>
    </div>
    <div className={`font-serif text-[28px] font-bold leading-none tabnum ${color}`}>{value}</div>
    {sub && <div className="text-[12px] text-[#44474E] mt-1">{sub}</div>}
  </div>
);

// ── Loading Skeleton ──────────────────────────────────────────
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} />
);

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 5 }) => (
  <div className="gov-card overflow-hidden">
    <div className="bg-[#0B2545] h-10 w-full" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className={`flex gap-4 p-3 border-b border-[#E2E8F0] ${i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}`}>
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className={`h-4 ${j === 0 ? 'w-24' : j === cols - 1 ? 'w-16' : 'flex-1'}`} />
        ))}
      </div>
    ))}
  </div>
);

// ── Section Header ────────────────────────────────────────────
interface SectionHeaderProps { title: string; hindi?: string; icon?: string; badge?: string; children?: React.ReactNode; }
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, hindi, icon, badge, children }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      {icon && <span className="material-symbols-outlined text-[20px] text-[#0B2545]">{icon}</span>}
      <div>
        <h2 className="font-serif text-[22px] font-semibold text-[#0B2545] leading-tight">{title}</h2>
        {hindi && <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#44474E]">{hindi}</p>}
      </div>
      {badge && (
        <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm ml-2">{badge}</span>
      )}
    </div>
    {children && <div className="flex items-center gap-2">{children}</div>}
  </div>
);

// ── Progress Bar ──────────────────────────────────────────────
export const ProgressBar: React.FC<{ value: number; max?: number; color?: string; showLabel?: boolean }> = ({
  value, max = 100, color = '#047857', showLabel = false
}) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full">
      <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && <div className="text-[11px] font-mono text-[#44474E] mt-0.5 text-right">{pct}%</div>}
    </div>
  );
};

// ── Verification Card ─────────────────────────────────────────
interface VerifyCardProps {
  label: string; labelHindi: string; clauseRef: string; status: VerifyStatus;
  required: string; submitted: string; evidence: string; weight: number;
  score: number; apiSource: string; shortfall?: string;
}
export const VerifyCard: React.FC<VerifyCardProps> = ({
  label, labelHindi, clauseRef, status, required, submitted, evidence, weight, score, apiSource, shortfall
}) => {
  const borderMap: Record<VerifyStatus, string> = {
    VERIFIED: 'border-l-[#047857]', FAILED: 'border-l-[#B91C1C]',
    FLAGGED: 'border-l-[#D97706]', PENDING: 'border-l-[#B1C7F0]', NOT_CHECKED: 'border-l-[#C4C6CF]',
  };
  const bgMap: Record<VerifyStatus, string> = {
    VERIFIED: '', FAILED: 'bg-[#FEF9F9]', FLAGGED: 'bg-[#FFFDF5]', PENDING: '', NOT_CHECKED: '',
  };

  return (
    <div className={`gov-card border-l-4 ${borderMap[status]} ${bgMap[status]} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-start justify-between px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">
            Clause {clauseRef} • {apiSource}
          </div>
          <div className="font-semibold text-[14px] text-[#0B2545] mt-0.5">{label}</div>
          <div className="text-[11px] text-[#44474E]">{labelHindi}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusPill status={status} />
          <div className="font-mono text-[11px] text-[#44474E]">
            Wt: <strong className="text-[#0B2545]">{weight}%</strong> | Score: <strong className={score === 0 && status === 'FAILED' ? 'text-[#B91C1C]' : 'text-[#047857]'}>{score}</strong>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E] mb-0.5">Required</div>
          <div className="text-[13px] font-semibold text-[#0D1C2F]">{required}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E] mb-0.5">Submitted</div>
          <div className={`text-[13px] font-semibold ${status === 'FAILED' ? 'text-[#B91C1C]' : status === 'FLAGGED' ? 'text-[#D97706]' : 'text-[#0D1C2F]'}`}>{submitted}</div>
        </div>
        {shortfall && (
          <div className="col-span-2 bg-[#FEF2F2] border border-[#FECACA] rounded px-3 py-1.5">
            <span className="font-mono text-[11px] font-bold text-[#B91C1C] uppercase">Shortfall: </span>
            <span className="text-[12px] text-[#991B1B]">{shortfall}</span>
          </div>
        )}
        <div className="col-span-2">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E] mb-0.5">Evidence</div>
          <div className="text-[12px] text-[#44474E] italic">{evidence}</div>
        </div>
      </div>
    </div>
  );
};
