'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { COLLECTIONS } from '@/lib/catalog'
import { cn } from '@/lib/utils'

const RENTAL_LINKS = [
  { label: 'BOOK A RENTAL', href: '/rentals' },
  { label: 'HOW IT WORKS', href: '/rentals#how-it-works' },
  { label: 'RENTAL POLICY', href: '/rentals#policy' },
]

const NAV = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  {
    label: 'COLLECTIONS',
    href: '/collections',
    menu: COLLECTIONS.map((c) => ({
      label: c.name,
      href: `/collections/${c.slug}`,
    })),
  },
  { label: 'RENTALS', href: '/rentals', menu: RENTAL_LINKS },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT', href: '/contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" aria-label="Juwuralo Alasooke home">
          <BrandLogo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 pb-1 text-[11px] tracking-[0.14em] transition-colors',
                    isActive(item.href)
                      ? 'border-b border-primary text-primary'
                      : 'text-cream/80 hover:text-primary',
                  )}
                >
                  {item.label}
                  {item.menu ? (
                    <ChevronDown className="size-3.5" aria-hidden="true" />
                  ) : null}
                </Link>

                {item.menu ? (
                  <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-48 rounded-xs border border-primary/20 bg-popover py-2 shadow-xl">
                      {item.menu.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="block px-4 py-2.5 text-[10px] tracking-[0.14em] text-cream/75 transition-colors hover:bg-primary/10 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/rentals"
          className="hidden rounded-xs bg-primary px-5 py-3 text-[10px] font-semibold tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-block"
        >
          BOOK A RENTAL
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-primary lg:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[70vh] overflow-y-auto border-t border-primary/15 bg-background lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 pt-2 pb-6">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-primary/10 py-3 text-xs tracking-[0.14em] text-cream/85"
                >
                  {item.label}
                </Link>
                {item.menu ? (
                  <ul className="flex flex-col border-b border-primary/10 py-1 pl-4">
                    {item.menu.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-[10px] tracking-[0.14em] text-cream/55"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/rentals"
                onClick={() => setOpen(false)}
                className="block rounded-xs bg-primary px-5 py-3 text-center text-[11px] font-semibold tracking-[0.16em] text-primary-foreground"
              >
                BOOK A RENTAL
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
