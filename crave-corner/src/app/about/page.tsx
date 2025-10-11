// src/app/about/page.tsx
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">About Crave-Corner</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <p className="text-gray-700">
            Crave-Corner started with a simple idea: bring delicious, home-style
            flavors to everyone — quickly and with love. We focus on fresh
            ingredients, honest recipes and a friendly dining experience.
          </p>

          <h2 className="mt-4 font-semibold">Our Mission</h2>
          <p className="text-gray-700 mt-1">
            To serve comforting, tasty meals that make people smile — whether
            via delivery, takeaway, or when they visit our cozy space.
          </p>

          <h2 className="mt-4 font-semibold">Meet the Chef</h2>
          <p className="text-gray-700 mt-1">
            Chef Ali brings years of experience and a passion for spices and
            regional recipes. He leads our kitchen with focus on quality and
            consistency.
          </p>
        </div>

        <aside className="bg-white p-4 rounded shadow flex flex-col items-center">
          {/* Replace with real image in /public/images/chef.jpg */}
          <div className="w-40 h-40 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">Chef image</span>
          </div>

          <div className="mt-3 text-center">
            <div className="font-semibold">Crave-Corner</div>
            <div className="text-sm text-gray-500">Local favorites • Fresh ingredients</div>
          </div>
        </aside>
      </div>

      <section className="mt-8 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Visit Us</h3>
        <p className="text-sm text-gray-600 mt-1">Opening Hours: Mon–Sun • 11:00 AM – 11:00 PM</p>
        <p className="text-sm text-gray-600">Address: 123 Food Street, Your City</p>
      </section>
    </div>
  )
}
