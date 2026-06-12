import { neon } from '@neondatabase/serverless';

/**
 * Neon serverless driver (queries over HTTP). Unlike a pg.Pool, this holds no
 * open connections between invocations, so it cannot exhaust the database
 * connection limit on Vercel's serverless functions.
 */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL environment variable is required');
  }
  return neon(url);
}

/**
 * Single unified table for every enquiry/referral. `type` distinguishes
 * patient self-referrals from GP referrals; `status` supports a simple
 * triage workflow until a practice-management system (Semble / Carebit)
 * takes over booking, at which point rows here can be exported/imported.
 */
const SCHEMA = `
  CREATE TABLE IF NOT EXISTS referrals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('self', 'gp')),
    status TEXT NOT NULL DEFAULT 'new'
      CHECK (status IN ('new', 'contacted', 'booked', 'closed')),
    urgency TEXT NOT NULL DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent')),
    patient_name TEXT NOT NULL,
    patient_dob DATE,
    patient_email TEXT,
    patient_phone TEXT,
    patient_nhs_number TEXT,
    gp_name TEXT,
    gp_practice TEXT,
    gp_email TEXT,
    gp_phone TEXT,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS referrals_status_idx ON referrals (status, created_at DESC);
`;

let schemaReady: Promise<void> | undefined;

async function createSchema(): Promise<void> {
  const sql = getSql();
  const statements = SCHEMA.split(';').map((s) => s.trim()).filter(Boolean);
  for (const statement of statements) {
    await sql.query(statement);
  }
}

/** Ensures the referrals table exists. Runs at most once per server instance. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = createSchema();
    // If bootstrap fails (e.g. transient network error), allow a retry on the
    // next request instead of caching the rejection forever.
    schemaReady.catch(() => {
      schemaReady = undefined;
    });
  }
  return schemaReady;
}
