import type { Metadata } from 'next';
import { practice } from '@/lib/config';
import PageHero from '@/components/PageHero';
import BookingWidget from '@/components/BookingWidget';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Book a private cardiology appointment with Dr Sujata Khambekar in Poole and Bournemouth.',
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book an appointment"
        subtitle={`Arrange your consultation with ${practice.consultant.name}. ${practice.contact.responseTime}`}
      />
      <section className="container-page py-14">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 flex items-center gap-2.5 rounded-xl bg-primary-50 px-5 py-4 text-lg text-primary-800">
            <svg className="h-6 w-6 flex-shrink-0 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Appointments are available <strong className="font-semibold">in person</strong> or by
            <strong className="font-semibold">&nbsp;secure video and telephone</strong> consultation.
          </p>
          <BookingWidget />
        </div>
      </section>
    </>
  );
}
