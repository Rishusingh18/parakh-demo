// ============================================================
// PARAKH — Mock Sandbox Data
// All data is simulated for the demo. No real API calls.
// ============================================================

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type BidStatus = 'PASSED' | 'DISQUALIFIED' | 'PENDING' | 'UNDER_REVIEW';
export type VerifyStatus = 'VERIFIED' | 'FAILED' | 'PENDING' | 'FLAGGED' | 'NOT_CHECKED';
export type ApiStatus = 'ONLINE' | 'DEGRADED' | 'DOWN';

export interface Tender {
  id: string;
  refNo: string;
  title: string;
  ministry: string;
  estimatedValue: string;
  estimatedValueNum: number;
  bidClosing: string;
  procurementMode: string;
  totalBids: number;
  passed: number;
  disqualified: number;
  pending: number;
  status: 'OPEN' | 'EVALUATION' | 'AWARDED' | 'CANCELLED';
  gfrRule: string;
  sha: string;
  msmExemption: boolean;
  category: string;
}

export interface BidCriteria {
  id: string;
  category: 'FINANCIAL' | 'TECHNICAL' | 'STATUTORY' | 'EXPERIENCE';
  label: string;
  labelHindi: string;
  required: string;
  submitted: string;
  status: VerifyStatus;
  evidence: string;
  weight: number;
  score: number;
  apiSource: string;
  clauseRef: string;
  shortfall?: string;
}

export interface Bid {
  id: string;
  bidNo: string;
  tenderId: string;
  vendorName: string;
  gstin: string;
  pan: string;
  udyamNo: string;
  mcaId: string;
  submittedAt: string;
  complianceScore: number;
  riskLevel: RiskLevel;
  status: BidStatus;
  criteria: BidCriteria[];
  officerNotes: string;
  disqualificationReason?: string;
  financialTurnover: string;
  netWorth: string;
  yearsFounded: number;
  isMsme: boolean;
  isStartup: boolean;
}

export interface GovtConnector {
  id: string;
  name: string;
  nameHindi: string;
  endpoint: string;
  status: ApiStatus;
  responseTimeMs: number;
  uptime: number;
  verificationsToday: number;
  lastChecked: string;
  description: string;
  icon: string;
  successRate: number;
  recentEvents: { time: string; action: string; result: string; status: 'OK' | 'WARN' | 'ERR' }[];
}

export interface EligibilityRule {
  id: string;
  name: string;
  category: 'FINANCIAL' | 'TECHNICAL' | 'STATUTORY' | 'EXPERIENCE';
  clause: string;
  description: string;
  condition: string;
  threshold: string;
  weight: number;
  active: boolean;
  mandatory: boolean;
  dslJson: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  bidId: string;
  bidNo: string;
  vendorName: string;
  officerId: string;
  officerName: string;
  action: string;
  detail: string;
  evidenceHash: string;
  ipAddress: string;
  riskLevel: RiskLevel;
  outcome: 'SUCCESS' | 'WARNING' | 'CRITICAL';
}

// ── Tenders ──────────────────────────────────────────────────
export const mockTenders: Tender[] = [
  {
    id: 'T001',
    refNo: 'GEM/2025/B/984210',
    title: 'Cloud Computing Infrastructure & Empanelled Tier-IV SOC Services',
    ministry: 'Ministry of Electronics & IT (MeitY)',
    estimatedValue: '₹18,50,00,000',
    estimatedValueNum: 185000000,
    bidClosing: '24 MAY 2025, 17:00 IST',
    procurementMode: 'QCBS (70:30 Merit Ratio)',
    totalBids: 184,
    passed: 126,
    disqualified: 38,
    pending: 20,
    status: 'EVALUATION',
    gfrRule: 'Rule 149 GFR 2017',
    sha: '9F8A...3D91',
    msmExemption: true,
    category: 'IT Infrastructure',
  },
  {
    id: 'T002',
    refNo: 'GEM/2025/B/876543',
    title: 'Supply of Medical Equipment — AIIMS Expansion Phase III',
    ministry: 'Ministry of Health & Family Welfare',
    estimatedValue: '₹42,75,00,000',
    estimatedValueNum: 427500000,
    bidClosing: '18 JUN 2025, 15:00 IST',
    procurementMode: 'L1 (Lowest Bidder)',
    totalBids: 67,
    passed: 41,
    disqualified: 19,
    pending: 7,
    status: 'EVALUATION',
    gfrRule: 'Rule 161 GFR 2017',
    sha: 'A3F1...9C22',
    msmExemption: true,
    category: 'Medical Equipment',
  },
  {
    id: 'T003',
    refNo: 'GEM/2025/B/651298',
    title: 'Surveillance Systems & AI-Based CCTV Analytics — Smart City Mission',
    ministry: 'Ministry of Housing & Urban Affairs',
    estimatedValue: '₹8,20,00,000',
    estimatedValueNum: 82000000,
    bidClosing: '02 APR 2025, 17:00 IST',
    procurementMode: 'QCBS (80:20 Merit Ratio)',
    totalBids: 312,
    passed: 198,
    disqualified: 89,
    pending: 25,
    status: 'OPEN',
    gfrRule: 'Rule 149 GFR 2017',
    sha: 'D9B2...8E4F',
    msmExemption: false,
    category: 'Security & Surveillance',
  },
  {
    id: 'T004',
    refNo: 'GEM/2025/B/543120',
    title: 'Railway Electrification — Zone 4 OHE Contract',
    ministry: 'Ministry of Railways',
    estimatedValue: '₹290,00,00,000',
    estimatedValueNum: 2900000000,
    bidClosing: '10 MAR 2025, 12:00 IST',
    procurementMode: 'Open Competitive Bidding',
    totalBids: 28,
    passed: 21,
    disqualified: 5,
    pending: 2,
    status: 'AWARDED',
    gfrRule: 'Rule 178 GFR 2017',
    sha: 'C7A4...2D80',
    msmExemption: false,
    category: 'Infrastructure',
  },
];

