'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL, type ApiOrder, type ApiUserProfile } from '@/lib/api'
import { authorizedFetch, getAuthToken, logout } from '@/lib/auth'

export default function AccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ApiUserProfile | null>(null)
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [newAddress, setNewAddress] = useState('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addressSaving, setAddressSaving] = useState(false)
  const [addressError, setAddressError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = getAuthToken()

    if (!token) {
      router.replace('/login')
      setLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await authorizedFetch(`${API_BASE_URL}/api/auth/profile`, {
          cache: 'no-store',
        })

        if (!res.ok) {
          if (res.status === 401) {
            await logout()
            setProfile(null)
            setLoading(false)
            router.replace('/login')
            return
          }
          throw new Error('Failed to load account profile')
        }

        const data = await res.json()
        setProfile(data as ApiUserProfile)

        const ordersRes = await authorizedFetch(`${API_BASE_URL}/api/orders/mine`, {
          cache: 'no-store',
        })

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json()
          setOrders(Array.isArray(ordersData) ? (ordersData as ApiOrder[]) : [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unexpected error')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const joinedDate = useMemo(() => {
    if (!profile?.createdAt) {
      return '—'
    }

    return new Date(profile.createdAt).toLocaleDateString()
  }, [profile])

  const formatOrderStatus = (status: ApiOrder['status']): string => {
    if (status === 'placed') return 'Placed'
    if (status === 'paid') return 'Paid'
    if (status === 'shipped') return 'Shipped'
    if (status === 'delivered') return 'Delivered'
    return 'Cancelled'
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
    router.refresh()
  }

  const handleAddAddress = async () => {
    const value = newAddress.trim()

    if (!value) {
      setAddressError('Please enter a valid address')
      return
    }

    try {
      setAddressSaving(true)
      setAddressError(null)

      const res = await authorizedFetch(`${API_BASE_URL}/api/auth/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: value }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to add address')
      }

      setProfile((prev) => (prev ? { ...prev, address: data.address } : prev))
      setNewAddress('')
      setShowAddressForm(false)
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Failed to add address')
    } finally {
      setAddressSaving(false)
    }
  }

  const handleRemoveAddress = async (index: number) => {
    try {
      setAddressSaving(true)
      setAddressError(null)

      const res = await authorizedFetch(`${API_BASE_URL}/api/auth/addresses/${index}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || 'Failed to remove address')
      }

      setProfile((prev) => (prev ? { ...prev, address: data.address } : prev))
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Failed to remove address')
    } finally {
      setAddressSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-color5">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#06141b] font-poppins mb-2">
            My Account
          </h1>
          <p className="text-[#4a5c6a]">Manage your account information and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="border border-black">
              <CardContent className="p-4 space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-[#f3f4f6] text-black font-medium hover:bg-[#e5e7eb] transition flex items-center justify-between">
                  Profile
                </button>
                <a href="#Orders">
                <button className="w-full text-left px-4 py-3 rounded-lg text-black hover:bg-[#f3f4f6] transition flex items-center justify-between">
                  Orders
                </button>
                </a>
                {/* <button className="w-full text-left px-4 py-3 rounded-lg text-black hover:bg-[#f3f4f6] transition flex items-center justify-between">
                  <Settings className="w-4 h-4 mr-2 inline" />
                  Settings
                  <div></div>
                </button> */}
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg text-destructive hover:bg-red-50 transition flex items-center justify-between mt-4 border-t border-[#e5e7eb] pt-4">
                  <span className="inline-flex w-full items-center justify-between cursor-pointer">
                    <span>
                      <LogOut className="w-4 h-4 mr-2 inline" />
                      Log Out
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-[#06141b] font-poppins">
                    Profile Information
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {loading ? <p className="text-[#4a5c6a]">Loading profile...</p> : null}
                {error ? <p className="text-red-600">{error}</p> : null}
                {!loading && !profile ? (
                  <div className="space-y-3">
                    <p className="text-[#4a5c6a]">You are not logged in.</p>
                    <Link href="/login">
                      <Button variant="outline">Go to Login</Button>
                    </Link>
                  </div>
                ) : null}

                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Full Name</p>
                  <p className="text-[#06141b] font-medium">{profile?.fullName || '—'}</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Email Address</p>
                  <p className="text-[#06141b] font-medium">{profile?.email || '—'}</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Phone Number</p>
                  <p className="text-[#06141b] font-medium">{profile?.phoneNumber || '—'}</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Date Joined</p>
                  <p className="text-[#06141b] font-medium">{joinedDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* My Orders */}
            <section id='Orders'></section>
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <CardTitle className="text-xl text-[#06141b] font-poppins">
                  My Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-[#4a5c6a]">No orders yet.</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order._id} className="border border-[#e5e7eb] rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-[#06141b]">Order #{order._id.slice(-6).toUpperCase()}</p>
                            <p className="text-sm text-[#9ba8ab]">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-[#4a5c6a] mt-1">{order.items.length} items • Total: ${order.total.toFixed(2)}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium w-fit">
                              {formatOrderStatus(order.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Address Book */}
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-[#06141b] font-poppins">
                    Saved Addresses
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddressForm((v) => !v)}>
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {showAddressForm ? (
                  <div className="space-y-3 border border-[#e5e7eb] rounded-lg p-4">
                    <textarea
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      rows={3}
                      placeholder="Enter full address"
                      className="w-full rounded-lg border border-[#e5e7eb] p-3 text-sm text-[#06141b]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddAddress} disabled={addressSaving}>
                        {addressSaving ? 'Saving...' : 'Save Address'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowAddressForm(false)
                          setNewAddress('')
                          setAddressError(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : null}

                {addressError ? <p className="text-sm text-red-600">{addressError}</p> : null}

                {profile?.address && profile.address.length > 0 ? (
                  profile.address.map((addr, index) => (
                    <div key={`${addr}-${index}`} className="border border-[#e5e7eb] rounded-lg p-4">
                      <p className="text-sm text-[#4a5c6a] whitespace-pre-line">{addr}</p>
                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveAddress(index)}
                          disabled={addressSaving}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#4a5c6a]">No saved addresses yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
