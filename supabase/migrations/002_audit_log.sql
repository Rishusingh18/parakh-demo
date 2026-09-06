-- ============================================================
-- PARAKH Demo Database — Migration 002
-- Audit Log
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_log (
  id              SERIAL PRIMARY KEY,
  timestamp       TIMESTAMPTZ DEFAULT NOW(),
  bid_id          TEXT NOT NULL,
  bid_no          TEXT NOT NULL,
  vendor_name     TEXT NOT NULL,
  officer_id      TEXT NOT NULL,
  officer_name    TEXT NOT NULL,
  action          TEXT NOT NULL,
  detail          TEXT,
  evidence_hash   TEXT,
  ip_address      TEXT,
  risk_level      TEXT,
  outcome         TEXT,
  idempotency_key TEXT UNIQUE NOT NULL
);

-- Enforce append-only semantics by rejecting UPDATE and DELETE
CREATE OR REPLACE FUNCTION reject_audit_modifications()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit log is append-only. UPDATE and DELETE are strictly prohibited.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_log_append_only
BEFORE UPDATE OR DELETE ON audit_log
FOR EACH ROW
EXECUTE FUNCTION reject_audit_modifications();

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
-- No anon read policies. Managed by FastAPI service role.
