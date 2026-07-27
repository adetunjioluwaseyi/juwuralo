import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { COLLECTIONS } from '@/lib/catalog'

const LINKS = [
  {
    title: 'EXPLORE',
    items: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Collections', href: '/collections' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'COLLECTIONS',
    items: COLLECTIONS.map((c) => ({
      label: c.name.charAt(0) + c.name.slice(1).toLowerCase(),
      href: `/collections/${c.slug}`,
    })),
  },
  {
    title: 'RENTALS',
    items: [
      { label: 'Book a Rental', href: '/rentals' },
      { label: 'How It Works', href: '/rentals#how-it-works' },
      { label: 'Rental Policy', href: '/rentals#policy' },
      { label: 'FAQs', href: '/rentals#faqs' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/15 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <BrandLogo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
            Premium traditional attire and cultural accessories, available to
            rent or purchase for weddings, engagements, photoshoots and special
            occasions across the United Kingdom.
          </p>
        </div>

        {LINKS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-[11px] tracking-brand text-primary">
              {group.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-primary/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-cream/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              London, United Kingdom
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              +44 7000 000000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              hello@juwuraloalasooke.co.uk
            </li>
          </ul>
          <p>
            &copy; {new Date().getFullYear()} Juwuralo Alasooke. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
