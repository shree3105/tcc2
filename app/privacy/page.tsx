import type { Metadata } from 'next';
import { practice } from '@/lib/config';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How The Cardiology Clinic collects, uses and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        subtitle="How we look after the information you share with us."
      />

      <section className="container-page py-10">
        <div className="prose-lg-readable mx-auto max-w-3xl space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Who we are</h2>
            <p className="mt-3">
              {practice.name} is the private cardiology practice of {practice.consultant.name},{' '}
              {practice.consultant.title}. We are the data controller for the personal
              information collected through this website. You can contact us about anything in
              this policy at{' '}
              <a className="font-semibold text-primary-700 underline" href={`mailto:${practice.contact.email}`}>
                {practice.contact.email}
              </a>{' '}
              or on{' '}
              <a className="font-semibold text-primary-700 underline" href={practice.contact.phoneHref}>
                {practice.contact.phone}
              </a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">What we collect and why</h2>
            <p className="mt-3">
              When you (or your GP) complete a referral or appointment request on this site, we
              collect the details entered on the form — such as names, contact details, date of
              birth, NHS number and the reason for the referral. We use this information for
              one purpose only: <strong>to arrange and provide your care</strong>. We do not
              use it for marketing, and we never sell or share it for advertising.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Where it is stored</h2>
            <p className="mt-3">
              Form submissions are stored in a secure, encrypted database hosted in the United
              Kingdom (London region), and a copy is sent to the practice by email so we can
              respond promptly. Access is restricted to the practice team involved in arranging
              your appointment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">How long we keep it</h2>
            <p className="mt-3">
              Information that becomes part of your medical record is retained in line with
              standard UK medical record-keeping requirements. Enquiries that do not lead to an
              appointment are deleted once they are no longer needed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Your rights</h2>
            <p className="mt-3">
              Under UK data protection law (UK GDPR), you have the right to access the personal
              information we hold about you, to ask us to correct it, and in certain
              circumstances to ask us to delete it or restrict how we use it. To exercise any
              of these rights, please contact us using the details above. You also have the
              right to complain to the Information Commissioner&rsquo;s Office (ICO) at{' '}
              <a className="font-semibold text-primary-700 underline" href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">Cookies and third parties</h2>
            <p className="mt-3">
              This website does not use advertising or tracking cookies. The patient-review
              carousel on our home page is provided by Doctify and loads directly from their
              service; it does not receive any information you enter on our forms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
