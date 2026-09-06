import React, { useState } from 'react';
import type {
  GSTNRecord, UdyamRecord, MCA21Record, PANRecord,
  EPFORecord, ESICRecord, NSICRecord, DigiLockerRecord, StartupIndiaRecord,
} from '../data/govtDatabases';
import {
  gstnDatabase, udyamDatabase, mca21Database, panDatabase,
  epfoDatabase, esicDatabase, nsicDatabase, digiLockerDatabase, startupIndiaDatabase,
} from '../data/govtDatabases';

// ── Portal definitions ────────────────────────────────────────
const portals = [
  { id: 'GC001', name: 'GSTN (via GSP)', nameHindi: 'वस्तु एवं सेवा कर नेटवर्क', icon: 'receipt_long', color: '#0B2545', count: gstnDatabase.length },
  { id: 'GC002', name: 'Udyam Registration', nameHindi: 'उद्यम पंजीकरण पोर्टल', icon: 'storefront', color: '#047857', count: udyamDatabase.length },
  { id: 'GC003', name: 'MCA21 (V3)', nameHindi: 'कॉर्पोरेट कार्य मंत्रालय', icon: 'corporate_fare', color: '#1D4ED8', count: mca21Database.length },
  { id: 'GC004', name: 'PAN Verification (NSDL)', nameHindi: 'पैन सत्यापन — एनएसडीएल', icon: 'badge', color: '#7C3AED', count: panDatabase.length },
  { id: 'GC005', name: 'EPFO Compliance', nameHindi: 'कर्मचारी भविष्य निधि संगठन', icon: 'people', color: '#B45309', count: epfoDatabase.length },
  { id: 'GC006', name: 'ESIC Portal', nameHindi: 'कर्मचारी राज्य बीमा निगम', icon: 'health_and_safety', color: '#0891B2', count: esicDatabase.length },
  { id: 'GC007', name: 'NSIC Verification', nameHindi: 'राष्ट्रीय लघु उद्योग निगम', icon: 'domain_verification', color: '#9D174D', count: nsicDatabase.length },
  { id: 'GC008', name: 'DigiLocker (NIC)', nameHindi: 'डिजिलॉकर — एनआईसी', icon: 'folder_shared', color: '#065F46', count: digiLockerDatabase.length },
  { id: 'GC009', name: 'Startup India (DPIIT)', nameHindi: 'स्टार्टअप इंडिया — डीपीआईआईटी', icon: 'rocket_launch', color: '#B91C1C', count: startupIndiaDatabase.length },
];

// ── Status pill helpers ───────────────────────────────────────
const StatusPill: React.FC<{ value: string }> = ({ value }) => {
  const v = value?.toUpperCase();
  let cls = 'font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ';
  if (['ACTIVE', 'VALID', 'COMPLIANT', 'RECOGNISED', 'FETCHED', 'SIGNED'].includes(v))
    cls += 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]';
  else if (['SUSPENDED', 'DEGRADED', 'DEFAULTER', 'INOPERATIVE', 'UNDER_PROCESS', 'EXPIRED', 'UNSIGNED'].includes(v))
    cls += 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]';
  else if (['CANCELLED', 'DOWN', 'DISQUALIFIED', 'DELETED', 'REJECTED', 'FAILED', 'REVOKED'].includes(v))
    cls += 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]';
  else
    cls += 'bg-[#F1F5F9] text-[#44474E] border border-[#E2E8F0]';
  return <span className={cls}>{value}</span>;
};

const FieldRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-start gap-2 py-1.5 border-b border-[#F1F5F9] last:border-0">
    <div className="w-44 shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-[#44474E] pt-0.5">{label}</div>
    <div className="text-[13px] text-[#0D1C2F] font-medium flex-1 min-w-0">{value}</div>
  </div>
);

