// src/components/MenuCard.tsx
'use client'

import { useCart } from "../context/CartContext"

interface MenuCardProps {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  image?: string
}

export default function MenuCard({ id, name, price, category, available, image }: MenuCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col justify-between">
      {/* Dish image */}
      <div className="h-36 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Dish info */}
      <div className="mt-3">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-rose-600">Rs. {price}</span>
        <button
          disabled={!available}
          onClick={() => addToCart({ id, name, price, category, available })}
          className={`px-3 py-1 text-sm rounded-md ${
            available
              ? "bg-rose-600 text-white hover:bg-rose-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {available ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  )
}
