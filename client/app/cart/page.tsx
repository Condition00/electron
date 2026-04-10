'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/api'
import { useCart } from '@/lib/CartContext'
import { authorizedFetch, getAuthToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const router = useRouter()
  const { cart, setQty, removeFromCart, clearCart } = useCart()
  const [authChecked, setAuthChecked] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.replace('/login')
      return
    }
    setAuthChecked(true)
  }, [router])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      return
    }
    setQty(id, newQuantity)
  }

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setCheckoutError(null)

    if (!getAuthToken()) {
      router.push('/login')
      return
    }

    if (cart.length === 0) {
      return
    }

    try {
      setCheckoutLoading(true)

      const res = await authorizedFetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'Checkout failed')
      }

      clearCart()
      router.push('/account#Orders')
      router.refresh()
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (!authChecked) {
    return null
  }

  return (
    <div className="min-h-screen bg-color4 px-4 pb-6 pt-20 md:px-8 md:pb-8 md:pt-24 lg:px-12 lg:pt-28">
      <main className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
        <div className="bg-color3 px-6 py-6 md:px-8 md:py-7">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-poppins">
            CHECK OUT
          </h1>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="px-6 py-6 md:px-8 md:py-8 lg:border-r lg:border-black/5">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-color1 font-poppins">
                Shopping Cart
              </h2>
              <p className="mt-1 text-sm text-color4">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="rounded-2xl border border-black/10">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-black/10 px-4 py-3 text-sm font-medium text-color4 md:px-5">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span className="text-right">Total</span>
                  </div>

                  <div>
                    {cart.map((item, index) => (
                      <div
                        key={item._id}
                        className={`grid grid-cols-1 gap-4 px-4 py-5 md:px-5 lg:grid-cols-[1fr_auto_auto] lg:items-center ${
                          index !== cart.length - 1 ? 'border-b border-black/10' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-color6/40">
                            <img
                              src={item.image || '/placeholder.svg?height=200&width=200'}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-base md:text-lg font-medium text-color1">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-color4">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-color1 transition hover:bg-color6/30"
                            aria-label={`Decrease quantity for ${item.name}`}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                            className="h-9 w-14 rounded-md border border-black/10 text-center text-sm text-color1 focus:outline-none focus:ring-2 focus:ring-color1/20"
                          />
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 text-color1 transition hover:bg-color6/30"
                            aria-label={`Increase quantity for ${item.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3 lg:justify-end">
                          <p className="text-lg font-bold text-color1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/collection/all">
                    <Button
                      variant="outline"
                      className="h-12 w-full border-color1 text-color1 hover:bg-color6/40"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <Card className="border border-black/10">
                <CardContent className="p-12 text-center">
                  <p className="text-color4 text-lg mb-6">Your cart is empty</p>
                  <Link href="/collection/all">
                    <Button className="bg-color1 hover:bg-color2 text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </section>

          <aside className="px-6 py-6 md:px-8 md:py-8 bg-color6/20 lg:sticky lg:top-6 lg:self-start">
            <Card className="border border-black/10 bg-white shadow-none">
              <CardHeader className="border-b border-black/10 px-6 py-5">
                <CardTitle className="text-xl text-color1 font-poppins">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-color4">Subtotal</p>
                  <p className="font-medium text-color1">${subtotal.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <p className="text-color4">
                    Shipping {shipping === 0 && <span className="ml-1 text-xs text-green-600">(Free)</span>}
                  </p>
                  <p className="font-medium text-color1">${shipping.toFixed(2)}</p>
                </div>

                <div className="border-t border-black/10 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-color4">Tax (estimated)</p>
                    <p className="font-medium text-color1">${tax.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-color1">Total</p>
                  <p className="text-2xl font-bold text-color1">${total.toFixed(2)}</p>
                </div>

                {subtotal <= 100 && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                    Free shipping on orders over $100!
                  </div>
                )}

                {checkoutError ? (
                  <p className="text-sm text-red-600">{checkoutError}</p>
                ) : null}

                <Button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="h-12 w-full bg-color3 text-white hover:bg-color2"
                >
                  {checkoutLoading ? 'Placing order...' : 'Proceed to Checkout'}
                </Button>

                <div className="pt-4">
                  <p className="mb-3 text-center text-xs text-color5">
                    Secure checkout powered by Stripe
                  </p>
                  <div className="flex justify-center gap-2">
                    {['Visa', 'MC', 'Amex', 'PayPal'].map((label) => (
                      <div
                        key={label}
                        className="flex h-8 w-12 items-center justify-center rounded bg-color6/60 text-[10px] text-color5"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
