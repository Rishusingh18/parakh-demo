// ============================================================
// PARAKH — Government Portal Demo Databases
// Simulated sandbox records for all 9 sovereign portals
// All data is fabricated for demonstration only.
// ============================================================

// ─────────────────────────────────────────────────────────────
// 1. GSTN (via GSP) — GST Network
// ─────────────────────────────────────────────────────────────
export interface GSTNRecord {
  gstin: string;
  legalName: string;
  tradeName: string;
  state: string;
  stateCode: string;
  registrationType: string;
  registrationDate: string;
  status: 'ACTIVE' | 'CANCELLED' | 'SUSPENDED';
  lastReturnFiled: string;
  returnsFiled: number;
  pendingReturns: number;
  annualTurnover: string;
  eInvoiceEnabled: boolean;
  pan: string;
  constitutionOfBusiness: string;
  principalAddress: string;
  fetchedAt: string;
}

export const gstnDatabase: GSTNRecord[] = [
  {
    gstin: '07AABCN1234A1Z5', legalName: 'NexTech Infra Private Limited', tradeName: 'NexTech Infra',
    state: 'Delhi', stateCode: '07', registrationType: 'Regular', registrationDate: '2018-07-12',
    status: 'ACTIVE', lastReturnFiled: 'GSTR-3B / Apr 2025', returnsFiled: 82, pendingReturns: 0,
    annualTurnover: '₹3.82 Cr (FY24)', eInvoiceEnabled: false, pan: 'AABCN1234A',
    constitutionOfBusiness: 'Private Limited Company', principalAddress: 'Plot 14, Phase II, Okhla Industrial Area, New Delhi – 110020',
    fetchedAt: '2025-05-23T14:21:55',
  },
  {
    gstin: '06AABCI9876B1Z3', legalName: 'InfoSec Systems India Limited', tradeName: 'InfoSec Systems',
    state: 'Haryana', stateCode: '06', registrationType: 'Regular', registrationDate: '2012-04-01',
    status: 'ACTIVE', lastReturnFiled: 'GSTR-3B / Apr 2025', returnsFiled: 156, pendingReturns: 0,
    annualTurnover: '₹28.40 Cr (FY24)', eInvoiceEnabled: true, pan: 'AABCI9876B',
    constitutionOfBusiness: 'Public Limited Company', principalAddress: '7th Floor, Unitech Cyber Park, Sector 39, Gurugram – 122001',
    fetchedAt: '2025-05-23T14:21:58',
  },
  {
    gstin: '27AABCQ5432C1Z7', legalName: 'Quantum DataVault Private Limited', tradeName: 'Quantum DataVault',
    state: 'Maharashtra', stateCode: '27', registrationType: 'Regular', registrationDate: '2019-10-15',
    status: 'ACTIVE', lastReturnFiled: 'GSTR-3B / Apr 2025', returnsFiled: 64, pendingReturns: 0,
    annualTurnover: '₹7.60 Cr (FY24)', eInvoiceEnabled: true, pan: 'AABCQ5432C',
    constitutionOfBusiness: 'Private Limited Company', principalAddress: 'Unit 501, Raheja Titanium, Western Express Highway, Goregaon East, Mumbai – 400063',
    fetchedAt: '2025-05-23T14:22:01',
  },
  {
    gstin: '09AABCT8801D1Z2', legalName: 'TechNation Solutions LLP', tradeName: 'TechNation',
    state: 'Uttar Pradesh', stateCode: '09', registrationType: 'Regular', registrationDate: '2015-03-22',
    status: 'ACTIVE', lastReturnFiled: 'GSTR-3B / Apr 2025', returnsFiled: 121, pendingReturns: 0,
    annualTurnover: '₹19.30 Cr (FY24)', eInvoiceEnabled: true, pan: 'AABCT8801D',
    constitutionOfBusiness: 'Limited Liability Partnership', principalAddress: 'B-42, Sector 63, Noida – 201301',
    fetchedAt: '2025-05-23T14:22:04',
  },
  {
    gstin: '33AABCM3399E1Z1', legalName: 'MapleCloud Technologies Private Limited', tradeName: 'MapleCloud',
    state: 'Tamil Nadu', stateCode: '33', registrationType: 'Regular', registrationDate: '2020-06-01',
    status: 'ACTIVE', lastReturnFiled: 'GSTR-3B / Mar 2025', returnsFiled: 57, pendingReturns: 1,
    annualTurnover: '₹4.10 Cr (FY24)', eInvoiceEnabled: false, pan: 'AABCM3399E',
    constitutionOfBusiness: 'Private Limited Company', principalAddress: '3rd Floor, Tidel Park, Taramani, Chennai – 600113',
    fetchedAt: '2025-05-23T14:22:07',
  },
  {
    gstin: '36AABCS7721F1Z9', legalName: 'SecureEdge Networks Pvt Ltd', tradeName: 'SecureEdge',
    state: 'Telangana', stateCode: '36', registrationType: 'Regular', registrationDate: '2017-11-08',
    status: 'SUSPENDED', lastReturnFiled: 'GSTR-3B / Dec 2024', returnsFiled: 88, pendingReturns: 4,
    annualTurnover: '₹2.50 Cr (FY24)', eInvoiceEnabled: false, pan: 'AABCS7721F',
    constitutionOfBusiness: 'Private Limited Company', principalAddress: 'Plot 41, Software Units Layout, Madhapur, Hyderabad – 500081',
    fetchedAt: '2025-05-23T14:22:10',
  },
];

