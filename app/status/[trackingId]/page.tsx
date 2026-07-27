import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { getBookings } from '@/lib/bookings'
import { ALL_ITEMS } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Booking Status | Juwuralo Alasooke',
  description: 'Track your booking request status with your unique reference code.',
}

function lookupItemName(slug: string) {
  return ALL_ITEMS.find((item) => item.slug === slug)?.name ?? slug
}

export default async function StatusPage({ params }: { params: { trackingId: string } }) {
  const bookings = await getBookings()
  const booking = bookings.find((record) => record.trackingId === params.trackingId)

  return (
    <main>
      <PageBanner
        eyebrow="BOOKING STATUS"
        title="Track your"
        highlight="reservation"
        description="Check the status of your booking request using the unique tracking code sent to you after payment proof upload."
        crumbs={[{ label: 'BOOKING STATUS' }]}
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        {booking ? (
          <div className="rounded-xs border border-primary/15 bg-secondary/20 p-10">
            <p className="text-[10px] tracking-brand text-primary">Tracking code</p>
            <p className="mt-2 text-3xl font-semibold text-cream">{booking.trackingId}</p>
            <div className="mt-8 grid gap-6 text-sm text-cream/75">
              <div>
                <p className="text-[10px] tracking-brand text-primary">Name</p>
                <p className="mt-2 text-base text-cream">{booking.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-brand text-primary">Item</p>
                <p className="mt-2 text-base text-cream">{lookupItemName(booking.item)}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-brand text-primary">Event dates</p>
                <p className="mt-2 text-base text-cream">{booking.eventDate} → {booking.returnDate}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-brand text-primary">Status</p>
                <p className="mt-2 text-base font-semibold text-primary uppercase">{booking.status}</p>
                <p className="mt-2 text-sm text-cream/65">
                  {booking.status === 'pending' && 'Your request is pending review by our team.'}
                  {booking.status === 'confirmed' && 'Your request has been approved. Please collect the item as arranged.'}
                  {booking.status === 'collected' && 'The item has been marked as collected.'}
                  {booking.status === 'returned' && 'The item has been returned. Thank you.'}
                  {booking.status === 'cancelled' && 'This booking has been cancelled.'}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-brand text-primary">Payment proof</p>
                {booking.paymentProofUrl ? (
                  <a
                    href={booking.paymentProofUrl}
                    className="text-sm text-primary underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View proof of payment
                  </a>
                ) : (
                  <p className="mt-2 text-base text-cream">Not provided</p>
                )}
              </div>
              <div>
                <p className="text-[10px] tracking-brand text-primary">Admin notes</p>
                <p className="mt-2 text-base text-cream">{booking.adminNotes ?? 'Awaiting review'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xs border border-primary/15 bg-secondary/20 p-10 text-center text-cream/70">
            No booking found for code <span className="font-semibold text-cream">{params.trackingId}</span>.
          </div>
        )}
      </section>
    </main>
  )
}
