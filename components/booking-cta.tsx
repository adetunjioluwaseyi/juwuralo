import { ArrowRight } from 'lucide-react'

export function BookingCta() {
  return (
    <section
      id="book"
      className="bg-background"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="text-[11px] tracking-brand text-primary">
          RENT OR BUY — UK WIDE
        </p>
        <h2
          id="booking-heading"
          className="mt-5 font-serif text-3xl leading-tight text-balance text-cream sm:text-4xl"
        >
          Ready to look your finest on the big day?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70">
          Reserve your attire with a refundable holding deposit. Complete your
          bank transfer, upload your proof of payment, and we handle the rest.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="rounded-xs bg-primary px-8 py-4 text-[11px] font-semibold tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            BOOK A RENTAL
          </a>
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 rounded-xs border border-primary/50 px-8 py-4 text-[11px] font-semibold tracking-[0.16em] text-primary transition-colors hover:bg-primary/10"
          >
            TALK TO US
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