// ─────────────────────────────────────────────────────────────
// 2. Udyam Registration Portal — MSME
// ─────────────────────────────────────────────────────────────
export interface UdyamRecord {
  udyamNo: string;
  enterpriseName: string;
  type: 'MICRO' | 'SMALL' | 'MEDIUM';
  majorActivity: string;
  socialCategory: string;
  dateOfRegistration: string;
  pan: string;
  gstin: string;
  nic2Digit: string;
  district: string;
  state: string;
  investmentInPlant: string;
  annualTurnover: string;
  employeesMale: number;
  employeesFemale: number;
  status: 'ACTIVE' | 'CANCELLED';
  validTill: string;
  bankName: string;
  ifsc: string;
}

export const udyamDatabase: UdyamRecord[] = [
  {
    udyamNo: 'UDYAM-DL-06-0012345', enterpriseName: 'NexTech Infra Private Limited',
    type: 'MICRO', majorActivity: 'Services', socialCategory: 'General',
    dateOfRegistration: '2021-07-01', pan: 'AABCN1234A', gstin: '07AABCN1234A1Z5',
    nic2Digit: '62 – Computer Programming & IT', district: 'South Delhi', state: 'Delhi',
    investmentInPlant: '₹58.20 Lakhs', annualTurnover: '₹3.82 Cr',
    employeesMale: 38, employeesFemale: 12,
    status: 'ACTIVE', validTill: '2026-03-31',
    bankName: 'State Bank of India', ifsc: 'SBIN0003079',
  },
  {
    udyamNo: 'UDYAM-MH-03-0055432', enterpriseName: 'Quantum DataVault Private Limited',
    type: 'SMALL', majorActivity: 'Services', socialCategory: 'General',
    dateOfRegistration: '2021-01-15', pan: 'AABCQ5432C', gstin: '27AABCQ5432C1Z7',
    nic2Digit: '62 – Computer Programming & IT', district: 'Mumbai City', state: 'Maharashtra',
    investmentInPlant: '₹3.80 Cr', annualTurnover: '₹7.60 Cr',
    employeesMale: 62, employeesFemale: 28,
    status: 'ACTIVE', validTill: '2026-03-31',
    bankName: 'HDFC Bank', ifsc: 'HDFC0000025',
  },
  {
    udyamNo: 'UDYAM-HR-02-0098765', enterpriseName: 'InfoSec Systems India Limited',
    type: 'MEDIUM', majorActivity: 'Services', socialCategory: 'General',
    dateOfRegistration: '2020-07-01', pan: 'AABCI9876B', gstin: '06AABCI9876B1Z3',
    nic2Digit: '62 – Computer Programming & IT', district: 'Gurugram', state: 'Haryana',
    investmentInPlant: '₹18.50 Cr', annualTurnover: '₹28.40 Cr',
    employeesMale: 189, employeesFemale: 71,
    status: 'ACTIVE', validTill: '2026-03-31',
    bankName: 'ICICI Bank', ifsc: 'ICIC0000104',
  },
  {
    udyamNo: 'UDYAM-TN-04-0023118', enterpriseName: 'MapleCloud Technologies Private Limited',
    type: 'MICRO', majorActivity: 'Services', socialCategory: 'SC',
    dateOfRegistration: '2022-03-10', pan: 'AABCM3399E', gstin: '33AABCM3399E1Z1',
    nic2Digit: '63 – Data Processing & Hosting', district: 'Chennai', state: 'Tamil Nadu',
    investmentInPlant: '₹22.10 Lakhs', annualTurnover: '₹4.10 Cr',
    employeesMale: 19, employeesFemale: 21,
    status: 'ACTIVE', validTill: '2026-03-31',
    bankName: 'Canara Bank', ifsc: 'CNRB0000274',
  },
];

// ─────────────────────────────────────────────────────────────
// 3. MCA21 (V3) — Ministry of Corporate Affairs
// ─────────────────────────────────────────────────────────────
export interface MCA21Record {
  cin: string;
  companyName: string;
  status: 'ACTIVE' | 'STRUCK_OFF' | 'UNDER_PROCESS' | 'DISSOLVED';
  category: string;
  subCategory: string;
  companyClass: string;
  dateOfIncorporation: string;
  registeredState: string;
  roc: string;
  authorisedCapital: string;
  paidUpCapital: string;
  directors: { din: string; name: string; designation: string; din_status: string }[];
  charges: { chargeId: string; chargeHolder: string; amount: string; createdOn: string; status: string }[];
  lastAnnualReturn: string;
  lastBalanceSheet: string;
  listedStatus: 'LISTED' | 'UNLISTED';
}