// ── Bids (for T001) ──────────────────────────────────────────
export const mockBids: Bid[] = [
  {
    id: 'B001',
    bidNo: 'GEM-BID-89410',
    tenderId: 'T001',
    vendorName: 'NexTech Infra Private Limited',
    gstin: '07AABCN1234A1Z5',
    pan: 'AABCN1234A',
    udyamNo: 'UDYAM-DL-06-0012345',
    mcaId: 'U72900DL2018PTC123456',
    submittedAt: '2025-05-20T09:41:00',
    complianceScore: 42,
    riskLevel: 'CRITICAL',
    status: 'DISQUALIFIED',
    financialTurnover: '₹3.82 Cr',
    netWorth: '₹2.10 Cr',
    yearsFounded: 2018,
    isMsme: true,
    isStartup: false,
    disqualificationReason: 'Financial Turnover Clause 3.1.b — Avg Annual Turnover ₹3.82 Cr vs. required ₹5.00 Cr (23.6% shortfall)',
    officerNotes: '',
    criteria: [
      { id: 'C001', category: 'FINANCIAL', label: 'Min. Average Annual Turnover', labelHindi: 'न्यूनतम औसत वार्षिक टर्नओवर', required: '₹5.00 Cr', submitted: '₹3.82 Cr', status: 'FAILED', evidence: 'Balance Sheet FY 2021-24 (Audited)', weight: 30, score: 0, apiSource: 'MCA21', clauseRef: '3.1.b', shortfall: '₹1.18 Cr (23.6%)' },
      { id: 'C002', category: 'FINANCIAL', label: 'Positive Net Worth', labelHindi: 'धनात्मक निवल मूल्य', required: 'Positive', submitted: '₹2.10 Cr', status: 'VERIFIED', evidence: 'CA Certificate Ref: CA/2024/082', weight: 10, score: 10, apiSource: 'MCA21', clauseRef: '3.1.c' },
      { id: 'C003', category: 'STATUTORY', label: 'GST Registration (Active)', labelHindi: 'जीएसटी पंजीकरण', required: 'Active', submitted: '07AABCN1234A1Z5', status: 'VERIFIED', evidence: 'GSTIN Sandbox: Status ACTIVE', weight: 15, score: 15, apiSource: 'GSTN', clauseRef: '2.3.a' },
      { id: 'C004', category: 'STATUTORY', label: 'PAN Verification', labelHindi: 'पैन सत्यापन', required: 'Valid & Active', submitted: 'AABCN1234A', status: 'VERIFIED', evidence: 'NSDL/Protean Sandbox: PAN Matched', weight: 10, score: 10, apiSource: 'PAN-NSDL', clauseRef: '2.3.b' },
      { id: 'C005', category: 'TECHNICAL', label: 'ISO 27001 Certification', labelHindi: 'आईएसओ 27001 प्रमाणन', required: 'Valid (≤3 Yrs)', submitted: 'ISO/IEC 27001:2022 — Exp 2026', status: 'VERIFIED', evidence: 'Self-declaration + cert scan', weight: 15, score: 15, apiSource: 'Manual', clauseRef: '4.2.a' },
      { id: 'C006', category: 'TECHNICAL', label: 'Datacenter Experience ≥5 Yrs', labelHindi: 'डेटासेंटर अनुभव', required: '≥5 Completed Projects', submitted: '3 Projects declared', status: 'FLAGGED', evidence: 'Insufficient supporting documents', weight: 10, score: 4, apiSource: 'Manual', clauseRef: '4.2.c', shortfall: '2 projects short' },
      { id: 'C007', category: 'EXPERIENCE', label: 'Similar Work Order', labelHindi: 'समान कार्य आदेश', required: '1 Order ≥₹5 Cr in 5 yrs', submitted: '₹4.1 Cr (2022)', status: 'FLAGGED', evidence: 'Work Order Copy submitted', weight: 10, score: 4, apiSource: 'Manual', clauseRef: '4.3.a', shortfall: '₹0.90 Cr below threshold' },
    ],
  },
  {
    id: 'B002',
    bidNo: 'GEM-BID-89411',
    tenderId: 'T001',
    vendorName: 'InfoSec Systems India Ltd.',
    gstin: '06AABCI9876B1Z3',
    pan: 'AABCI9876B',
    udyamNo: 'UDYAM-HR-02-0098765',
    mcaId: 'U72900HR2012PLC098765',
    submittedAt: '2025-05-19T14:22:00',
    complianceScore: 91,
    riskLevel: 'LOW',
    status: 'PASSED',
    financialTurnover: '₹28.40 Cr',
    netWorth: '₹18.90 Cr',
    yearsFounded: 2012,
    isMsme: false,
    isStartup: false,
    officerNotes: 'All criteria met. Recommended for L2 technical evaluation.',
    criteria: [
      { id: 'C101', category: 'FINANCIAL', label: 'Min. Average Annual Turnover', labelHindi: 'न्यूनतम औसत वार्षिक टर्नओवर', required: '₹5.00 Cr', submitted: '₹28.40 Cr', status: 'VERIFIED', evidence: 'Audited financials + MCA21 data', weight: 30, score: 30, apiSource: 'MCA21', clauseRef: '3.1.b' },
      { id: 'C102', category: 'FINANCIAL', label: 'Positive Net Worth', labelHindi: 'धनात्मक निवल मूल्य', required: 'Positive', submitted: '₹18.90 Cr', status: 'VERIFIED', evidence: 'CA Certificate verified', weight: 10, score: 10, apiSource: 'MCA21', clauseRef: '3.1.c' },
      { id: 'C103', category: 'STATUTORY', label: 'GST Registration (Active)', labelHindi: 'जीएसटी पंजीकरण', required: 'Active', submitted: '06AABCI9876B1Z3', status: 'VERIFIED', evidence: 'GSTIN Active — 9 Returns filed', weight: 15, score: 15, apiSource: 'GSTN', clauseRef: '2.3.a' },
      { id: 'C104', category: 'STATUTORY', label: 'PAN Verification', labelHindi: 'पैन सत्यापन', required: 'Valid & Active', submitted: 'AABCI9876B', status: 'VERIFIED', evidence: 'NSDL: PAN Active and entity matched', weight: 10, score: 10, apiSource: 'PAN-NSDL', clauseRef: '2.3.b' },
      { id: 'C105', category: 'TECHNICAL', label: 'ISO 27001 Certification', labelHindi: 'आईएसओ 27001 प्रमाणन', required: 'Valid (≤3 Yrs)', submitted: 'ISO 27001:2022 — Valid till 2027', status: 'VERIFIED', evidence: 'Scanned cert, serial validated', weight: 15, score: 15, apiSource: 'Manual', clauseRef: '4.2.a' },
      { id: 'C106', category: 'TECHNICAL', label: 'Datacenter Experience ≥5 Yrs', labelHindi: 'डेटासेंटर अनुभव', required: '≥5 Completed Projects', submitted: '8 Projects (FY2018–2024)', status: 'VERIFIED', evidence: 'Completion certs verified', weight: 10, score: 8, apiSource: 'Manual', clauseRef: '4.2.c' },
      { id: 'C107', category: 'EXPERIENCE', label: 'Similar Work Order', labelHindi: 'समान कार्य आदेश', required: '1 Order ≥₹5 Cr in 5 yrs', submitted: '₹15.2 Cr (BSNL, 2023)', status: 'VERIFIED', evidence: 'PO copy + completion cert', weight: 10, score: 10, apiSource: 'Manual', clauseRef: '4.3.a' },
    ],
  },
  {
    id: 'B003',
    bidNo: 'GEM-BID-89412',
    tenderId: 'T001',
    vendorName: 'Quantum DataVault Pvt Ltd',
    gstin: '27AABCQ5432C1Z7',
    pan: 'AABCQ5432C',
    udyamNo: 'UDYAM-MH-03-0055432',
    mcaId: 'U72900MH2019PTC055432',
    submittedAt: '2025-05-21T11:05:00',
    complianceScore: 67,
    riskLevel: 'MEDIUM',
    status: 'PENDING',
    financialTurnover: '₹7.60 Cr',
    netWorth: '₹4.20 Cr',
    yearsFounded: 2019,
    isMsme: true,
    isStartup: true,
    officerNotes: 'Pending clarification on datacenter project count.',
    criteria: [
      { id: 'C201', category: 'FINANCIAL', label: 'Min. Average Annual Turnover', labelHindi: 'न्यूनतम औसत वार्षिक टर्नओवर', required: '₹5.00 Cr', submitted: '₹7.60 Cr', status: 'VERIFIED', evidence: 'Audited balance sheet', weight: 30, score: 30, apiSource: 'MCA21', clauseRef: '3.1.b' },
      { id: 'C202', category: 'FINANCIAL', label: 'Positive Net Worth', labelHindi: 'धनात्मक निवल मूल्य', required: 'Positive', submitted: '₹4.20 Cr', status: 'VERIFIED', evidence: 'CA Certificate', weight: 10, score: 10, apiSource: 'MCA21', clauseRef: '3.1.c' },
      { id: 'C203', category: 'STATUTORY', label: 'GST Registration (Active)', labelHindi: 'जीएसटी पंजीकरण', required: 'Active', submitted: '27AABCQ5432C1Z7', status: 'VERIFIED', evidence: 'GSTN Sandbox: Active, 6 Returns', weight: 15, score: 15, apiSource: 'GSTN', clauseRef: '2.3.a' },
      { id: 'C204', category: 'STATUTORY', label: 'PAN Verification', labelHindi: 'पैन सत्यापन', required: 'Valid & Active', submitted: 'AABCQ5432C', status: 'VERIFIED', evidence: 'NSDL: Active', weight: 10, score: 10, apiSource: 'PAN-NSDL', clauseRef: '2.3.b' },
      { id: 'C205', category: 'TECHNICAL', label: 'ISO 27001 Certification', labelHindi: 'आईएसओ 27001 प्रमाणन', required: 'Valid (≤3 Yrs)', submitted: 'ISO 27001:2013 — Exp 2024', status: 'FLAGGED', evidence: 'Certificate expired 4 months ago', weight: 15, score: 0, apiSource: 'Manual', clauseRef: '4.2.a', shortfall: 'Cert expired — renewal pending' },
      { id: 'C206', category: 'TECHNICAL', label: 'Datacenter Experience ≥5 Yrs', labelHindi: 'डेटासेंटर अनुभव', required: '≥5 Completed Projects', submitted: '5 Projects claimed', status: 'PENDING', evidence: 'Pending document verification', weight: 10, score: 0, apiSource: 'Manual', clauseRef: '4.2.c' },
      { id: 'C207', category: 'EXPERIENCE', label: 'Similar Work Order', labelHindi: 'समान कार्य आदेश', required: '1 Order ≥₹5 Cr in 5 yrs', submitted: '₹6.8 Cr (BSNL, 2024)', status: 'VERIFIED', evidence: 'PO + Completion cert provided', weight: 10, score: 10, apiSource: 'Manual', clauseRef: '4.3.a' },
    ],
  },
  {
    id: 'B004',
    bidNo: 'GEM-BID-89413',
    tenderId: 'T001',
    vendorName: 'TechNation Solutions LLP',
    gstin: '09AABCT8801D1Z2',
    pan: 'AABCT8801D',
    udyamNo: 'UDYAM-UP-10-0078901',
    mcaId: 'U72900UP2015PTC078901',
    submittedAt: '2025-05-18T16:30:00',
    complianceScore: 88,
    riskLevel: 'LOW',
    status: 'PASSED',
    financialTurnover: '₹19.30 Cr',
    netWorth: '₹11.50 Cr',
    yearsFounded: 2015,
    isMsme: false,
    isStartup: false,
    officerNotes: 'Compliant across all criteria.',
    criteria: [
      { id: 'C301', category: 'FINANCIAL', label: 'Min. Average Annual Turnover', labelHindi: 'न्यूनतम औसत वार्षिक टर्नओवर', required: '₹5.00 Cr', submitted: '₹19.30 Cr', status: 'VERIFIED', evidence: 'MCA21 financial records', weight: 30, score: 30, apiSource: 'MCA21', clauseRef: '3.1.b' },
      { id: 'C302', category: 'FINANCIAL', label: 'Positive Net Worth', labelHindi: 'धनात्मक निवल मूल्य', required: 'Positive', submitted: '₹11.50 Cr', status: 'VERIFIED', evidence: 'CA Certificate', weight: 10, score: 10, apiSource: 'MCA21', clauseRef: '3.1.c' },
      { id: 'C303', category: 'STATUTORY', label: 'GST Registration (Active)', labelHindi: 'जीएसटी पंजीकरण', required: 'Active', submitted: '09AABCT8801D1Z2', status: 'VERIFIED', evidence: 'GSTN Active', weight: 15, score: 15, apiSource: 'GSTN', clauseRef: '2.3.a' },
      { id: 'C304', category: 'STATUTORY', label: 'PAN Verification', labelHindi: 'पैन सत्यापन', required: 'Valid & Active', submitted: 'AABCT8801D', status: 'VERIFIED', evidence: 'NSDL Verified', weight: 10, score: 10, apiSource: 'PAN-NSDL', clauseRef: '2.3.b' },
      { id: 'C305', category: 'TECHNICAL', label: 'ISO 27001 Certification', labelHindi: 'आईएसओ 27001 प्रमाणन', required: 'Valid (≤3 Yrs)', submitted: 'ISO 27001:2022 — Valid till 2028', status: 'VERIFIED', evidence: 'Validated via cert issuer', weight: 15, score: 12, apiSource: 'Manual', clauseRef: '4.2.a' },
      { id: 'C306', category: 'TECHNICAL', label: 'Datacenter Experience ≥5 Yrs', labelHindi: 'डेटासेंटर अनुभव', required: '≥5 Completed Projects', submitted: '6 Projects', status: 'VERIFIED', evidence: 'Completion certs provided', weight: 10, score: 9, apiSource: 'Manual', clauseRef: '4.2.c' },
      { id: 'C307', category: 'EXPERIENCE', label: 'Similar Work Order', labelHindi: 'समान कार्य आदेश', required: '1 Order ≥₹5 Cr in 5 yrs', submitted: '₹9.1 Cr (NIC, 2023)', status: 'VERIFIED', evidence: 'PO verified', weight: 10, score: 10, apiSource: 'Manual', clauseRef: '4.3.a' },
    ],
  },
];

