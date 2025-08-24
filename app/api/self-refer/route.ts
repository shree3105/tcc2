import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();
    console.log('Logging to Neon DB:', { name, email, phone, message });

    const client = await pool.connect();
    
    try {
      const result = await client.query(
        'INSERT INTO submissions (name, email, phone, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
        [name, email, phone, message]
      );
      
      console.log('Successfully inserted:', result.rows[0]);
      return NextResponse.json({ success: true, id: result.rows[0].id });
    } finally {
      client.release();
    }
  } catch (err) {
    const error = err as Error;
    console.error('Unexpected error in API route:', error.message);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
