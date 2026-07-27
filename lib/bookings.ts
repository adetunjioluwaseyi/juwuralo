import { promises as fs } from 'fs'
import path from 'path'

export type BookingRequest = {
  item: string
  size: string
  occasion: string
  fullName: string
  email: string
  phone: string
  postcode: string
  eventDate: string
  returnDate: string
  notes: string
  paymentProofUrl?: string
}

export type BookingRecord = BookingRequest & {
  id: string
  trackingId: string
  status: 'pending' | 'confirmed' | 'collected' | 'returned' | 'cancelled'
  paymentProofUrl?: string
  paymentProofUploadedAt?: string
  adminNotes?: string
  createdAt: string
}

const bookingsFile = path.join(process.cwd(), 'data', 'bookings.json')

async function ensureBookingsFile() {
  await fs.mkdir(path.dirname(bookingsFile), { recursive: true })
  try {
    await fs.access(bookingsFile)
  } catch {
    await fs.writeFile(bookingsFile, JSON.stringify([], null, 2), 'utf8')
  }
}

export async function getBookings(): Promise<BookingRecord[]> {
  await ensureBookingsFile()
  const raw = await fs.readFile(bookingsFile, 'utf8')
  return JSON.parse(raw) as BookingRecord[]
}

export async function getBookingByTrackingId(trackingId: string): Promise<BookingRecord | undefined> {
  const bookings = await getBookings()
  return bookings.find((booking) => booking.trackingId === trackingId)
}

export async function getBookingById(id: string): Promise<BookingRecord | undefined> {
  const bookings = await getBookings()
  return bookings.find((booking) => booking.id === id)
}

export async function updateBooking(id: string, updates: Partial<BookingRecord>): Promise<BookingRecord | null> {
  const bookings = await getBookings()
  const bookingIndex = bookings.findIndex((booking) => booking.id === id)
  if (bookingIndex === -1) return null

  const updatedBooking = {
    ...bookings[bookingIndex],
    ...updates,
  }

  bookings[bookingIndex] = updatedBooking
  await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2), 'utf8')
  return updatedBooking
}

function createTrackingId() {
  return crypto.randomUUID().split('-')[0].toUpperCase()
}

export async function createBooking(booking: BookingRequest): Promise<BookingRecord> {
  const existing = await getBookings()
  const newBooking: BookingRecord = {
    id: crypto.randomUUID(),
    trackingId: createTrackingId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...booking,
    paymentProofUploadedAt: booking.paymentProofUrl ? new Date().toISOString() : undefined,
  }
  existing.push(newBooking)
  await fs.writeFile(bookingsFile, JSON.stringify(existing, null, 2), 'utf8')
  return newBooking
}
