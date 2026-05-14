import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">🛒 All Summer Products</h1>
        <p className="text-gray-500 mt-2">Everything you need for the perfect summer</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}