export const mca21Database: MCA21Record[] = [
  {
    cin: 'U72900DL2018PTC123456', companyName: 'NexTech Infra Private Limited',
    status: 'ACTIVE', category: 'Company Limited by Shares', subCategory: 'Non-govt company',
    companyClass: 'Private', dateOfIncorporation: '2018-02-14', registeredState: 'Delhi',
    roc: 'RoC-Delhi', authorisedCapital: '₹1,00,00,000', paidUpCapital: '₹78,00,000',
    directors: [
      { din: 'DIN-09341201', name: 'Arvind Mehta', designation: 'Director', din_status: 'APPROVED' },
      { din: 'DIN-07821340', name: 'Priya Sharma', designation: 'Director', din_status: 'APPROVED' },
    ],
    charges: [
      { chargeId: 'CHG-001234', chargeHolder: 'HDFC Bank Ltd', amount: '₹60 Lakhs', createdOn: '2022-04-10', status: 'OPEN' },
    ],
    lastAnnualReturn: 'FY 2023-24 (Filed)', lastBalanceSheet: '31 Mar 2024 (Filed)', listedStatus: 'UNLISTED',
  },
  {
    cin: 'U72900HR2012PLC098765', companyName: 'InfoSec Systems India Limited',
    status: 'ACTIVE', category: 'Company Limited by Shares', subCategory: 'Non-govt company',
    companyClass: 'Public', dateOfIncorporation: '2012-03-08', registeredState: 'Haryana',
    roc: 'RoC-Delhi', authorisedCapital: '₹20,00,00,000', paidUpCapital: '₹14,50,00,000',
    directors: [
      { din: 'DIN-00234891', name: 'Suresh Balasubramanian', designation: 'Managing Director', din_status: 'APPROVED' },
      { din: 'DIN-01872334', name: 'Kavita Nair', designation: 'Independent Director', din_status: 'APPROVED' },
      { din: 'DIN-04499210', name: 'Rahul Deshpande', designation: 'Whole-time Director', din_status: 'APPROVED' },
    ],
    charges: [],
    lastAnnualReturn: 'FY 2023-24 (Filed)', lastBalanceSheet: '31 Mar 2024 (Filed)', listedStatus: 'UNLISTED',
  },
  {
    cin: 'U72900MH2019PTC055432', companyName: 'Quantum DataVault Private Limited',
    status: 'ACTIVE', category: 'Company Limited by Shares', subCategory: 'Non-govt company',
    companyClass: 'Private', dateOfIncorporation: '2019-09-21', registeredState: 'Maharashtra',
    roc: 'RoC-Mumbai', authorisedCapital: '₹5,00,00,000', paidUpCapital: '₹3,20,00,000',
    directors: [
      { din: 'DIN-08910234', name: 'Nikhil Joshi', designation: 'Director', din_status: 'APPROVED' },
      { din: 'DIN-09021456', name: 'Ananya Kulkarni', designation: 'Director', din_status: 'APPROVED' },
    ],
    charges: [
      { chargeId: 'CHG-002891', chargeHolder: 'ICICI Bank Ltd', amount: '₹1.20 Cr', createdOn: '2023-01-18', status: 'OPEN' },
    ],
    lastAnnualReturn: 'FY 2023-24 (Filed)', lastBalanceSheet: '31 Mar 2024 (Filed)', listedStatus: 'UNLISTED',
  },
  {
    cin: 'U72900UP2015PTC078901', companyName: 'TechNation Solutions LLP',
    status: 'ACTIVE', category: 'Limited Liability Partnership', subCategory: 'Non-govt company',
    companyClass: 'LLP', dateOfIncorporation: '2015-08-10', registeredState: 'Uttar Pradesh',
    roc: 'RoC-Kanpur', authorisedCapital: '₹10,00,00,000', paidUpCapital: '₹7,00,00,000',
    directors: [
      { din: 'DIN-06781234', name: 'Arun Kumar Singh', designation: 'Designated Partner', din_status: 'APPROVED' },
      { din: 'DIN-05543210', name: 'Deepak Yadav', designation: 'Designated Partner', din_status: 'APPROVED' },
    ],
    charges: [],
    lastAnnualReturn: 'FY 2023-24 (Filed)', lastBalanceSheet: '31 Mar 2024 (Filed)', listedStatus: 'UNLISTED',
  },
  {
    cin: 'U72900TN2020PTC020011', companyName: 'MapleCloud Technologies Private Limited',
    status: 'ACTIVE', category: 'Company Limited by Shares', subCategory: 'Non-govt company',
    companyClass: 'Private', dateOfIncorporation: '2020-05-20', registeredState: 'Tamil Nadu',
    roc: 'RoC-Chennai', authorisedCapital: '₹1,50,00,000', paidUpCapital: '₹1,00,00,000',
    directors: [
      { din: 'DIN-09711889', name: 'Tamil Selvan R.', designation: 'Director', din_status: 'APPROVED' },
    ],
    charges: [],
    lastAnnualReturn: 'FY 2023-24 (Filed)', lastBalanceSheet: '31 Mar 2024 (Filed)', listedStatus: 'UNLISTED',
  },
  {
    cin: 'U72900TS2014PTC108432', companyName: 'SecureEdge Networks Private Limited',
    status: 'UNDER_PROCESS', category: 'Company Limited by Shares', subCategory: 'Non-govt company',
    companyClass: 'Private', dateOfIncorporation: '2014-06-15', registeredState: 'Telangana',
    roc: 'RoC-Hyderabad', authorisedCapital: '₹3,00,00,000', paidUpCapital: '₹2,10,00,000',
    directors: [
      { din: 'DIN-05234987', name: 'Srinivas Reddy', designation: 'Director', din_status: 'DISQUALIFIED' },
    ],
    charges: [
      { chargeId: 'CHG-004112', chargeHolder: 'Axis Bank', amount: '₹80 Lakhs', createdOn: '2021-07-22', status: 'OPEN' },
    ],
    lastAnnualReturn: 'FY 2022-23 (Filed)', lastBalanceSheet: '31 Mar 2023 (Pending FY24)', listedStatus: 'UNLISTED',
  },
];

