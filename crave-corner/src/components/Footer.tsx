// src/components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

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
          <div className="flex gap-4 text-lg">
            <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors">
              <FaFacebookF />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors">
              <FaInstagram />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors">
              <FaTwitter />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <FaLinkedinIn />
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
