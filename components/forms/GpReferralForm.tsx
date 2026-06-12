'use client';

import { useState } from 'react';
import Link from 'next/link';
import { practice } from '@/lib/config';
import { fieldClass, labelClass, legendClass, submitReferral } from './shared';

export default function GpReferralForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const data = new FormData(e.currentTarget);
    const result = await submitReferral({
      type: 'gp',
      gp_name: (data.get('gp_name') as string) ?? '',
      gp_practice: (data.get('gp_practice') as string) ?? '',
      gp_email: (data.get('gp_email') as string) ?? '',
      gp_phone: (data.get('gp_phone') as string) ?? '',
      patient_name: (data.get('patient_name') as string) ?? '',
      patient_dob: (data.get('patient_dob') as string) ?? '',
      patient_nhs_number: (data.get('patient_nhs_number') as string) ?? '',
      reason: (data.get('reason') as string) ?? '',
      urgency: (data.get('urgency') as string) ?? 'normal',
      website: (data.get('website') as string) ?? '',
    });

    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.error ?? 'Sorry, something went wrong.');
      setFieldErrors(result.fields ?? {});
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-primary-900">Referral received</h3>
        <p className="prose-lg-readable mt-2">
          Thank you. We will review and respond — {practice.contact.responseTime.toLowerCase()}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" aria-label="GP referral form">
      <fieldset>
        <legend className={legendClass}>GP details</legend>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gp-name" className={labelClass}>GP name *</label>
              <input id="gp-name" name="gp_name" type="text" required className={fieldClass} placeholder="Dr John Smith" />
              {fieldErrors.gp_name && <p className="mt-1 text-red-700" role="alert">{fieldErrors.gp_name}</p>}
            </div>
            <div>
              <label htmlFor="gp-practice" className={labelClass}>Practice *</label>
              <input id="gp-practice" name="gp_practice" type="text" required className={fieldClass} placeholder="Practice name" />
              {fieldErrors.gp_practice && <p className="mt-1 text-red-700" role="alert">{fieldErrors.gp_practice}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gp-email" className={labelClass}>GP email *</label>
              <input id="gp-email" name="gp_email" type="email" required className={fieldClass} placeholder="gp@practice.nhs.uk" />
              {fieldErrors.gp_email && <p className="mt-1 text-red-700" role="alert">{fieldErrors.gp_email}</p>}
            </div>
            <div>
              <label htmlFor="gp-phone" className={labelClass}>GP phone</label>
              <input id="gp-phone" name="gp_phone" type="tel" className={fieldClass} placeholder="Phone number" />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>Patient details</legend>
        <div className="space-y-4">
          <div>
            <label htmlFor="pt-name" className={labelClass}>Patient name *</label>
            <input id="pt-name" name="patient_name" type="text" required className={fieldClass} placeholder="Patient full name" />
            {fieldErrors.patient_name && <p className="mt-1 text-red-700" role="alert">{fieldErrors.patient_name}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pt-dob" className={labelClass}>Date of birth</label>
              <input id="pt-dob" name="patient_dob" type="date" className={fieldClass} />
              {fieldErrors.patient_dob && <p className="mt-1 text-red-700" role="alert">{fieldErrors.patient_dob}</p>}
            </div>
            <div>
              <label htmlFor="pt-nhs" className={labelClass}>NHS number</label>
              <input id="pt-nhs" name="patient_nhs_number" type="text" className={fieldClass} placeholder="e.g. 485 777 3456" />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend className={legendClass}>Referral details</legend>
        <div className="space-y-4">
          <div>
            <label htmlFor="ref-urgency" className={labelClass}>Urgency</label>
            <select id="ref-urgency" name="urgency" defaultValue="normal" className={`${fieldClass} bg-white`}>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label htmlFor="ref-reason" className={labelClass}>Reason for referral / clinical details *</label>
            <textarea id="ref-reason" name="reason" required rows={5} className={`${fieldClass} resize-y`} placeholder="Clinical details, relevant history, current medications, and reason for referral…" />
            {fieldErrors.reason && <p className="mt-1 text-red-700" role="alert">{fieldErrors.reason}</p>}
          </div>
        </div>
      </fieldset>

      {/* Honeypot — hidden from real users, catches simple spam bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="gp-website">Website</label>
        <input id="gp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Submitting…' : 'Submit GP referral'}
      </button>

      <p className="text-sm text-primary-600">
        Referral details are used only to arrange this patient&rsquo;s care. See our{' '}
        <Link href="/privacy" className="underline hover:text-primary-800">privacy policy</Link>.
      </p>
    </form>
  );
}