// ─────────────────────────────────────────────────────────────
// 4. PAN Verification (NSDL / Protean)
// ─────────────────────────────────────────────────────────────
export interface PANRecord {
  pan: string;
  entityName: string;
  entityType: 'COMPANY' | 'LLP' | 'INDIVIDUAL' | 'FIRM' | 'TRUST';
  status: 'ACTIVE' | 'INOPERATIVE' | 'DELETED';
  aadharLinked: boolean;
  dateOfBirth: string;
  jurisdictionAO: string;
  itrFiled: boolean;
  lastItrAY: string;
  itrForm: string;
  totalIncomeDeclared: string;
  taxPaid: string;
  tdsDeducted: string;
  verifiedAt: string;
}

export const panDatabase: PANRecord[] = [
  {
    pan: 'AABCN1234A', entityName: 'NexTech Infra Private Limited', entityType: 'COMPANY',
    status: 'ACTIVE', aadharLinked: false, dateOfBirth: '2018-02-14',
    jurisdictionAO: 'Delhi, Ward 13(1)', itrFiled: true, lastItrAY: 'AY 2024-25',
    itrForm: 'ITR-6', totalIncomeDeclared: '₹3.45 Cr', taxPaid: '₹38.20 Lakhs', tdsDeducted: '₹12.50 Lakhs',
    verifiedAt: '2025-05-23T14:21:55',
  },
  {
    pan: 'AABCI9876B', entityName: 'InfoSec Systems India Limited', entityType: 'COMPANY',
    status: 'ACTIVE', aadharLinked: false, dateOfBirth: '2012-03-08',
    jurisdictionAO: 'Haryana, Ward 4(3)', itrFiled: true, lastItrAY: 'AY 2024-25',
    itrForm: 'ITR-6', totalIncomeDeclared: '₹25.80 Cr', taxPaid: '₹3.40 Cr', tdsDeducted: '₹98.60 Lakhs',
    verifiedAt: '2025-05-23T14:22:00',
  },
  {
    pan: 'AABCQ5432C', entityName: 'Quantum DataVault Private Limited', entityType: 'COMPANY',
    status: 'ACTIVE', aadharLinked: false, dateOfBirth: '2019-09-21',
    jurisdictionAO: 'Maharashtra, Ward 9(2)', itrFiled: true, lastItrAY: 'AY 2024-25',
    itrForm: 'ITR-6', totalIncomeDeclared: '₹7.10 Cr', taxPaid: '₹74.50 Lakhs', tdsDeducted: '₹22.80 Lakhs',
    verifiedAt: '2025-05-23T14:22:03',
  },
  {
    pan: 'AABCT8801D', entityName: 'TechNation Solutions LLP', entityType: 'LLP',
    status: 'ACTIVE', aadharLinked: false, dateOfBirth: '2015-08-10',
    jurisdictionAO: 'UP, Ward 7(1)', itrFiled: true, lastItrAY: 'AY 2024-25',
    itrForm: 'ITR-5', totalIncomeDeclared: '₹18.70 Cr', taxPaid: '₹2.10 Cr', tdsDeducted: '₹56.20 Lakhs',
    verifiedAt: '2025-05-23T14:22:06',
  },
  {
    pan: 'AABCM3399E', entityName: 'MapleCloud Technologies Private Limited', entityType: 'COMPANY',
    status: 'ACTIVE', aadharLinked: false, dateOfBirth: '2020-05-20',
    jurisdictionAO: 'Tamil Nadu, Ward 2(4)', itrFiled: true, lastItrAY: 'AY 2024-25',
    itrForm: 'ITR-6', totalIncomeDeclared: '₹3.92 Cr', taxPaid: '₹41.30 Lakhs', tdsDeducted: '₹9.80 Lakhs',
    verifiedAt: '2025-05-23T14:22:09',
  },
  {
    pan: 'AABCS7721F', entityName: 'SecureEdge Networks Private Limited', entityType: 'COMPANY',
    status: 'INOPERATIVE', aadharLinked: false, dateOfBirth: '2014-06-15',
    jurisdictionAO: 'Telangana, Ward 5(2)', itrFiled: false, lastItrAY: 'AY 2023-24',
    itrForm: 'ITR-6', totalIncomeDeclared: '₹2.40 Cr', taxPaid: '₹24.80 Lakhs', tdsDeducted: '₹6.10 Lakhs',
    verifiedAt: '2025-05-23T14:22:12',
  },
];

// ─────────────────────────────────────────────────────────────
// 5. EPFO — Employees' Provident Fund Organisation
// ─────────────────────────────────────────────────────────────
export interface EPFORecord {
  epfRegNo: string;
  establishmentName: string;
  ownerName: string;
  state: string;
  district: string;
  industry: string;
  dateOfCoverage: string;
  memberCount: number;
  pensionMembers: number;
  complianceStatus: 'COMPLIANT' | 'DEFAULTER' | 'EXEMPTED';
  lastECRMonth: string;
  arrears: string;
  wagesDeclaration: string;
  lastContributionDate: string;
  totalContributionFY: string;
  pan: string;
}

