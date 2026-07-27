import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'

export const metadata: Metadata = {
  title: 'Booking Confirmed | Juwuralo Alasooke',
  description: 'Your booking request has been received and is pending confirmation.',
}

export default function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { trackingId?: string }
}) {
  const trackingId = searchParams?.trackingId

  return (
    <main>
      <PageBanner
        eyebrow="BOOKING REQUEST SENT"
        title="Thank you," 
        highlight="we will reply soon"
        description="Your booking request is now in our system. We will confirm availability and send payment details within one business day."
        crumbs={[{ label: 'BOOKING CONFIRMED' }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="rounded-xs border border-primary/15 bg-secondary/20 p-10 text-center">
          <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
          <h2 className="mt-6 font-serif text-3xl text-cream">Request received</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/70">
            Our team has received your request and will be in touch with availability, deposit instructions, and delivery options.
          </p>
          {trackingId ? (
            <div className="mx-auto mt-6 max-w-md rounded-xs border border-primary/20 bg-background/80 px-5 py-4 text-left text-sm text-cream">
              <p className="text-[10px] uppercase tracking-[0.24em] text-cream/50">Booking tracking code</p>
              <p className="mt-2 text-3xl font-semibold text-cream">{trackingId}</p>
              <p className="mt-2 text-sm text-cream/65">
                Keep this code safe. You can use it to check your booking status on the status page.
              </p>
            </div>
          ) : null}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/rentals"
              className="rounded-xs bg-primary px-7 py-4 text-[11px] font-semibold tracking-brand text-primary-foreground transition-colors hover:bg-primary/90"
            >
              VIEW RENTALS
            </Link>
            <Link
              href="/collections"
              className="rounded-xs border border-primary/40 px-7 py-4 text-[11px] font-semibold tracking-brand text-primary transition-colors hover:bg-primary/10"
            >
              EXPLORE COLLECTIONS
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
