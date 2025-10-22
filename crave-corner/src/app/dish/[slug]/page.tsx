// src/app/dish/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import DishDetailClient from '@/components/dish/DishDetailClient';
import MENU from '@/lib/mock/menu.json'; // ensure mock exists

type Params = { params: { slug: string } };

export default function DishPage({ params }: Params) {
  const { slug } = params;
  // find dish from mock menu (server side)
  const dish = (MENU as any[]).find(d => d.slug === slug);

  if (!dish) {
    // show 404 if not found
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="py-6">
        {/* Breadcrumb / back link */}
        <a href="/menu" className="text-sm text-rose-600">← Back to Menu</a>
      </div>

      {/* Dish detail client component handles add-to-cart */}
      <DishDetailClient dish={dish} />
    </div>
  );
}
