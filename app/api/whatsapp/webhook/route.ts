import { NextResponse } from 'next/server'
import { getBookingByTrackingId } from '@/lib/bookings'
import { getWhatsAppVerifyToken, sendWhatsAppMessage, buildBookingStatusMessage } from '@/lib/whatsapp'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === getWhatsAppVerifyToken()) {
    return new Response(challenge || 'ok', { status: 200 })
  }

  return NextResponse.json({ error: 'Webhook verification failed' }, { status: 403 })
}

async function handleTextMessage(from: string, body: string) {
  const normalizedBody = body.trim().toLowerCase()

  if (normalizedBody.startsWith('status ')) {
    const trackingId = normalizedBody.replace('status ', '').trim().toUpperCase()
    const booking = await getBookingByTrackingId(trackingId)
    if (!booking) {
      await sendWhatsAppMessage(from, `Sorry, I could not find a booking with ID ${trackingId}. Please check the tracking ID and try again.`)
      return
    }
    await sendWhatsAppMessage(from, buildBookingStatusMessage(booking))
    return
  }

  await sendWhatsAppMessage(
    from,
    'Hello! Thanks for contacting Juwuralo. You can ask for booking status by sending: status <TRACKING_ID>',
  )
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    const entry = payload.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const messages = value?.messages

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    const message = messages[0]
    const from = message.from
    const text = message.text?.body || ''

    if (!from || !text) {
      return NextResponse.json({ status: 'ignored' }, { status: 200 })
    }

    await handleTextMessage(from, text)
    return NextResponse.json({ status: 'received' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
  }
}
