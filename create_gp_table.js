const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_r2SALp7lsNJd@ep-plain-hall-abr68bhp-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS gp_referrals (
        id SERIAL PRIMARY KEY,
        gp_name VARCHAR(255) NOT NULL,
        gp_practice VARCHAR(255) NOT NULL,
        gp_email VARCHAR(255) NOT NULL,
        gp_phone VARCHAR(50),
        patient_name VARCHAR(255) NOT NULL,
        patient_dob DATE,
        patient_nhs_number VARCHAR(20),
        reason TEXT NOT NULL,
        urgency VARCHAR(20) DEFAULT 'normal',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('gp_referrals table created successfully');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
