import type { Metadata } from 'next';
import { practice } from '@/lib/config';
import PageHero from '@/components/PageHero';
import SelfReferralForm from '@/components/forms/SelfReferralForm';
import GpReferralForm from '@/components/forms/GpReferralForm';

export const metadata: Metadata = {
  title: 'Referrals',
  description:
    'Refer yourself or, for GPs, refer a patient to Dr Sujata Khambekar. Quick, secure online referral forms.',
};

export default function ReferralsPage() {
  return (
    <>
      <PageHero
        eyebrow="Referrals"
        title="Make a referral"
        subtitle={`Whether you are a patient or a referring GP, our online forms take just a couple of minutes. ${practice.contact.responseTime}`}
      />

      <section className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Self referral */}
          <div className="card p-8">
            <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700">
              For patients
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-primary-900">Refer yourself</h2>
            <p className="prose-lg-readable mt-2 text-base">
              No GP letter needed. Tell us a little about yourself and we will be in touch to
              arrange your appointment — in person, or by secure video or telephone.
            </p>
            <div className="mt-6">
              <SelfReferralForm />
            </div>
          </div>

          {/* GP referral */}
          <div className="card p-8">
            <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700">
              For GPs
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold text-primary-900">GP referral</h2>
            <p className="prose-lg-readable mt-2 text-base">
              For referring clinicians. Please provide the patient and clinical details below
              and we will respond promptly.
            </p>
            <div className="mt-6">
              <GpReferralForm />
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-primary-600">
          Prefer to talk to us? Call{' '}
          <a href={practice.contact.phoneHref} className="font-semibold text-primary-700 hover:underline">
            {practice.contact.phone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${practice.contact.email}`} className="font-semibold text-primary-700 hover:underline">
            {practice.contact.email}
          </a>
        </p>
      </section>
    </>
  );
}
