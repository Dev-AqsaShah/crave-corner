// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cart } = useCart()
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <header className="bg-black shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Crave-Corner
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center ">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <Link href="/cart" className="relative">
            {/* simple cart icon (inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6m12-6l2 6m-8 0a1 1 0 100 2 1 1 0 000-2z" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/menu" onClick={() => setOpen(false)}>Menu</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/cart" onClick={() => setOpen(false)}>Cart ({cartCount})</Link>
          </div>
        </div>
      )}
    </header>
  )
}
