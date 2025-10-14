// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cart } = useCart()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  const linkVariant = {
    hidden: { opacity: 0, y: -6 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Header container with brand color */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="bg-brand text-white shadow-sm"
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Brand (text-only) */}
          <Link href="/" className="font-extrabold text-xl tracking-tight">
            Crave-Corner
          </Link>

          {/* Desktop nav (text-only) */}
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
            {['Home', 'Menu', 'About', 'Contact'].map((l, idx) => (
              <motion.div
                key={l}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={linkVariant}
              >
                <Link href={l === 'Home' ? '/' : `/${l.toLowerCase()}`}>{l}</Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Link href="/cart" className="relative text-sm">
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 inline-block align-middle text-xs font-semibold bg-white text-brand rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.div>
          </nav>

          {/* Mobile: text-only button */}
          <button
            className="md:hidden bg-white/10 px-3 py-1 rounded-md text-sm font-medium hover:bg-white/20"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </motion.div>

      {/* Mobile menu with AnimatePresence */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.22 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 flex flex-col gap-3 text-brand">
              {['Home', 'Menu', 'About', 'Contact'].map((l) => (
                <Link
                  key={l}
                  href={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium py-2"
                >
                  {l}
                </Link>
              ))}

              <Link href="/cart" onClick={() => setOpen(false)} className="block text-base font-medium py-2">
                Cart ({cartCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