// ── Govt API Connectors ──────────────────────────────────────
export const mockConnectors: GovtConnector[] = [
  {
    id: 'GC001', name: 'GSTN (via GSP)', nameHindi: 'वस्तु एवं सेवा कर नेटवर्क',
    endpoint: 'sandbox.gst.gov.in/api/verify', status: 'ONLINE', responseTimeMs: 284, uptime: 99.7,
    verificationsToday: 847, lastChecked: '01:04:30 IST', description: 'GST registration status, return filing history, e-invoice verification',
    icon: 'receipt_long', successRate: 98.2,
    recentEvents: [
      { time: '01:04:28', action: 'GSTIN Lookup', result: '07AABCN1234A1Z5 — ACTIVE', status: 'OK' },
      { time: '01:03:12', action: 'GSTIN Lookup', result: '06AABCI9876B1Z3 — ACTIVE', status: 'OK' },
      { time: '01:01:45', action: 'Return Check', result: '3 pending returns flagged', status: 'WARN' },
    ],
  },
  {
    id: 'GC002', name: 'Udyam Registration Portal', nameHindi: 'उद्यम पंजीकरण',
    endpoint: 'sandbox.udyamregistration.gov.in/api', status: 'ONLINE', responseTimeMs: 412, uptime: 98.9,
    verificationsToday: 312, lastChecked: '01:04:18 IST', description: 'MSME classification, Udyam certificate validity, enterprise classification',
    icon: 'storefront', successRate: 96.8,
    recentEvents: [
      { time: '01:04:10', action: 'Udyam Lookup', result: 'UDYAM-DL-06-0012345 — MICRO', status: 'OK' },
      { time: '01:02:33', action: 'Udyam Lookup', result: 'UDYAM-MH-03-0055432 — SMALL', status: 'OK' },
    ],
  },
  {
    id: 'GC003', name: 'MCA21 (V3)', nameHindi: 'कॉर्पोरेट कार्य मंत्रालय',
    endpoint: 'sandbox.mca.gov.in/mcav3/api', status: 'DEGRADED', responseTimeMs: 1842, uptime: 94.2,
    verificationsToday: 198, lastChecked: '01:03:55 IST', description: 'Company registration, DIN/director details, charge records, financial filings',
    icon: 'corporate_fare', successRate: 87.3,
    recentEvents: [
      { time: '01:03:51', action: 'Company Lookup', result: 'Timeout — retry queued', status: 'ERR' },
      { time: '01:02:10', action: 'Director Verification', result: 'DIN-00234891 — Active Director', status: 'OK' },
      { time: '01:00:44', action: 'Company Lookup', result: 'U72900DL2018PTC123456 — ACTIVE', status: 'WARN' },
    ],
  },
  {
    id: 'GC004', name: 'PAN Verification (NSDL)', nameHindi: 'पैन सत्यापन — एनएसडीएल',
    endpoint: 'sandbox.nsdl.com/tinpan/api/verify', status: 'ONLINE', responseTimeMs: 195, uptime: 99.9,
    verificationsToday: 623, lastChecked: '01:04:29 IST', description: 'PAN card validation, entity-type match, income tax filing status',
    icon: 'badge', successRate: 99.1,
    recentEvents: [
      { time: '01:04:25', action: 'PAN Lookup', result: 'AABCN1234A — COMPANY, Active', status: 'OK' },
      { time: '01:04:20', action: 'PAN Lookup', result: 'AABCI9876B — COMPANY, Active', status: 'OK' },
    ],
  },
  {
    id: 'GC005', name: 'EPFO Compliance Check', nameHindi: 'कर्मचारी भविष्य निधि संगठन',
    endpoint: 'sandbox.epfindia.gov.in/api/compliance', status: 'ONLINE', responseTimeMs: 538, uptime: 97.1,
    verificationsToday: 142, lastChecked: '01:04:05 IST', description: 'EPF registration status, monthly return filings, headcount declaration',
    icon: 'people', successRate: 94.5,
    recentEvents: [
      { time: '01:03:58', action: 'ECR Check', result: 'Compliance — May 2025 filed', status: 'OK' },
    ],
  },
  {
    id: 'GC006', name: 'ESIC Portal', nameHindi: 'कर्मचारी राज्य बीमा निगम',
    endpoint: 'sandbox.esic.nic.in/api', status: 'ONLINE', responseTimeMs: 421, uptime: 96.8,
    verificationsToday: 98, lastChecked: '01:03:48 IST', description: 'ESI registration, contribution history, insured person count',
    icon: 'health_and_safety', successRate: 93.7,
    recentEvents: [
      { time: '01:03:40', action: 'ESI Lookup', result: '10018343210001 — Registered, Active', status: 'OK' },
    ],
  },
  {
    id: 'GC007', name: 'NSIC Verification', nameHindi: 'राष्ट्रीय लघु उद्योग निगम',
    endpoint: 'sandbox.nsic.co.in/api/vendor', status: 'DOWN', responseTimeMs: 0, uptime: 82.3,
    verificationsToday: 0, lastChecked: '00:58:10 IST', description: 'NSIC single point registration, performance & credit rating certificates',
    icon: 'domain_verification', successRate: 71.2,
    recentEvents: [
      { time: '00:58:05', action: 'Health Check', result: 'Connection refused — portal maintenance', status: 'ERR' },
      { time: '00:45:00', action: 'NSIC Lookup', result: 'Timeout', status: 'ERR' },
    ],
  },
  {
    id: 'GC008', name: 'DigiLocker (NIC)', nameHindi: 'डिजिलॉकर — एनआईसी',
    endpoint: 'sandbox.digilocker.gov.in/api/pull', status: 'ONLINE', responseTimeMs: 671, uptime: 99.2,
    verificationsToday: 287, lastChecked: '01:04:22 IST', description: 'Digitally issued certificate fetch, Aadhar-linked doc pull, eSign verification',
    icon: 'folder_shared', successRate: 97.8,
    recentEvents: [
      { time: '01:04:18', action: 'Doc Pull', result: 'MSME Cert fetched for UDYAM-DL-06-0012345', status: 'OK' },
    ],
  },
  {
    id: 'GC009', name: 'Startup India (DPIIT)', nameHindi: 'स्टार्टअप इंडिया — डीपीआईआईटी',
    endpoint: 'sandbox.startupindia.gov.in/api/recognition', status: 'ONLINE', responseTimeMs: 348, uptime: 98.4,
    verificationsToday: 54, lastChecked: '01:04:15 IST', description: 'DPIIT recognition status, startup certificate validity, EMD exemption eligibility',
    icon: 'rocket_launch', successRate: 98.5,
    recentEvents: [
      { time: '01:04:12', action: 'Recognition Check', result: 'DIPP2019-MH-OCT-20890 — RECOGNIZED', status: 'OK' },
    ],
  },
];

