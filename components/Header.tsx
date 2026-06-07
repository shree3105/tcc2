'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { practice, integrations, portalEnabled } from '@/lib/config';
import BookAppointmentButton from '@/components/BookAppointmentButton';

const navLinks = [
  { href: '/about', label: 'About', short: 'About' },
  { href: '/services', label: 'Conditions & Services', short: 'Conditions' },
  { href: '/fees', label: 'Fees & Insurance', short: 'Fees' },
  { href: '/patient-info', label: 'Patient Information', short: 'Patient Info' },
  { href: '/referrals', label: 'Referrals', short: 'Referrals' },
  { href: '/contact', label: 'Contact', short: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-tight" aria-label={`${practice.name} — home`}>
            <span className="font-serif text-lg font-semibold text-primary-900 sm:text-xl">
              {practice.name}
            </span>
            <span className="hidden whitespace-nowrap text-xs text-primary-600 sm:block">
              {practice.consultant.name} · {practice.consultant.title}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-2.5 py-1.5 text-[0.95rem] font-medium transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-800'
                      : 'text-primary-700 hover:bg-primary-50 hover:text-primary-900'
                  }`}
                >
                  {link.short}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            {portalEnabled && (
              <a
                href={integrations.patientPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-primary-200 px-4 py-2 text-base font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                Patient Portal
              </a>
            )}
            <BookAppointmentButton className="btn-primary !px-4 !py-2 !text-sm" />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-primary-700 hover:bg-primary-50 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-primary-100 bg-white xl:hidden"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-4 py-3.5 text-lg font-medium ${
                    active ? 'bg-primary-50 text-primary-800' : 'text-primary-800 hover:bg-primary-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-3">
              {portalEnabled && (
                <a
                  href={integrations.patientPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  Patient Portal
                </a>
              )}
              <BookAppointmentButton className="btn-primary w-full" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
