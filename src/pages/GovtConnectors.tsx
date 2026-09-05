import React, { useEffect, useState } from 'react';
import { sandboxApi } from '../services/sandboxApi';
import type { GovtConnector } from '../data/mockData';
import { SectionHeader, Skeleton } from '../components/ui';

const statusDot = (s: GovtConnector['status']) => {
  if (s === 'ONLINE') return <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />;
  if (s === 'DEGRADED') return <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />;
  return <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />;
};

const statusLabel = (s: GovtConnector['status']) => ({
  ONLINE: <span className="pill-verified">{statusDot(s)} ONLINE</span>,
  DEGRADED: <span className="pill-flagged">{statusDot(s)} DEGRADED</span>,
  DOWN: <span className="pill-disqualified">{statusDot(s)} DOWN</span>,
}[s]);

const eventColor = (s: 'OK' | 'WARN' | 'ERR') => ({
  OK: 'text-[#047857]', WARN: 'text-[#D97706]', ERR: 'text-[#B91C1C]',
}[s]);

export const GovtConnectors: React.FC = () => {
  const [connectors, setConnectors] = useState<GovtConnector[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GovtConnector | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadConnectors = async () => {
    const data = await sandboxApi.getConnectors();
    setConnectors(data);
    if (!selected) setSelected(data[0]);
  };

  useEffect(() => {
    sandboxApi.getConnectors().then(data => {
      setConnectors(data);
      setSelected(data[0]);
      setLoading(false);
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadConnectors();
    setRefreshing(false);
  };

  const onlineCount = connectors.filter(c => c.status === 'ONLINE').length;
  const degradedCount = connectors.filter(c => c.status === 'DEGRADED').length;
  const downCount = connectors.filter(c => c.status === 'DOWN').length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="gov-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm">PORTAL INTEGRATION GATEWAY</span>
            </div>
            <h1 className="font-serif text-[28px] font-bold text-[#0B2545]">Government API Connectors</h1>
            <p className="text-[13px] text-[#44474E] mt-1">Real-time status monitoring of all 9 sovereign government data sources • Sandbox environment</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="btn-outline flex items-center gap-2 shrink-0">
            <span className={`material-symbols-outlined text-[16px] ${refreshing ? 'animate-spin' : ''}`}>sync</span>
            {refreshing ? 'Refreshing...' : 'Refresh Status'}
          </button>
        </div>
        {/* Summary pills */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-[#ECFDF5] border border-[#A7F3D0] rounded px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[12px] font-bold text-[#065F46]">{onlineCount} ONLINE</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFBEB] border border-[#FDE68A] rounded px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="font-mono text-[12px] font-bold text-[#92400E]">{degradedCount} DEGRADED</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FEF2F2] border border-[#FECACA] rounded px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="font-mono text-[12px] font-bold text-[#991B1B]">{downCount} DOWN</span>
          </div>
          <div className="ml-auto font-mono text-[11px] text-[#44474E]">Last Sync: {new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })} IST</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Connector Grid */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#44474E] mb-1">All Connectors ({connectors.length})</div>
          {loading ? (
            [...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 rounded-lg" />)
          ) : (
            connectors.map(connector => (
              <button
                key={connector.id}
                onClick={() => setSelected(connector)}
                className={`gov-card p-3 text-left transition-all hover:shadow-modal ${selected?.id === connector.id ? 'border-l-4 border-l-[#D97706] bg-[#FFFDF5]' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[22px] text-[#0B2545] shrink-0">{connector.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#0D1C2F] leading-tight truncate">{connector.name}</div>
                      <div className="text-[11px] text-[#44474E]">{connector.nameHindi}</div>
                    </div>
                  </div>
                  <div className="shrink-0">{statusLabel(connector.status)}</div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#44474E]">
                  <span>{connector.responseTimeMs > 0 ? `${connector.responseTimeMs}ms` : 'N/A'}</span>
                  <span>{connector.uptime}% uptime</span>
                  <span>{connector.verificationsToday} checks today</span>
                </div>
                {/* Response time bar */}
                <div className="mt-1.5 w-full bg-[#E2E8F0] h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: connector.status === 'DOWN' ? '0%' : `${Math.min(100, (connector.responseTimeMs / 2000) * 100)}%`,
                      backgroundColor: connector.responseTimeMs < 500 ? '#10B981' : connector.responseTimeMs < 1000 ? '#F59E0B' : '#EF4444',
                    }}
                  />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-8">
          {selected ? (
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="gov-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#EFF4FF] border border-[#B1C7F0] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px] text-[#0B2545]">{selected.icon}</span>
                    </div>
                    <div>
                      <h2 className="font-serif text-[20px] font-bold text-[#0B2545]">{selected.name}</h2>
                      <div className="font-mono text-[11px] text-[#44474E]">{selected.nameHindi}</div>
                    </div>
                  </div>
                  {statusLabel(selected.status)}
                </div>
                <p className="text-[13px] text-[#44474E] mt-3">{selected.description}</p>
                <div className="font-mono text-[12px] text-[#44474E] mt-2">
                  Endpoint: <span className="text-[#0B2545] font-medium">{selected.endpoint}</span>
                </div>

                {/* Stats Grid */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Response Time', value: selected.responseTimeMs > 0 ? `${selected.responseTimeMs}ms` : 'N/A', color: selected.responseTimeMs < 500 ? 'text-[#047857]' : selected.responseTimeMs < 1000 ? 'text-[#D97706]' : 'text-[#B91C1C]' },
                    { label: 'Uptime (30d)', value: `${selected.uptime}%`, color: selected.uptime > 97 ? 'text-[#047857]' : selected.uptime > 90 ? 'text-[#D97706]' : 'text-[#B91C1C]' },
                    { label: 'Checks Today', value: selected.verificationsToday.toString(), color: 'text-[#0B2545]' },
                    { label: 'Success Rate', value: `${selected.successRate}%`, color: selected.successRate > 95 ? 'text-[#047857]' : 'text-[#D97706]' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">{s.label}</div>
                      <div className={`font-serif text-[22px] font-bold tabnum mt-0.5 ${s.color}`}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Events */}
              <div className="gov-card overflow-hidden">
                <div className="bg-[#0B2545] px-4 py-2.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">Recent API Events (Live Feed)</span>
                </div>
                <div className="divide-y divide-[#E2E8F0]">
                  {selected.recentEvents.map((ev, i) => (
                    <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-[#F8FAFC]">
                      <span className={`material-symbols-outlined text-[18px] shrink-0 ${eventColor(ev.status)}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {ev.status === 'OK' ? 'check_circle' : ev.status === 'WARN' ? 'warning' : 'error'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#44474E]">{ev.time} IST</span>
                          <span className="font-mono text-[11px] font-semibold text-[#0B2545]">{ev.action}</span>
                        </div>
                        <div className="text-[13px] text-[#0D1C2F] mt-0.5">{ev.result}</div>
                      </div>
                      <span className={`font-mono text-[11px] font-bold uppercase ${eventColor(ev.status)}`}>{ev.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retry Queue status */}
              {selected.status !== 'ONLINE' && (
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded p-4 flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#D97706] text-[24px] shrink-0">info</span>
                  <div>
                    <div className="font-mono text-[12px] font-bold uppercase text-[#92400E]">Async Retry Queue Active</div>
                    <p className="text-[13px] text-[#92400E] mt-0.5">
                      {selected.status === 'DOWN'
                        ? 'Portal is unreachable. All verification requests are queued for retry with exponential backoff. Cached results from last successful sync will be used where available.'
                        : 'Portal response is degraded. Requests are retrying with backoff. Partial results may be cached.'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="gov-card p-8 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">hub</span>
              <p className="text-[#44474E] mt-2">Select a connector to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
