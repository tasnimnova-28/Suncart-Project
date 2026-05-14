'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({ name: '', image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) router.push('/login');
    if (user) setForm({ name: user.name || '', image: user.image || '' });
  }, [user, isPending]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      if (error) {
        toast.error(error.message || 'Update failed.');
      } else {
        toast.success('Profile updated successfully! 🌟');
        router.push('/profile');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-orange-400"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate__animated animate__fadeInUp">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">✏️</div>
          <h1 className="text-2xl font-extrabold text-gray-800">Update Profile</h1>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Full Name</span></label>
            <input type="text" name="name" required className="input input-bordered focus:input-warning" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text font-medium">Photo URL</span></label>
            <input type="url" name="image" className="input input-bordered focus:input-warning" placeholder="https://example.com/photo.jpg" value={form.image} onChange={handleChange} />
          </div>

          {form.image && (
            <div className="text-center">
              <img src={form.image} alt="preview" className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-orange-300" />
            </div>
          )}

          <button type="submit" className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none mt-2 hover:from-orange-500 hover:to-amber-500" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}