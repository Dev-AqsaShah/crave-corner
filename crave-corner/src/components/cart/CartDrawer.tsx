// components/cart/CartDrawer.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/store/useCart';
import CartItem from './CartItem';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const items = useCart(s => s.items);
  const totalPrice = useCart(s => s.totalPrice);
  const clearCart = useCart(s => s.clearCart);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside className="absolute right-0 top-0 w-full max-w-xs sm:max-w-md h-full bg-white shadow-lg p-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Your Cart</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-slate-100">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center text-slate-500 mt-8">Cart is empty</div>
          ) : (
            items.map(it => <CartItem key={it.dishId + JSON.stringify(it.options || {})} item={it} />)
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-600">Subtotal</div>
            <div className="font-semibold">Rs {totalPrice()}</div>
          </div>

          <div className="flex gap-2">
            <Link href="/checkout">
              <a onClick={onClose} className="flex-1 text-center py-2 rounded bg-rose-500 text-white">Proceed to Checkout</a>
            </Link>
            <button
              onClick={() => clearCart()}
              className="px-3 py-2 rounded border"
            >
              Clear
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
