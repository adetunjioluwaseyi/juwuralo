'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarCheck,
  ShoppingBag,
  LogOut,
  Plus,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Package,
  Trash2,
} from 'lucide-react'

interface Booking {
  id: string
  fullName: string
  email: string
  phone: string
  item: string
  type: 'rental' | 'sale'
  status: 'pending' | 'approved'
  eventDate: string
  createdAt: string
}

interface Product {
  id: string
  name: string
  category: string
  type: 'rental' | 'sale' | 'both'
  price: string
  image?: string
  available: boolean
}

export function AdminDashboard({
  initialBookings,
  initialProducts,
}: {
  initialBookings: Booking[]
  initialProducts: Product[]
}) {
  const router = useRouter()

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loginError, setLoginError] = useState('')

  // Navigation & Data State
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'products'>('analytics')
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // New Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'couples',
    type: 'rental' as 'rental' | 'sale' | 'both',
    price: '',
    image: '',
  })

  // Auth Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === 'admin123') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid administrator credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPasscode('')
  }

  // Booking Action
  const toggleBookingStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === 'pending' ? 'approved' : 'pending' } : b
      )
    )
  }

  // API Call: Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price) return

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          type: newProduct.type,
          price: newProduct.price.startsWith('£') ? newProduct.price : `£${newProduct.price}`,
          image: newProduct.image || '/images/hero-couple.png',
        }),
      })

      if (res.ok) {
        const savedProduct = await res.json()
        setProducts((prev) => [...prev, savedProduct])
        setNewProduct({ name: '', category: 'couples', type: 'rental', price: '', image: '' })
        setIsAddingProduct(false)
        router.refresh()
      }
    } catch (error) {
      alert('Error adding product')
    }
  }

  // API Call: Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
        router.refresh()
      } else {
        alert('Failed to delete product.')
      }
    } catch (error) {
      alert('Error deleting product')
    }
  }

  // Filter Bookings Logic
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.item.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Analytics Metrics
  const rentalsCount = bookings.filter((b) => b.type === 'rental').length
  const salesCount = bookings.filter((b) => b.type === 'sale').length
  const totalCount = bookings.length || 1
  const rentalPercent = Math.round((rentalsCount / totalCount) * 100)
  const salesPercent = Math.round((salesCount / totalCount) * 100)

  // 1. SIGN IN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-primary/20 bg-secondary/90 p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-cream">Admin Access</h2>
            <p className="mt-2 text-xs text-cream/60">
              Enter admin passcode to access management dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-cream/70">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xs border border-primary/30 bg-background px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-primary focus:outline-none"
              />
            </div>

            {loginError && <p className="text-xs text-red-400">{loginError}</p>}

            <button
              type="submit"
              className="w-full rounded-xs bg-primary py-3 text-xs font-semibold tracking-widest text-primary-foreground transition hover:bg-primary/90"
            >
              LOG IN TO DASHBOARD
            </button>
          </form>
        </div>
      </div>
    )
  }

  // 2. DASHBOARD VIEW
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col gap-4 border-b border-primary/15 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 rounded-xs px-4 py-2.5 text-xs font-semibold tracking-wider transition ${
              activeTab === 'analytics'
                ? 'bg-primary text-primary-foreground'
                : 'border border-primary/20 text-cream/70 hover:border-primary'
            }`}
          >
            <LayoutDashboard className="size-4" /> OVERVIEW & CHARTS
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 rounded-xs px-4 py-2.5 text-xs font-semibold tracking-wider transition ${
              activeTab === 'bookings'
                ? 'bg-primary text-primary-foreground'
                : 'border border-primary/20 text-cream/70 hover:border-primary'
            }`}
          >
            <CalendarCheck className="size-4" /> REQUESTS ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 rounded-xs px-4 py-2.5 text-xs font-semibold tracking-wider transition ${
              activeTab === 'products'
                ? 'bg-primary text-primary-foreground'
                : 'border border-primary/20 text-cream/70 hover:border-primary'
            }`}
          >
            <ShoppingBag className="size-4" /> PRODUCTS ({products.length})
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-xs border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
        >
          <LogOut className="size-4" /> LOGOUT
        </button>
      </div>

      {/* TAB A: OVERVIEW & CHARTS */}
      {activeTab === 'analytics' && (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-primary/20 bg-secondary/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-cream/60">
                  Total Requests
                </span>
                <TrendingUp className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-serif text-cream">{bookings.length}</p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-secondary/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-cream/60">
                  Pending Approval
                </span>
                <Clock className="size-4 text-amber-400" />
              </div>
              <p className="mt-2 text-3xl font-serif text-amber-400">
                {bookings.filter((b) => b.status === 'pending').length}
              </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-secondary/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-cream/60">
                  Approved
                </span>
                <CheckCircle2 className="size-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-3xl font-serif text-emerald-400">
                {bookings.filter((b) => b.status === 'approved').length}
              </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-secondary/30 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-cream/60">
                  Active Products
                </span>
                <Package className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-3xl font-serif text-cream">{products.length}</p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-secondary/20 p-6">
            <h3 className="font-serif text-lg text-cream">Rentals vs Sales Volume</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-cream mb-1">
                    <span>Rentals ({rentalsCount})</span>
                    <span>{rentalPercent}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-background overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${rentalPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-cream mb-1">
                    <span>Sales ({salesCount})</span>
                    <span>{salesPercent}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-background overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${salesPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative size-36">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-emerald-500"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-primary"
                      strokeDasharray={`${rentalPercent}, 100`}
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-cream">{bookings.length}</span>
                    <span className="text-[9px] uppercase tracking-wider text-cream/50">Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: ALL REQUESTS */}
      {activeTab === 'bookings' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cream/40" />
              <input
                type="text"
                placeholder="Search client or item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xs border border-primary/20 bg-background pl-9 pr-4 py-2.5 text-xs text-cream focus:outline-none"
              />
            </div>

            <div className="flex rounded-xs border border-primary/20 p-1">
              {(['all', 'pending', 'approved'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  className={`rounded-xs px-3 py-1 text-[11px] uppercase tracking-wider transition ${
                    bookingFilter === filter
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-primary/15 bg-secondary/10">
            <table className="w-full text-left text-xs text-cream">
              <thead className="border-b border-primary/15 bg-background/80 text-[10px] uppercase tracking-wider text-cream/60">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Event Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-cream/50">
                      No requests found.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-primary/5">
                      <td className="px-4 py-3.5">
                        <p className="font-medium">{b.fullName}</p>
                        <p className="text-[11px] text-cream/60">{b.email}</p>
                      </td>
                      <td className="px-4 py-3.5">{b.item}</td>
                      <td className="px-4 py-3.5 capitalize">{b.type}</td>
                      <td className="px-4 py-3.5">{b.eventDate}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            b.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => toggleBookingStatus(b.id)}
                          className="rounded-xs border border-primary/30 bg-background px-3 py-1.5 text-[10px] uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition"
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB C: ADD & DELETE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-cream">Inventory Management</h3>
            <button
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center gap-2 rounded-xs bg-primary px-4 py-2 text-xs font-semibold tracking-wider text-primary-foreground hover:bg-primary/90 transition"
            >
              <Plus className="size-4" /> ADD PRODUCT
            </button>
          </div>

          {/* Add Product Modal Form */}
          {isAddingProduct && (
            <form
              onSubmit={handleAddProduct}
              className="rounded-lg border border-primary/20 bg-secondary/40 p-5 space-y-4 max-w-lg"
            >
              <h4 className="text-sm font-semibold text-cream">Add New Inventory Item</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="rounded-xs border border-primary/20 bg-background px-3 py-2 text-xs text-cream focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Price (e.g. 150)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="rounded-xs border border-primary/20 bg-background px-3 py-2 text-xs text-cream focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="rounded-xs border border-primary/20 bg-background px-3 py-2 text-xs text-cream focus:outline-none"
                >
                  <option value="couples">Couples</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="accessories">Accessories</option>
                </select>
                <select
                  value={newProduct.type}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      type: e.target.value as 'rental' | 'sale' | 'both',
                    })
                  }
                  className="rounded-xs border border-primary/20 bg-background px-3 py-2 text-xs text-cream focus:outline-none"
                >
                  <option value="rental">Rental Only</option>
                  <option value="sale">Sale Only</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="px-3 py-1.5 text-xs text-cream/70 hover:text-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xs bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Save Item
                </button>
              </div>
            </form>
          )}

          {/* Products List Grid with Delete Action */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-primary/15 bg-secondary/20 p-4 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-cream">{p.name}</h4>
                    <span className="text-xs font-semibold text-primary">{p.price}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-cream/50 mt-1">
                    {p.category} • {p.type}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                  <span className="text-xs text-cream/70">
                    {p.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(p.id)}
                    className="flex items-center gap-1 rounded-xs border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="size-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}