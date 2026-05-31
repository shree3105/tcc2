# Integration Guide — Booking, Patient Portal & Payments

The new site is **integration-ready**. All third-party connections (online
booking, patient portal, online payments) are driven by environment variables,
so you can connect **Carebit**, **Semble**, **TouchPoints.health** or **iMedDoc**
later — with **no code changes**. Until a variable is set, the site gracefully
falls back to the existing phone / referral flow, so nothing ever looks broken.

> Set these in the **Vercel dashboard → Project → Settings → Environment
> Variables**, then redeploy. For local testing, put them in `.env.local`.

---

## The four "slots"

| Variable | What it powers | Where it appears |
| --- | --- | --- |
| `NEXT_PUBLIC_BOOKING_EMBED_URL` | Embeds the provider's booking widget in an iframe on `/book` | "Book Appointment" buttons → `/book` |
| `NEXT_PUBLIC_BOOKING_URL` | Links "Book Appointment" out to the provider's booking page (used only if the embed URL is empty) | "Book Appointment" buttons |
| `NEXT_PUBLIC_PATIENT_PORTAL_URL` | Adds a **Patient Portal** link | Header + footer |
| `NEXT_PUBLIC_PAY_INVOICE_URL` | Adds a **Pay an invoice** panel | Fees page |

**Priority:** if `BOOKING_EMBED_URL` is set it wins; otherwise `BOOKING_URL` is
used; if neither is set, "Book Appointment" routes to `/referrals`.

---

## Provider-specific setup

### Carebit
- **Booking (embed):** In Carebit, open your bookings iframe/embed settings and
  copy the embed URL (looks like `https://YOUR-PRACTICE.carebit.co/iframes/bookings/new`).
  Set it as `NEXT_PUBLIC_BOOKING_EMBED_URL`.
- **Patient portal:** Your portal lives at `https://YOUR-PRACTICE.carebit.co/patients/...`.
  Set the login URL as `NEXT_PUBLIC_PATIENT_PORTAL_URL`.
- **Payments:** Carebit takes online payments inside bookings/portal, so a
  separate `PAY_INVOICE_URL` is usually not needed — leave it blank, or point it
  at your portal's payment page if you have a dedicated link.

### Semble
- **Booking (embed):** Semble provides an iframe booking form at
  `https://online-booking.semble.io/?token=YOUR_TOKEN`. Copy that full URL
  (with your token) into `NEXT_PUBLIC_BOOKING_EMBED_URL`.
- **Patient portal ("Patient Zone"):** Set your Patient Zone URL as
  `NEXT_PUBLIC_PATIENT_PORTAL_URL`.
- **Payments (Semble Pay):** Handled within booking/portal — usually leave
  `PAY_INVOICE_URL` blank.

### TouchPoints.health
- A full practice-management platform. Use whichever patient-facing links it
  gives you: a booking/enquiry link → `NEXT_PUBLIC_BOOKING_URL`, and a patient
  login → `NEXT_PUBLIC_PATIENT_PORTAL_URL`. If it offers an embeddable booking
  page, use `NEXT_PUBLIC_BOOKING_EMBED_URL` instead.

### iMedDoc
- Primarily back-office. If it exposes a patient login/document portal, set that
  as `NEXT_PUBLIC_PATIENT_PORTAL_URL`. Booking, if available, goes in
  `NEXT_PUBLIC_BOOKING_URL`.

---

## How to test a change safely

1. Add/edit the variable in Vercel (target the **Preview** environment first).
2. Push to this branch — Vercel builds a **preview URL**.
3. Click through `/book`, the header **Patient Portal** link, and the Fees page.
4. When happy, set the same variable for **Production** and merge to `main`.

## Notes
- `NEXT_PUBLIC_*` variables are exposed to the browser by design (they are URLs,
  not secrets). The only true secret is `DATABASE_URL`, which is server-only.
- An embedded provider may need to allow this domain in their iframe/CORS
  settings — check with the provider if the embed appears blank.
