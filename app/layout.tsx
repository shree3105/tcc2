import './globals.css';
import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { practice, siteUrl } from '@/lib/config';

/** Structured data so search engines understand this is a medical practice. */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: practice.consultant.name,
  url: siteUrl,
  image: `${siteUrl}${practice.consultant.photo.src}`,
  medicalSpecialty: 'Cardiovascular',
  telephone: practice.contact.phoneHref.replace('tel:', ''),
  email: practice.contact.email,
  areaServed: ['Poole', 'Bournemouth', 'Dorset'],
  worksFor: { '@type': 'MedicalClinic', name: practice.name, url: siteUrl },
  workLocation: practice.locations.map((name) => ({ '@type': 'Hospital', name })),
};

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${practice.name} — ${practice.consultant.name}, Consultant Cardiologist`,
    template: `%s · ${practice.name}`,
  },
  description:
    'Dr Sujata Khambekar, Consultant Cardiologist in Poole & Bournemouth. Private cardiology appointments, GP and self-referrals, recognised by all major insurers.',
  keywords: [
    'cardiologist Bournemouth',
    'cardiologist Poole',
    'private cardiology',
    'Dr Sujata Khambekar',
    'heart specialist Dorset',
  ],
  openGraph: {
    title: `${practice.name} — ${practice.consultant.name}`,
    description:
      'Private cardiology care in Poole & Bournemouth. Book an appointment or make a referral.',
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary-700 focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
