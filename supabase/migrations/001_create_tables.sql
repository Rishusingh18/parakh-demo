-- ============================================================
-- PARAKH Demo Database — Migration 001
-- Creates all 9 government portal tables
-- Run this in: Supabase → SQL Editor → New Query
-- ============================================================

-- 1. GSTN Records
CREATE TABLE IF NOT EXISTS gstn_records (
  id              SERIAL PRIMARY KEY,
  gstin           TEXT UNIQUE NOT NULL,
  legal_name      TEXT NOT NULL,
  trade_name      TEXT,
  state           TEXT,
  state_code      TEXT,
  registration_type TEXT,
  registration_date DATE,
  status          TEXT CHECK (status IN ('ACTIVE','CANCELLED','SUSPENDED')),
  last_return_filed TEXT,
  returns_filed   INTEGER DEFAULT 0,
  pending_returns INTEGER DEFAULT 0,
  annual_turnover TEXT,
  e_invoice_enabled BOOLEAN DEFAULT FALSE,
  pan             TEXT,
  constitution_of_business TEXT,
  principal_address TEXT,
  fetched_at      TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Udyam Records
CREATE TABLE IF NOT EXISTS udyam_records (
  id                  SERIAL PRIMARY KEY,
  udyam_no            TEXT UNIQUE NOT NULL,
  enterprise_name     TEXT NOT NULL,
  type                TEXT CHECK (type IN ('MICRO','SMALL','MEDIUM')),
  major_activity      TEXT,
  social_category     TEXT,
  date_of_registration DATE,
  pan                 TEXT,
  gstin               TEXT,
  nic_2digit          TEXT,
  district            TEXT,
  state               TEXT,
  investment_in_plant TEXT,
  annual_turnover     TEXT,
  employees_male      INTEGER DEFAULT 0,
  employees_female    INTEGER DEFAULT 0,
  status              TEXT CHECK (status IN ('ACTIVE','CANCELLED')),
  valid_till          DATE,
  bank_name           TEXT,
  ifsc                TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MCA21 Records
CREATE TABLE IF NOT EXISTS mca21_records (
  id                      SERIAL PRIMARY KEY,
  cin                     TEXT UNIQUE NOT NULL,
  company_name            TEXT NOT NULL,
  status                  TEXT CHECK (status IN ('ACTIVE','STRUCK_OFF','UNDER_PROCESS','DISSOLVED')),
  category                TEXT,
  sub_category            TEXT,
  company_class           TEXT,
  date_of_incorporation   DATE,
  registered_state        TEXT,
  roc                     TEXT,
  authorised_capital      TEXT,
  paid_up_capital         TEXT,
  listed_status           TEXT CHECK (listed_status IN ('LISTED','UNLISTED')),
  last_annual_return      TEXT,
  last_balance_sheet      TEXT,
  directors               JSONB DEFAULT '[]',
  charges                 JSONB DEFAULT '[]',
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAN Records
CREATE TABLE IF NOT EXISTS pan_records (
  id                      SERIAL PRIMARY KEY,
  pan                     TEXT UNIQUE NOT NULL,
  entity_name             TEXT NOT NULL,
  entity_type             TEXT CHECK (entity_type IN ('COMPANY','LLP','INDIVIDUAL','FIRM','TRUST')),
  status                  TEXT CHECK (status IN ('ACTIVE','INOPERATIVE','DELETED')),
  aadhar_linked           BOOLEAN DEFAULT FALSE,
  date_of_birth           DATE,
  jurisdiction_ao         TEXT,
  itr_filed               BOOLEAN DEFAULT FALSE,
  last_itr_ay             TEXT,
  itr_form                TEXT,
  total_income_declared   TEXT,
  tax_paid                TEXT,
  tds_deducted            TEXT,
  verified_at             TIMESTAMPTZ DEFAULT NOW(),
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EPFO Records
CREATE TABLE IF NOT EXISTS epfo_records (
  id                      SERIAL PRIMARY KEY,
  epf_reg_no              TEXT UNIQUE NOT NULL,
  establishment_name      TEXT NOT NULL,
  owner_name              TEXT,
  state                   TEXT,
  district                TEXT,
  industry                TEXT,
  date_of_coverage        DATE,
  member_count            INTEGER DEFAULT 0,
  pension_members         INTEGER DEFAULT 0,
  compliance_status       TEXT CHECK (compliance_status IN ('COMPLIANT','DEFAULTER','EXEMPTED')),
  last_ecr_month          TEXT,
  arrears                 TEXT,
  wages_declaration       TEXT,
  last_contribution_date  DATE,
  total_contribution_fy   TEXT,
  pan                     TEXT,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ESIC Records
CREATE TABLE IF NOT EXISTS esic_records (
  id                      SERIAL PRIMARY KEY,
  esic_code               TEXT UNIQUE NOT NULL,
  establishment_name      TEXT NOT NULL,
  category                TEXT,
  state                   TEXT,
  region                  TEXT,
  date_of_registration    DATE,
  insured_persons         INTEGER DEFAULT 0,
  status                  TEXT CHECK (status IN ('ACTIVE','DEFAULTER','CLOSED')),
  last_contribution_period TEXT,
  total_contribution      TEXT,
  arrears                 TEXT,
  inspection_date         DATE,
  pan                     TEXT,
  eligibility_for_bid     BOOLEAN DEFAULT TRUE,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 7. NSIC Records
CREATE TABLE IF NOT EXISTS nsic_records (
  id                  SERIAL PRIMARY KEY,
  registration_no     TEXT UNIQUE NOT NULL,
  firm_name           TEXT NOT NULL,
  state               TEXT,
  items_registered    TEXT[],
  monetary_limit      TEXT,
  performance_rating  TEXT,
  credit_rating       TEXT,
  registration_date   DATE,
  valid_up_to         DATE,
  status              TEXT CHECK (status IN ('VALID','EXPIRED','SUSPENDED')),
  renewal_due         TEXT,
  pan                 TEXT,
  msme_type           TEXT CHECK (msme_type IN ('MICRO','SMALL','MEDIUM','NOT_REGISTERED')),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DigiLocker Records
CREATE TABLE IF NOT EXISTS digilocker_records (
  id              SERIAL PRIMARY KEY,
  digi_locker_id  TEXT UNIQUE NOT NULL,
  linked_entity   TEXT NOT NULL,
  pan             TEXT,
  consent_given   BOOLEAN DEFAULT FALSE,
  documents       JSONB DEFAULT '[]',
  last_fetched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Startup India (DPIIT) Records
CREATE TABLE IF NOT EXISTS startup_india_records (
  id                      SERIAL PRIMARY KEY,
  dpiit_no                TEXT UNIQUE NOT NULL,
  startup_name            TEXT NOT NULL,
  incorporation_date      DATE,
  sector                  TEXT,
  sub_sector              TEXT,
  recognition_date        DATE,
  recognition_valid_till  DATE,
  status                  TEXT CHECK (status IN ('RECOGNISED','EXPIRED','REJECTED')),
  cin                     TEXT,
  pan                     TEXT,
  stage                   TEXT CHECK (stage IN ('IDEATION','VALIDATION','EARLY_TRACTION','SCALING')),
  iit_related             BOOLEAN DEFAULT FALSE,
  emd_exemption           BOOLEAN DEFAULT FALSE,
  tender_fee_exemption    BOOLEAN DEFAULT FALSE,
  fee_exemption           BOOLEAN DEFAULT FALSE,
  incubator_name          TEXT,
  funding_received        TEXT,
  founders                TEXT[],
  state                   TEXT,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- ── Enable Row Level Security (allow public read for demo) ───
ALTER TABLE gstn_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE udyam_records         ENABLE ROW LEVEL SECURITY;
ALTER TABLE mca21_records         ENABLE ROW LEVEL SECURITY;
ALTER TABLE pan_records           ENABLE ROW LEVEL SECURITY;
ALTER TABLE epfo_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE esic_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE nsic_records          ENABLE ROW LEVEL SECURITY;
ALTER TABLE digilocker_records    ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_india_records ENABLE ROW LEVEL SECURITY;

-- No anonymous policies are created. Demo access should be mediated by the FastAPI
-- backend so government-portal records are not exposed through the public anon key.
