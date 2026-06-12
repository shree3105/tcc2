/**
 * One-off database setup / migration.
 *
 * Creates the unified `referrals` table and copies any rows from the legacy
 * `submissions` (self-referrals) and `gp_referrals` tables into it. Safe to
 * run repeatedly — already-migrated rows are skipped, and the legacy tables
 * are left in place (drop them manually once you are happy).
 *
 * Run with:  DATABASE_URL="postgres://..." node scripts/setup-db.js
 * (or via `npm run setup-db` with DATABASE_URL in .env.local)
 */
const { neon } = require('@neondatabase/serverless');

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL environment variable is required.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function tableExists(name) {
  const rows = await sql`SELECT to_regclass(${'public.' + name}) AS t`;
  return rows[0].t !== null;
}

async function main() {
  // 1. Unified table (kept in sync with SCHEMA in lib/db.ts).
  await sql.query(`
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
    )`);
  await sql.query(
    'CREATE INDEX IF NOT EXISTS referrals_status_idx ON referrals (status, created_at DESC)',
  );
  console.log('referrals table ready');

  // 2. Migrate legacy self-referrals ("submissions").
  if (await tableExists('submissions')) {
    const moved = await sql`
      INSERT INTO referrals (type, patient_name, patient_email, patient_phone, reason, created_at)
      SELECT 'self', s.name, s.email, s.phone, s.message, COALESCE(s.created_at, now())
      FROM submissions s
      WHERE NOT EXISTS (
        SELECT 1 FROM referrals r
        WHERE r.type = 'self' AND r.patient_name = s.name
          AND r.reason = s.message AND r.created_at = s.created_at
      )
      RETURNING id`;
    console.log(`migrated ${moved.length} row(s) from submissions`);
  } else {
    console.log('no legacy submissions table — skipping');
  }

  // 3. Migrate legacy GP referrals.
  if (await tableExists('gp_referrals')) {
    const moved = await sql`
      INSERT INTO referrals (type, urgency, patient_name, patient_dob, patient_nhs_number,
                             gp_name, gp_practice, gp_email, gp_phone, reason, created_at)
      SELECT 'gp',
             CASE WHEN g.urgency = 'urgent' THEN 'urgent' ELSE 'normal' END,
             g.patient_name, g.patient_dob, g.patient_nhs_number,
             g.gp_name, g.gp_practice, g.gp_email, g.gp_phone, g.reason,
             COALESCE(g.created_at, now())
      FROM gp_referrals g
      WHERE NOT EXISTS (
        SELECT 1 FROM referrals r
        WHERE r.type = 'gp' AND r.patient_name = g.patient_name
          AND r.reason = g.reason AND r.created_at = g.created_at
      )
      RETURNING id`;
    console.log(`migrated ${moved.length} row(s) from gp_referrals`);
  } else {
    console.log('no legacy gp_referrals table — skipping');
  }

  const [{ count }] = await sql`SELECT count(*)::int AS count FROM referrals`;
  console.log(`done — referrals table now holds ${count} row(s)`);
}

main().catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
