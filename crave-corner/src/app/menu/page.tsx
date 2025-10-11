// src/app/menu/page.tsx
'use client'

import { useMemo, useState } from 'react'
import MenuCard from '../../components/MenuCard'
import { menuData, MenuItem } from '../../data/menuData'

export default function MenuPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  // derive categories from data
  const categories = useMemo(() => {
    const setCats = new Set<string>(menuData.map(i => i.category))
    return ['All', ...Array.from(setCats)]
  }, [])

  const filtered = useMemo(() => {
    return menuData.filter((item: MenuItem) => {
      const matchesCategory = category === 'All' ? true : item.category === category
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Menu</h1>
      <p className="text-sm text-gray-600">Browse by category or search for a dish.</p>

      {/* controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes..."
          className="w-full sm:w-1/2 p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 p-2 border rounded"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* items grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8 bg-white rounded shadow">
            No dishes found.
          </div>
        ) : (
          filtered.map((item: MenuItem) => (
            <MenuCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              category={item.category}
              available={item.available}
              image={item.image}
            />
          ))
        )}
      </div>
    </div>
  )
}
