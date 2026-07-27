import { NextResponse } from 'next/server'
import { updateBooking, getBookingById } from '@/lib/bookings'
import { sendEmail } from '@/lib/mailer'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, paymentProofUrl, adminNotes } = body

    if (!status) {
      return NextResponse.json({ error: 'Missing required status field' }, { status: 400 })
    }

    const updatedBooking = await updateBooking(params.id, {
      status,
      paymentProofUrl,
      adminNotes,
    })

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // If booking was confirmed, notify the user with tracking ID
    try {
      if (updatedBooking.status === 'confirmed') {
        await sendEmail({
          to: updatedBooking.email,
          subject: `Your booking is approved — ${updatedBooking.trackingId}`,
          text: `Your booking has been approved. Use this tracking code to check status: ${updatedBooking.trackingId}`,
          html: `<p>Your booking has been approved.</p><p>Tracking code: <strong>${updatedBooking.trackingId}</strong></p><p>Check status: <a href="${process.env.SITE_URL || ''}/status/${updatedBooking.trackingId}">View booking status</a></p>`,
        })
      }
    } catch (e) {
      console.error('Failed to send user notification', e)
    }

    return NextResponse.json({ booking: updatedBooking }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Could not update booking' }, { status: 500 })
  }
}
