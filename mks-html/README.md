# MKS College — Bonafide Portal (Pure HTML — Fully Working, No Server)

Tested end-to-end with real browser automation — every step passed:
Register → Apply → Slip → Certificate → QR Verify.

## Files
- `index.html` — landing page ("Go for Online BONAFIDE")
- `student-registration.html` — Step 1: generates reference no. (26B#######)
- `check-university-record.html` — reference no. lookup
- `bonafied.html` — Step 2: full application form (photo + slip upload)
- `bonafiedPrint.html` — BONAFIDE SLIP with QR code, print button
- `bonafiedCertificate.html` — BONAFIDE CERTIFICATE (matches sample exactly)
- `verify-transaction.html` — page the QR code links to
- `css/custom.css` — all styling
- `js/app.js` — all logic (ID generation, storage, amount-in-words)
- `js/qrcode.min.js` — QR code engine, bundled locally (no external CDN, works offline)
- `images/logo.png` — college logo (recreated — see note below)

## How it works
No backend, no database, no build step. Data is saved in the browser's
`localStorage` as you go through the flow. Open `index.html` directly, or
upload the folder anywhere (Netlify drop, Hostinger, GitHub Pages) — it just works.

## Deploy
1. Upload the whole folder as-is to any static host (Netlify/Hostinger/GitHub Pages),
   or open `index.html` directly in a browser.
2. Replace `images/logo.png` with your real logo file (same filename) for a pixel-exact match.
3. Done — no database setup, no PHP, nothing else required.

## Flow (matches your uploaded pages exactly)
Home → Student Registration (creates Ref No.) → Apply for Bonafide (full form + uploads)
→ Bonafide Slip (with QR) → Bonafide Certificate (print-ready, A4).

## Verified working (automated test, all passed)
- Reference No. pattern: `26B8806873` style ✔
- Receipt No. pattern: `MKSC/DE/26-27/9066` style ✔
- Transaction ID: 14-digit numeric ✔
- Certificate wording: exact static text, not paraphrased, matches sample ✔
- "Total Paid" amount-in-words: `100 (Rs. One Hundred Only)` ✔
- QR code renders locally (bundled library, no external dependency) ✔

## One honest note
`images/logo.png` is a close geometric recreation (same colors/layout/text) —
not the original vector file, since that wasn't provided. Swap in the real
logo file (same filename `images/logo.png`) for a byte-exact match; everything
else (text, fields, numbering, layout) is reproduced exactly from your samples.

## Limitation of "no server" (worth knowing)
Because there's no shared database, data lives only in the browser that
created it. Reference numbers, slips, and QR-verify only work on the same
device/browser that registered them — normal for a static-only site. If you
later want the reference number/slip to be checkable from *any* device
(real cross-device verification), that needs a small backend — say the word
and I'll wire it in without changing anything else.
