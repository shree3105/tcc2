import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import BookAppointmentButton from '@/components/BookAppointmentButton';

export const metadata: Metadata = {
  title: 'Conditions & Services',
  description:
    'Cardiology conditions assessed and tests offered by Dr Sujata Khambekar — including angina, atrial fibrillation, palpitations, heart failure, hypertension and cardiac imaging.',
};

const conditions: { title: string; body: string }[] = [
  { title: 'Cardiac Risk Assessment', body: 'A thorough review of your heart-health risk, including blood pressure, cholesterol, lifestyle and family history, with a personalised prevention plan.' },
  { title: 'Coronary Artery Disease & Angina', body: 'Assessment and management of chest pain and narrowed coronary arteries, including investigations and treatment planning.' },
  { title: 'Atrial Fibrillation', body: 'Diagnosis and management of irregular heart rhythms, including stroke-risk assessment and rhythm or rate control.' },
  { title: 'Hypertension & Cholesterol', body: 'Investigation and long-term control of high blood pressure and raised cholesterol to protect your heart and circulation.' },
  { title: 'Palpitations', body: 'Getting to the bottom of a racing, skipping or pounding heartbeat, using rhythm monitoring where needed.' },
  { title: 'Heart Failure', body: 'Diagnosis, optimisation of medication, and ongoing care to help you feel better and stay well.' },
  { title: 'Adult Congenital Heart Disease', body: 'Specialist follow-up and management for adults born with heart conditions.' },
  { title: 'Advanced Cardiac Imaging & CMR', body: 'Dr Khambekar performs and reports advanced cardiac imaging, including cardiac MRI (CMR) and echocardiography, to assess the structure and function of your heart in detail.' },
  { title: 'Remote Video & Telephone Consultations', body: 'Where it suits you, your consultation can take place by secure video or telephone — convenient for follow-ups, results and advice without travelling.' },
];

const investigations: string[] = [
  'ECG (electrocardiogram)',
  'Echocardiogram',
  'Cardiac MRI (CMR) — performed & reported',
  '24-hour & ambulatory ECG monitoring',
  '24-hour blood pressure monitoring',
  'Exercise / stress testing',
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Conditions & Services"
        title="Comprehensive cardiology care"
        subtitle="From a one-off heart-health check to the ongoing management of complex conditions, here are the areas we look after and the tests we can arrange."
      />

      <section className="container-page py-10">
        <h2 className="font-serif text-2xl font-bold text-primary-900">Conditions we treat</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {conditions.map((c) => (
            <div key={c.title} className="card p-6">
              <h3 className="font-serif text-xl font-semibold text-primary-900">{c.title}</h3>
              <p className="prose-lg-readable mt-2 text-base">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="container-page py-10">
          <h2 className="font-serif text-2xl font-bold text-primary-900">Tests &amp; investigations</h2>
          <p className="prose-lg-readable mt-3 max-w-3xl">
            Where further information is needed, the following investigations can be arranged
            quickly, often at the same location as your consultation.
          </p>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {investigations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-primary-800">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.29 6.3-6.29a1 1 0 011.4 0z" clipRule="evenodd" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card flex flex-col items-center gap-5 p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-primary-900">
            Not sure what you need?
          </h2>
          <p className="prose-lg-readable max-w-2xl">
            That is completely fine. Get in touch and we will guide you to the right
            appointment or test.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton className="btn-primary" />
            <Link href="/contact" className="btn-secondary">Ask a question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
