// src/app/page.tsx
'use client'

import Hero from '../components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { menuData } from '../data/menuData'

export default function HomePage() {
  // show top 3 available featured items
  const featured = menuData.filter(i => i.available).slice(0, 3)

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        when: 'beforeChildren',
      },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 280, damping: 30 } },
    hover: { scale: 1.03, translateY: -6, transition: { type: 'spring', stiffness: 300 } },
  }

  return (
    <div className="space-y-8">
      {/* Hero (already designed) */}
      <Hero />

      {/* Featured section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Chef's Picks</h2>
            <p className="text-sm text-gray-600 mt-1">Hand-selected favorites — freshly prepared.</p>
          </div>

          <Link href="/menu" className="hidden sm:inline-block px-4 py-2 bg-rose-600 text-white rounded-md shadow hover:opacity-95">
            View Full Menu
          </Link>
        </div>

        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featured.map(item => (
            <motion.article
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
              variants={card}
              whileHover="hover"
              role="group"
            >
              <div className="relative w-full h-44 bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    placeholder="empty"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-rose-600 font-bold">₨{item.price}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { /* UX: call addToCart — we keep it simple here; add handler if needed */ }}
                      className="px-3 py-1 bg-rose-600 text-white rounded-md text-sm shadow-sm opacity-100 group-hover:opacity-100"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      Add
                    </button>

                    <Link href={`/menu`} className="text-sm text-gray-600 underline">
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Mobile action CTA */}
        <div className="mt-6 sm:hidden flex justify-center">
          <Link href="/menu" className="px-4 py-2 bg-rose-600 text-white rounded-md shadow">
            Browse Full Menu
          </Link>
        </div>
      </section>

      {/* Small promo / trust bar */}
      <section className="bg-gradient-to-r from-yellow-50 to-rose-50 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h4 className="font-semibold">Fast delivery • Fresh ingredients</h4>
            <p className="text-sm text-gray-600 mt-1">Orders prepared within 30 minutes for most local areas.</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v4H3zM5 11h14v10H5z" /></svg>
              <span>Contactless delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3 7h7l-5.6 4 2 7L12 16l-6.4 4 2-7L2 9h7z" /></svg>
              <span>Top-rated recipes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