// ── Eligibility Rules ─────────────────────────────────────────
export const mockRules: EligibilityRule[] = [
  {
    id: 'R001', name: 'Minimum Average Annual Turnover', category: 'FINANCIAL',
    clause: '3.1.b', description: 'Vendor must demonstrate minimum average annual financial turnover over last 3 financial years',
    condition: 'avg_annual_turnover >= threshold', threshold: '₹5.00 Cr', weight: 30, active: true, mandatory: true,
    dslJson: '{"rule":"avg_turnover","operator":"gte","value":50000000,"currency":"INR","years":3,"source":"MCA21","mandatory":true}',
  },
  {
    id: 'R002', name: 'Positive Net Worth', category: 'FINANCIAL',
    clause: '3.1.c', description: 'Net worth of the company must be positive as per last audited balance sheet',
    condition: 'net_worth > 0', threshold: 'Positive', weight: 10, active: true, mandatory: true,
    dslJson: '{"rule":"net_worth","operator":"gt","value":0,"currency":"INR","source":"MCA21","mandatory":true}',
  },
  {
    id: 'R003', name: 'Active GST Registration', category: 'STATUTORY',
    clause: '2.3.a', description: 'Vendor GSTIN must be active with no suspension notices',
    condition: 'gstin_status == ACTIVE', threshold: 'ACTIVE', weight: 15, active: true, mandatory: true,
    dslJson: '{"rule":"gstin_status","operator":"eq","value":"ACTIVE","source":"GSTN","mandatory":true}',
  },
  {
    id: 'R004', name: 'Valid PAN Registration', category: 'STATUTORY',
    clause: '2.3.b', description: 'Permanent Account Number must be valid and match entity name in Income Tax records',
    condition: 'pan_status == VALID AND pan_entity == company', threshold: 'Valid', weight: 10, active: true, mandatory: true,
    dslJson: '{"rule":"pan_validation","operator":"eq","value":"VALID","source":"PAN-NSDL","mandatory":true}',
  },
  {
    id: 'R005', name: 'ISO 27001 Certification', category: 'TECHNICAL',
    clause: '4.2.a', description: 'Current valid ISO/IEC 27001 information security certification required, issued within 3 years',
    condition: 'iso27001_valid == true AND cert_age_years <= 3', threshold: '≤3 Years Old', weight: 15, active: true, mandatory: false,
    dslJson: '{"rule":"iso27001","operator":"eq","value":true,"max_age_years":3,"mandatory":false,"weight":15}',
  },
  {
    id: 'R006', name: 'Datacenter Experience', category: 'EXPERIENCE',
    clause: '4.2.c', description: 'Minimum 5 successfully completed Tier-III or higher datacenter projects in last 7 years',
    condition: 'completed_dc_projects >= 5 AND project_tier >= 3', threshold: '5 Projects', weight: 10, active: true, mandatory: false,
    dslJson: '{"rule":"dc_experience","min_projects":5,"min_tier":3,"lookback_years":7,"mandatory":false}',
  },
  {
    id: 'R007', name: 'Similar Work Order (Financial)', category: 'EXPERIENCE',
    clause: '4.3.a', description: 'At least one completed similar work order of value ≥₹5 Cr within last 5 years',
    condition: 'max_similar_order_value >= 5000000 AND order_age_years <= 5', threshold: '≥₹5 Cr', weight: 10, active: true, mandatory: false,
    dslJson: '{"rule":"similar_work","min_value":50000000,"max_age_years":5,"mandatory":false}',
  },
  {
    id: 'R008', name: 'EPFO Compliance', category: 'STATUTORY',
    clause: '2.4.a', description: 'Monthly EPF contributions must be current with no outstanding arrears',
    condition: 'epfo_status == COMPLIANT', threshold: 'Compliant', weight: 5, active: true, mandatory: false,
    dslJson: '{"rule":"epfo_compliance","operator":"eq","value":"COMPLIANT","source":"EPFO","mandatory":false}',
  },
  {
    id: 'R009', name: 'Blacklisting Check', category: 'STATUTORY',
    clause: '2.5.a', description: 'Vendor must not be blacklisted by any government entity — CVC/GeM/Ministry',
    condition: 'blacklist_status == CLEAR', threshold: 'CLEAR', weight: 0, active: true, mandatory: true,
    dslJson: '{"rule":"blacklist","operator":"eq","value":"CLEAR","sources":["CVC","GeM","MCA21"],"mandatory":true,"disqualifying":true}',
  },
];

