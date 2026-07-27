import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { COLLECTIONS } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Collections | Juwuralo Alasooke',
  description:
    'Browse Edo, Aso Oke, Esan, coral bead and kids traditional attire collections available to rent or buy across the UK.',
}

export default function CollectionsPage() {
  return (
    <main>
      <PageBanner
        eyebrow="RENT OR BUY"
        title="Our"
        highlight="Collections"
        description="Five curated collections of traditional attire and cultural accessories, styled and maintained in-house for UK-wide delivery."
        crumbs={[{ label: 'COLLECTIONS' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <ul className="flex flex-col gap-12 lg:gap-16">
          {COLLECTIONS.map((collection, index) => (
            <li
              key={collection.slug}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <Link
                href={`/collections/${collection.slug}`}
                className={`group relative block aspect-[4/3] overflow-hidden rounded-xs border border-primary/15 ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={collection.image}
                  alt={collection.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div>
                <p className="text-[10px] tracking-brand text-primary">
                  {collection.tagline}
                </p>
                <h2 className="mt-4 font-serif text-2xl text-cream sm:text-3xl">
                  {collection.name}{' '}
                  <span className="text-cream/45">{collection.sub}</span>
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-pretty text-cream/65">
                  {collection.description}
                </p>
                <p className="mt-5 text-xs tracking-wide text-cream/45">
                  {collection.items.length} pieces &middot; from &pound;
                  {Math.min(...collection.items.map((i) => i.rentalPrice))} rental
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="mt-7 inline-flex items-center gap-2 rounded-xs border border-primary/40 px-6 py-3.5 text-[10px] font-semibold tracking-brand text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  VIEW COLLECTION
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
