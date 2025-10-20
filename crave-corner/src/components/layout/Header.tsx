// src/components/layout/Header.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import MobileNav from '../MobileNav';
import { useCart } from '@/store/useCart';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Header() {
  const [open, setOpen] = useState(false); // mobile nav
  const [cartOpen, setCartOpen] = useState(false); // cart drawer
  const totalItems = useCart(s => s.totalItems);

  return (
    <header className="w-full border-b bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold">CC</div>
                <span className="font-semibold text-lg">Crave-Corner</span>
              </a>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/menu"><a className="hover:text-rose-600">Menu</a></Link>
            <Link href="/about"><a className="hover:text-rose-600">About</a></Link>
            <Link href="/contact"><a className="hover:text-rose-600">Contact</a></Link>
            <Link href="/profile"><a className="hover:text-rose-600">Profile</a></Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* simple search text instead of svg */}
            <button className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-sm hover:bg-slate-100">
              Search
            </button>

            {/* Cart button with count */}
            <button onClick={() => setCartOpen(true)} className="relative inline-flex items-center p-2 rounded-md hover:bg-slate-100">
              <span>Cart</span>
              {totalItems() > 0 && (
                <span className="absolute -right-1 -top-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
            </button>

            {/* Mobile menu button (text) */}
            <button onClick={() => setOpen(true)} className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100" aria-label="Open menu">
              Menu
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
