'use client';

import { useState } from 'react';
import { integrations, practice } from '@/lib/config';

const fieldClass =
  'w-full rounded-lg border border-primary-200 px-4 py-3 text-lg text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300';
const labelClass = 'mb-1.5 block text-base font-semibold text-primary-800';
const legendClass =
  'mb-3 border-b border-primary-100 pb-2 font-serif text-lg font-semibold text-primary-900';

export default function GpReferralForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const data = new FormData(e.currentTarget);
    const gp = {
      gp_name: data.get('gp_name') as string,
      gp_practice: data.get('gp_practice') as string,
      gp_email: data.get('gp_email') as string,
      gp_phone: data.get('gp_phone') as string,
      patient_name: data.get('patient_name') as string,
      patient_dob: data.get('patient_dob') as string,
      patient_nhs_number: data.get('patient_nhs_number') as string,
      reason: data.get('reason') as string,
      urgency: data.get('urgency') as string,
    };

    try {
      await fetch('/api/gp-refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gp),
      });

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: integrations.web3formsKey,
          subject: `GP Referral – ${gp.patient_name} (${gp.urgency === 'urgent' ? 'URGENT' : 'Normal'})`,
          from_name: gp.gp_name,
          'GP Name': gp.gp_name,
          'GP Practice': gp.gp_practice,
          'GP Email': gp.gp_email,
          'GP Phone': gp.gp_phone,
          'Patient Name': gp.patient_name,
          'Patient DOB': gp.patient_dob || 'Not provided',
          'Patient NHS Number': gp.patient_nhs_number || 'Not provided',
          'Reason for Referral': gp.reason,
          Urgency: gp.urgency,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('GP referral submission error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
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
            </div>
            <div>
              <label htmlFor="gp-practice" className={labelClass}>Practice *</label>
              <input id="gp-practice" name="gp_practice" type="text" required className={fieldClass} placeholder="Practice name" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gp-email" className={labelClass}>GP email *</label>
              <input id="gp-email" name="gp_email" type="email" required className={fieldClass} placeholder="gp@practice.nhs.uk" />
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pt-dob" className={labelClass}>Date of birth</label>
              <input id="pt-dob" name="patient_dob" type="date" className={fieldClass} />
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
          </div>
        </div>
      </fieldset>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">
          Sorry, something went wrong. Please try again or call us on {practice.contact.phone}.
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Submitting…' : 'Submit GP referral'}
      </button>
    </form>
  );
}
