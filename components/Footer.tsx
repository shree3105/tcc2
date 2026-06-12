import Link from 'next/link';
import Image from 'next/image';
import { practice, insurers, integrations, portalEnabled } from '@/lib/config';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-primary-100 bg-white">
      {/* Insurance partners */}
      <div className="border-b border-primary-100 bg-sand-50">
        <div className="container-page py-10">
          <h2 className="text-center font-serif text-xl font-semibold text-primary-900">
            Recognised by all major insurers
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {insurers.map((p) => (
              <a
                key={p.alt}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label={p.alt}
              >
                <Image src={p.src} alt={p.alt} className="h-9 w-auto object-contain" sizes="120px" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-primary-900">{practice.name}</h3>
          <p className="mt-2 text-primary-700">{practice.consultant.name}</p>
          <p className="text-sm text-primary-600">
            {practice.consultant.credentials} · {practice.consultant.title}
          </p>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold text-primary-900">Contact</h3>
          <ul className="mt-2 space-y-2 text-primary-700">
            <li>
              <a className="hover:text-primary-900 hover:underline" href={practice.contact.phoneHref}>
                {practice.contact.phone}
              </a>
            </li>
            <li>
              <a className="break-words hover:text-primary-900 hover:underline" href={`mailto:${practice.contact.email}`}>
                {practice.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold text-primary-900">Where to find us</h3>
          <ul className="mt-2 space-y-1.5 text-primary-700">
            {practice.locations.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg font-semibold text-primary-900">Quick links</h3>
          <ul className="mt-2 space-y-1.5 text-primary-700">
            <li><Link className="hover:text-primary-900 hover:underline" href="/about">About Dr Khambekar</Link></li>
            <li><Link className="hover:text-primary-900 hover:underline" href="/services">Conditions &amp; Services</Link></li>
            <li><Link className="hover:text-primary-900 hover:underline" href="/fees">Fees &amp; Insurance</Link></li>
            <li><Link className="hover:text-primary-900 hover:underline" href="/referrals">Make a Referral</Link></li>
            <li><Link className="hover:text-primary-900 hover:underline" href="/privacy">Privacy Policy</Link></li>
            {portalEnabled && (
              <li>
                <a className="hover:text-primary-900 hover:underline" href={integrations.patientPortalUrl} target="_blank" rel="noopener noreferrer">
                  Patient Portal
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-center text-sm text-primary-600 sm:flex-row sm:text-left">
          <p>© 2019–{year} {practice.name}. All rights reserved.</p>
          <p>Registered with the General Medical Council (GMC).</p>
        </div>
      </div>
    </footer>
  );
}
