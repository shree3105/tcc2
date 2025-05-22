import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();
    console.log('Logging to Supabase:', { name, email, phone, message });

    const { error } = await supabase.from('submissions').insert([
      { name, email, phone, message }
    ]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Unexpected error in API route:', err.message);
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