// ── Portal record detail panels ───────────────────────────────
const GSTNDetail: React.FC<{ record: GSTNRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="GSTIN" value={<span className="font-mono">{r.gstin}</span>} />
    <FieldRow label="Legal Name" value={r.legalName} />
    <FieldRow label="Trade Name" value={r.tradeName} />
    <FieldRow label="State" value={`${r.state} (Code: ${r.stateCode})`} />
    <FieldRow label="Reg. Type" value={r.registrationType} />
    <FieldRow label="Constitution" value={r.constitutionOfBusiness} />
    <FieldRow label="Reg. Date" value={r.registrationDate} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Last Return" value={r.lastReturnFiled} />
    <FieldRow label="Returns Filed" value={r.returnsFiled} />
    <FieldRow label="Pending Returns" value={r.pendingReturns === 0 ? <span className="text-[#047857]">NIL</span> : <span className="text-[#B91C1C]">{r.pendingReturns}</span>} />
    <FieldRow label="Annual Turnover" value={r.annualTurnover} />
    <FieldRow label="e-Invoice" value={<StatusPill value={r.eInvoiceEnabled ? 'ENABLED' : 'DISABLED'} />} />
    <FieldRow label="PAN" value={<span className="font-mono">{r.pan}</span>} />
    <FieldRow label="Address" value={r.principalAddress} />
    <FieldRow label="Fetched At" value={<span className="font-mono text-[11px] text-[#44474E]">{r.fetchedAt}</span>} />
  </div>
);

const UdyamDetail: React.FC<{ record: UdyamRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="Udyam No." value={<span className="font-mono">{r.udyamNo}</span>} />
    <FieldRow label="Enterprise" value={r.enterpriseName} />
    <FieldRow label="Type" value={<StatusPill value={r.type} />} />
    <FieldRow label="Activity" value={r.majorActivity} />
    <FieldRow label="Social Category" value={r.socialCategory} />
    <FieldRow label="Reg. Date" value={r.dateOfRegistration} />
    <FieldRow label="State / District" value={`${r.district}, ${r.state}`} />
    <FieldRow label="NIC Code" value={r.nic2Digit} />
    <FieldRow label="Investment" value={r.investmentInPlant} />
    <FieldRow label="Annual Turnover" value={r.annualTurnover} />
    <FieldRow label="Employees (M / F)" value={`${r.employeesMale} Male / ${r.employeesFemale} Female`} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Valid Till" value={r.validTill} />
    <FieldRow label="Bank" value={`${r.bankName} (${r.ifsc})`} />
  </div>
);

const MCA21Detail: React.FC<{ record: MCA21Record }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="CIN" value={<span className="font-mono">{r.cin}</span>} />
    <FieldRow label="Company Name" value={r.companyName} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Category" value={r.category} />
    <FieldRow label="Class" value={r.companyClass} />
    <FieldRow label="Incorporation" value={r.dateOfIncorporation} />
    <FieldRow label="State / RoC" value={`${r.registeredState} — ${r.roc}`} />
    <FieldRow label="Auth. Capital" value={r.authorisedCapital} />
    <FieldRow label="Paid-up Capital" value={r.paidUpCapital} />
    <FieldRow label="Listed Status" value={<StatusPill value={r.listedStatus} />} />
    <FieldRow label="Annual Return" value={r.lastAnnualReturn} />
    <FieldRow label="Balance Sheet" value={r.lastBalanceSheet} />
    <FieldRow label="Directors" value={
      <div className="flex flex-col gap-1">
        {r.directors.map(d => (
          <div key={d.din} className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#44474E]">{d.din}</span>
            <span>{d.name}</span>
            <span className="text-[#44474E] text-[11px]">— {d.designation}</span>
            <StatusPill value={d.din_status} />
          </div>
        ))}
      </div>
    } />
    <FieldRow label="Charges" value={
      r.charges.length === 0
        ? <span className="text-[#047857] font-mono text-[11px]">NIL</span>
        : <div className="flex flex-col gap-1">
          {r.charges.map(c => (
            <div key={c.chargeId} className="text-[12px]">
              <span className="font-mono text-[#44474E]">{c.chargeId}</span> — {c.chargeHolder} — {c.amount} <StatusPill value={c.status} />
            </div>
          ))}
        </div>
    } />
  </div>
);

