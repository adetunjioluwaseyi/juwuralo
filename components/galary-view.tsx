'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

type Shot = {
  src: string
  alt: string
  caption: string
  category: string
  tall?: boolean
}

const SHOTS: Shot[] = [
  {
    src: '/images/hero-couple.png',
    alt: 'Couple in purple and gold Aso Oke attire with coral beads',
    caption: 'Traditional wedding — London',
    category: 'Weddings',
    tall: true,
  },
  {
    src: '/images/collection-edo.png',
    alt: 'Edo bride in coral bead crown and purple attire',
    caption: 'Edo bridal styling',
    category: 'Bridal',
  },
  {
    src: '/images/asooke-purple.png',
    alt: 'Woman in deep purple and gold Aso Oke with sculptural gele',
    caption: 'Purple royal Aso Oke',
    category: 'Aso Oke',
  },
  {
    src: '/images/edo-bridal.png',
    alt: 'Edo bride in red velvet wrapper with coral bead corset',
    caption: 'Engagement ceremony — Manchester',
    category: 'Bridal',
    tall: true,
  },
  {
    src: '/images/collection-beads.png',
    alt: 'Layered traditional coral bead necklace sets',
    caption: 'Coral bead detail',
    category: 'Accessories',
  },
  {
    src: '/images/asooke-ivory.png',
    alt: 'Man in ivory and gold embroidered agbada with fila cap',
    caption: 'Groom in ivory agbada',
    category: 'Grooms',
  },
//   {
//     src: '/images/collection-esan.png',
//     alt: 'Woman in red Esan attire with coral bead headpiece',
//     caption: 'Esan ceremonial look',
//     category: 'Bridal',
//   },
//   {
//     src: '/images/edo-groom.png',
//     alt: 'Edo groom in white wrapper with layered coral bead necklaces',
//     caption: 'Edo groom styling',
//     category: 'Grooms',
//     tall: true,
//   },
//   {
//     src: '/images/collection-kids.png',
//     alt: 'Child in cream and gold traditional agbada with cap',
//     caption: 'Little one in cream agbada',
//     category: 'Kids',
//   },
//   {
//     src: '/images/collection-asooke.png',
//     alt: 'Woman in teal and gold Aso Oke with ornate gele headwrap',
//     caption: 'Teal and gold Aso Oke',
//     category: 'Aso Oke',
//   },
//   {
//     src: '/images/kids-asooke.png',
//     alt: 'Young girl in purple and gold Aso Oke with small gele',
//     caption: 'Kids purple Aso Oke',
//     category: 'Kids',
//   },
//   {
//     src: '/images/beads-crown.png',
//     alt: 'Ornate coral bead crown headpiece on a stand',
//     caption: 'Coral crown headpiece',
//     category: 'Accessories',
//   },
//   {
//     src: '/images/esan-ceremonial.png',
//     alt: 'Woman in burgundy and gold Esan ceremonial attire',
//     caption: 'Burgundy ceremonial set',
//     category: 'Bridal',
//   },
//   {
//     src: '/images/styling.png',
//     alt: 'Hands tying an elaborate gold and purple gele headwrap',
//     caption: 'Gele styling session',
//     category: 'Weddings',
//   },
//   {
//     src: '/images/beads-bracelets.png',
//     alt: 'Coral bead bracelet and earring sets on velvet',
//     caption: 'Bracelet and earring sets',
//     category: 'Accessories',
//   },
]

const CATEGORIES = [
  'All',
  'Weddings',
  'Bridal',
//   'Grooms',
//   'Aso Oke',
//   'Accessories',
  'Kids',
]

export function GalleryView() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<Shot | null>(null)

  const shots =
    filter === 'All' ? SHOTS : SHOTS.filter((shot) => shot.category === filter)

  return (
    
    <>
    <section id="collections" className="bg-cream pb-16 lg:pb-20">
        
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 className="text-center font-serif text-3xl text-[#1a1035] sm:text-4xl">
          Gallery
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-[#1a1035]/65">
          A glimpse of our curated pieces in action — from weddings and
          engagements to photoshoots and special occasions.
        </p>
      </div>
      {/* <ul className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                'rounded-xs border px-4 py-2.5 text-[10px] tracking-brand transition-colors',
                filter === category
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-primary/100 text-primary/100 hover:border-primary hover:text-primary',
              )}
            >
              {category.toUpperCase()}
            </button>
          </li>
        ))}
      </ul> */}

      <ul className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((shot) => (
          <li
            key={shot.src + shot.caption}
            className={cn('relative', shot.tall && 'row-span-2')}
          >
            <button
              type="button"
              onClick={() => setActive(shot)}
              className="group relative block size-full overflow-hidden rounded-xs border border-primary/15"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,16,53,0.9)_0%,transparent_55%)] opacity-80 transition-opacity group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-left">
                <span className="text-[9px] tracking-brand text-primary">
                  {shot.category.toUpperCase()}
                </span>
                <span className="text-xs leading-snug text-cream">
                  {shot.caption}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-60 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-cream/70 transition-colors hover:text-primary"
          >
            <span className="sr-only">Close image</span>
            <X className="size-7" />
          </button>

          <figure
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-full w-full max-w-3xl flex-col gap-4"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs border border-primary/25 sm:aspect-[3/2]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>
            <figcaption className="text-center text-sm text-cream/70">
              <span className="text-primary">
                {active.category.toUpperCase()}
              </span>{' '}
              &middot; {active.caption}
            </figcaption>
          </figure>
        </div>
        
      ) : null}

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-10">
        <a
              href="/gallery"
              className="group flex items-center justify-center gap-2 rounded-xs border border-[#D4AF37]/50 px-8 py-4 text-[15px] font-semibold tracking-[0.16em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 sm:border-0 sm:px-0 sm:py-0"
            >
              View Full Gallery
              <ArrowRight className="size-7 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
      </section>
    </>
    

  )
}
