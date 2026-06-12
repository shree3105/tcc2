import { NextResponse } from 'next/server';
import { getSql, ensureSchema } from '@/lib/db';
import { integrations, practice } from '@/lib/config';

export const runtime = 'nodejs';

type Parsed = {
  type: 'self' | 'gp';
  urgency: 'normal' | 'urgent';
  patient_name: string;
  patient_dob: string | null;
  patient_email: string | null;
  patient_phone: string | null;
  patient_nhs_number: string | null;
  gp_name: string | null;
  gp_practice: string | null;
  gp_email: string | null;
  gp_phone: string | null;
  reason: string;
};

const str = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim().slice(0, max);
  return trimmed || null;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isIsoDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

/** Validates the raw body. Returns field errors keyed by input name. */
function parse(body: Record<string, unknown>): { data?: Parsed; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  const type = body.type === 'gp' ? 'gp' : body.type === 'self' ? 'self' : null;
  if (!type) errors.type = 'Unknown referral type.';

  const patient_name = str(body.patient_name, 200);
  if (!patient_name) errors.patient_name = 'Please enter the patient name.';

  const reason = str(body.reason, 5000);
  if (!reason) errors.reason = 'Please tell us the reason for the referral.';

  const patient_dob = str(body.patient_dob, 10);
  if (patient_dob && !isIsoDate(patient_dob)) errors.patient_dob = 'Date of birth is not a valid date.';

  const patient_email = str(body.patient_email, 320);
  if (patient_email && !isEmail(patient_email)) errors.patient_email = 'Email address looks incorrect.';

  const gp_email = str(body.gp_email, 320);
  const gp_name = str(body.gp_name, 200);
  const gp_practice = str(body.gp_practice, 300);

  if (type === 'gp') {
    if (!gp_name) errors.gp_name = 'Please enter the GP name.';
    if (!gp_practice) errors.gp_practice = 'Please enter the practice name.';
    if (!gp_email) errors.gp_email = 'Please enter the GP email.';
    else if (!isEmail(gp_email)) errors.gp_email = 'Email address looks incorrect.';
  }
  if (type === 'self' && !patient_email) {
    errors.patient_email = 'Please enter your email address.';
  }

  if (Object.keys(errors).length) return { errors };

  return {
    data: {
      type: type as 'self' | 'gp',
      urgency: body.urgency === 'urgent' ? 'urgent' : 'normal',
      patient_name: patient_name!,
      patient_dob,
      patient_email,
      patient_phone: str(body.patient_phone, 50),
      patient_nhs_number: str(body.patient_nhs_number, 20),
      gp_name,
      gp_practice,
      gp_email,
      gp_phone: str(body.gp_phone, 50),
      reason: reason!,
    },
  };
}

async function saveToDb(r: Parsed): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO referrals (
      type, urgency, patient_name, patient_dob, patient_email, patient_phone,
      patient_nhs_number, gp_name, gp_practice, gp_email, gp_phone, reason
    ) VALUES (
      ${r.type}, ${r.urgency}, ${r.patient_name}, ${r.patient_dob}, ${r.patient_email},
      ${r.patient_phone}, ${r.patient_nhs_number}, ${r.gp_name}, ${r.gp_practice},
      ${r.gp_email}, ${r.gp_phone}, ${r.reason}
    )`;
}

/** Emails the practice a copy via Web3Forms (sent server-side, not from the browser). */
async function sendEmail(r: Parsed): Promise<void> {
  if (!integrations.web3formsKey) throw new Error('No Web3Forms key configured');

  const fields: Record<string, string> =
    r.type === 'gp'
      ? {
          subject: `GP referral — ${r.patient_name}${r.urgency === 'urgent' ? ' (URGENT)' : ''}`,
          from_name: r.gp_name ?? 'GP referral',
          'GP name': r.gp_name ?? '',
          'GP practice': r.gp_practice ?? '',
          'GP email': r.gp_email ?? '',
          'GP phone': r.gp_phone ?? 'Not provided',
          'Patient name': r.patient_name,
          'Patient DOB': r.patient_dob ?? 'Not provided',
          'NHS number': r.patient_nhs_number ?? 'Not provided',
          Urgency: r.urgency,
          'Reason for referral': r.reason,
        }
      : {
          subject: `Self-referral — ${r.patient_name}`,
          from_name: r.patient_name,
          Name: r.patient_name,
          Email: r.patient_email ?? '',
          Phone: r.patient_phone ?? 'Not provided',
          Message: r.reason,
        };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: integrations.web3formsKey, ...fields }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error('Web3Forms rejected the submission');
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real patients never fill this hidden field. Pretend success so
  // bots don't learn they were caught.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const { data, errors } = parse(body);
  if (!data) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', fields: errors }, { status: 400 });
  }

  // Save to the database and email the practice independently, so a failure
  // in one channel never loses the referral.
  const [db, email] = await Promise.allSettled([saveToDb(data), sendEmail(data)]);

  if (db.status === 'rejected') console.error('Referral DB save failed:', (db.reason as Error)?.message);
  if (email.status === 'rejected') console.error('Referral email failed:', (email.reason as Error)?.message);

  if (db.status === 'fulfilled' || email.status === 'fulfilled') {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: `Sorry, something went wrong. Please try again or call us on ${practice.contact.phone}.` },
    { status: 500 },
  );
}
