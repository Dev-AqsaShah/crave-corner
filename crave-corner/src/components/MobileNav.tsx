// src/components/layout/MobileNav.tsx
'use client';
import Link from 'next/link';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute right-0 top-0 w-72 h-full bg-white shadow-lg p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Crave-Corner</div>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100">Close</button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link href="/"><a onClick={onClose} className="py-2 px-2 rounded-md hover:bg-slate-100">Home</a></Link>
          <Link href="/menu"><a onClick={onClose} className="py-2 px-2 rounded-md hover:bg-slate-100">Menu</a></Link>
          <Link href="/about"><a onClick={onClose} className="py-2 px-2 rounded-md hover:bg-slate-100">About</a></Link>
          <Link href="/contact"><a onClick={onClose} className="py-2 px-2 rounded-md hover:bg-slate-100">Contact</a></Link>
          <Link href="/profile"><a onClick={onClose} className="py-2 px-2 rounded-md hover:bg-slate-100">Profile</a></Link>
        </nav>

        <div className="mt-auto text-sm text-slate-500">
          © {new Date().getFullYear()} Crave-Corner
        </div>
      </div>
    </div>
  );
}
