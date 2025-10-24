// src/components/dish/DishCard.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/store/useCart';

type Props = {
  id: string;
  name: string;
  slug: string;          
  description?: string;
  price: number;
  image?: string;
  isAvailable?: boolean;
};

export default function DishCard({ id, name, slug, description, price, image, isAvailable = true }: Props) {
  const addItem = useCart(s => s.addItem);
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!isAvailable) return;
    setAdding(true);
    addItem({
      dishId: id,
      name,
      price,
      quantity: 1,
      image,
    });
    setTimeout(() => setAdding(false), 300);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <Link href={`/dish/${slug}`}>
        <a className="block relative w-full h-44 bg-slate-100">
          {image ? (
            <Image src={image} alt={name} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">No image</div>
          )}
        </a>
      </Link>

      <div className="p-3">
        <Link href={`/dish/${slug}`}>
          <a className="font-semibold text-sm block hover:underline">{name}</a>
        </Link>

        {description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{description}</p>}

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-medium">Rs {price}</div>

          <button
            onClick={handleAdd}
            disabled={!isAvailable || adding}
            className={`ml-3 px-3 py-1 rounded-md text-sm ${isAvailable ? 'bg-rose-500 text-white hover:opacity-90' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
          >
            {isAvailable ? (adding ? 'Added' : 'Add') : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}
