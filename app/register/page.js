'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', image: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || undefined,
      });
      if (error) {
        toast.error(error.message || 'Registration failed.');
      } else {
        toast.success('Account created! Please log in. 🎉');
        router.push('/login');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate__animated animate__fadeInUp">
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🌴</div>
          <h1 className="text-3xl font-bold text-orange-500">Create Account</h1>
          <p className="text-gray-500 mt-1">Join the SunCart family</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Full Name</span></label>
            <input type="text" name="name" required className="input input-bordered focus:input-warning" placeholder="Your name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Email</span></label>
            <input type="email" name="email" required className="input input-bordered focus:input-warning" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Photo URL (optional)</span></label>
            <input type="url" name="image" className="input input-bordered focus:input-warning" placeholder="https://example.com/photo.jpg" value={form.image} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Password</span></label>
            <input type="password" name="password" required className="input input-bordered focus:input-warning" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none hover:from-orange-500 hover:to-amber-500 mt-2" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Create Account'}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full gap-2 hover:bg-orange-50 hover:border-orange-400">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}