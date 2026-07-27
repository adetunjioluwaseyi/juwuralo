import Image from 'next/image'
import Link from 'next/link'
import { COLLECTIONS } from '@/lib/catalog'

export function Collections() {
  return (
    <section id="collections" className="bg-cream pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 className="text-center font-serif text-3xl text-[#1a1035] sm:text-4xl">
          Our Collections
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-[#1a1035]/65">
          Curated pieces for every celebration — rent or buy, delivered across
          the UK.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {COLLECTIONS.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/collections/${item.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xs"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,16,53,0.92)_0%,rgba(26,16,53,0.35)_45%,rgba(26,16,53,0.05)_100%)]"
                />
                <span className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 text-center">
                  <span className="font-serif text-base tracking-[0.08em] text-cream sm:text-lg">
                    {item.name}
                  </span>
                  <span className="text-[9px] tracking-[0.18em] text-cream/70">
                    {item.sub}
                  </span>
                </span>
                <span className="absolute inset-0 border border-primary/0 transition-colors group-hover:border-primary/70" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/collections"
            className="rounded-xs border border-[#1a1035]/25 px-7 py-3.5 text-[10px] font-semibold tracking-brand text-[#1a1035] transition-colors hover:border-[#1a1035] hover:bg-[#1a1035] hover:text-cream"
          >
            VIEW ALL COLLECTIONS
          </Link>
        </div>
      </div>
    </section>
  )
}
