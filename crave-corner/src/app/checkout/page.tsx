// src/app/checkout/page.tsx
'use client'

import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const validate = () => {
    if (!name.trim()) return 'Please enter your full name.'
    if (!address.trim()) return 'Please enter delivery address.'
    if (!/^\+?\d{7,15}$/.test(phone.trim())) return 'Please enter a valid phone number (digits only).'
    if (cart.length === 0) return 'Your cart is empty.'
    return null
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const err = validate()
    if (err) {
      setMessage(err)
      return
    }

    try {
      setLoading(true)

      // MOCK: simulate placing order (replace with API call / Stripe later)
      await new Promise((res) => setTimeout(res, 900))

      // clear cart and show success
      clearCart()
      setName('')
      setAddress('')
      setPhone('')
      setMessage('Order placed successfully! 🎉 We will contact you shortly.')
    } catch (err) {
      setMessage('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-3 bg-white p-4 rounded shadow">
          <label className="block">
            <div className="text-sm font-medium">Full name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              placeholder="e.g., Aqsa Khan"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Delivery address</div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              placeholder="House #, Street, City"
              rows={3}
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium">Phone</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              placeholder="+92300xxxxxxx"
            />
          </label>

          <div className="mt-2">
            <div className="text-sm text-gray-600">Payment method: <span className="font-medium">Cash on Delivery (mock)</span></div>
            <div className="text-xs text-gray-500 mt-1">(Stripe integration can be added later.)</div>
          </div>

          {message && (
            <div className={`text-sm mt-2 ${message.startsWith('Order placed') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Total: ₨{total}</div>
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="px-4 py-2 bg-rose-600 text-white rounded disabled:opacity-60"
            >
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </div>
        </form>

        {/* Order summary */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Order Summary</h2>

          {cart.length === 0 ? (
            <div className="text-gray-500">No items in cart.</div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.qty} × ₨{item.price}</div>
                  </div>
                  <div className="font-medium">₨{item.qty * item.price}</div>
                </div>
              ))}

              <div className="border-t pt-3 mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="font-semibold">₨{total}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
