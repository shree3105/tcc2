# The Cardiology Clinic

Modern, accessible website for Dr Sujata Khambekar's private cardiology practice
in Poole & Bournemouth. Built with Next.js (App Router), designed for an older
patient base (large type, high contrast, clear navigation) and **ready to plug
in** to practice-management software (Carebit / Semble / TouchPoints / iMedDoc).

## Branches

- **`main`** — production. Every push deploys the live site on Vercel.
- **`development`** — the single development branch. Every push builds a
  Vercel **preview** deployment. Merge `development` → `main` to go live.

## Features

- **Multi-page site**: Home, About, Conditions & Services, Fees & Insurance,
  Patient Information, Referrals, Contact, Privacy, plus a `/book`
  appointments page.
- **Accessibility-first**: large type, big tap targets, visible keyboard
  focus, skip-to-content link, semantic HTML, reduced-motion support.
- **Self-referral & GP-referral forms**: one validated API endpoint saves to
  Neon Postgres **and** emails the practice (Web3Forms) server-side — if one
  channel fails, the other still captures the referral. Honeypot spam
  protection included.
- **Integration-ready layer**: online booking, patient portal and online
  payments are all driven by environment variables — connect a provider later
  with **zero code changes**. See [INTEGRATIONS.md](./INTEGRATIONS.md).
- **Patient reviews** via Doctify, **insurer logos** (optimised via
  `next/image`), SEO metadata, JSON-LD structured data, sitemap & robots.

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Neon (Postgres, serverless driver) · Vercel

## Quick Start

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL etc.
npm run dev                  # http://localhost:3000
```

## Environment Variables

See [.env.example](./.env.example) for the full list. The server-side secrets
are `DATABASE_URL` and `WEB3FORMS_ACCESS_KEY`; everything else is a public
(`NEXT_PUBLIC_*`) URL or id. Integration URLs can be left blank until a
provider is live. Set the same values in the Vercel dashboard (Preview +
Production environments).

## Project Structure

```
app/
  layout.tsx            # Shared header, footer, fonts, metadata, JSON-LD
  page.tsx              # Home
  about/                # About Dr Khambekar
  services/             # Conditions & Services
  fees/                 # Fees & Insurance
  patient-info/         # What to expect / FAQs
  referrals/            # Self-referral + GP referral forms
  contact/              # Contact details & locations
  book/                 # Online booking (integration-ready)
  privacy/              # Privacy policy (UK GDPR)
  robots.ts             # robots.txt
  sitemap.ts            # sitemap.xml
  manifest.ts           # web app manifest
  api/
    referrals/route.ts  # Validates + saves to Neon + emails the practice
components/             # Header, Footer, BookingWidget, forms, etc.
lib/
  config.ts             # Practice details + integration env layer (edit here)
  db.ts                 # Neon serverless driver + schema bootstrap
scripts/
  setup-db.js           # One-off: create unified table & migrate legacy rows
```

To update clinic details (phone, email, locations, areas of interest),
edit [lib/config.ts](./lib/config.ts) — it is the single source of truth.

## Database

All referrals live in a single `referrals` table (`type` = `self` | `gp`,
plus a `status` column for simple triage: `new → contacted → booked → closed`).
The table is created automatically on first use; to migrate rows from the
legacy `submissions` / `gp_referrals` tables, run once:

```bash
DATABASE_URL="postgres://..." npm run setup-db
```

The legacy tables are left untouched — drop them manually once you have
verified the migration.

## Deployment

Push to `development` for a Vercel preview; merge to `main` to deploy
production. Environment variables are managed in the Vercel dashboard.

## Contact

- **Email**: appointments@thecardiology.clinic
- **Phone**: 0776 151 3391

## License

Private — The Cardiology Clinic
