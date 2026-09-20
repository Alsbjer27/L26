import { google } from "googleapis";
import { NextResponse } from "next/server";
import { validateSubmission } from "@/lib/client-forms";
import { hasAllowedRequestOrigin } from "@/lib/request-origin";

import { responseLayouts, sheetDate } from "@/lib/response-layouts.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasAllowedRequestOrigin(request)) {
    return NextResponse.json({ error: "Otillåten förfrågan." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 20000) return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 413 });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ogiltiga formuläruppgifter." }, { status: 400 });
  }

  const values = validateSubmission(body);
  if (!values) {
    return NextResponse.json({ error: "Kontrollera att alla obligatoriska frågor är ifyllda och att e-postadresserna är giltiga." }, { status: 400 });
  }

  const credentialsBase64 = process.env.CREDS_BASE64;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!credentialsBase64 || !spreadsheetId) {
    return NextResponse.json({ error: "Formuläret är inte redo att ta emot uppgifter ännu. Försök igen senare." }, { status: 503 });
  }

  try {
    const credentials = JSON.parse(Buffer.from(credentialsBase64, "base64").toString("utf8"));
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const layout = responseLayouts[values.formType as keyof typeof responseLayouts];
    const sheetName = layout.tab.replace(/'/g, "''");
    const lastColumn = String.fromCharCode(65 + layout.fields.length);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:${lastColumn}`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[sheetDate(new Date().toISOString()), ...layout.fields.map(column => values[column] || "")]] },
    }, { retry: false, timeout: 15000 });
    return NextResponse.json({ success: true });
  } catch {
    // Avoid logging credentials or personal information from the Google request.
    console.error("Unable to save a client submission to Google Sheets.");
    return NextResponse.json({ error: "Det gick inte att bekräfta att uppgifterna sparades. Försök igen senare." }, { status: 502 });
  }
}
