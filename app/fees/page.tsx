import type { Metadata } from 'next';
import Link from 'next/link';
import { practice, insurers, integrations, payInvoiceEnabled } from '@/lib/config';
import PageHero from '@/components/PageHero';
import BookAppointmentButton from '@/components/BookAppointmentButton';

export const metadata: Metadata = {
  title: 'Fees & Insurance',
  description:
    'Private cardiology fees and insurance information. Dr Sujata Khambekar is recognised by all major insurers and welcomes self-paying patients.',
};

export default function FeesPage() {
  return (
    <>
      <PageHero
        eyebrow="Fees & Insurance"
        title="Clear, straightforward fees"
        subtitle="We welcome both insured and self-paying patients, with transparent pricing and no hidden surprises."
      />

      <section className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Insured patients */}
          <div className="card p-8">
            <h2 className="font-serif text-2xl font-bold text-primary-900">Insured patients</h2>
            <p className="prose-lg-readable mt-3">
              {practice.consultant.name} is recognised by all major private medical insurers.
              If you are using insurance, please contact your insurer before your appointment
              to obtain a <strong>pre-authorisation / membership number</strong> and confirm
              your cover.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              {insurers.map((p) => (
                <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.alt} className="transition-opacity hover:opacity-70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="h-8 w-auto object-contain" />
                </a>
              ))}
            </div>
          </div>

          {/* Self-paying patients */}
          <div className="card p-8">
            <h2 className="font-serif text-2xl font-bold text-primary-900">Self-paying patients</h2>
            <p className="prose-lg-readable mt-3">
              You do not need insurance or a GP referral to be seen privately. Self-pay gives
              you fast access to a consultant, often within days.
            </p>
            <ul className="prose-lg-readable mt-4 space-y-2 text-base">
              <li>• Initial consultation &amp; follow-up fees available on request</li>
              <li>• Transparent pricing for tests and investigations</li>
              <li>• A clear estimate provided before any test is arranged</li>
            </ul>
            <a href={`mailto:${practice.contact.email}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-700 hover:underline">
              Request our current fees <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Pay an invoice — integration-ready slot */}
        {payInvoiceEnabled && (
          <div className="card mt-8 flex flex-col items-center gap-4 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary-900">Pay an invoice</h2>
            <p className="prose-lg-readable max-w-2xl">
              Settle your account securely online through our payment partner.
            </p>
            <a href={integrations.payInvoiceUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Pay online securely
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="prose-lg-readable">Have a question about fees or cover?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton className="btn-primary" />
            <Link href="/contact" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
