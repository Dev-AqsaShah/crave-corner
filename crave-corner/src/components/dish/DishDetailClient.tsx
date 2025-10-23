// src/components/dish/DishDetailClient.tsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/store/useCart';

type Dish = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable?: boolean;
};

export default function DishDetailClient({ dish }: { dish: Dish }) {
  const addItem = useCart(s => s.addItem);
  const totalItems = useCart(s => s.totalItems);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!dish.isAvailable) return;
    setAdding(true);
    addItem({
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: qty,
      image: dish.image,
    });
    setTimeout(() => setAdding(false), 300);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div className="w-full h-80 bg-slate-100 rounded overflow-hidden">
        {dish.image ? (
          <Image src={dish.image} alt={dish.name} width={800} height={600} style={{ objectFit: 'cover' }} />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">No image</div>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{dish.name}</h1>
        {dish.isAvailable === false && (
          <div className="text-sm text-rose-600 mt-1">Currently unavailable</div>
        )}
        <p className="mt-3 text-slate-600">{dish.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="text-xl font-bold">Rs {dish.price}</div>

          {/* Quantity selector */}
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1 border rounded">-</button>
            <div className="px-3">{qty}</div>
            <button onClick={() => setQty(qty + 1)} className="px-3 py-1 border rounded">+</button>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleAdd}
            disabled={!dish.isAvailable || adding}
            className={`px-4 py-2 rounded ${dish.isAvailable ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
          >
            {adding ? 'Adding...' : `Add ${qty} to Cart`}
          </button>

          <button onClick={() => alert('Preview order flow (to be implemented)')} className="px-4 py-2 border rounded">
            Quick Order
          </button>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          In cart: <span className="font-medium">{totalItems()}</span> items
        </div>
      </div>
    </div>
  );
}
