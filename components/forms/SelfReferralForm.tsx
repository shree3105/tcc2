'use client';

import { useState } from 'react';
import Link from 'next/link';
import { practice } from '@/lib/config';
import { fieldClass, labelClass, submitReferral } from './shared';

export default function SelfReferralForm() {
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
      type: 'self',
      patient_name: (data.get('patient_name') as string) ?? '',
      patient_email: (data.get('patient_email') as string) ?? '',
      patient_phone: (data.get('patient_phone') as string) ?? '',
      reason: (data.get('reason') as string) ?? '',
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
        <h3 className="font-serif text-2xl font-semibold text-primary-900">Thank you</h3>
        <p className="prose-lg-readable mt-2">
          Your request has been received. {practice.contact.responseTime}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Self-referral form" noValidate={false}>
      <div>
        <label htmlFor="sr-name" className={labelClass}>Full name *</label>
        <input id="sr-name" name="patient_name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
        {fieldErrors.patient_name && <p className="mt-1 text-red-700" role="alert">{fieldErrors.patient_name}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sr-email" className={labelClass}>Email *</label>
          <input id="sr-email" name="patient_email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
          {fieldErrors.patient_email && <p className="mt-1 text-red-700" role="alert">{fieldErrors.patient_email}</p>}
        </div>
        <div>
          <label htmlFor="sr-phone" className={labelClass}>Phone</label>
          <input id="sr-phone" name="patient_phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="Your phone number" />
        </div>
      </div>
      <div>
        <label htmlFor="sr-message" className={labelClass}>How can we help? *</label>
        <textarea id="sr-message" name="reason" required rows={5} className={`${fieldClass} resize-y`} placeholder="Please describe your symptoms or reason for the appointment…" />
        {fieldErrors.reason && <p className="mt-1 text-red-700" role="alert">{fieldErrors.reason}</p>}
      </div>

      {/* Honeypot — hidden from real users, catches simple spam bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sr-website">Website</label>
        <input id="sr-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Sending…' : 'Submit request'}
      </button>

      <p className="text-sm text-primary-600">
        We use your details only to arrange your appointment. See our{' '}
        <Link href="/privacy" className="underline hover:text-primary-800">privacy policy</Link>.
      </p>
    </form>
  );
}
