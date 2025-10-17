// src/app/menu/page.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* -------------------------
   Types / Interfaces
   ------------------------- */
interface Option {
  name: string;
  priceDiff?: number;
}

export interface Dish {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  tags?: string[];
  isAvailable: boolean;
  rating?: number;
  options?: Option[];
  vegType?: "veg" | "non-veg";
  spicy?: "Any" | "Mild" | "Medium" | "Hot";
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty?: number;
}

/* -------------------------
   Mock data (typed)
   ------------------------- */
const MOCK_DISHES: Dish[] = [
  { id: "d1", name: "Chicken Biryani", slug: "chicken-biryani", description: "Fragrant rice, tender chicken", price: 850, image: "/images/biryani.jpg", category: "Main", tags: ["spicy","chef"], isAvailable: true, rating: 4.6, vegType: "non-veg", spicy: "Hot", options: [{name:'Full', priceDiff:0}] },
  { id: "d2", name: "Veg Burger", slug: "veg-burger", description: "Grilled veggie patty", price: 420, image: "/images/veg-burger.jpg", category: "Fast Food", tags: ["veg"], isAvailable: true, rating: 4.2, vegType: "veg", spicy: "Mild" },
  { id: "d3", name: "Chocolate Cake", slug: "chocolate-cake", description: "Rich and moist", price: 300, image: "/images/cake.jpg", category: "Desserts", tags: ["sweet"], isAvailable: false, vegType: "veg", spicy: "Any" },
  { id: "d4", name: "Lemonade", slug: "lemonade", description: "Freshly squeezed", price: 120, image: "/images/lemonade.jpg", category: "Drinks", tags: ["cold"], isAvailable: true, vegType: "veg", spicy: "Any" },
  { id: "d5", name: "Chicken Wings", slug: "chicken-wings", description: "Crispy, served with dip", price: 560, image: "/images/wings.jpg", category: "Starters", tags: ["spicy"], isAvailable: true, vegType: "non-veg", spicy: "Medium" },
  { id: "d6", name: "Paneer Tikka", slug: "paneer-tikka", description: "Smoky grilled paneer", price: 480, image: "/images/paneer.jpg", category: "Starters", tags: ["veg","chef"], isAvailable: true, vegType: "veg", spicy: "Medium" },
  { id: "d7", name: "Fries", slug: "fries", description: "Crispy salted fries", price: 200, image: "/images/fries.jpg", category: "Fast Food", tags: ["side"], isAvailable: true, vegType: "veg", spicy: "Any" },
  { id: "d8", name: "Fish Curry", slug: "fish-curry", description: "Traditional spicy curry", price: 780, image: "/images/fish.jpg", category: "Main", tags: ["spicy","special"], isAvailable: true, vegType: "non-veg", spicy: "Hot" },
];

/* -------------------------
   Small helper components
   ------------------------- */

function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({length: count}).map((_,i) => (
        <li key={i} className="bg-white rounded-lg p-4 animate-pulse">
          <div className="w-full h-36 bg-gray-200 rounded-md mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
          <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
        </li>
      ))}
    </ul>
  );
}

/* -------------------------
   DishCard
   ------------------------- */
