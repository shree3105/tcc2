/**
 * Central practice configuration.
 *
 * One place to edit clinic details, and the single source of truth for the
 * third-party integration layer (booking / patient portal / payments).
 *
 * --- How the integrations work ---------------------------------------------
 * Everything is driven by environment variables so a provider (Carebit,
 * Semble, TouchPoints.health, iMedDoc, …) can be "slotted in" later with zero
 * code changes. Until a variable is set, the UI gracefully falls back to the
 * existing referral / contact flow.
 *
 *   NEXT_PUBLIC_BOOKING_EMBED_URL   -> if set, the booking page embeds this URL
 *                                      in an iframe (Carebit/Semble booking widget).
 *   NEXT_PUBLIC_BOOKING_URL         -> if set (and no embed URL), "Book Appointment"
 *                                      buttons link out to this URL in a new tab.
 *   NEXT_PUBLIC_PATIENT_PORTAL_URL  -> if set, a "Patient Portal" link appears in
 *                                      the header/footer (provider's hosted portal).
 *   NEXT_PUBLIC_PAY_INVOICE_URL     -> if set, a "Pay an invoice" link appears on
 *                                      the Fees page (provider's payment page/portal).
 *
 * See INTEGRATIONS.md for provider-specific setup notes.
 * ---------------------------------------------------------------------------
 */

export const practice = {
  name: 'The Cardiology Clinic',
  consultant: {
    name: 'Dr Sujata Khambekar',
    credentials: 'MBBS, MD (Med), DNB, FRCP',
    title: 'Consultant Cardiologist',
    photo: '/Photo.jpg',
  },
  tagline: 'Expert, compassionate cardiology care in Poole & Bournemouth',
  contact: {
    email: 'appointments@thecardiology.clinic',
    phone: '0776 151 3391',
    phoneHref: 'tel:+447761513391',
    responseTime: 'We aim to respond the same day or within 24 hours.',
  },
  locations: [
    'Nuffield Health Bournemouth Hospital',
    'Harbour Hospital, Poole',
    'Dorset Heart Clinic',
  ],
  areasOfInterest: [
    'Cardiac Risk Assessment',
    'Coronary Artery Disease & Angina',
    'Atrial Fibrillation',
    'Hypertension & Cholesterol Control',
    'Palpitations',
    'Heart Failure',
    'Adult Congenital Heart Disease',
    'Advanced Cardiac Imaging & CMR',
  ],
} as const;

export const insurers: { src: string; alt: string; href: string }[] = [
  { src: '/AVIVA-logo.jpg', alt: 'Aviva', href: 'https://www.aviva.co.uk/health/health-products/health-insurance/' },
  { src: '/AXA-logo.jpg', alt: 'AXA Health', href: 'https://www.axahealth.co.uk/' },
  { src: '/Cigna_logo.webp', alt: 'Cigna', href: 'https://www.cigna.co.uk/' },
  { src: '/healix-logo.jpg', alt: 'Healix', href: 'https://healixhealthservices.co.uk/' },
  { src: '/simplyhealth-logo.webp', alt: 'Simply Health', href: 'https://www.simplyhealth.co.uk/' },
  { src: '/Vitality-logo.jpg', alt: 'Vitality', href: 'https://www.vitality.co.uk/' },
  { src: '/WPA-logo.webp', alt: 'WPA', href: 'https://www.wpa.org.uk/' },
  { src: '/Bupa-logo.webp', alt: 'Bupa', href: 'https://finder.bupa.co.uk/Consultant/view/226316/dr_sujata_khambekar' },
  { src: '/nuffield-logo.png', alt: 'Nuffield Health', href: 'https://www.nuffieldhealth.com/consultants/dr-sujata-khambekar' },
  { src: '/allianz-logo.png', alt: 'Allianz Healthcare', href: 'https://www.allianz.co.uk/' },
];

/** Third-party integration endpoints (empty string = not configured yet). */
export const integrations = {
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ?? '',
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? '',
  patientPortalUrl: process.env.NEXT_PUBLIC_PATIENT_PORTAL_URL ?? '',
  payInvoiceUrl: process.env.NEXT_PUBLIC_PAY_INVOICE_URL ?? '',
  doctifyWidgetId: process.env.NEXT_PUBLIC_DOCTIFY_WIDGET_ID ?? '037ze27k',
  // Public access key (safe to expose) used for the email-notification backup.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '0e7f0c0a-5e94-46c9-9e95-cd71a82b8c38',
} as const;

/** True when online booking (embed or external link) is available. */
export const bookingEnabled = Boolean(
  integrations.bookingEmbedUrl || integrations.bookingUrl,
);
export const portalEnabled = Boolean(integrations.patientPortalUrl);
export const payInvoiceEnabled = Boolean(integrations.payInvoiceUrl);

/** Where the primary "Book Appointment" button should point. */
export function bookingHref(): string {
  if (integrations.bookingEmbedUrl || integrations.bookingUrl) return '/book';
  // No provider configured yet -> send patients to the referral/contact flow.
  return '/referrals';
}