// ── Audit Log ─────────────────────────────────────────────────
export const mockAuditLog: AuditEntry[] = [
  { id: 'A001', timestamp: '2025-05-23T14:23:08', bidId: 'B001', bidNo: 'GEM-BID-89410', vendorName: 'NexTech Infra Pvt Ltd', officerId: 'DEL-PROC-9082', officerName: 'Rajesh Varma, IAS', action: 'SYSTEM_DISQUALIFY', detail: 'Automated disqualification: Financial Turnover Clause 3.1.b non-compliant. Score: 42/100', evidenceHash: 'sha256:4f3a8d91c...e2b7', ipAddress: '10.0.1.102', riskLevel: 'CRITICAL', outcome: 'CRITICAL' },
  { id: 'A002', timestamp: '2025-05-23T14:21:55', bidId: 'B001', bidNo: 'GEM-BID-89410', vendorName: 'NexTech Infra Pvt Ltd', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'API_VERIFY_GSTN', detail: 'GSTIN 07AABCN1234A1Z5 verified via GSTN sandbox — Status: ACTIVE', evidenceHash: 'sha256:7c2f1ab34...9d08', ipAddress: '10.0.0.1', riskLevel: 'LOW', outcome: 'SUCCESS' },
  { id: 'A003', timestamp: '2025-05-23T14:20:10', bidId: 'B002', bidNo: 'GEM-BID-89411', vendorName: 'InfoSec Systems India Ltd.', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'SCORE_COMPUTED', detail: 'Compliance score computed: 91/100. Risk Level: LOW. All 7 criteria passed.', evidenceHash: 'sha256:b9e4c71d2...3f51', ipAddress: '10.0.0.1', riskLevel: 'LOW', outcome: 'SUCCESS' },
  { id: 'A004', timestamp: '2025-05-23T14:18:44', bidId: 'B002', bidNo: 'GEM-BID-89411', vendorName: 'InfoSec Systems India Ltd.', officerId: 'DEL-PROC-9082', officerName: 'Rajesh Varma, IAS', action: 'OFFICER_QUALIFY', detail: 'Officer qualified bid for L2 technical evaluation. Notes: "All criteria met. Recommended."', evidenceHash: 'sha256:1a7f90ec3...c428', ipAddress: '10.0.1.102', riskLevel: 'LOW', outcome: 'SUCCESS' },
  { id: 'A005', timestamp: '2025-05-23T14:15:22', bidId: 'B003', bidNo: 'GEM-BID-89412', vendorName: 'Quantum DataVault Pvt Ltd', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'FLAGGED_REVIEW', detail: 'ISO 27001 certification expired. Bid routed to human review queue. Score: 67/100', evidenceHash: 'sha256:3c8a2bd91...7e20', ipAddress: '10.0.0.1', riskLevel: 'MEDIUM', outcome: 'WARNING' },
  { id: 'A006', timestamp: '2025-05-23T14:10:05', bidId: 'B003', bidNo: 'GEM-BID-89412', vendorName: 'Quantum DataVault Pvt Ltd', officerId: 'DEL-PROC-9082', officerName: 'Rajesh Varma, IAS', action: 'REQUEST_CLARIFICATION', detail: 'Clarification requested on datacenter project count and ISO renewal status.', evidenceHash: 'sha256:9f1d5ce72...8b44', ipAddress: '10.0.1.102', riskLevel: 'MEDIUM', outcome: 'WARNING' },
  { id: 'A007', timestamp: '2025-05-23T13:55:00', bidId: 'B004', bidNo: 'GEM-BID-89413', vendorName: 'TechNation Solutions LLP', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'SCORE_COMPUTED', detail: 'Compliance score computed: 88/100. Risk Level: LOW.', evidenceHash: 'sha256:6b3e2ac85...4f99', ipAddress: '10.0.0.1', riskLevel: 'LOW', outcome: 'SUCCESS' },
  { id: 'A008', timestamp: '2025-05-23T13:45:30', bidId: 'B001', bidNo: 'GEM-BID-89410', vendorName: 'NexTech Infra Pvt Ltd', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'API_VERIFY_MCA21', detail: 'MCA21 financial fetch: Avg Annual Turnover ₹3.82 Cr (FY21-24). Mismatch detected.', evidenceHash: 'sha256:e7c4f01ab...2d83', ipAddress: '10.0.0.1', riskLevel: 'HIGH', outcome: 'CRITICAL' },
  { id: 'A009', timestamp: '2025-05-23T13:30:00', bidId: 'B004', bidNo: 'GEM-BID-89413', vendorName: 'TechNation Solutions LLP', officerId: 'DEL-PROC-9082', officerName: 'Rajesh Varma, IAS', action: 'OFFICER_QUALIFY', detail: 'Officer qualified bid. Notes: "Compliant across all criteria."', evidenceHash: 'sha256:d2a7b9cf1...5e37', ipAddress: '10.0.1.102', riskLevel: 'LOW', outcome: 'SUCCESS' },
  { id: 'A010', timestamp: '2025-05-23T13:15:12', bidId: 'B002', bidNo: 'GEM-BID-89411', vendorName: 'InfoSec Systems India Ltd.', officerId: 'SYSTEM', officerName: 'PARAKH AI Engine', action: 'API_VERIFY_PAN', detail: 'PAN AABCI9876B verified: COMPANY entity, ACTIVE status, ITR filed for AY2024-25', evidenceHash: 'sha256:c5d9e3f82...1a60', ipAddress: '10.0.0.1', riskLevel: 'LOW', outcome: 'SUCCESS' },
];
