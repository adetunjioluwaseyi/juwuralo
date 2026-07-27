import { NextResponse } from 'next/server'
import type { BookingRequest } from '@/lib/bookings'
import { createBooking, getBookings, updateBooking } from '@/lib/bookings'
import { sendEmail } from '@/lib/mailer'
import { promises as fs } from 'fs'
import path from 'path'

async function writeUploadFile(file: File) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })
  const filePath = path.join(uploadsDir, `${crypto.randomUUID()}-${file.name}`)
  const arrayBuffer = await file.arrayBuffer()
  await fs.writeFile(filePath, Buffer.from(arrayBuffer))
  return `/uploads/${path.basename(filePath)}`
}

export async function GET() {
  try {
    const bookings = await getBookings()
    return NextResponse.json({ bookings }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Could not read bookings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    let body: Record<string, any> = {}
    let paymentProofUrl: string | undefined

    const contentType = request.headers.get('content-type') ?? ''
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      body = {
        item: formData.get('item'),
        size: formData.get('size'),
        occasion: formData.get('occasion'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        postcode: formData.get('postcode'),
        eventDate: formData.get('eventDate'),
        returnDate: formData.get('returnDate'),
        notes: formData.get('notes'),
      }
      const proofFile = formData.get('paymentProof') as File | null
      if (proofFile && proofFile.size > 0) {
        paymentProofUrl = await writeUploadFile(proofFile)
      }
    } else {
      body = (await request.json()) as BookingRequest
    }

    if (!body.item || !body.size || !body.occasion || !body.fullName || !body.email || !body.phone || !body.postcode || !body.eventDate || !body.returnDate) {
      return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 })
    }

    const booking = await createBooking({
      item: String(body.item),
      size: String(body.size),
      occasion: String(body.occasion),
      fullName: String(body.fullName),
      email: String(body.email),
      phone: String(body.phone),
      postcode: String(body.postcode),
      eventDate: String(body.eventDate),
      returnDate: String(body.returnDate),
      notes: String(body.notes ?? ''),
      paymentProofUrl,
    })

    // Notify admin of new booking request
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
      await sendEmail({
        to: adminEmail,
        subject: `New booking request — ${booking.trackingId}`,
        text: `A new booking request has been submitted by ${booking.fullName} (${booking.email}). Tracking: ${booking.trackingId}`,
        html: `<p>New booking request submitted.</p><p><strong>${booking.fullName}</strong> — ${booking.email}</p><p>Tracking: <strong>${booking.trackingId}</strong></p>`,
      })
    } catch (e) {
      // swallow email errors — booking still succeeds
      console.error('Failed to send admin notification', e)
    }

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Could not save booking' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status, paymentProofUrl, adminNotes } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields for update' }, { status: 400 })
    }

    const updatedBooking = await updateBooking(id, {
      status,
      paymentProofUrl,
      adminNotes,
    })

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ booking: updatedBooking }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Could not update booking' }, { status: 500 })
  }
}
