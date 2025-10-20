// components/cart/CartItem.tsx
'use client';
import React from 'react';
import { useCart, CartItem as CI } from '@/store/useCart';

type Props = { item: CI };

export default function CartItem({ item }: Props) {
  const updateQty = useCart(s => s.updateQty);
  const removeItem = useCart(s => s.removeItem);

  return (
    <div className="flex gap-3 items-center border-b py-3">
      <img src={item.image || '/images/placeholder.png'} alt={item.name} className="w-16 h-16 rounded object-cover" />
      <div className="flex-1">
        <div className="font-medium text-sm">{item.name}</div>
        <div className="text-xs text-slate-500">Rs {item.price}</div>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => updateQty(item.dishId, Math.max(1, item.quantity - 1), item.options)}
            className="px-2 py-1 rounded border"
            aria-label="Decrease"
          >
            -
          </button>
          <div className="px-3 text-sm">{item.quantity}</div>
          <button
            onClick={() => updateQty(item.dishId, item.quantity + 1, item.options)}
            className="px-2 py-1 rounded border"
            aria-label="Increase"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item.dishId, item.options)}
            className="ml-3 text-xs text-rose-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
