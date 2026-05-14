import Link from 'next/link';

export default function ProductCard({ product }) {
  const stars = '⭐'.repeat(Math.round(product.rating));

  return (
    <div className="card bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden border border-orange-100">
      <figure className="h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <span className="badge bg-orange-100 text-orange-600 border-none text-xs font-semibold">{product.category}</span>
        <h3 className="card-title text-gray-800 text-lg mt-1">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{product.rating} {stars}</span>
          <span className="text-xl font-bold text-orange-500">${product.price}</span>
        </div>
        <Link href={`/products/${product.id}`} className="btn btn-sm bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none hover:from-orange-500 hover:to-amber-500 mt-3 w-full">
          View Details
        </Link>
      </div>
    </div>
  );
}