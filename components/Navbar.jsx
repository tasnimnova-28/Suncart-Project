'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logged out successfully!');
    router.push('/');
    router.refresh();
  };
  // ... rest of the component stays the same, but replace:
  // - the logout <button> to call onClick={handleLogout}
  // - user.image → user?.image

  return (
    <nav className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white drop-shadow">
          ☀️ SunCart
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white font-medium hover:text-orange-900 transition">Home</Link>
          <Link href="/products" className="text-white font-medium hover:text-orange-900 transition">Products</Link>
          <Link href="/profile" className="text-white font-medium hover:text-orange-900 transition">My Profile</Link>
          {user ? (
            <>
              <Link href="/profile">
                <img src={user.image || '/avatar.png'} className="w-9 h-9 rounded-full border-2 border-white" alt="avatar" />
              </Link>
              <button className="btn btn-sm bg-white text-orange-500 border-none hover:bg-orange-100">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm bg-white text-orange-500 border-none hover:bg-orange-100">Login</Link>
              <Link href="/register" className="btn btn-sm bg-orange-600 text-white border-none hover:bg-orange-700">Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-amber-500 px-4 pb-4 flex flex-col gap-3 animate__animated animate__fadeInDown">
          <Link href="/" className="text-white font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" className="text-white font-medium" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/profile" className="text-white font-medium hover:text-orange-900 transition">My Profile</Link>
          {user ? (
            <button className="btn btn-sm bg-white text-orange-500 w-full">Logout</button>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm bg-white text-orange-500 w-full" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" className="btn btn-sm bg-orange-600 text-white w-full" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}