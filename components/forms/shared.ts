import { practice } from '@/lib/config';

export const fieldClass =
  'w-full rounded-lg border border-primary-200 px-4 py-3 text-lg text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300';
export const labelClass = 'mb-1.5 block text-base font-semibold text-primary-800';
export const legendClass =
  'mb-3 border-b border-primary-100 pb-2 font-serif text-lg font-semibold text-primary-900';

export type SubmitResult = {
  ok: boolean;
  /** Human-readable error to show above the button. */
  error?: string;
  /** Per-field validation messages keyed by input name. */
  fields?: Record<string, string>;
};

/** Posts a referral to our API, which saves it and emails the practice. */
export async function submitReferral(payload: Record<string, string>): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => null);
    if (res.ok && json?.success) return { ok: true };
    return {
      ok: false,
      error: json?.error ?? `Sorry, something went wrong. Please try again or call us on ${practice.contact.phone}.`,
      fields: json?.fields,
    };
  } catch {
    return {
      ok: false,
      error: `We could not reach the server. Please check your connection and try again, or call us on ${practice.contact.phone}.`,
    };
  }
}