export const epfoDatabase: EPFORecord[] = [
  {
    epfRegNo: 'DL/DEL/0001234/ENF', establishmentName: 'NexTech Infra Private Limited',
    ownerName: 'Arvind Mehta', state: 'Delhi', district: 'South Delhi',
    industry: 'Computer Programming', dateOfCoverage: '2018-09-01',
    memberCount: 50, pensionMembers: 50, complianceStatus: 'COMPLIANT',
    lastECRMonth: 'April 2025', arrears: 'NIL', wagesDeclaration: '₹41.60 Lakhs/month',
    lastContributionDate: '2025-05-15', totalContributionFY: '₹1.22 Cr (FY24-25)',
    pan: 'AABCN1234A',
  },
  {
    epfRegNo: 'HR/GGN/0098765/ENF', establishmentName: 'InfoSec Systems India Limited',
    ownerName: 'Suresh Balasubramanian', state: 'Haryana', district: 'Gurugram',
    industry: 'Information Technology', dateOfCoverage: '2012-06-01',
    memberCount: 260, pensionMembers: 260, complianceStatus: 'COMPLIANT',
    lastECRMonth: 'April 2025', arrears: 'NIL', wagesDeclaration: '₹3.20 Cr/month',
    lastContributionDate: '2025-05-15', totalContributionFY: '₹9.60 Cr (FY24-25)',
    pan: 'AABCI9876B',
  },
  {
    epfRegNo: 'MH/MUM/0055432/ENF', establishmentName: 'Quantum DataVault Private Limited',
    ownerName: 'Nikhil Joshi', state: 'Maharashtra', district: 'Mumbai City',
    industry: 'Data Processing', dateOfCoverage: '2020-01-01',
    memberCount: 90, pensionMembers: 90, complianceStatus: 'COMPLIANT',
    lastECRMonth: 'April 2025', arrears: 'NIL', wagesDeclaration: '₹88.50 Lakhs/month',
    lastContributionDate: '2025-05-15', totalContributionFY: '₹2.65 Cr (FY24-25)',
    pan: 'AABCQ5432C',
  },
  {
    epfRegNo: 'UP/NOI/0078901/ENF', establishmentName: 'TechNation Solutions LLP',
    ownerName: 'Arun Kumar Singh', state: 'Uttar Pradesh', district: 'Gautam Buddha Nagar',
    industry: 'Software Development', dateOfCoverage: '2015-10-01',
    memberCount: 180, pensionMembers: 178, complianceStatus: 'COMPLIANT',
    lastECRMonth: 'April 2025', arrears: 'NIL', wagesDeclaration: '₹1.92 Cr/month',
    lastContributionDate: '2025-05-15', totalContributionFY: '₹5.76 Cr (FY24-25)',
    pan: 'AABCT8801D',
  },
  {
    epfRegNo: 'TS/HYD/0108432/ENF', establishmentName: 'SecureEdge Networks Private Limited',
    ownerName: 'Srinivas Reddy', state: 'Telangana', district: 'Hyderabad',
    industry: 'Cybersecurity Services', dateOfCoverage: '2015-01-01',
    memberCount: 42, pensionMembers: 38, complianceStatus: 'DEFAULTER',
    lastECRMonth: 'November 2024', arrears: '₹14.80 Lakhs (5 months)', wagesDeclaration: '₹28.10 Lakhs/month',
    lastContributionDate: '2024-11-30', totalContributionFY: '₹48.50 Lakhs (FY24-25, partial)',
    pan: 'AABCS7721F',
  },
];

// ─────────────────────────────────────────────────────────────
// 6. ESIC — Employees' State Insurance Corporation
// ─────────────────────────────────────────────────────────────
export interface ESICRecord {
  esicCode: string;
  establishmentName: string;
  category: string;
  state: string;
  region: string;
  dateOfRegistration: string;
  insuredPersons: number;
  status: 'ACTIVE' | 'DEFAULTER' | 'CLOSED';
  lastContributionPeriod: string;
  totalContribution: string;
  arrears: string;
  inspectionDate: string;
  pan: string;
  eligibilityForBid: boolean;
}

