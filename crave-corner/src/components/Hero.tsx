// src/components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-yellow-50 to-rose-50 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Crave the Taste, <span className="text-rose-600">Corner the Flavor</span>
        </h1>

        <p className="mt-3 text-gray-700 max-w-xl">
          Freshly cooked meals, beloved local favorites and delightful desserts —
          order online for fast delivery or visit us for a cozy dine-in experience.
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href="/menu"
            className="inline-block px-4 py-2 bg-rose-600 text-white rounded-md shadow hover:opacity-95"
          >
            Order Now
          </Link>

          <Link
            href="/about"
            className="inline-block px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Image / Illustration placeholder */}
      <div className="w-full md:w-56 h-40 md:h-48 bg-white rounded-lg shadow flex items-center justify-center">
        {/* Replace this with next/image when you add actual images to /public */}
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="80" rx="8" fill="#FFF7F5" stroke="#F8D7DA" />
          <g fill="#F87171" opacity="0.95">
            <ellipse cx="38" cy="38" rx="16" ry="11" />
            <rect x="62" y="26" width="36" height="24" rx="6" />
          </g>
        </svg>
      </div>
    </section>
  );
}