const PANDetail: React.FC<{ record: PANRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="PAN" value={<span className="font-mono">{r.pan}</span>} />
    <FieldRow label="Entity Name" value={r.entityName} />
    <FieldRow label="Entity Type" value={<StatusPill value={r.entityType} />} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Aadhar Linked" value={<StatusPill value={r.aadharLinked ? 'YES' : 'NO'} />} />
    <FieldRow label="Date of Birth/Inc." value={r.dateOfBirth} />
    <FieldRow label="AO Jurisdiction" value={r.jurisdictionAO} />
    <FieldRow label="ITR Filed" value={<StatusPill value={r.itrFiled ? 'YES' : 'NO'} />} />
    <FieldRow label="Last ITR AY" value={r.lastItrAY} />
    <FieldRow label="ITR Form" value={r.itrForm} />
    <FieldRow label="Income Declared" value={r.totalIncomeDeclared} />
    <FieldRow label="Tax Paid" value={r.taxPaid} />
    <FieldRow label="TDS Deducted" value={r.tdsDeducted} />
    <FieldRow label="Verified At" value={<span className="font-mono text-[11px]">{r.verifiedAt}</span>} />
  </div>
);

const EPFODetail: React.FC<{ record: EPFORecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="EPF Reg. No." value={<span className="font-mono">{r.epfRegNo}</span>} />
    <FieldRow label="Establishment" value={r.establishmentName} />
    <FieldRow label="Owner" value={r.ownerName} />
    <FieldRow label="State / District" value={`${r.district}, ${r.state}`} />
    <FieldRow label="Industry" value={r.industry} />
    <FieldRow label="Coverage Date" value={r.dateOfCoverage} />
    <FieldRow label="Members" value={`${r.memberCount} (Pension: ${r.pensionMembers})`} />
    <FieldRow label="Compliance" value={<StatusPill value={r.complianceStatus} />} />
    <FieldRow label="Last ECR Month" value={r.lastECRMonth} />
    <FieldRow label="Arrears" value={r.arrears === 'NIL' ? <span className="text-[#047857] font-mono text-[11px]">NIL</span> : <span className="text-[#B91C1C]">{r.arrears}</span>} />
    <FieldRow label="Wages Declared" value={r.wagesDeclaration} />
    <FieldRow label="Last Contribution" value={r.lastContributionDate} />
    <FieldRow label="Total Contrib. FY" value={r.totalContributionFY} />
  </div>
);

const ESICDetail: React.FC<{ record: ESICRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="ESIC Code" value={<span className="font-mono">{r.esicCode}</span>} />
    <FieldRow label="Establishment" value={r.establishmentName} />
    <FieldRow label="Category" value={r.category} />
    <FieldRow label="State / Region" value={`${r.region}, ${r.state}`} />
    <FieldRow label="Reg. Date" value={r.dateOfRegistration} />
    <FieldRow label="Insured Persons" value={r.insuredPersons} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Last Period" value={r.lastContributionPeriod} />
    <FieldRow label="Total Contribution" value={r.totalContribution} />
    <FieldRow label="Arrears" value={r.arrears === 'NIL' ? <span className="text-[#047857] font-mono text-[11px]">NIL</span> : <span className="text-[#B91C1C]">{r.arrears}</span>} />
    <FieldRow label="Last Inspection" value={r.inspectionDate} />
    <FieldRow label="Bid Eligibility" value={<StatusPill value={r.eligibilityForBid ? 'ELIGIBLE' : 'INELIGIBLE'} />} />
  </div>
);

const NSICDetail: React.FC<{ record: NSICRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="Registration No." value={<span className="font-mono">{r.registrationNo}</span>} />
    <FieldRow label="Firm Name" value={r.firmName} />
    <FieldRow label="State" value={r.state} />
    <FieldRow label="MSME Type" value={<StatusPill value={r.msmeType} />} />
    <FieldRow label="Items Registered" value={
      r.itemsRegistered.length > 0
        ? <div className="flex flex-wrap gap-1">{r.itemsRegistered.map(i => <span key={i} className="bg-[#EFF4FF] text-[#1D4ED8] text-[11px] font-mono px-2 py-0.5 rounded border border-[#BFDBFE]">{i}</span>)}</div>
        : <span className="text-[#44474E] italic">Not Registered</span>
    } />
    <FieldRow label="Monetary Limit" value={r.monetaryLimit} />
    <FieldRow label="Performance Rating" value={<StatusPill value={r.performanceRating} />} />
    <FieldRow label="Credit Rating" value={<StatusPill value={r.creditRating} />} />
    <FieldRow label="Valid Up To" value={r.validUpTo} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Renewal Due" value={r.renewalDue} />
  </div>
);