export const esicDatabase: ESICRecord[] = [
  {
    esicCode: '10018343210001', establishmentName: 'NexTech Infra Private Limited',
    category: 'Factory / Establishment', state: 'Delhi', region: 'Delhi-I',
    dateOfRegistration: '2018-10-01', insuredPersons: 50, status: 'ACTIVE',
    lastContributionPeriod: 'Apr 2025', totalContribution: '₹4.80 Lakhs',
    arrears: 'NIL', inspectionDate: '2024-12-10', pan: 'AABCN1234A', eligibilityForBid: true,
  },
  {
    esicCode: '10022148770001', establishmentName: 'InfoSec Systems India Limited',
    category: 'Factory / Establishment', state: 'Haryana', region: 'Haryana',
    dateOfRegistration: '2012-07-01', insuredPersons: 260, status: 'ACTIVE',
    lastContributionPeriod: 'Apr 2025', totalContribution: '₹24.96 Lakhs',
    arrears: 'NIL', inspectionDate: '2025-02-20', pan: 'AABCI9876B', eligibilityForBid: true,
  },
  {
    esicCode: '10031892410001', establishmentName: 'Quantum DataVault Private Limited',
    category: 'Factory / Establishment', state: 'Maharashtra', region: 'Mumbai',
    dateOfRegistration: '2020-02-01', insuredPersons: 90, status: 'ACTIVE',
    lastContributionPeriod: 'Apr 2025', totalContribution: '₹8.64 Lakhs',
    arrears: 'NIL', inspectionDate: '2025-01-15', pan: 'AABCQ5432C', eligibilityForBid: true,
  },
  {
    esicCode: '10045876540001', establishmentName: 'TechNation Solutions LLP',
    category: 'Factory / Establishment', state: 'Uttar Pradesh', region: 'Kanpur',
    dateOfRegistration: '2016-01-01', insuredPersons: 180, status: 'ACTIVE',
    lastContributionPeriod: 'Apr 2025', totalContribution: '₹17.28 Lakhs',
    arrears: 'NIL', inspectionDate: '2024-11-08', pan: 'AABCT8801D', eligibilityForBid: true,
  },
  {
    esicCode: '10058219900001', establishmentName: 'SecureEdge Networks Private Limited',
    category: 'Factory / Establishment', state: 'Telangana', region: 'Hyderabad',
    dateOfRegistration: '2015-03-01', insuredPersons: 42, status: 'DEFAULTER',
    lastContributionPeriod: 'Oct 2024', totalContribution: '₹2.62 Lakhs (partial)',
    arrears: '₹6.20 Lakhs (6 months)', inspectionDate: '2024-09-20', pan: 'AABCS7721F', eligibilityForBid: false,
  },
];

// ─────────────────────────────────────────────────────────────
// 7. NSIC — National Small Industries Corporation
// ─────────────────────────────────────────────────────────────
export interface NSICRecord {
  registrationNo: string;
  firmName: string;
  state: string;
  itemsRegistered: string[];
  monetaryLimit: string;
  performanceRating: 'SE1' | 'SE2' | 'SE3' | 'SE4' | 'SE5' | 'NA';
  creditRating: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'NA';
  registrationDate: string;
  validUpTo: string;
  status: 'VALID' | 'EXPIRED' | 'SUSPENDED';
  renewalDue: string;
  pan: string;
  msmeType: 'MICRO' | 'SMALL' | 'MEDIUM' | 'NOT_REGISTERED';
}

export const nsicDatabase: NSICRecord[] = [
  {
    registrationNo: 'NSIC/DL/2021/004821', firmName: 'NexTech Infra Private Limited',
    state: 'Delhi', itemsRegistered: ['Cloud Infrastructure Services', 'IT System Integration', 'Network Setup & Maintenance'],
    monetaryLimit: '₹2.50 Cr', performanceRating: 'SE2', creditRating: 'B+',
    registrationDate: '2021-08-10', validUpTo: '2024-08-09', status: 'EXPIRED',
    renewalDue: '2024-08-09 (Overdue)', pan: 'AABCN1234A', msmeType: 'MICRO',
  },
  {
    registrationNo: 'NSIC/HR/2019/007654', firmName: 'InfoSec Systems India Limited',
    state: 'Haryana', itemsRegistered: ['Cybersecurity Solutions', 'SOC Services', 'Data Centre Management'],
    monetaryLimit: '₹15 Cr', performanceRating: 'SE1', creditRating: 'A',
    registrationDate: '2019-03-15', validUpTo: '2025-03-14', status: 'VALID',
    renewalDue: '2025-03-14', pan: 'AABCI9876B', msmeType: 'MEDIUM',
  },
  {
    registrationNo: 'NSIC/MH/2022/012300', firmName: 'Quantum DataVault Private Limited',
    state: 'Maharashtra', itemsRegistered: ['Cloud Storage Services', 'Data Backup Solutions'],
    monetaryLimit: '₹5 Cr', performanceRating: 'SE2', creditRating: 'B+',
    registrationDate: '2022-01-20', validUpTo: '2025-01-19', status: 'VALID',
    renewalDue: '2025-01-19', pan: 'AABCQ5432C', msmeType: 'SMALL',
  },
  {
    registrationNo: 'N/A', firmName: 'TechNation Solutions LLP',
    state: 'Uttar Pradesh', itemsRegistered: [],
    monetaryLimit: 'N/A', performanceRating: 'NA', creditRating: 'NA',
    registrationDate: 'N/A', validUpTo: 'N/A', status: 'EXPIRED',
    renewalDue: 'Not Registered', pan: 'AABCT8801D', msmeType: 'NOT_REGISTERED',
  },
];

// ─────────────────────────────────────────────────────────────
// 8. DigiLocker (NIC)
// ─────────────────────────────────────────────────────────────
export interface DigiLockerRecord {
  digiLockerId: string;
  linkedEntity: string;
  pan: string;
  documents: {
    docId: string;
    docType: string;
    issuer: string;
    issuedOn: string;
    validTill: string;
    eSignStatus: 'SIGNED' | 'UNSIGNED' | 'REVOKED';
    pullStatus: 'FETCHED' | 'PENDING' | 'FAILED';
    sha256: string;
  }[];
  lastFetchedAt: string;
  consentGiven: boolean;
}

