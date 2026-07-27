import { Hero } from '@/components/hero'
import { FeatureStrip } from '@/components/feature-strip'
import { Collections } from '@/components/collections'
import { BookingCta } from '@/components/booking-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureStrip />
      <Collections />
      <BookingCta />
    </main>
  )
}
