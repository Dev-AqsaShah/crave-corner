// src/context/CartContext.tsx
'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

/** Types */
export interface CartItem {
  id: string
  name: string
  price: number
  category?: string
  available?: boolean
  qty: number
}

interface CartContextValue {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'qty'>) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  total: number
}

/** Create context with a safe default */
const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'crave_corner_cart_v1'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load from localStorage once on mount (so cart persists between reloads)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        setCart(parsed)
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e)
    }
  }, [])

  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e)
    }
  }, [cart])

  function addToCart(item: Omit<CartItem, 'qty'>) {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id)
      if (found) {
        return prev.map(p => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(p => (p.id === id ? { ...p, qty } : p)))
  }

  function clearCart() {
    setCart([])
  }

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/** Hook for components to consume the cart */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
