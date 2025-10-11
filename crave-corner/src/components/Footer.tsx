// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        {/* About / Logo */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Crave-Corner</h2>
          <p className="text-gray-400">
            Crave the Taste, Corner the Flavor. Fresh, fast and full of flavor —
            your favorite dishes at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/menu" className="hover:text-white">Menu</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook" className="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.22 10.44 22v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7c4.78-.78 8.44-4.9 8.44-9.93z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-gray-400 text-xs py-4">
        © {new Date().getFullYear()} Crave-Corner. All rights reserved.
      </div>
    </footer>
  );
}
