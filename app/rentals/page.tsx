import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  CalendarCheck,
  PackageCheck,
  Search,
  Truck,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react'
import { PageBanner } from '@/components/page-banner'
import { RentalForm } from '@/components/rental-form'

export const metadata: Metadata = {
  title: 'Book a Rental | Juwuralo Alasooke',
  description:
    'Reserve traditional attire and coral bead accessories for your wedding, engagement or photoshoot with UK-wide delivery.',
}

const STEPS = [
  {
    icon: Search,
    body:  'Payment Details — Bank Transfer'  ,
    title:'Account Name: JUWURALO ALASOOKE LIMITED. Account Number: 10073686. Sort Code: 40-00-05. Monzo Bank.  ',
    
  },
  {
    icon: CalendarCheck,
    title: 'Please send a screenshot or PDF of your bank transfer or payment receipt to.07586 738130 and upload it below.',
  },
  {
    icon: Truck,
    title: 'We will confirm availability and payment within 24 hours.',
    
  },
  {
    icon: PackageCheck,
    title: 'Wear & return',
    body: 'Celebrate, then send everything back with the prepaid return label. Cleaning is on us.',
  },
]

const POLICY = [
  {
    icon: ShieldCheck,
    title: 'Security deposit',
    body: 'A refundable £100 deposit is held per rental and returned within 5 working days of inspection.',
  },
  {
    icon: Clock,
    title: 'Rental period',
    body: 'Standard rentals run for 4 days. Extensions are available at 20% of the rental price per extra day.',
  },
  {
    icon: Sparkles,
    title: 'Cleaning & care',
    body: 'Professional cleaning is included. Please do not machine wash, iron directly or alter any piece.',
  },
]

const FAQS = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend at least four weeks for weddings and engagement ceremonies. Popular Edo and Aso Oke sets book out quickly during peak season.',
  },
  {
    q: 'Do you deliver across the whole UK?',
    a: 'Yes. We deliver to all UK mainland addresses with tracked courier service, and offer collection from our London studio at no charge.',
  },
  {
    q: 'Can I try pieces on before my event?',
    a: 'Studio fittings are available by appointment in London. Get in touch through the contact page to arrange a slot.',
  },
  {
    q: 'What if a piece is damaged?',
    a: 'Minor wear is expected and covered. Significant damage or loss is charged against the deposit and, where needed, the replacement value of the piece.',
  },
  {
    q: 'Can I buy instead of rent?',
    a: 'Most pieces are available to purchase. Purchase prices are listed on each item, and bespoke commissions can be arranged.',
  },
]

export default function RentalsPage() {
  return (
    <main>
      <PageBanner
        eyebrow="UK-WIDE RENTAL SERVICE"
        title="Book a"
        highlight="Rental"
        description="Tell us what you would like to wear and when you need it. We handle styling, steaming, delivery and cleaning."
        crumbs={[{ label: 'RENTALS' }]}
      />

      <section
        id="how-it-works"
        className="border-b border-primary/15 bg-secondary/15"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
          <h2 className="text-center font-serif text-2xl text-cream sm:text-3xl">
            How It Works
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xs border border-primary/15 bg-background/50 p-6"
              >
                <div className="flex items-center justify-between">
                  <step.icon
                    className="size-6 text-primary"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-2xl text-primary/25">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-cream/60">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="book" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="text-center font-serif text-2xl text-cream sm:text-3xl">
          Booking Request
        </h2>
        <p className="mx-auto mt-3 mb-10 max-w-md text-center text-sm leading-relaxed text-cream/60">
          Complete the form below and we will confirm availability and payment
          details within 24 hours.
        </p>
        <Suspense
          fallback={
            <div className="h-96 rounded-xs border border-primary/20 bg-secondary/20" />
          }
        >
          <RentalForm />
        </Suspense>
      </section>

      <section id="policy" className="border-y border-primary/15 bg-secondary/15">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
          <h2 className="text-center font-serif text-2xl text-cream sm:text-3xl">
            Rental Policy
          </h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {POLICY.map((policy) => (
              <li
                key={policy.title}
                className="rounded-xs border border-primary/15 bg-background/50 p-6"
              >
                <policy.icon
                  className="size-6 text-primary"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-serif text-lg text-cream">
                  {policy.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-cream/60">
                  {policy.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faqs" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 className="text-center font-serif text-2xl text-cream sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <ul className="mt-10 flex flex-col gap-3">
          {FAQS.map((faq) => (
            <li key={faq.q}>
              <details className="group rounded-xs border border-primary/20 bg-secondary/20 px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm text-cream">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-cream/60">
                  {faq.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
