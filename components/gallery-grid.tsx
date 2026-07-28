'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Shot = {
  src: string
  alt: string
  caption: string
  category: string
  tall?: boolean
}

const SHOTS: Shot[] = [
  {
    src: '/images/h.jpg',
    alt: 'Couple in purple and gold Aso Oke attire with coral beads',
    caption: 'Traditional wedding — London',
    category: 'Weddings',
    tall: true,
  },
  {
    src: '/images/e.jpg',
    alt: 'Edo bride in coral bead crown and purple attire',
    caption: 'Edo bridal styling',
    category: 'Bridal',
  },
  {
    src: '/images/v.jpg',
    alt: 'Woman in deep purple and gold Aso Oke with sculptural gele',
    caption: 'Purple royal Aso Oke',
    category: 'Aso Oke',
  },
  {
    src: '/images/u.jpg',
    alt: 'Edo bride in red velvet wrapper with coral bead corset',
    caption: 'Engagement ceremony — Manchester',
    category: 'Bridal',
    tall: true,
  },
  {
    src: '/images/n.jpg',
    alt: 'Layered traditional coral bead necklace sets',
    caption: 'Coral bead detail',
    category: 'Accessories',
  },
  {
    src: '/images/l.jpg',
    alt: 'Man in ivory and gold embroidered agbada with fila cap',
    caption: 'Groom in ivory agbada',
    category: 'Grooms',
  },
  
  {
    src: '/images/4.jpg',
    alt: 'Woman in burgundy and gold Esan ceremonial attire',
    caption: 'Burgundy ceremonial set',
    category: 'Bridal',
  },
  
  {
    src: '/images/3.jpg',
    alt: 'Edo groom in white wrapper with layered coral bead necklaces',
    caption: 'Edo groom styling',
    category: 'Grooms',
    tall: true,
  },
  {
    src: '/images/r.jpg',
    alt: 'Child in cream and gold traditional agbada with cap',
    caption: 'Little one in cream agbada',
    category: 'Kids',
  },
  {
    src: '/images/i.jpg',
    alt: 'Woman in teal and gold Aso Oke with ornate gele headwrap',
    caption: 'Teal and gold Aso Oke',
    category: 'Aso Oke',
  },
  {
    src: '/images/kids-asooke.png',
    alt: 'Young girl in purple and gold Aso Oke with small gele',
    caption: 'Kids purple Aso Oke',
    category: 'Kids',
  },
  {
    src: '/images/7.jpg',
    alt: 'Ornate coral bead crown headpiece on a stand',
    caption: 'Coral crown headpiece',
    category: 'Accessories',
  },
  {
    src: '/images/collection-esan.png',
    alt: 'Woman in red Esan attire with coral bead headpiece',
    caption: 'Esan ceremonial look',
    category: 'Bridal',
  },
  {
    src: '/images/styling.png',
    alt: 'Hands tying an elaborate gold and purple gele headwrap',
    caption: 'Gele styling session',
    category: 'Weddings',
  },
  {
    src: '/images/beads-bracelets.png',
    alt: 'Coral bead bracelet and earring sets on velvet',
    caption: 'Bracelet and earring sets',
    category: 'Accessories',
  },
]

const CATEGORIES = [
  'All',
  'Weddings',
  'Bridal',
  'Grooms',
  'Aso Oke',
  'Accessories',
  'Kids',
]

export function GalleryGrid() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<Shot | null>(null)

  const shots =
    filter === 'All' ? SHOTS : SHOTS.filter((shot) => shot.category === filter)

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-2">
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
                  : 'border-primary/25 text-cream/70 hover:border-primary hover:text-primary',
              )}
            >
              {category.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>

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
    </>
  )
}
