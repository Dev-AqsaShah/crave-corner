// src/app/cart/page.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { cart, updateQty, removeFromCart, total } = useCart()
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})

  const changeQty = (id: string, qty: number) => {
    // small optimistic UI: mark as loading for the specific item (optional)
    setLoadingIds((s) => ({ ...s, [id]: true }))
    try {
      updateQty(id, qty)
    } finally {
      setLoadingIds((s) => {
        const copy = { ...s }
        delete copy[id]
        return copy
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="mt-6 bg-white rounded p-6 text-center shadow">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/menu" className="inline-block mt-4 px-4 py-2 bg-rose-600 text-white rounded">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-sm text-gray-400">
                  {/* replace with <Image /> when you have images */}
                  Image
                </div>

                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">₨{item.price} each</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => changeQty(item.id, item.qty - 1)}
                    className="px-3 py-1"
                    aria-label={`Decrease ${item.name}`}
                    disabled={item.qty <= 1}
                  >
                    −
                  </button>
                  <div className="px-3">{item.qty}</div>
                  <button
                    onClick={() => changeQty(item.id, item.qty + 1)}
                    className="px-3 py-1"
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="text-sm font-semibold">₨{item.price * item.qty}</div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 border rounded text-sm"
                  aria-label={`Remove ${item.name}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded shadow">
            <div className="text-lg font-semibold">Total: ₨{total}</div>
            <div className="mt-3 sm:mt-0">
              <Link href="/checkout" className="inline-block px-4 py-2 bg-rose-600 text-white rounded">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
