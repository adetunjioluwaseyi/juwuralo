import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'

export const metadata: Metadata = {
  title: 'Contact | Juwuralo Alasooke',
  description: 'Get in touch with our styling team for rental inquiries, fittings, and custom orders.',
}

export default function ContactPage() {
  return (
    <main>
      <PageBanner
        eyebrow="CONTACT"
        title="Get in touch"
        highlight="with us"
        description="Email, call or send a message to discuss rentals, custom styling, delivery and fitting appointments."
        crumbs={[{ label: 'CONTACT' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-xs border border-primary/15 bg-secondary/20 p-8">
            <h2 className="font-serif text-2xl text-cream">Talk to our team</h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/65">
              For booking questions, fittings and bespoke requests, reach out to us and we will respond within one business day.
            </p>
            <dl className="mt-10 space-y-6 text-sm text-cream/70">
              <div>
                <dt className="text-[10px] tracking-[0.18em] text-primary uppercase">Email</dt>
                <dd className="mt-2">hello@juwuraloalasooke.co.uk</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.18em] text-primary uppercase">Phone</dt>
                <dd className="mt-2">+44 7000 000000</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.18em] text-primary uppercase">Studio</dt>
                <dd className="mt-2">London, United Kingdom</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xs border border-primary/15 bg-secondary/20 p-8">
            <h2 className="font-serif text-2xl text-cream">Send a note</h2>
            <form className="mt-8 grid gap-5">
              <label className="block text-[10px] tracking-brand text-cream/60">
                Name
                <input
                  type="text"
                  required
                  placeholder="Adeola Johnson"
                  className="mt-2 w-full rounded-xs border border-primary/25 bg-background px-4 py-3 text-sm text-cream placeholder:text-cream/35"
                />
              </label>
              <label className="block text-[10px] tracking-brand text-cream/60">
                Email
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xs border border-primary/25 bg-background px-4 py-3 text-sm text-cream placeholder:text-cream/35"
                />
              </label>
              <label className="block text-[10px] tracking-brand text-cream/60">
                Message
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your event and what you'd like to wear."
                  className="mt-2 w-full rounded-xs border border-primary/25 bg-background px-4 py-3 text-sm text-cream placeholder:text-cream/35"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-xs bg-primary px-6 py-4 text-[11px] font-semibold tracking-brand text-primary-foreground transition-colors hover:bg-primary/90"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
