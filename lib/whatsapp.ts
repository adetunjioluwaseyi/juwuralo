import { BookingRecord } from './bookings'

const whatsappAccessToken = process.env.WHATSAPP_ACCESS_TOKEN
const whatsappPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
const whatsappVerifyToken = process.env.WHATSAPP_VERIFY_TOKEN

export function getWhatsAppVerifyToken() {
  return whatsappVerifyToken
}

function normalizePhoneNumber(phone: string) {
  return phone.replace(/[^0-9]/g, '')
}

export async function sendWhatsAppMessage(to: string, text: string) {
  if (!whatsappAccessToken || !whatsappPhoneNumberId) {
    throw new Error('Missing WhatsApp Cloud API configuration')
  }

  const normalized = normalizePhoneNumber(to)

  const response = await fetch(
    `https://graph.facebook.com/v17.0/${whatsappPhoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${whatsappAccessToken}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: normalized,
        type: 'text',
        text: {
          body: text,
        },
      }),
    },
  )

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`WhatsApp API error: ${response.status} ${body}`)
  }

  return true
}

export function buildBookingConfirmationMessage(booking: BookingRecord) {
  return `Hello ${booking.fullName},\n\nThank you for your booking request with Juwuralo. Your booking tracking ID is ${booking.trackingId}.\n\nWe will confirm your order shortly. If you want to check booking status, reply with *status ${booking.trackingId}*.`
}

export function buildBookingStatusMessage(booking: BookingRecord) {
  return `Booking ${booking.trackingId} is currently *${booking.status}*.\n\nItem: ${booking.item}\nEvent date: ${booking.eventDate}\nReturn date: ${booking.returnDate}`
}
