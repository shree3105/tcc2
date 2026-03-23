import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const {
      gp_name,
      gp_practice,
      gp_email,
      gp_phone,
      patient_name,
      patient_dob,
      patient_nhs_number,
      reason,
      urgency,
    } = await req.json();

    console.log('GP Referral received:', { gp_name, gp_practice, patient_name });

    const client = await pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO gp_referrals 
          (gp_name, gp_practice, gp_email, gp_phone, patient_name, patient_dob, patient_nhs_number, reason, urgency, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) 
         RETURNING *`,
        [gp_name, gp_practice, gp_email, gp_phone, patient_name, patient_dob || null, patient_nhs_number || null, reason, urgency || 'normal']
      );

      console.log('GP Referral inserted:', result.rows[0]);
      return NextResponse.json({ success: true, id: result.rows[0].id });
    } finally {
      client.release();
    }
  } catch (err) {
    const error = err as Error;
    console.error('GP Referral API error:', error.message);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
