import type { Metadata } from 'next';
import { practice, integrations, portalEnabled } from '@/lib/config';
import PageHero from '@/components/PageHero';
import BookAppointmentButton from '@/components/BookAppointmentButton';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact The Cardiology Clinic — Dr Sujata Khambekar, Consultant Cardiologist in Poole and Bournemouth. Phone, email and clinic locations.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle={practice.contact.responseTime}
      />

      <section className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="card p-8">
            <h2 className="font-serif text-2xl font-bold text-primary-900">Contact details</h2>
            <ul className="mt-6 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-500">Phone</p>
                  <a href={practice.contact.phoneHref} className="text-xl font-semibold text-primary-800 hover:underline">
                    {practice.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary-500">Email</p>
                  <a href={`mailto:${practice.contact.email}`} className="break-words text-xl font-semibold text-primary-800 hover:underline">
                    {practice.contact.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookAppointmentButton className="btn-primary" />
              {portalEnabled && (
                <a href={integrations.patientPortalUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Patient Portal
                </a>
              )}
            </div>
          </div>

          {/* Locations */}
          <div className="card p-8">
            <h2 className="font-serif text-2xl font-bold text-primary-900">Where to find us</h2>
            <p className="prose-lg-readable mt-3 text-base">
              {practice.consultant.name} sees patients at the following locations across Poole
              and Bournemouth:
            </p>
            <ul className="mt-5 space-y-4">
              {practice.locations.map((loc) => (
                <li key={loc} className="flex items-start gap-3 text-lg text-primary-800">
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-primary-600">
              Please contact us to confirm which location is best for your appointment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
