import Link from 'next/link';
import { integrations, practice } from '@/lib/config';

/**
 * Renders the online booking experience based on what is configured:
 *  1. An embedded provider widget (Carebit / Semble iframe), or
 *  2. A button linking out to the provider's booking page, or
 *  3. A graceful fallback pointing patients to phone / referral.
 */
export default function BookingWidget() {
  if (integrations.bookingEmbedUrl) {
    return (
      <div className="card overflow-hidden">
        <iframe
          src={integrations.bookingEmbedUrl}
          title="Book an appointment"
          className="h-[80vh] min-h-[640px] w-full border-0"
          loading="lazy"
          allow="payment"
        />
      </div>
    );
  }

  if (integrations.bookingUrl) {
    return (
      <div className="card p-8 text-center">
        <p className="prose-lg-readable">
          Booking opens with our secure scheduling partner in a new window.
        </p>
        <a
          href={integrations.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Continue to booking
        </a>
      </div>
    );
  }

  // No provider configured yet — keep patients moving without a dead end.
  return (
    <div className="card p-8">
      <h2 className="font-serif text-2xl font-semibold text-primary-900">
        Request an appointment
      </h2>
      <p className="prose-lg-readable mt-3">
        Online self-booking is coming soon. In the meantime we’d be glad to arrange
        your appointment by phone or referral — {practice.contact.responseTime.toLowerCase()}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={practice.contact.phoneHref} className="btn-primary">
          Call {practice.contact.phone}
        </a>
        <Link href="/referrals" className="btn-secondary">
          Make a referral online
        </Link>
      </div>
    </div>
  );
}
