import { google, calendar_v3 } from 'googleapis'
import { NextResponse } from 'next/server'

const SERVICE_ACCOUNT_KEY = process.env.CREDS_BASE64
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

export async function GET(req: Request) {
  console.log('📥 Incoming request to /api/googlecal')

  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || 'MT'
    console.log(`🔍 Query param: ${query}`)

    const auth = await getAuth()
    
    if (!auth) {
      console.error('❌ Auth object is null — check CREDS env variable')
      return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 })
    }
    console.log('✅ Authenticated with Google API')

    const events = await listEvents(auth, query)
    console.log(`📅 Retrieved ${events.length} events`)

    return NextResponse.json(events)
  } catch (error) {
    console.error('💥 Error in API handler:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function getAuth() {
  console.log("🔑 Getting service account credentials...")

  try {
    if (!SERVICE_ACCOUNT_KEY) {
      throw new Error("Missing CREDS_BASE64 environment variable")
    }

    const json = Buffer.from(SERVICE_ACCOUNT_KEY, "base64").toString("utf-8")
    const credentials = JSON.parse(json)

    console.log("📄 Parsed service account JSON successfully")

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    })

    return auth
  } catch (error) {
    console.error("❌ Error loading service account credentials:", error)
    return null
  }
}

async function listEvents(auth: any, query: string): Promise<calendar_v3.Schema$Event[]> {
  console.log(`📆 Fetching events for query: ${query}`)

  const calendar = google.calendar({ version: 'v3', auth })

  const CALENDAR_IDS: Record<string, string> = {
    MT:  "01fce5a8500cbf91c25477f99824d51adec96e2e22fb3711efdf1edac911e7d5@group.calendar.google.com",
    GDK: "6a275b293e9d21fa01ce4c5c1558d08c05e705df7dbe577a1b03da55281a33e7@group.calendar.google.com",
    MED: "be0577f041b8f8442ccf0cbcf646a0006d3ce52c7f9e7d200d02569153b6b248@group.calendar.google.com",
  };

  // Choose calendar — default to MT if unknown
  const currentCal = CALENDAR_IDS[query] || CALENDAR_IDS["MT"];
  console.log(`📌 Using Calendar ID: ${currentCal}`)

  try {
    const res = await calendar.events.list({
      calendarId: currentCal,
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    })

    console.log('✅ Google API responded')
    console.log(`📊 Event count: ${res.data.items?.length || 0}`)

    return res.data.items || []
  } catch (error) {
    console.error('❌ Error fetching events from Google Calendar:', error)
    return []
  }
}