export const digiLockerDatabase: DigiLockerRecord[] = [
  {
    digiLockerId: 'DL-UID-AABCN1234A', linkedEntity: 'NexTech Infra Private Limited',
    pan: 'AABCN1234A', consentGiven: true, lastFetchedAt: '2025-05-23T14:18:30',
    documents: [
      { docId: 'DOC-001', docType: 'Udyam Registration Certificate', issuer: 'Ministry of MSME', issuedOn: '2021-07-01', validTill: '2026-03-31', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:a1f3d8c9...4e21' },
      { docId: 'DOC-002', docType: 'GST Registration Certificate', issuer: 'GSTN', issuedOn: '2018-07-12', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:b4e2f1a7...9d30' },
      { docId: 'DOC-003', docType: 'PAN Card', issuer: 'Income Tax Dept / NSDL', issuedOn: '2018-02-20', validTill: 'Permanent', eSignStatus: 'UNSIGNED', pullStatus: 'FETCHED', sha256: 'sha256:c7g4h2b1...3f99' },
      { docId: 'DOC-004', docType: 'ISO 27001:2022 Certificate', issuer: 'BSI Group India', issuedOn: '2023-04-15', validTill: '2026-04-14', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:d8j1k9m2...7a42' },
    ],
  },
  {
    digiLockerId: 'DL-UID-AABCI9876B', linkedEntity: 'InfoSec Systems India Limited',
    pan: 'AABCI9876B', consentGiven: true, lastFetchedAt: '2025-05-23T14:19:10',
    documents: [
      { docId: 'DOC-101', docType: 'Certificate of Incorporation', issuer: 'Ministry of Corporate Affairs', issuedOn: '2012-03-08', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:e9n3p7q5...2b11' },
      { docId: 'DOC-102', docType: 'GST Registration Certificate', issuer: 'GSTN', issuedOn: '2012-04-01', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:f2r8s4t6...8c52' },
      { docId: 'DOC-103', docType: 'PAN Card', issuer: 'Income Tax Dept / NSDL', issuedOn: '2012-03-10', validTill: 'Permanent', eSignStatus: 'UNSIGNED', pullStatus: 'FETCHED', sha256: 'sha256:g5u1v9w3...1d73' },
      { docId: 'DOC-104', docType: 'ISO 27001:2022 Certificate', issuer: 'TUV Rheinland India', issuedOn: '2024-01-10', validTill: '2027-01-09', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:h8x4y2z0...5e94' },
      { docId: 'DOC-105', docType: 'Udyam Registration Certificate', issuer: 'Ministry of MSME', issuedOn: '2020-07-01', validTill: '2026-03-31', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:i1a5b7c9...0f15' },
    ],
  },
  {
    digiLockerId: 'DL-UID-AABCQ5432C', linkedEntity: 'Quantum DataVault Private Limited',
    pan: 'AABCQ5432C', consentGiven: true, lastFetchedAt: '2025-05-23T14:19:45',
    documents: [
      { docId: 'DOC-201', docType: 'Udyam Registration Certificate', issuer: 'Ministry of MSME', issuedOn: '2021-01-15', validTill: '2026-03-31', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:j4d8e2f6...3g36' },
      { docId: 'DOC-202', docType: 'GST Registration Certificate', issuer: 'GSTN', issuedOn: '2019-10-15', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:k7h1i5j3...6h57' },
      { docId: 'DOC-203', docType: 'ISO 27001:2013 Certificate (EXPIRED)', issuer: 'Bureau Veritas India', issuedOn: '2021-12-20', validTill: '2024-12-19', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:l0m4n8o2...9i78' },
      { docId: 'DOC-204', docType: 'DPIIT Startup Recognition Certificate', issuer: 'DPIIT / Startup India', issuedOn: '2019-11-01', validTill: '2029-10-31', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:m3p7q1r5...2j99' },
    ],
  },
  {
    digiLockerId: 'DL-UID-AABCT8801D', linkedEntity: 'TechNation Solutions LLP',
    pan: 'AABCT8801D', consentGiven: true, lastFetchedAt: '2025-05-23T14:20:15',
    documents: [
      { docId: 'DOC-301', docType: 'Certificate of Incorporation (LLP)', issuer: 'Ministry of Corporate Affairs', issuedOn: '2015-08-10', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:n6s2t4u8...5k10' },
      { docId: 'DOC-302', docType: 'GST Registration Certificate', issuer: 'GSTN', issuedOn: '2015-03-22', validTill: 'Permanent', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:o9v5w1x7...8l21' },
      { docId: 'DOC-303', docType: 'ISO 27001:2022 Certificate', issuer: 'SGS India', issuedOn: '2023-07-01', validTill: '2028-06-30', eSignStatus: 'SIGNED', pullStatus: 'FETCHED', sha256: 'sha256:p2y8z4a0...1m42' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 9. Startup India (DPIIT)
// ─────────────────────────────────────────────────────────────
export interface StartupIndiaRecord {
  dpiitNo: string;
  startupName: string;
  incorporationDate: string;
  sector: string;
  subSector: string;
  recognitionDate: string;
  recognitionValidTill: string;
  status: 'RECOGNISED' | 'EXPIRED' | 'REJECTED';
  cin: string;
  pan: string;
  stage: 'IDEATION' | 'VALIDATION' | 'EARLY_TRACTION' | 'SCALING';
  iitRelated: boolean;
  emdExemption: boolean;
  tenderFeeExemption: boolean;
  feeExemption: boolean;
  incubatorName: string | null;
  fundingReceived: string;
  founders: string[];
  state: string;
}

export const startupIndiaDatabase: StartupIndiaRecord[] = [
  {
    dpiitNo: 'DIPP2019-MH-OCT-20890', startupName: 'Quantum DataVault Private Limited',
    incorporationDate: '2019-09-21', sector: 'Information Technology', subSector: 'Cloud Computing & Data Storage',
    recognitionDate: '2019-11-01', recognitionValidTill: '2029-10-31', status: 'RECOGNISED',
    cin: 'U72900MH2019PTC055432', pan: 'AABCQ5432C',
    stage: 'EARLY_TRACTION', iitRelated: false,
    emdExemption: true, tenderFeeExemption: true, feeExemption: true,
    incubatorName: 'SINE, IIT Bombay',
    fundingReceived: '₹4.20 Cr (Seed + Angel)',
    founders: ['Nikhil Joshi', 'Ananya Kulkarni'],
    state: 'Maharashtra',
  },
  {
    dpiitNo: 'DIPP2020-TN-MAR-33010', startupName: 'MapleCloud Technologies Private Limited',
    incorporationDate: '2020-05-20', sector: 'Information Technology', subSector: 'SaaS / Cloud Platforms',
    recognitionDate: '2020-09-15', recognitionValidTill: '2030-09-14', status: 'RECOGNISED',
    cin: 'U72900TN2020PTC020011', pan: 'AABCM3399E',
    stage: 'VALIDATION', iitRelated: true,
    emdExemption: true, tenderFeeExemption: true, feeExemption: true,
    incubatorName: 'IIT-M Research Park, Chennai',
    fundingReceived: '₹1.80 Cr (Angel)',
    founders: ['Tamil Selvan R.'],
    state: 'Tamil Nadu',
  },
  {
    dpiitNo: 'DIPP2022-KA-JUL-44501', startupName: 'CipherNest Technologies Pvt Ltd',
    incorporationDate: '2022-03-10', sector: 'Cybersecurity', subSector: 'Zero-Trust Architecture',
    recognitionDate: '2022-07-20', recognitionValidTill: '2032-07-19', status: 'RECOGNISED',
    cin: 'U72900KA2022PTC180310', pan: 'AABCC4401G',
    stage: 'IDEATION', iitRelated: true,
    emdExemption: true, tenderFeeExemption: true, feeExemption: true,
    incubatorName: 'NSRCEL, IIM Bangalore',
    fundingReceived: '₹70 Lakhs (Pre-seed)',
    founders: ['Ravi Krishnaswamy', 'Meera Iyer'],
    state: 'Karnataka',
  },
  {
    dpiitNo: 'DIPP2018-DL-FEB-09812', startupName: 'DataPulse Analytics Pvt Ltd',
    incorporationDate: '2018-01-15', sector: 'Data Analytics', subSector: 'AI/ML for Government',
    recognitionDate: '2018-02-28', recognitionValidTill: '2028-02-27', status: 'RECOGNISED',
    cin: 'U72900DL2018PTC090110', pan: 'AABCD0099H',
    stage: 'SCALING', iitRelated: false,
    emdExemption: true, tenderFeeExemption: true, feeExemption: false,
    incubatorName: 'TLABS Delhi',
    fundingReceived: '₹18.50 Cr (Series A)',
    founders: ['Pooja Agarwal', 'Siddharth Rao'],
    state: 'Delhi',
  },
  {
    dpiitNo: 'DIPP2023-RJ-APR-60022', startupName: 'GovLink Systems Pvt Ltd',
    incorporationDate: '2023-01-05', sector: 'GovTech', subSector: 'e-Procurement & Compliance',
    recognitionDate: '2023-04-10', recognitionValidTill: '2033-04-09', status: 'RECOGNISED',
    cin: 'U72900RJ2023PTC200543', pan: 'AABCG5504K',
    stage: 'IDEATION', iitRelated: false,
    emdExemption: true, tenderFeeExemption: true, feeExemption: true,
    incubatorName: null,
    fundingReceived: 'Bootstrapped',
    founders: ['Harish Goyal'],
    state: 'Rajasthan',
  },
];

// ─────────────────────────────────────────────────────────────
// Registry: map connector IDs to their databases
// ─────────────────────────────────────────────────────────────
export type PortalId = 'GC001' | 'GC002' | 'GC003' | 'GC004' | 'GC005' | 'GC006' | 'GC007' | 'GC008' | 'GC009';

export const portalMeta: Record<PortalId, { label: string; recordCount: number; dbKey: string }> = {
  GC001: { label: 'GSTN Records', recordCount: gstnDatabase.length, dbKey: 'gstn' },
  GC002: { label: 'Udyam Records', recordCount: udyamDatabase.length, dbKey: 'udyam' },
  GC003: { label: 'MCA21 Records', recordCount: mca21Database.length, dbKey: 'mca21' },
  GC004: { label: 'PAN Records', recordCount: panDatabase.length, dbKey: 'pan' },
  GC005: { label: 'EPFO Records', recordCount: epfoDatabase.length, dbKey: 'epfo' },
  GC006: { label: 'ESIC Records', recordCount: esicDatabase.length, dbKey: 'esic' },
  GC007: { label: 'NSIC Records', recordCount: nsicDatabase.length, dbKey: 'nsic' },
  GC008: { label: 'DigiLocker Records', recordCount: digiLockerDatabase.length, dbKey: 'digilocker' },
  GC009: { label: 'Startup India Records', recordCount: startupIndiaDatabase.length, dbKey: 'startup' },
};
