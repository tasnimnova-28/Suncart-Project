'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast.error(error.message || 'Login failed. Check your credentials.');
      } else {
        toast.success('Welcome back! 🌞');
        router.push(callbackUrl);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: 'google', callbackURL: callbackUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate__animated animate__fadeInUp">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">☀️</div>
          <h1 className="text-3xl font-bold text-orange-500">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Sign in to SunCart</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Email</span></label>
            <input
              type="email" name="email" required
              className="input input-bordered focus:input-warning"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Password</span></label>
            <input
              type="password" name="password" required
              className="input input-bordered focus:input-warning"
              placeholder="••••••••"
              value={form.password} onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none hover:from-orange-500 hover:to-amber-500 mt-2"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Login'}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full gap-2 hover:bg-orange-50 hover:border-orange-400"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-orange-500 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}