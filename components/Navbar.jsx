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

  const handleProfileClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      router.push('/');
    }
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white drop-shadow">
          ☀️ SunCart
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white font-medium hover:text-orange-900 transition">
            Home
          </Link>
          <Link href="/products" className="text-white font-medium hover:text-orange-900 transition">
            Products
          </Link>
          <button
            onClick={handleProfileClick}
            className="text-white font-medium hover:text-orange-900 transition bg-transparent border-none cursor-pointer"
          >
            My Profile
          </button>

          {user ? (
            <>
              <Link href="/profile">
                <img
                  src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=fb923c&color=fff`}
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                  alt="avatar"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-orange-500 border-none px-4 py-2 rounded-lg font-semibold hover:bg-orange-100 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-amber-500 px-4 pb-4 flex flex-col gap-3 animate__animated animate__fadeInDown">
          <Link href="/" className="text-white font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="text-white font-medium" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <button
            onClick={handleProfileClick}
            className="text-white font-medium text-left bg-transparent border-none cursor-pointer"
          >
            My Profile
          </button>

          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold w-full"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}