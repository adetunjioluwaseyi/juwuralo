import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery-grid'
import { PageBanner } from '@/components/page-banner'

export const metadata: Metadata = {
  title: 'Gallery | Juwuralo Alasooke',
  description: 'Browse our gallery of traditional attire looks from weddings, engagements, and photoshoots.',
}

export default function GalleryPage() {
  return (
    <main>
      <PageBanner
        eyebrow="GALLERY"
        title="Traditional Looks"
        highlight="Captured"
        description="A curated gallery showing our latest wedding and celebration attire styling across the UK."
        crumbs={[{ label: 'GALLERY' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <GalleryGrid />
      </section>
    </main>
  )
}
