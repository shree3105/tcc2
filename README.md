# The Cardiology Clinic

Modern, accessible website for Dr Sujata Khambekar's private cardiology practice
in Poole & Bournemouth. Built with Next.js (App Router), designed for an older
patient base (large type, high contrast, clear navigation) and **ready to plug
in** to practice-management software (Carebit / Semble / TouchPoints / iMedDoc).

## Features

- **Multi-page site**: Home, About, Conditions & Services, Fees & Insurance,
  Patient Information, Referrals, Contact, plus a `/book` appointments page.
- **Accessibility-first**: 18px base text, large tap targets, visible keyboard
  focus, skip-to-content link, semantic HTML, reduced-motion support.
- **Self-referral & GP-referral forms**: dual submission (Neon Postgres + email
  via Web3Forms).
- **Integration-ready layer**: online booking, patient portal and online
  payments are all driven by environment variables — connect a provider later
  with **zero code changes**. See [INTEGRATIONS.md](./INTEGRATIONS.md).
- **Patient reviews** via Doctify, **insurer logos**, SEO metadata.

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Neon (Postgres) · Vercel

## Quick Start

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL etc.
npm run dev                  # http://localhost:3000
```

## Environment Variables

See [.env.example](./.env.example) for the full list. The only server-side
secret is `DATABASE_URL`; everything else is a public (`NEXT_PUBLIC_*`) URL or
key. Integration URLs can be left blank until a provider is live.

## Project Structure

```
app/
  layout.tsx            # Shared header, footer, fonts, metadata
  page.tsx              # Home
  about/                # About Dr Khambekar
  services/             # Conditions & Services
  fees/                 # Fees & Insurance
  patient-info/         # What to expect / FAQs
  referrals/            # Self-referral + GP referral forms
  contact/              # Contact details & locations
  book/                 # Online booking (integration-ready)
  api/
    self-refer/route.ts # Self-referral -> Neon
    gp-refer/route.ts   # GP referral -> Neon
components/             # Header, Footer, BookingWidget, forms, etc.
lib/
  config.ts             # Practice details + integration env layer (edit here)
  db.ts                 # Neon connection pool
```

To update clinic details (phone, email, locations, areas of interest),
edit [lib/config.ts](./lib/config.ts) — it is the single source of truth.

## Database Setup

```sql
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

The `gp_referrals` table can be created with:

```bash
DATABASE_URL="postgres://..." node create_gp_table.js
```

## Deployment

This branch is safe to preview on Vercel without touching production. When
ready, merge to `main`. Set environment variables in the Vercel dashboard for
both Preview and Production environments.

## Contact

- **Email**: appointments@thecardiology.clinic
- **Phone**: 0776 151 3391

## License

Private — The Cardiology Clinic
