import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { getBookings } from '@/lib/bookings'
import { AdminBookingsTable } from '@/components/admin-bookings-table'

export const metadata: Metadata = {
  title: 'Admin | Bookings | Juwuralo Alasooke',
  description: 'Admin view of rental booking requests.',
}

export default async function AdminPage() {
  const bookings = await getBookings()

  return (
    <main>
      <PageBanner
        eyebrow="ADMIN"
        title="Bookings"
        highlight="Requests"
        description="Review pending rental requests and reservation details stored in the booking system."
        crumbs={[{ label: 'ADMIN' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        {bookings.length === 0 ? (
          <div className="rounded-xs border border-primary/15 bg-secondary/20 p-10 text-center text-cream/70">
            No booking requests have been submitted yet.
          </div>
        ) : (
          <AdminBookingsTable bookings={bookings} />
        )}
      </section>
    </main>
  )
}
