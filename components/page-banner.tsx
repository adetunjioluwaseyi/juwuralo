import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

export function PageBanner({
  eyebrow,
  title,
  highlight,
  description,
  crumbs = [],
}: {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  crumbs?: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-primary/15 bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(68,49,95,0.7),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-10 lg:py-20">
        {eyebrow ? (
          <p className="text-[10px] tracking-brand text-primary">{eyebrow}</p>
        ) : null}

        <h1 className="mt-4 font-serif text-3xl leading-tight text-balance text-cream sm:text-4xl lg:text-5xl">
          {title}
          {highlight ? (
            <>
              {' '}
              <span className="text-primary italic">{highlight}</span>
            </>
          ) : null}
        </h1>

        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-pretty text-cream/70">
            {description}
          </p>
        ) : null}

        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-[10px] tracking-[0.14em] text-cream/50">
              <li className="flex items-center gap-2">
                <Link href="/" className="transition-colors hover:text-primary">
                  HOME
                </Link>
                <ChevronRight className="size-3" aria-hidden="true" />
              </li>
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-primary">{crumb.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <ChevronRight className="size-3" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </div>
    </section>
  )
}