function DishCard({ dish, onOpen, onAdd }: { dish: Dish; onOpen: (d: Dish) => void; onAdd: (d: Dish) => void; }) {
  return (
    <li className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <button
        onClick={() => onOpen(dish)}
        className="group block text-left focus:outline-none"
        aria-label={`Open ${dish.name} details`}
      >
        <div className="relative w-full h-40 bg-gray-100">
          <img
            src={dish.image}
            alt={dish.name}
            className={`w-full h-40 object-cover transition-transform group-hover:scale-105 ${!dish.isAvailable ? 'opacity-50' : ''}`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.backgroundColor = '#f3f4f6'; }}
          />
          {!dish.isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
              Unavailable
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-semibold">{dish.name}</h3>
            <div className="text-sm font-medium">₨{dish.price}</div>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
          <div className="mt-2 flex items-center gap-2">
            {dish.tags?.slice(0,2).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 border rounded-full">{tag}</span>
            ))}
            <div className="ml-auto text-xs text-gray-400">{dish.rating ? `${dish.rating}★` : ''}</div>
          </div>
        </div>
      </button>

      <div className="p-3 pt-0 flex items-center justify-between gap-2">
        <div className="text-xs text-gray-600">{dish.vegType === 'veg' ? 'Veg' : 'Non-Veg'}</div>
        <button
          onClick={() => onAdd(dish)}
          disabled={!dish.isAvailable}
          className={`px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-offset-1 ${dish.isAvailable ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          aria-disabled={!dish.isAvailable}
        >
          Add
        </button>
      </div>
    </li>
  );
}

/* -------------------------
   DishDetailModal
   ------------------------- */
function DishDetailModal({ dish, onClose, onAdd }: { dish: Dish | null; onClose: () => void; onAdd: (d: Dish) => void; }) {
  if (!dish) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-xl w-full z-10 overflow-hidden">
        <div className="flex gap-4">
          <img src={dish.image} alt={dish.name} className="w-1/3 h-48 object-cover" />
          <div className="p-4 w-2/3">
            <h2 className="text-lg font-semibold">{dish.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
            <div className="mt-3 text-sm">Price: ₨{dish.price}</div>
            <div className="mt-2 flex gap-2">
              {dish.options?.map(opt => <button key={opt.name} className="px-3 py-1 border rounded">{opt.name}</button>)}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { onAdd(dish); onClose(); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Add to cart</button>
              <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Top Hero + Search (debounced)
   ------------------------- */
function MenuHero({ onSearch }: { onSearch: (q: string) => void; }) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const id = window.setTimeout(() => onSearch(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query, onSearch]);

  return (
    <header className="bg-white py-5 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Our Menu</h1>
          <p className="text-sm text-gray-600">Browse, search & add your favourites — fresh every day.</p>
        </div>
        <div className="w-full md:w-1/2">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, tags (e.g. spicy, chef)..."
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300"
            />
            {query && <button onClick={() => setQuery('')} className="absolute right-2 top-2 text-gray-500">✕</button>}
          </div>
          <p className="text-xs text-gray-500 mt-2">Real-time search (debounced 300ms)</p>
        </div>
      </div>
    </header>
  );
}

/* -------------------------
   Category pills
   ------------------------- */
function CategoryPills({ selected, onChange }: { selected: string; onChange: (c: string) => void; }) {
  const categories = ["All","Starters","Main Course","Fast Food","Desserts","Drinks"];
  return (
    <nav aria-label="Menu categories" className="overflow-x-auto py-3">
      <ul className="flex gap-3 px-4 md:px-8">
        {categories.map(c => {
          const isActive = c === selected;
          return (
            <li key={c}>
              <button
                onClick={() => onChange(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border ${isActive ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                aria-pressed={isActive}
              >
                {c}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* -------------------------
   Sort & Filter bar
   ------------------------- */
function SortFilterBar({ sort, vegFilter, spicy, onChange }: { sort: string; vegFilter: null | 'veg' | 'non-veg'; spicy: string; onChange: (patch: Partial<{ sort: string; vegFilter: null | 'veg' | 'non-veg'; spicy: string; }>) => void; }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 px-4 md:px-8 py-3">
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="sr-only">Sort</label>
        <select id="sort" value={sort} onChange={(e)=> onChange({ sort: e.target.value })} className="rounded-md border px-3 py-2">
          <option>Popular</option>
          <option>Newest</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Diet</span>
        <div className="inline-flex gap-2">
          <button onClick={()=> onChange({ vegFilter: null })} className={`px-3 py-1 rounded-md border ${vegFilter === null ? 'bg-indigo-600 text-white' : ''}`}>All</button>
          <button onClick={()=> onChange({ vegFilter: 'veg' })} className={`px-3 py-1 rounded-md border ${vegFilter === 'veg' ? 'bg-indigo-600 text-white' : ''}`}>Veg</button>
          <button onClick={()=> onChange({ vegFilter: 'non-veg' })} className={`px-3 py-1 rounded-md border ${vegFilter === 'non-veg' ? 'bg-indigo-600 text-white' : ''}`}>Non-Veg</button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="spicy" className="sr-only">Spicy</label>
        <select id="spicy" value={spicy} onChange={(e)=> onChange({ spicy: e.target.value })} className="rounded-md border px-3 py-2">
          <option>Any</option>
          <option>Mild</option>
          <option>Medium</option>
          <option>Hot</option>
        </select>
      </div>
    </div>
  );
}

/* -------------------------
   Main Menu Page (client)
   ------------------------- */
export default function MenuPage() {
  const router = useRouter(); // <- correct place for useRouter in a client component

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // UI state
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Popular");
  const [vegFilter, setVegFilter] = useState<null | 'veg' | 'non-veg'>(null);
  const [spicy, setSpicy] = useState<string>("Any");
  const [limit, setLimit] = useState<number>(6);
  const [cart, setCart] = useState<{ count: number; total: number; items: CartItem[] }>({ count: 0, total: 0, items: [] });
  const [toast, setToast] = useState<string>("");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Simulate fetch
  useEffect(() => {
    setLoading(true);
    setError(false);
    const id = window.setTimeout(() => {
      setDishes(MOCK_DISHES);
      setLoading(false);
    }, 600);
    return () => clearTimeout(id);
  }, []);

  // Add to cart mock
  const handleAdd = (dish: Dish) => {
    setCart(prev => ({ count: prev.count + 1, total: prev.total + dish.price, items: [...prev.items, { id: dish.id, name: dish.name, price: dish.price }] }));
    setToast(`${dish.name} added to cart`);
    window.setTimeout(()=> setToast(""), 1800);
  };

  // Filtering & search (memoized)
  const filtered = useMemo(() => {
    let list = dishes.slice();

    // category
    if (category && category !== "All") {
      const catNorm = category.toLowerCase();
      list = list.filter(d => d.category?.toLowerCase().includes(catNorm) || (category === "Main Course" && d.category?.toLowerCase() === 'main'));
    }

    // veg filter
    if (vegFilter) list = list.filter(d => d.vegType === vegFilter);

    // spicy
    if (spicy && spicy !== 'Any') list = list.filter(d => (d.spicy || 'Any') === spicy);

    // search (name & tags)
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(d => d.name.toLowerCase().includes(q) || (d.tags || []).some(t => t.toLowerCase().includes(q)));
    }

    // sort
    if (sort === "Price: Low → High") list.sort((a,b)=> a.price - b.price);
    else if (sort === "Price: High → Low") list.sort((a,b)=> b.price - a.price);
    // Popular/Newest left as-is for the mock

    return list;
  }, [dishes, category, vegFilter, spicy, search, sort]);

  // Page items based on limit
  const visible = filtered.slice(0, limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuHero onSearch={setSearch} />

      <CategoryPills selected={category} onChange={(c)=> setCategory(c)} />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SortFilterBar sort={sort} vegFilter={vegFilter} spicy={spicy} onChange={(patch)=> {
          if (patch.sort !== undefined) setSort(patch.sort);
          if (patch.vegFilter !== undefined) setVegFilter(patch.vegFilter ?? null);
          if (patch.spicy !== undefined) setSpicy(patch.spicy);
        }} />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {loading ? (
          <SkeletonGrid count={6} />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-lg">Failed to load menu.</p>
            <button onClick={() => { setLoading(true); setError(false); setTimeout(()=> { setDishes(MOCK_DISHES); setLoading(false); },600); }} className="mt-3 px-4 py-2 border rounded">Retry</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg">No dishes found.</p>
            <div className="mt-3 flex justify-center gap-2">
              <button onClick={() => { setSearch(''); setCategory('All'); setVegFilter(null); setSpicy('Any'); }} className="px-4 py-2 border rounded">Clear filters</button>
              <button onClick={() => { setLimit(6); }} className="px-4 py-2 bg-indigo-600 text-white rounded">View All</button>
            </div>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map(d => (
                <DishCard key={d.id} dish={d} onOpen={(dish) => setSelectedDish(dish)} onAdd={handleAdd} />
              ))}
            </ul>

            {filtered.length > limit && (
              <div className="mt-6 flex justify-center">
                <button onClick={() => setLimit(l => l + 6)} className="px-4 py-2 border rounded">Load more</button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Mobile sticky view cart */}
      <div className="fixed left-4 right-4 bottom-4 md:hidden">
        <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">View Cart</div>
            <div className="text-xs text-gray-500">{cart.count} items • ₨{cart.total}</div>
          </div>
          <button
            onClick={() => { if (cart.count === 0) return; router.push("/checkout"); }}
            className={`ml-4 px-4 py-2 rounded-full ${cart.count === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white"}`}
            disabled={cart.count === 0}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Large-screen cart teaser */}
      <div className="hidden md:block fixed right-6 bottom-6 z-50">
        <div className="bg-white rounded-lg shadow px-4 py-3 flex items-center gap-3">
          <div className="text-sm">
            Cart: <strong>{cart.count}</strong>
          </div>
          <div className="text-sm">₨{cart.total}</div>
          <button
            onClick={() => {
              if (cart.count === 0) return;
              router.push("/checkout");
            }}
            disabled={cart.count === 0}
            className={`ml-2 px-3 py-1 rounded transition ${cart.count === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-24 bg-black text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}

      {/* Dish detail modal */}
      <DishDetailModal dish={selectedDish} onClose={()=> setSelectedDish(null)} onAdd={handleAdd} />
    </div>
  );
}
