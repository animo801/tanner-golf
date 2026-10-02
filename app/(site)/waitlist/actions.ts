'use server'

import { client } from '@/sanity/lib/client'

export type WaitlistValues = Record<'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'message', string>

export type WaitlistState = {
  status: 'idle' | 'success' | 'error'
  error?: 'required' | 'email' | 'generic'
  // Echoed back on error so the form can refill what the visitor typed
  values?: WaitlistValues
}

const writeClient = client.withConfig({ token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false, stega: false })

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
    // Signing up twice with the same email is treated as success without a duplicate entry
    const existing = await writeClient.fetch<string | null>(
      `*[_type == "waitlistEntry" && email == $email][0]._id`,
      { email: entry.email },
    )
    if (!existing) {
      const submittedAt = new Date().toISOString()
      await writeClient.create({ _type: 'waitlistEntry', ...entry, submittedAt })
      await sendToGoogleSheet({ ...entry, submittedAt })
    }
    return { status: 'success' }
  } catch (err) {
    console.error('Waitlist sign-up failed', err)
    return { status: 'error', error: 'generic', values: entry }
  }
}

// Copies a sign-up into the client's Google Sheet via the Apps Script in
// scripts/google-sheets-waitlist.gs. Sanity is the source of truth, so a
// failure here is logged but doesn't fail the sign-up.
async function sendToGoogleSheet(entry: WaitlistValues & { submittedAt: string }) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!url) return
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.GOOGLE_SHEET_WEBHOOK_SECRET, entry }),
      signal: AbortSignal.timeout(10_000),
    })
    const result = await res.json().catch(() => null)
    if (!result?.ok) console.error('Google Sheet sync failed', res.status, result)
  } catch (err) {
    console.error('Google Sheet sync failed', err)
  }
}
