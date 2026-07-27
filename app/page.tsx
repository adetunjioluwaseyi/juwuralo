import { Hero } from '@/components/hero'
import { FeatureStrip } from '@/components/feature-strip'
import { Collections } from '@/components/collections'
import { BookingCta } from '@/components/booking-cta'
import { GalleryGrid } from '@/components/gallery-grid'
import { GalleryView } from '@/components/galary-view'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeatureStrip />
      <Collections />
      <BookingCta />
      <GalleryView />
    </main>
  )
}
