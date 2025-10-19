// store/useCart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  dishId: string
  name: string
  price: number
  quantity: number
  image?: string
  options?: Record<string, string>
}

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (dishId: string, options?: Record<string, string>) => void
  updateQty: (dishId: string, qty: number, options?: Record<string, string>) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

// ✅ Correct Zustand syntax for Next.js + TS (with persist)
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items.slice()
        const foundIndex = items.findIndex(
          (i) =>
            i.dishId === item.dishId &&
            JSON.stringify(i.options || {}) === JSON.stringify(item.options || {})
        )
        if (foundIndex > -1) {
          items[foundIndex].quantity += item.quantity
        } else {
          items.push({ ...item })
        }
        set({ items })
      },

      removeItem: (dishId, options) => {
        const items = get().items.filter(
          (i) =>
            !(
              i.dishId === dishId &&
              JSON.stringify(i.options || {}) === JSON.stringify(options || {})
            )
        )
        set({ items })
      },

      updateQty: (dishId, qty, options) => {
        const items = get()
          .items.map((i) => {
            if (
              i.dishId === dishId &&
              JSON.stringify(i.options || {}) === JSON.stringify(options || {})
            ) {
              return { ...i, quantity: qty }
            }
            return i
          })
          .filter((i) => i.quantity > 0)
        set({ items })
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, it) => s + it.quantity, 0),

      totalPrice: () =>
        get().items.reduce((s, it) => s + it.price * it.quantity, 0),
    }),
    { name: 'crave-corner-cart' }
  )
)
