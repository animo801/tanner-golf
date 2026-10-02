/**
 * Waitlist → Google Sheet
 *
 * Paste this into the sheet's Apps Script editor (Extensions → Apps Script),
 * set SECRET below, then Deploy → New deployment → Web app:
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the web app URL into the site's GOOGLE_SHEET_WEBHOOK_URL env var and
 * the same SECRET into GOOGLE_SHEET_WEBHOOK_SECRET.
 *
 * Each sign-up is appended as a new row under these headers (row 1):
 *   Submitted At | First Name | Last Name | Email | Phone | Brokerage / Company | Message
 * Columns are matched by header name, so they can be reordered, and extra
 * columns (e.g. "Status" or "Notes" for your client) are left alone.
 */

const SECRET = 'replace-with-a-long-random-string'
const SHEET_NAME = 'Waitlist' // tab name; created with headers if it doesn't exist

const COLUMNS = {
  'Submitted At': 'submittedAt',
  'First Name': 'firstName',
  'Last Name': 'lastName',
  Email: 'email',
  Phone: 'phone',
  'Brokerage / Company': 'company',
  Message: 'message',
}

function doPost(e) {
  let body
  try {
    body = JSON.parse(e.postData.contents)
  } catch (err) {
    return json({ ok: false, error: 'Invalid JSON' })
  }
  if (body.secret !== SECRET) return json({ ok: false, error: 'Unauthorized' })

  // Two sign-ups landing at once shouldn't overwrite each other's row
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const sheet = getSheet()
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    const row = headers.map((header) => {
      const key = COLUMNS[String(header).trim()]
      if (!key) return ''
      const value = body.entry[key] || ''
      return key === 'submittedAt' && value ? new Date(value) : value
    })
    sheet.appendRow(row)
    return json({ ok: true })
  } finally {
    lock.releaseLock()
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(Object.keys(COLUMNS))
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, Object.keys(COLUMNS).length).setFontWeight('bold')
  }
  return sheet
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON)
}
