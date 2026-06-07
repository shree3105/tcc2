import Link from 'next/link';
import { bookingHref, integrations } from '@/lib/config';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * Primary call-to-action. Points to the in-site /book page when a booking
 * provider is configured; otherwise falls back to the referral flow.
 * If an external (non-embed) booking URL is set, it opens in a new tab.
 */
export default function BookAppointmentButton({ className = 'btn-primary', children }: Props) {
  const href = bookingHref();
  const isExternalOnly = !integrations.bookingEmbedUrl && Boolean(integrations.bookingUrl);

  const label = children ?? (
    <>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Book Appointment
    </>
  );

  if (isExternalOnly) {
    return (
      <a className={className} href={integrations.bookingUrl} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}
