import type { Metadata } from 'next'
import { PageBanner } from '@/components/page-banner'
import { getBookings } from '@/lib/bookings'
import { getProducts } from '@/lib/products'
import { AdminDashboard } from './admin-dashboard'

export const metadata: Metadata = {
  title: 'Admin Portal | Juwuralo Alasooke',
  description: 'Manage booking requests and products.',
}

export default async function AdminPage() {
  const [bookings, products] = await Promise.all([getBookings(), getProducts()])

  const formattedBookings = bookings.map((b: any, index: number) => ({
    id: b.id || index.toString(),
    fullName: b.fullName || b.name || 'Anonymous Client',
    email: b.email || 'N/A',
    phone: b.phone || 'N/A',
    item: b.item || 'Custom Attire',
    type: (b.type || 'rental') as 'rental' | 'sale',
    status: (b.status || 'pending') as 'pending' | 'approved',
    eventDate: b.eventDate || 'TBD',
    createdAt: b.createdAt || new Date().toISOString(),
  }))

  return (
    <main>
      <PageBanner
        eyebrow="ADMINISTRATOR"
        title="Portal"
        highlight="Dashboard"
        description="Review pending rental requests, inspect sales analytics, and manage products."
        crumbs={[{ label: 'ADMIN' }]}
      />
      <AdminDashboard initialBookings={formattedBookings} initialProducts={products} />
    </main>
  )
}