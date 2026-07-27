import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Crown, HeartHandshake, Leaf, Users } from 'lucide-react'
import { PageBanner } from '@/components/page-banner'

export const metadata: Metadata = {
  title: 'About Us | Juwuralo Alasooke',
  description:
    'Juwuralo Alasooke is a UK-based traditional attire rental house preserving Nigerian heritage dress for weddings, engagements and photoshoots.',
}

const VALUES = [
  {
    icon: Crown,
    title: 'Authenticity first',
    body: 'Every piece is sourced from trusted weavers and bead artisans in Nigeria — never mass-market imitations.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal styling',
    body: 'We advise on colour, coordination and gele styling so your look feels considered, not rented.',
  },
  {
    icon: Leaf,
    title: 'Sustainable celebration',
    body: 'Renting keeps heirloom-quality attire in circulation instead of worn once and stored away.',
  },
  {
    icon: Users,
    title: 'Family and community',
    body: 'From couples to full bridal parties and children, we dress every generation for the occasion.',
  },
]

const STATS = [
  { value: '500+', label: 'CELEBRATIONS DRESSED' },
  { value: '5', label: 'HERITAGE COLLECTIONS' },
  { value: '48hr', label: 'UK-WIDE DELIVERY' },
  { value: '100%', label: 'ARTISAN SOURCED' },
]

export default function AboutPage() {
  return (
    <main>
      <PageBanner
        eyebrow="OUR STORY"
        title="Preserving Heritage,"
        highlight="One Celebration at a Time"
        description="Juwuralo Alasooke is a UK-based traditional attire house making authentic Nigerian ceremonial dress accessible to the diaspora."
        crumbs={[{ label: 'ABOUT US' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-primary/15">
            <Image
              src="/images/studio.png"
              alt="Boutique atelier displaying handwoven Aso Oke fabrics and coral bead accessories"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[10px] tracking-brand text-primary">
              WHY WE STARTED
            </p>
            <h2 className="mt-4 font-serif text-2xl text-cream sm:text-3xl">
              Heritage should never be out of reach
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-pretty text-cream/65">
              <p>
                Traditional Nigerian attire is an investment. A full Edo bridal
                ensemble or a handwoven Aso Oke set can cost more than the
                celebration it is worn to — and then sit unworn for years.
              </p>
              <p>
                We founded Juwuralo Alasooke so families across the United
                Kingdom could wear the real thing on the days that matter.
                Handwoven cloth, artisan coral beadwork and proper styling,
                without the price of ownership or the stress of shipping from
                Lagos weeks before an event.
              </p>
              <p>
                Today we dress brides, grooms, parents, bridal parties and
                children for weddings, engagement ceremonies, naming
                ceremonies, milestone birthdays and editorial photoshoots — all
                from our London studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/15 bg-secondary/15">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="font-serif text-3xl text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] tracking-brand text-cream/55">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-primary/15">
              <Image
                src="/images/styling.png"
                alt="Hands tying an elaborate gold and purple gele headwrap"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-brand text-primary">
              WHAT WE STAND FOR
            </p>
            <h2 className="mt-4 font-serif text-2xl text-cream sm:text-3xl">
              Our values
            </h2>
            <ul className="mt-8 flex flex-col gap-6">
              {VALUES.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/35">
                    <value.icon
                      className="size-5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-cream/60">
                      {value.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-primary/15 bg-secondary/15">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="font-serif text-2xl text-balance text-cream sm:text-3xl">
            Ready to plan your look?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/65">
            Browse the collections or speak to our styling team about your
            celebration.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/collections"
              className="w-full rounded-xs bg-primary px-7 py-4 text-center text-[10px] font-semibold tracking-brand text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              EXPLORE COLLECTIONS
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-xs border border-primary/40 px-7 py-4 text-center text-[10px] font-semibold tracking-brand text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
              TALK TO OUR TEAM
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
