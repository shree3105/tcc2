'use client';

import { useState } from 'react';
import { integrations, practice } from '@/lib/config';

const fieldClass =
  'w-full rounded-lg border border-primary-200 px-4 py-3 text-lg text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300';
const labelClass = 'mb-1.5 block text-base font-semibold text-primary-800';

export default function SelfReferralForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      message: data.get('message') as string,
    };

    // Save to Neon and email the practice independently, so a failure in one
    // channel never prevents the other.
    const saveToDb = fetch('/api/self-refer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.ok)
      .catch(() => false);

    const sendEmail = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: integrations.web3formsKey,
        subject: `New self-referral – ${payload.name}`,
        from_name: payload.name,
        ...payload,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => Boolean(j && j.success))
      .catch(() => false);

    const [dbOk, emailOk] = await Promise.all([saveToDb, sendEmail]);

    if (dbOk || emailOk) {
      setSubmitted(true);
    } else {
      setError(true);
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
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Self-referral form">
      <div>
        <label htmlFor="sr-name" className={labelClass}>Full name *</label>
        <input id="sr-name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sr-email" className={labelClass}>Email *</label>
          <input id="sr-email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="sr-phone" className={labelClass}>Phone</label>
          <input id="sr-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="Your phone number" />
        </div>
      </div>
      <div>
        <label htmlFor="sr-message" className={labelClass}>How can we help? *</label>
        <textarea id="sr-message" name="message" required rows={5} className={`${fieldClass} resize-y`} placeholder="Please describe your symptoms or reason for the appointment…" />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">
          Sorry, something went wrong. Please try again or call us on {practice.contact.phone}.
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Sending…' : 'Submit request'}
      </button>
    </form>
  );
}
