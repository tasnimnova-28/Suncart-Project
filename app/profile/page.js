'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
    }
  }, [user, isPending]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-400"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center animate__animated animate__fadeInUp">
        <div className="avatar mb-6">
          <div className="w-28 h-28 rounded-full ring ring-orange-400 ring-offset-2 mx-auto overflow-hidden">
            <img
              src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fb923c&color=fff`}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-800">{user.name}</h1>
        <p className="text-gray-400 mt-1">{user.email}</p>

        <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Name</span>
            <span className="font-semibold text-gray-700">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Email</span>
            <span className="font-semibold text-gray-700 truncate ml-4">{user.email}</span>
          </div>
        </div>

        <Link href="/profile/update" className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none w-full mt-6 hover:from-orange-500 hover:to-amber-500">
          ✏️ Update Profile
        </Link>
      </div>
    </div>
  );
}