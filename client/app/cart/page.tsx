'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { API_BASE_URL } from '@/lib/api'
import { useCart } from '@/lib/CartContext'
import { authorizedFetch, getAuthToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const router = useRouter()
  const { cart, setQty, removeFromCart, clearCart } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

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

  return (
    <div className='flex min-h-screen bg-color4'>
    <div className="min-h-screen bg-color5 rounded-2xl m-20 w-full ">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#06141b] font-poppins mb-2">
            Shopping Cart
          </h1>
          <p className="text-[#4a5c6a]">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border border-[#e5e7eb]">
                <CardContent className="p-0">
                  {cart.map((item, index) => (
                    <div
                      key={item._id}
                      className={`p-6 flex flex-col sm:flex-row gap-6 ${
                        index !== cart.length - 1
                          ? 'border-b border-[#e5e7eb]'
                          : ''
                      }`}
                    >
                      {/* Product Image */}
                      <div className="sm:w-32 flex-shrink-0">
                        <img
                          src={item.image || '/placeholder.svg?height=200&width=200'}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg bg-[#f3f4f6]"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#06141b] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-[#06141b] mb-4">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 w-fit">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-2 border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6] transition"
                          >
                            <Minus className="w-4 h-4 text-[#06141b]" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border border-[#e5e7eb] rounded-lg py-2 text-[#06141b] focus:outline-none focus:ring-2 focus:ring-[#06141b]"
                          />
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-2 border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6] transition"
                          >
                            <Plus className="w-4 h-4 text-[#06141b]" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-xl font-bold text-[#06141b]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-destructive hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/collection/all">
                  <Button
                    variant="outline"
                    className="w-full border-[#06141b] text-[#06141b] hover:bg-[#f3f4f6]"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border border-[#e5e7eb] sticky top-20">
                <CardHeader className="border-b border-[#e5e7eb]">
                  <CardTitle className="text-xl text-[#06141b] font-poppins">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <p className="text-[#4a5c6a]">Subtotal</p>
                    <p className="font-medium text-[#06141b]">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <p className="text-[#4a5c6a]">
                      Shipping {shipping === 0 && <span className="text-xs text-green-600 ml-1">(Free)</span>}
                    </p>
                    <p className="font-medium text-[#06141b]">
                      ${shipping.toFixed(2)}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#e5e7eb]" />

                  {/* Tax */}
                  <div className="flex justify-between items-center">
                    <p className="text-[#4a5c6a]">Tax (estimated)</p>
                    <p className="font-medium text-[#06141b]">
                      ${tax.toFixed(2)}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="border-t border-[#e5e7eb] pt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-[#06141b]">Total</p>
                    <p className="text-2xl font-bold text-[#06141b]">
                      ${total.toFixed(2)}
                    </p>
                  </div>

                  {/* Info */}
                  {subtotal <= 100 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                      Free shipping on orders over $100!
                    </div>
                  )}

                  {checkoutError ? (
                    <p className="text-sm text-red-600">{checkoutError}</p>
                  ) : null}

                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full bg-color2 hover:bg-color5 text-white transition-all ease-in-out duration-300 hover:text-black h-12 text-base font-medium mt-4"
                  >
                    {checkoutLoading ? 'Placing order...' : 'Proceed to Checkout'}
                  </Button>

                  {/* Payment Methods */}
                  <div className="space-y-2 pt-4 border-t border-[#e5e7eb]">
                    <p className="text-xs text-[#9ba8ab] text-center mb-3">
                      Secure checkout powered by Stripe
                    </p>
                    <div className="flex justify-center gap-2">
                      <div className="w-12 h-8 bg-[#f3f4f6] rounded flex items-center justify-center text-xs text-[#9ba8ab]">
                        Visa
                      </div>
                      <div className="w-12 h-8 bg-[#f3f4f6] rounded flex items-center justify-center text-xs text-[#9ba8ab]">
                        MC
                      </div>
                      <div className="w-12 h-8 bg-[#f3f4f6] rounded flex items-center justify-center text-xs text-[#9ba8ab]">
                        Amex
                      </div>
                      <div className="w-12 h-8 bg-[#f3f4f6] rounded flex items-center justify-center text-xs text-[#9ba8ab]">
                        PayPal
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="border border-[#e5e7eb]">
            <CardContent className="p-12 text-center">
              <p className="text-[#9ba8ab] text-lg mb-6">Your cart is empty</p>
              <Link href="/collection/all">
                <Button className="bg-[#06141b] hover:bg-[#11212d] text-white">
                  Start Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
    </div>
  )
}
