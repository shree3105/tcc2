import type { Metadata } from 'next';
import Link from 'next/link';
import { practice } from '@/lib/config';
import PageHero from '@/components/PageHero';
import BookAppointmentButton from '@/components/BookAppointmentButton';

export const metadata: Metadata = {
  title: 'About Dr Sujata Khambekar',
  description:
    'Dr Sujata Khambekar MBBS, MD (Med), DNB, FRCP — Consultant Cardiologist in Poole and Bournemouth.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={practice.consultant.name}
        subtitle={`${practice.consultant.credentials} · ${practice.consultant.title}`}
      />

      <section className="container-page py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Photo + facts */}
          <div className="lg:col-span-1">
            <div className="mx-auto max-w-sm overflow-hidden rounded-2xl shadow-card lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={practice.consultant.photo}
                alt={`${practice.consultant.name}, ${practice.consultant.title}`}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="card mt-6 p-6">
              <h2 className="font-serif text-lg font-semibold text-primary-900">At a glance</h2>
              <dl className="mt-3 space-y-3 text-primary-800">
                <div>
                  <dt className="text-sm font-semibold text-primary-500">Qualifications</dt>
                  <dd>{practice.consultant.credentials}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-primary-500">Practising at</dt>
                  <dd>
                    <ul className="space-y-1">
                      {practice.locations.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-primary-500">Insurance</dt>
                  <dd>Recognised by all major insurers</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Biography */}
          <div className="lg:col-span-2">
            <div className="prose-lg-readable space-y-5">
              <p>
                {practice.consultant.name} is an experienced Consultant Cardiologist providing
                private cardiology care across Poole and Bournemouth. She offers comprehensive
                assessment, investigation and management of the full range of adult heart
                conditions.
              </p>
              <p>
                Patients value her thorough, approachable manner and her commitment to
                explaining things clearly. She takes the time to listen, to understand your
                concerns, and to make sure you leave each appointment knowing exactly what is
                happening and why.
              </p>
              <p>
                {practice.consultant.name} welcomes both GP referrals and self-referrals, and
                is recognised by all major private medical insurers. Appointments are available
                in person at her Poole and Bournemouth locations, or by secure video and
                telephone consultation where that suits you better.
              </p>
            </div>

            <h2 className="mt-10 font-serif text-2xl font-bold text-primary-900">
              Special interests
            </h2>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {practice.areasOfInterest.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-primary-800">
                  <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4l2.3 2.29 6.3-6.29a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <BookAppointmentButton className="btn-primary" />
              <Link href="/services" className="btn-secondary">
                Conditions &amp; services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
