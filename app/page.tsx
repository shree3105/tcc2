import Link from 'next/link';
import Image from 'next/image';
import awardBadge from '@/public/ptexperience.png';
import { practice } from '@/lib/config';
import BookAppointmentButton from '@/components/BookAppointmentButton';
import Reviews from '@/components/Reviews';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-sand-50">
        <div className="container-page grid items-center gap-8 py-10 md:grid-cols-2 md:py-16 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
              Consultant Cardiologist · Poole &amp; Bournemouth
            </p>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-primary-900 sm:text-4xl lg:text-5xl">
              Expert heart care, with time to listen
            </h1>
            <p className="prose-lg-readable mt-5 max-w-xl">
              {practice.consultant.name} is an experienced Consultant Cardiologist offering
              prompt, personal private cardiology appointments across Poole and Bournemouth —
              for patients and referring GPs alike.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookAppointmentButton className="btn-primary" />
              <Link href="/referrals" className="btn-secondary">
                Make a referral
              </Link>
            </div>
            <p className="mt-5 text-base text-primary-600">
              {practice.contact.responseTime} Call{' '}
              <a href={practice.contact.phoneHref} className="font-semibold text-primary-700 hover:underline">
                {practice.contact.phone}
              </a>
            </p>
            <p className="mt-2 text-base text-primary-600">
              Appointments in person, or by secure video and telephone.
            </p>
          </div>

          {/* Photo — fixed aspect ratio so it stays balanced on every device */}
          <div className="relative mx-auto w-full max-w-sm md:order-last md:max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <Image
                src={practice.consultant.photo}
                alt={`${practice.consultant.name}, ${practice.consultant.title}`}
                className="aspect-[4/5] w-full object-cover object-top"
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            {/* Award badge */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-xl bg-white p-3 shadow-card sm:block">
              <Image src={awardBadge} alt="Doctify Great Patient Experience Award 2026" className="h-16 w-auto lg:h-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-primary-100 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-8 text-center sm:grid-cols-4">
          {[
            { stat: '25+ yrs', label: 'Clinical experience' },
            { stat: 'Same day', label: 'Response to enquiries' },
            { stat: 'All insurers', label: 'Recognised provider' },
            { stat: '5★', label: 'Doctify patient rating' },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-serif text-2xl font-bold text-primary-700 sm:text-3xl">{item.stat}</p>
              <p className="mt-1 text-sm text-primary-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="container-page py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary-900">
              About {practice.consultant.name}
            </h2>
            <p className="prose-lg-readable mt-4">
              {practice.consultant.name} {practice.consultant.credentials} is a Consultant
              Cardiologist practising at {practice.locations.join(', ')}. She provides a full
              range of cardiac assessments and investigations, with a reputation for clear
              explanations and a calm, unhurried approach.
            </p>
            <p className="prose-lg-readable mt-4">
              Whether you have been referred by your GP or are arranging an appointment
              yourself, you will be seen promptly and looked after with care.
            </p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-primary-700 hover:underline">
              Read more about Dr Khambekar
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="card p-8">
            <h3 className="font-serif text-xl font-semibold text-primary-900">Areas of expertise</h3>
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
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-700 hover:underline">
              View conditions &amp; services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="container-page py-12">
          <h2 className="text-center font-serif text-2xl font-bold text-primary-900">
            Getting seen is simple
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { n: '1', title: 'Get in touch', body: 'Book an appointment, refer yourself, or ask your GP to refer you using our quick online form.' },
              { n: '2', title: 'Be seen promptly', body: 'You will be offered a convenient appointment at one of our Poole or Bournemouth locations.' },
              { n: '3', title: 'Clear next steps', body: 'You will receive a thorough assessment, any tests you need, and a clear plan explained in plain English.' },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 font-serif text-2xl font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-primary-900">{step.title}</h3>
                <p className="prose-lg-readable mt-2 text-base">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-page py-12">
        <h2 className="text-center font-serif text-2xl font-bold text-primary-900">
          What our patients say
        </h2>
        <p className="mt-3 text-center text-primary-600">Independent reviews via Doctify</p>
        <div className="mt-8">
          <Reviews />
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary-700">
        <div className="container-page flex flex-col items-center gap-5 py-12 text-center">
          <h2 className="font-serif text-2xl font-bold text-white">
            Ready to take the next step?
          </h2>
          <p className="max-w-2xl text-primary-100">
            Arrange your cardiology appointment today, or make a referral online. We aim to
            respond the same day.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton className="btn bg-white text-primary-700 hover:bg-primary-50" />
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-primary-600">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
