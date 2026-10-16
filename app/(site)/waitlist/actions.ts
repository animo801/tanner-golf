'use server'

export type WaitlistValues = Record<'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'message', string>

export type WaitlistState = {
  status: 'idle' | 'success' | 'error'
  error?: 'required' | 'email' | 'generic'
  // Echoed back on error so the form can refill what the visitor typed
  values?: WaitlistValues
}

const field = (data: FormData, name: string, max = 200) => String(data.get(name) ?? '').trim().slice(0, max)

export async function joinWaitlist(_prev: WaitlistState, data: FormData): Promise<WaitlistState> {
  // Honeypot: real people never see or fill this field
  if (field(data, 'website')) return { status: 'success' }

  const entry: WaitlistValues = {
    firstName: field(data, 'firstName'),
    lastName: field(data, 'lastName'),
    email: field(data, 'email').toLowerCase(),
    phone: field(data, 'phone', 50),
    company: field(data, 'company'),
    message: field(data, 'message', 2000),
  }

  if (!entry.firstName || !entry.lastName || !entry.email) return { status: 'error', error: 'required', values: entry }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) return { status: 'error', error: 'email', values: entry }

  try {
    await saveToGoogleSheet({ ...entry, submittedAt: new Date().toISOString() })
    return { status: 'success' }
  } catch (err) {
    console.error('Waitlist sign-up failed', err)
    return { status: 'error', error: 'generic', values: entry }
  }
}

// Sign-ups live in the client's Google Sheet, written by the Apps Script in
// scripts/google-sheets-waitlist.gs. It skips emails already on the sheet,
// so signing up twice is treated as success without a duplicate row.
async function saveToGoogleSheet(entry: WaitlistValues & { submittedAt: string }) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!url) throw new Error('GOOGLE_SHEET_WEBHOOK_URL is not set')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.GOOGLE_SHEET_WEBHOOK_SECRET, entry }),
    signal: AbortSignal.timeout(10_000),
  })
  const result = await res.json().catch(() => null)
  if (!result?.ok) throw new Error(`Google Sheet rejected the sign-up (${res.status}): ${JSON.stringify(result)}`)
}
