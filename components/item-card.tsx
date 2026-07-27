 'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CatalogItem } from '@/lib/catalog'

export function ItemCard({
  item,
  collectionLabel,
}: {
  item: CatalogItem
  collectionLabel?: string
}) {
  const router = useRouter()
  const [showTerms, setShowTerms] = useState(false)

  function handleAgree() {
    setShowTerms(false)
    router.push(`/rentals?item=${item.slug}`)
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xs border border-primary/15 bg-secondary/25 transition-colors hover:border-primary/50">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {collectionLabel ? (
          <p className="text-[9px] tracking-brand text-primary">
            {collectionLabel}
          </p>
        ) : null}

        <h3 className="font-serif text-lg leading-snug text-cream">
          {item.name}
        </h3>

        <p className="text-xs leading-relaxed text-cream/60">
          {item.description}
        </p>

        <dl className="mt-auto flex items-end justify-between gap-4 border-t border-primary/10 pt-4">
          <div>
            <dt className="text-[9px] tracking-[0.16em] text-cream/45">
              RENTAL
            </dt>
            <dd className="font-serif text-xl text-primary">
              &pound;{item.rentalPrice}
              <span className="ml-1 font-sans text-[10px] tracking-wide text-cream/45">
                / 4 days
              </span>
            </dd>
          </div>
          <div className="text-right">
            <dt className="text-[9px] tracking-[0.16em] text-cream/45">BUY</dt>
            <dd className="font-serif text-base text-cream/80">
              &pound;{item.purchasePrice}
            </dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5">
          {item.sizes.map((size) => (
            <li
              key={size}
              className="rounded-xs border border-primary/20 px-2 py-1 text-[9px] tracking-wide text-cream/55"
            >
              {size}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setShowTerms(true)}
          className="mt-1 rounded-xs bg-primary px-4 py-3 text-center text-[10px] font-semibold tracking-brand text-primary-foreground transition-colors hover:bg-primary/90"
        >
          BOOK THIS PIECE
        </button>
      </div>

      {showTerms ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 py-10">
          <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-primary/20 bg-secondary/95 shadow-2xl">
            <div className="border-b border-primary/15 px-6 py-5 bg-background/95">
              <h3 className="text-lg font-semibold text-cream">Terms &amp; Conditions</h3>
            </div>
            <div className="px-6 py-6 text-sm text-cream">
              <p className="mb-4">
                By proceeding you agree to our rental terms. You will be required to pay a refundable damage deposit and a delivery fee. Delivery fee does not include the return fee — you are responsible for returning the item by the agreed return date.
              </p>
              <p className="mb-2 text-xs text-cream/65">Please ensure measurements and styling notes are accurate. If you do not agree, you may cancel and continue browsing.</p>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-primary/15 bg-background/95 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="rounded-xs border border-primary/25 bg-background px-4 py-2 text-[11px] font-semibold text-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAgree}
                className="rounded-xs bg-primary px-4 py-2 text-[11px] font-semibold tracking-brand text-primary-foreground"
              >
                I agree — continue to booking
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  )
}
