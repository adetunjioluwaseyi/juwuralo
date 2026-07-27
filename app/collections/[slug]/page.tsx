import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageBanner } from '@/components/page-banner'
import { ItemCard } from '@/components/item-card'
import { COLLECTIONS, getCollection } from '@/lib/catalog'

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) return { title: 'Collection not found | Juwuralo Alasooke' }

  return {
    title: `${collection.name} Collection | Juwuralo Alasooke`,
    description: collection.description,
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = getCollection(slug)

  if (!collection) notFound()

  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug)

  return (
    <main>
      <PageBanner
        eyebrow={collection.tagline}
        title={collection.name}
        highlight={collection.sub === '& ACCESSORIES' ? '& Accessories' : 'Collection'}
        description={collection.description}
        crumbs={[
          { label: 'COLLECTIONS', href: '/collections' },
          { label: collection.name },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collection.items.map((item) => (
            <li key={item.slug}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-primary/15 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <h2 className="text-[10px] tracking-brand text-primary">
            EXPLORE OTHER COLLECTIONS
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/collections/${other.slug}`}
                  className="inline-block rounded-xs border border-primary/25 px-5 py-3 text-[10px] tracking-brand text-cream/75 transition-colors hover:border-primary hover:text-primary"
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