const DigiLockerDetail: React.FC<{ record: DigiLockerRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="DigiLocker ID" value={<span className="font-mono">{r.digiLockerId}</span>} />
    <FieldRow label="Linked Entity" value={r.linkedEntity} />
    <FieldRow label="PAN" value={<span className="font-mono">{r.pan}</span>} />
    <FieldRow label="Consent" value={<StatusPill value={r.consentGiven ? 'GIVEN' : 'PENDING'} />} />
    <FieldRow label="Last Fetched" value={<span className="font-mono text-[11px]">{r.lastFetchedAt}</span>} />
    <FieldRow label="Documents" value={
      <div className="flex flex-col gap-2 mt-1">
        {r.documents.map(d => (
          <div key={d.docId} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[12px] font-semibold text-[#0D1C2F]">{d.docType}</div>
                <div className="font-mono text-[10px] text-[#44474E] mt-0.5">Issuer: {d.issuer}</div>
                <div className="font-mono text-[10px] text-[#44474E]">Issued: {d.issuedOn} • Valid: {d.validTill}</div>
                <div className="font-mono text-[10px] text-[#6B7280] mt-0.5 truncate">{d.sha256}</div>
              </div>
              <div className="flex flex-col gap-1 items-end shrink-0">
                <StatusPill value={d.pullStatus} />
                <StatusPill value={d.eSignStatus} />
              </div>
            </div>
          </div>
        ))}
      </div>
    } />
  </div>
);

const StartupDetail: React.FC<{ record: StartupIndiaRecord }> = ({ record: r }) => (
  <div className="space-y-0">
    <FieldRow label="DPIIT No." value={<span className="font-mono">{r.dpiitNo}</span>} />
    <FieldRow label="Startup Name" value={r.startupName} />
    <FieldRow label="Incorporation" value={r.incorporationDate} />
    <FieldRow label="Sector" value={r.sector} />
    <FieldRow label="Sub-Sector" value={r.subSector} />
    <FieldRow label="Recognition Date" value={r.recognitionDate} />
    <FieldRow label="Valid Till" value={r.recognitionValidTill} />
    <FieldRow label="Status" value={<StatusPill value={r.status} />} />
    <FieldRow label="Stage" value={<StatusPill value={r.stage} />} />
    <FieldRow label="State" value={r.state} />
    <FieldRow label="Founders" value={r.founders.join(', ')} />
    <FieldRow label="Funding" value={r.fundingReceived} />
    <FieldRow label="Incubator" value={r.incubatorName ?? 'None'} />
    <FieldRow label="IIT Related" value={<StatusPill value={r.iitRelated ? 'YES' : 'NO'} />} />
    <FieldRow label="EMD Exemption" value={<StatusPill value={r.emdExemption ? 'EXEMPT' : 'NOT EXEMPT'} />} />
    <FieldRow label="Tender Fee Exemp." value={<StatusPill value={r.tenderFeeExemption ? 'EXEMPT' : 'NOT EXEMPT'} />} />
  </div>
);

// ── Main Page ─────────────────────────────────────────────────
export const SandboxDatabase: React.FC = () => {
  const [activePortal, setActivePortal] = useState(portals[0].id);
  const [activeIdx, setActiveIdx] = useState(0);
  const [search, setSearch] = useState('');

  const portal = portals.find(p => p.id === activePortal)!;

  // Get records for selected portal
  const getRecords = () => {
    switch (activePortal) {
      case 'GC001': return gstnDatabase as unknown as Record<string, unknown>[];
      case 'GC002': return udyamDatabase as unknown as Record<string, unknown>[];
      case 'GC003': return mca21Database as unknown as Record<string, unknown>[];
      case 'GC004': return panDatabase as unknown as Record<string, unknown>[];
      case 'GC005': return epfoDatabase as unknown as Record<string, unknown>[];
      case 'GC006': return esicDatabase as unknown as Record<string, unknown>[];
      case 'GC007': return nsicDatabase as unknown as Record<string, unknown>[];
      case 'GC008': return digiLockerDatabase as unknown as Record<string, unknown>[];
      case 'GC009': return startupIndiaDatabase as unknown as Record<string, unknown>[];
      default: return [];
    }
  };

  const getRecordTitle = (rec: Record<string, unknown>) => {
    return (rec.legalName ?? rec.companyName ?? rec.enterpriseName ?? rec.firmName ?? rec.establishmentName ?? rec.startupName ?? rec.linkedEntity ?? rec.entityName ?? '') as string;
  };

  const getRecordSubtitle = (rec: Record<string, unknown>) => {
    switch (activePortal) {
      case 'GC001': return (rec.gstin ?? '') as string;
      case 'GC002': return (rec.udyamNo ?? '') as string;
      case 'GC003': return (rec.cin ?? '') as string;
      case 'GC004': return (rec.pan ?? '') as string;
      case 'GC005': return (rec.epfRegNo ?? '') as string;
      case 'GC006': return (rec.esicCode ?? '') as string;
      case 'GC007': return (rec.registrationNo ?? '') as string;
      case 'GC008': return (rec.digiLockerId ?? '') as string;
      case 'GC009': return (rec.dpiitNo ?? '') as string;
      default: return (rec.gstin ?? rec.udyamNo ?? rec.cin ?? rec.pan ?? rec.epfRegNo ?? rec.esicCode ?? rec.registrationNo ?? rec.digiLockerId ?? rec.dpiitNo ?? '') as string;
    }
  };

  const allRecords = getRecords();
  const filtered = allRecords.filter(r => {
    const q = search.toLowerCase();
    return !q || getRecordTitle(r).toLowerCase().includes(q) || getRecordSubtitle(r).toLowerCase().includes(q);
  });

  const currentRecord = filtered[activeIdx];

  const handlePortalChange = (id: string) => {
    setActivePortal(id);
    setActiveIdx(0);
    setSearch('');
  };

  const renderDetail = () => {
    if (!currentRecord) return null;
    switch (activePortal) {
      case 'GC001': return <GSTNDetail record={currentRecord as unknown as GSTNRecord} />;
      case 'GC002': return <UdyamDetail record={currentRecord as unknown as UdyamRecord} />;
      case 'GC003': return <MCA21Detail record={currentRecord as unknown as MCA21Record} />;
      case 'GC004': return <PANDetail record={currentRecord as unknown as PANRecord} />;
      case 'GC005': return <EPFODetail record={currentRecord as unknown as EPFORecord} />;
      case 'GC006': return <ESICDetail record={currentRecord as unknown as ESICRecord} />;
      case 'GC007': return <NSICDetail record={currentRecord as unknown as NSICRecord} />;
      case 'GC008': return <DigiLockerDetail record={currentRecord as unknown as DigiLockerRecord} />;
      case 'GC009': return <StartupDetail record={currentRecord as unknown as StartupIndiaRecord} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="gov-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#0B2545] text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm">SANDBOX DATA EXPLORER</span>
              <span className="bg-[#ECFDF5] text-[#065F46] font-mono text-[11px] font-bold px-2 py-0.5 rounded-sm border border-[#A7F3D0]">READ-ONLY</span>
            </div>
            <h1 className="font-serif text-[28px] font-bold text-[#0B2545]">Government Portal Demo Databases</h1>
            <p className="text-[13px] text-[#44474E] mt-1">
              Simulated sandbox records for all 9 sovereign data sources — GSTN, Udyam, MCA21, PAN/NSDL, EPFO, ESIC, NSIC, DigiLocker, Startup India
            </p>
          </div>
          <div className="shrink-0 bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 text-right">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#44474E]">Total Sandbox Records</div>
            <div className="font-serif text-[28px] font-bold text-[#0B2545] tabnum">
              {portals.reduce((s, p) => s + p.count, 0)}
            </div>
          </div>
        </div>

        {/* Portal tab strip */}
        <div className="mt-4 flex flex-wrap gap-2">
          {portals.map(p => (
            <button
              key={p.id}
              onClick={() => handlePortalChange(p.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-mono text-[11px] font-bold transition-all ${
                activePortal === p.id
                  ? 'bg-[#0B2545] text-white border-[#0B2545] shadow'
                  : 'bg-white text-[#44474E] border-[#E2E8F0] hover:border-[#0B2545] hover:text-[#0B2545]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">{p.icon}</span>
              {p.name}
              <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${activePortal === p.id ? 'bg-white/20' : 'bg-[#F1F5F9]'}`}>{p.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Record List */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Portal info banner */}
          <div className="gov-card p-3 flex items-center gap-3" style={{ borderLeft: `4px solid ${portal.color}` }}>
            <span className="material-symbols-outlined text-[28px]" style={{ color: portal.color }}>{portal.icon}</span>
            <div>
              <div className="text-[14px] font-bold text-[#0D1C2F]">{portal.name}</div>
              <div className="font-mono text-[11px] text-[#44474E]">{portals.find(p => p.id === activePortal)?.nameHindi}</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#94A3B8]">search</span>
            <input
              type="text"
              placeholder="Search entity name or ID…"
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveIdx(0); }}
              className="w-full pl-9 pr-3 py-2 text-[13px] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
            />
          </div>

          {/* Record cards */}
          <div className="flex flex-col gap-2">
            {filtered.length === 0 ? (
              <div className="gov-card p-6 text-center text-[#44474E] text-[13px]">No records match your search</div>
            ) : filtered.map((rec, i) => {
              const title = getRecordTitle(rec);
              const subtitle = getRecordSubtitle(rec);
              const status = (rec.status as string) ?? '';
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`gov-card p-3 text-left transition-all hover:shadow-modal ${activeIdx === i ? 'border-l-4 bg-[#F8FAFC]' : 'border-l-4 border-l-transparent'}`}
                  style={activeIdx === i ? { borderLeftColor: portal.color } : {}}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#0D1C2F] leading-snug truncate">{title}</div>
                      <div className="font-mono text-[11px] text-[#44474E] truncate mt-0.5">{subtitle}</div>
                    </div>
                    {status && <StatusPill value={status} />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[11px] text-[#44474E] text-center">
            {filtered.length} of {allRecords.length} records • Sandbox Mode
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-8">
          {currentRecord ? (
            <div className="gov-card overflow-hidden">
              {/* Detail Header */}
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4" style={{ background: `${portal.color}10` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${portal.color}20`, border: `1px solid ${portal.color}40` }}>
                    <span className="material-symbols-outlined text-[22px]" style={{ color: portal.color }}>{portal.icon}</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-[#0D1C2F]">{getRecordTitle(currentRecord)}</div>
                    <div className="font-mono text-[11px] text-[#44474E]">{getRecordSubtitle(currentRecord)}</div>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#44474E] text-right shrink-0">
                  <div className="font-bold uppercase">{portal.name}</div>
                  <div>Record {activeIdx + 1} of {filtered.length}</div>
                </div>
              </div>

              {/* Detail Body */}
              <div className="p-5 overflow-y-auto max-h-[70vh]">
                {renderDetail()}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#44474E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  SANDBOX — Simulated Data Only
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                    disabled={activeIdx === 0}
                    className="btn-outline text-[12px] px-2 py-1 disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveIdx(Math.min(filtered.length - 1, activeIdx + 1))}
                    disabled={activeIdx === filtered.length - 1}
                    className="btn-outline text-[12px] px-2 py-1 disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gov-card p-12 text-center">
              <span className="material-symbols-outlined text-[48px] text-[#C4C6CF]">database</span>
              <p className="text-[#44474E] mt-2">Select a record to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
