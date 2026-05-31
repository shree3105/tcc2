import type { Metadata } from 'next';
import { practice } from '@/lib/config';
import PageHero from '@/components/PageHero';
import BookAppointmentButton from '@/components/BookAppointmentButton';

export const metadata: Metadata = {
  title: 'Patient Information',
  description:
    'What to expect at your cardiology appointment, what to bring, and answers to common questions.',
};

const bring: string[] = [
  'A list of your current medications (or the boxes themselves)',
  'Any recent test results, ECGs or letters you have',
  'Your insurance details and pre-authorisation number, if applicable',
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'Do I need a referral from my GP?',
    a: 'No. While we welcome GP referrals, you are also very welcome to refer yourself. Some insurers may ask for a GP referral, so it is worth checking with them first if you are using insurance.',
  },
  {
    q: 'How quickly can I be seen?',
    a: 'We aim to offer appointments promptly, often within a few days. We respond to all enquiries the same day or within 24 hours.',
  },
  {
    q: 'How long will my appointment take?',
    a: 'A first consultation usually lasts around 30 minutes, giving plenty of time to discuss your symptoms, examine you, and explain the plan. Some tests may be done at the same visit.',
  },
  {
    q: 'Will I have tests on the day?',
    a: 'Often, yes. Simple tests such as an ECG or echocardiogram can frequently be arranged at the same location, sometimes during the same visit.',
  },
  {
    q: 'Do you offer video or telephone consultations?',
    a: 'Yes. Where it is clinically appropriate, your appointment can take place by secure video or telephone — convenient for follow-ups, discussing results and advice without the need to travel. Just let us know your preference when you book.',
  },
];

export default function PatientInfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Information"
        title="What to expect"
        subtitle="A little preparation helps us make the most of your appointment. Here is everything you need to know."
      />

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Your appointment</h2>
            <p className="prose-lg-readable mt-3">
              From the moment you arrive you will be looked after with care. {practice.consultant.name}{' '}
              will talk through your symptoms and history, carry out an examination, and arrange
              any tests you need. You will leave with a clear understanding of what happens next.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="font-serif text-2xl font-bold text-primary-900">What to bring</h2>
            <ul className="mt-4 space-y-3">
              {bring.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-primary-800">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.29 6.3-6.29a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white">
        <div className="container-page py-14">
          <h2 className="font-serif text-2xl font-bold text-primary-900">Common questions</h2>
          <div className="mt-6 divide-y divide-primary-100">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-primary-900">
                  {f.q}
                  <svg className="h-6 w-6 flex-shrink-0 text-primary-500 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="prose-lg-readable mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent notice */}
      <section className="container-page py-14">
        <div className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-6">
          <h2 className="font-serif text-xl font-bold text-red-800">Feeling unwell right now?</h2>
          <p className="mt-2 text-lg text-red-900">
            This website is for arranging routine private appointments and is not for
            emergencies. If you have severe chest pain, breathlessness or think you may be
            having a heart attack, call <strong>999</strong> immediately, or contact NHS{' '}
            <strong>111</strong> for urgent medical advice.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <BookAppointmentButton className="btn-primary" />
        </div>
      </section>
    </>
  );
}
