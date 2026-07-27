import { promises as fs } from 'fs'
import path from 'path'

type MailOptions = {
  to: string
  subject: string
  text?: string
  html?: string
}

async function writeOutbox(mail: MailOptions) {
  const outboxDir = path.join(process.cwd(), 'data')
  await fs.mkdir(outboxDir, { recursive: true })
  const outboxFile = path.join(outboxDir, 'outbox.json')
  let existing: MailOptions[] = []
  try {
    const raw = await fs.readFile(outboxFile, 'utf8')
    existing = JSON.parse(raw)
  } catch {
    existing = []
  }
  existing.push({ ...mail, _sentAt: new Date().toISOString() } as any)
  await fs.writeFile(outboxFile, JSON.stringify(existing, null, 2), 'utf8')
}

export async function sendEmail(mail: MailOptions) {
  // For now, write emails to an outbox file for inspection. If SMTP is
  // configured later and nodemailer is installed, this function can be
  // extended to actually send messages.
  try {
    await writeOutbox(mail)
    if (process.env.SMTP_HOST) {
      console.warn('SMTP configured but nodemailer not enabled — email written to outbox')
    }
  } catch (e) {
    console.error('Failed to write outbox email', e)
  }
}

export default sendEmail
