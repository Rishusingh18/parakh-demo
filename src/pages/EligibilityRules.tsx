import React, { useEffect, useState } from 'react';
import { sandboxApi } from '../services/sandboxApi';
import type { EligibilityRule } from '../data/mockData';
import { SectionHeader, ProgressBar, Skeleton } from '../components/ui';

const categoryColor = (cat: EligibilityRule['category']) => ({
  FINANCIAL: 'bg-[#EFF4FF] text-[#0B2545] border border-[#B1C7F0]',
  TECHNICAL: 'bg-[#F0FDF4] text-[#065F46] border border-[#A7F3D0]',
  STATUTORY: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
  EXPERIENCE: 'bg-[#FFF7ED] text-[#9A3412] border border-[#FDBA74]',
}[cat]);

const totalWeight = 100;

export const EligibilityRules: React.FC = () => {
  const [rules, setRules] = useState<EligibilityRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EligibilityRule | null>(null);
  const [filter, setFilter] = useState<string>('ALL');
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    sandboxApi.getRules().then(r => {
      setRules(r);
      setSelected(r[0]);
      setLoading(false);
    });
  }, []);

  const handleToggle = async (rule: EligibilityRule) => {
    if (rule.mandatory) return; // Can't toggle mandatory rules
    setToggling(rule.id);
    await sandboxApi.toggleRule(rule.id, !rule.active);
    setRules(prev => prev.map(r => r.id === rule.id ? { ...r, active: !r.active } : r));
    setToggling(null);
  };

  const filtered = rules.filter(r => filter === 'ALL' || r.category === filter);
  const activeWeight = rules.filter(r => r.active).reduce((s, r) => s + r.weight, 0);

  const weightByCategory = Object.fromEntries(
    (['FINANCIAL', 'TECHNICAL', 'STATUTORY', 'EXPERIENCE'] as const).map(cat => [
      cat,
      rules.filter(r => r.category === cat && r.active).reduce((s, r) => s + r.weight, 0)
    ])
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="gov-card p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm">RULE ENGINE DSL v2.4</span>
              <span className="bg-[#ECFDF5] text-[#065F46] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#A7F3D0]">DETERMINISTIC</span>
            </div>
            <h1 className="font-serif text-[28px] font-bold text-[#0B2545]">Eligibility & Evaluation Rules</h1>
            <p className="text-[13px] text-[#44474E] mt-1">Weighted scoring formula — Configurable JSON DSL rule engine • GFR 2017 aligned</p>
          </div>
          <div className="ml-auto bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 shrink-0">
            <div className="font-mono text-[11px] font-bold uppercase text-[#44474E] mb-1">Active Weight Sum</div>
            <div className={`font-serif text-[28px] font-bold ${activeWeight === totalWeight ? 'text-[#047857]' : 'text-[#D97706]'}`}>{activeWeight} / {totalWeight}</div>
            {activeWeight !== totalWeight && (
              <div className="font-mono text-[11px] text-[#D97706] mt-0.5">⚠ Weight mismatch — adjust rules</div>
            )}
          </div>
        </div>

        {/* Weight Distribution */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.entries(weightByCategory) as [string, number][]).map(([cat, w]) => (
            <div key={cat} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E] mb-1">{cat}</div>
              <div className="font-serif text-[22px] font-bold text-[#0B2545]">{w}%</div>
              <ProgressBar value={w} max={60} color={w > 25 ? '#0B2545' : '#D97706'} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Rules List */}
        <div className="lg:col-span-5">
          <SectionHeader title="Rule Registry" icon="rule" badge={`${filtered.length} RULES`}>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="text-[12px] bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
            >
              <option value="ALL">All Categories</option>
              <option value="FINANCIAL">Financial</option>
              <option value="TECHNICAL">Technical</option>
              <option value="STATUTORY">Statutory</option>
              <option value="EXPERIENCE">Experience</option>
            </select>
          </SectionHeader>

          {loading ? (
            [...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg mb-2" />)
          ) : (
            <div className="flex flex-col gap-2">
              {filtered.map(rule => (
                <div
                  key={rule.id}
                  onClick={() => setSelected(rule)}
                  className={`gov-card p-4 cursor-pointer transition-all hover:shadow-modal ${selected?.id === rule.id ? 'border-l-4 border-l-[#D97706]' : 'border-l-4 border-l-transparent'} ${!rule.active ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${categoryColor(rule.category)}`}>{rule.category}</span>
                        {rule.mandatory && <span className="font-mono text-[10px] font-bold text-[#B91C1C] uppercase">MANDATORY</span>}
                        <span className="font-mono text-[10px] text-[#44474E]">Clause {rule.clause}</span>
                      </div>
                      <div className="text-[14px] font-semibold text-[#0D1C2F] leading-tight">{rule.name}</div>
                      <div className="text-[12px] text-[#44474E] mt-0.5">Threshold: <strong className="text-[#0B2545]">{rule.threshold}</strong> • Weight: <strong className="text-[#0B2545]">{rule.weight}%</strong></div>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={e => { e.stopPropagation(); handleToggle(rule); }}
                      disabled={rule.mandatory || toggling === rule.id}
                      title={rule.mandatory ? 'Mandatory rule — cannot be disabled' : undefined}
                      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${rule.active ? 'bg-[#047857]' : 'bg-[#E2E8F0]'} ${rule.mandatory ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${rule.active ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rule Detail */}
        <div className="lg:col-span-7">
          {selected ? (
            <div className="flex flex-col gap-4">
              <div className="gov-card p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm ${categoryColor(selected.category)}`}>{selected.category}</span>
                      <span className="font-mono text-[11px] text-[#44474E]">GFR Clause {selected.clause}</span>
                      {selected.mandatory && <span className="bg-[#FEF2F2] text-[#B91C1C] font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-[#FECACA]">MANDATORY</span>}
                    </div>
                    <h2 className="font-serif text-[22px] font-bold text-[#0B2545]">{selected.name}</h2>
                    <p className="text-[13px] text-[#44474E] mt-1">{selected.description}</p>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 text-center shrink-0">
                    <div className="font-mono text-[10px] font-bold uppercase text-[#44474E]">Weight</div>
                    <div className="font-serif text-[28px] font-bold text-[#0B2545]">{selected.weight}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Threshold', value: selected.threshold },
                    { label: 'Data Source', value: selected.mandatory ? 'Gov API' : 'Manual' },
                    { label: 'Condition', value: selected.condition, mono: true },
                    { label: 'Status', value: selected.active ? 'ACTIVE' : 'INACTIVE' },
                  ].map(f => (
                    <div key={f.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">{f.label}</div>
                      <div className={`text-[14px] font-semibold text-[#0D1C2F] mt-0.5 ${f.mono ? 'font-mono text-[12px]' : ''}`}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>



              {/* Application Note */}
              <div className="bg-[#EFF4FF] border border-[#B1C7F0] rounded p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0B2545] text-[20px] shrink-0">info</span>
                <div>
                  <div className="font-mono text-[12px] font-bold uppercase text-[#0B2545]">Rule Engine Note</div>
                  <p className="text-[13px] text-[#44474E] mt-0.5">
                    This rule is evaluated deterministically for every bid. The condition is checked against verified government API data ({selected.mandatory ? 'mandatory API-sourced' : 'document-submitted'}) before the weighted score is applied. Mandatory rules trigger automatic disqualification on failure.
                  </p>
                </div>
              </div>


            </div>
          ) : (
            <div className="gov-card p-8 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">rule</span>
              <p className="text-[#44474E] mt-2">Select a rule to view its DSL definition</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
