'use client'

import { useState } from 'react'
import type { BookingRecord } from '@/lib/bookings'
import { ALL_ITEMS } from '@/lib/catalog'

function lookupItemName(slug: string) {
  return ALL_ITEMS.find((item) => item.slug === slug)?.name ?? slug
}

export function AdminBookingsTable({ bookings }: { bookings: BookingRecord[] }) {
  const [records, setRecords] = useState(bookings)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const updateStatus = async (
    id: string,
    status: 'pending' | 'confirmed' | 'collected' | 'returned' | 'cancelled'
  ) => {
    setLoadingId(id)
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) return
      const data = await response.json()
      setRecords((prev) => prev.map((record) => (record.id === id ? data.booking : record)))
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="rounded-xs border border-primary/15 bg-secondary/20 overflow-hidden">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-cream">
        <thead className="bg-background/70 text-[10px] uppercase tracking-[0.24em] text-cream/60">
          <tr>
            <th className="px-4 py-4">Tracking</th>
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Item</th>
            <th className="px-4 py-4">Payment</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((booking) => (
            <tr key={booking.id} className="border-t border-primary/15 even:bg-background/5">
              <td className="px-4 py-4 align-top text-xs text-cream/60">{booking.trackingId}</td>
              <td className="px-4 py-4 align-top">{booking.fullName}</td>
              <td className="px-4 py-4 align-top">{lookupItemName(booking.item)}</td>
              <td className="px-4 py-4 align-top">
                {booking.paymentProofUrl ? (
                  <a
                    href={booking.paymentProofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    View proof
                  </a>
                ) : (
                  <span className="text-cream/60">No proof</span>
                )}
              </td>
              <td className="px-4 py-4 align-top text-xs uppercase tracking-[0.12em] text-primary">{booking.status}</td>
              <td className="px-4 py-4 align-top space-x-2">
                {booking.status === 'pending' ? (
                  <button
                    type="button"
                    disabled={loadingId === booking.id}
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="rounded-xs bg-primary px-3 py-2 text-[10px] font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                  >
                    Confirm
                  </button>
                ) : null}

                {booking.status === 'confirmed' ? (
                  <button
                    type="button"
                    disabled={loadingId === booking.id}
                    onClick={() => updateStatus(booking.id, 'collected')}
                    className="rounded-xs bg-amber-600 px-3 py-2 text-[10px] font-semibold text-primary-foreground transition hover:bg-amber-700 disabled:opacity-60"
                  >
                    Mark collected
                  </button>
                ) : null}

                {booking.status === 'collected' ? (
                  <button
                    type="button"
                    disabled={loadingId === booking.id}
                    onClick={() => updateStatus(booking.id, 'returned')}
                    className="rounded-xs bg-emerald-600 px-3 py-2 text-[10px] font-semibold text-primary-foreground transition hover:bg-emerald-700 disabled:opacity-60"
                  >
                    Mark returned
                  </button>
                ) : null}

                <button
                  type="button"
                  disabled={loadingId === booking.id}
                  onClick={() => updateStatus(booking.id, 'cancelled')}
                  className="rounded-xs border border-primary/25 bg-background px-3 py-2 text-[10px] font-semibold text-cream transition hover:border-primary disabled:opacity-60"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
