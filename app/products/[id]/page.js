import products from '@/data/products.json';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const product = products.find(p => p.id === params.id);

  if (!product) return notFound();

  const stars = '⭐'.repeat(Math.round(product.rating));

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="h-80 md:h-auto overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <span className="badge bg-orange-100 text-orange-600 border-none mb-4">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-1">by <span className="font-semibold text-orange-500">{product.brand}</span></p>

            <div className="flex items-center gap-3 my-4">
              <span className="text-lg">{stars}</span>
              <span className="font-semibold text-gray-700">{product.rating}/5</span>
              <span className="text-gray-400 text-sm">({product.stock} in stock)</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-extrabold text-orange-500">${product.price}</span>
              <button className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none hover:from-orange-500 hover:to-amber-500 flex-1">
                🛒 Add to Cart
              </button>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="badge badge-outline badge-warning">Free Shipping</span>
              <span className="badge badge-outline badge-success">In Stock</span>
              <span className="badge badge-outline badge-info">Summer 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}