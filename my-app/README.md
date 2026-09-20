This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Front-page form and Google Sheets

The front page switches between "Sök General eller Kassör" (application) and
"Nominera General eller Kassör" (nomination), with separate question templates.
Switching preserves both drafts while the page stays open. The server
validates each submission and appends it directly to a private Google Sheet.
It only displays success after Google confirms the write; no browser-only storage
or local server files are used for submissions.

1. Enable the Google Sheets API in the Google Cloud project for your service account.
2. Responses use two formatted tabs:
   - Ansökningar: Datum, Namn, LIU-ID, E-post, Klass, Post, Motivering.
   - Nomineringar: Datum, Nominerad person, LIU-ID, Klass, Post, Motivering.
   Dates use Europe/Stockholm time. Run node scripts/split-response-tabs.mjs
   to create the tabs and copy legacy responses. The original tab is preserved.
   Already migrated tabs are skipped; unrecognized destination tabs are never overwritten.
3. Share that spreadsheet with the `client_email` from your service account JSON
   as an Editor. Keep the sheet private to your team and the service account.
4. In `.env.local`, keep the existing `CREDS_BASE64` credentials and add
   `GOOGLE_SHEETS_SPREADSHEET_ID` (the ID between `/d/` and `/edit` in the sheet URL).
   New submissions select the tab by form type. GOOGLE_SHEETS_TAB_ID is used
   only for migration to identify the original tab (default 0).
   See `.env.example` for the variable names. Add the same variables to your
   hosting environment and restart/redeploy after changing them.
5. Submit a test entry and verify that exactly one row appears in the sheet.

Missing configuration returns an unavailable message and preserves the entered
values. Failed Google requests also preserve the form. Writes use `RAW` so user
input is stored as text rather than executed as spreadsheet formulas. A hidden
honeypot and same-origin check provide basic spam protection; high-volume public
deployments should also configure rate limiting at their hosting edge.

The spreadsheet ID and credentials stay in server-only environment variables.
The browser only calls `/api/submissions`; it never receives the sheet URL.
Keep Google Drive sharing restricted, as hiding a link is not access control.

To alter either template, edit its labels, fields, options, and required flags in
`lib/client-forms.ts`. These definitions drive both rendering and server validation.
When adding fields, update lib/response-layouts.mjs and the corresponding spreadsheet headers. Layout and submission states live in
`components/ClientForm.tsx`.

Google API reference: https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append

## Local development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
