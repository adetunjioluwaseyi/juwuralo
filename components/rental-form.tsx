'use client'

import { useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { ALL_ITEMS } from '@/lib/catalog'

const fieldClass =
  'w-full rounded-xs border border-primary/25 bg-background px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
const labelClass = 'mb-2 block text-[10px] tracking-brand text-cream/60'

export function RentalForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselected = searchParams.get('item') ?? ''
  const [item, setItem] = useState(preselected)
  const [size, setSize] = useState('')
  const [occasion, setOccasion] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [postcode, setPostcode] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selected = ALL_ITEMS.find((i) => i.slug === item)

  if (submitting) {
    return (
      <div className="rounded-xs border border-primary/30 bg-secondary/25 p-8 text-center sm:p-12">
        <CheckCircle2
          className="mx-auto size-10 text-primary"
          aria-hidden="true"
        />
        <h2 className="mt-5 font-serif text-2xl text-cream">
          Booking request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/65">
          Thank you. Our team will confirm availability and send payment details
          within 24 hours. Please check your email, including your spam folder.
        </p>
      </div>
    )
  }

  const validateFields = () => {
    if (!item || !size || !occasion || !fullName || !email || !phone || !postcode || !eventDate || !returnDate) {
      setError('Please complete all required booking fields before reviewing your request.')
      return false
    }
    setError('')
    return true
  }

  const handlePreview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateFields()) return
    setShowSummary(true)
  }

  const handleFinalSubmit = async () => {
    setSubmitting(true)
    setError('')

    const formData = new FormData()
    formData.append('item', item)
    formData.append('size', size)
    formData.append('occasion', occasion)
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('postcode', postcode)
    formData.append('eventDate', eventDate)
    formData.append('returnDate', returnDate)
    formData.append('notes', notes)
    if (paymentProofFile) {
      formData.append('paymentProof', paymentProofFile)
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        setError(data?.error || 'Unable to submit booking request. Please try again.')
        setSubmitting(false)
        setShowSummary(false)
        return
      }

      const data = await response.json()
      router.push(`/booking-confirmation?trackingId=${data.booking.trackingId}`)
    } catch (err) {
      setError('Unable to submit booking request. Please check your connection.')
      setSubmitting(false)
      setShowSummary(false)
    }
  }

  return (
    <div className="relative">
      <form
        onSubmit={handlePreview}
        className="rounded-xs border border-primary/20 bg-secondary/20 p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="item" className={labelClass}>
              PIECE YOU WOULD LIKE TO RENT
            </label>
            <select
              id="item"
              name="item"
              required
              value={item}
              onChange={(event) => {
                setItem(event.target.value)
                setSize('')
              }}
              className={fieldClass}
            >
              <option value="">Select a piece</option>
              {ALL_ITEMS.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.collection} — {option.name} (£{option.rentalPrice})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="size" className={labelClass}>
              SIZE
            </label>
            <select
              id="size"
              name="size"
              required
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className={fieldClass}
            >
              <option value="">
                {selected ? 'Select a size' : 'Choose a piece first'}
              </option>
              {(selected?.sizes ?? []).map((optionSize) => (
                <option key={optionSize} value={optionSize}>
                  {optionSize}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="occasion" className={labelClass}>
              OCCASION
            </label>
            <select
              id="occasion"
              name="occasion"
              required
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
              className={fieldClass}
            >
              <option value="">Select an occasion</option>
              <option>Traditional wedding</option>
              <option>Engagement ceremony</option>
              <option>Photoshoot</option>
              <option>Birthday or anniversary</option>
              <option>Other celebration</option>
            </select>
          </div>

          <div>
            <label htmlFor="fullName" className={labelClass}>
              FULL NAME
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              placeholder="Adeola Johnson"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              PHONE NUMBER
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+44 7000 000000"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="postcode" className={labelClass}>
              DELIVERY POSTCODE
            </label>
            <input
              id="postcode"
              name="postcode"
              required
              autoComplete="postal-code"
              placeholder="SE1 7QD"
              value={postcode}
              onChange={(event) => setPostcode(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="eventDate" className={labelClass}>
              EVENT DATE
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              required
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="returnDate" className={labelClass}>
              RETURN DATE
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="notes" className={labelClass}>
              STYLING NOTES (OPTIONAL)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Gele styling, accessory add-ons, colour preferences, measurements…"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="paymentProof" className={labelClass}>
              PAYMENT PROOF (Important) — Upload a screenshot or PDF of your bank transfer or payment receipt. Accepted formats: JPG, PNG, PDF.
            </label>
            <input
              id="paymentProof"
              name="paymentProof"
              type="file"
              required
              accept="image/*,.pdf"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0] ?? null
                setPaymentProofFile(file)
              }}
              className="w-full rounded-xs border border-primary/25 bg-background px-4 py-3 text-sm text-cream"
            />
            {paymentProofFile ? (
              <p className="mt-2 text-[11px] text-cream/65">
                Selected: {paymentProofFile.name}
              </p>
            ) : null}
          </div>
        </div>

        {selected ? (
          <p className="mt-6 rounded-xs border border-primary/20 bg-background/60 px-4 py-3 text-xs leading-relaxed text-cream/65">
            <span className="text-primary">{selected.name}</span> — rental £
            {selected.rentalPrice} for 4 days, or purchase for £
            {selected.purchasePrice}. A refundable £100 security deposit
            applies to all rentals.
          </p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xs border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xs bg-primary px-6 py-4 text-[11px] font-semibold tracking-brand text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          REVIEW REQUEST
        </button>

        <p className="mt-4 text-center text-[10px] leading-relaxed text-cream/40">
          Submitting a request does not confirm your booking. We will contact you
          to confirm availability and arrange payment.
        </p>
      </form>

      {showSummary && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm">
    <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-primary/20 bg-secondary/95 shadow-2xl">
      {/* Header */}
      <div className="shrink-0 border-b border-primary/15 bg-background/95 px-4 py-3 sm:px-5">
        <h2 className="text-lg font-semibold text-cream">Review your booking</h2>
        <p className="mt-0.5 text-xs text-cream/65">
          Please review the details below before final submission.
        </p>
      </div>

      {/* Scrollable Content Body */}
      <div className="overflow-y-auto space-y-3.5 px-4 py-4 sm:px-5 text-xs text-cream">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Piece</p>
            <p className="mt-0.5 text-sm font-medium">{selected?.name ?? item}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Size</p>
            <p className="mt-0.5 text-sm font-medium">{size}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Occasion</p>
            <p className="mt-0.5 text-sm font-medium">{occasion}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Dates</p>
            <p className="mt-0.5 text-sm font-medium">{eventDate} → {returnDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Contact</p>
            <p className="mt-0.5 text-xs font-medium truncate">{fullName}</p>
            <p className="text-xs text-cream/70 truncate">{email}</p>
            <p className="text-xs text-cream/70">{phone}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Delivery postcode</p>
            <p className="mt-0.5 text-sm font-medium">{postcode}</p>
          </div>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">Payment proof</p>
          <p className="mt-0.5 text-xs font-medium truncate">
            {paymentProofFile ? paymentProofFile.name : 'Not attached yet'}
          </p>
        </div>

        <div className="rounded-xs border border-primary/20 bg-background/80 p-3 text-xs text-cream/75">
          <p className="font-semibold text-cream">Please note</p>
          <p className="mt-1 leading-snug">
            Refundable damage deposit fee and delivery fee apply. Delivery fee does not include return fee. You are expected to return the item by the agreed return date.
          </p>
        </div>
      </div>

      {/* Fixed Sticky Footer */}
      <div className="shrink-0 flex flex-col gap-2 border-t border-primary/15 bg-background/95 px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
        <button
          type="button"
          onClick={() => setShowSummary(false)}
          className="rounded-xs border border-primary/25 bg-background px-4 py-2.5 text-[11px] font-semibold text-cream transition hover:border-primary"
        >
          Edit details
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          className="rounded-xs bg-primary px-4 py-2.5 text-[11px] font-semibold tracking-brand text-primary-foreground transition hover:bg-primary/90"
        >
          Confirm and submit request
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}
