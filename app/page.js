import HeroSlider from '@/components/HeroSlider';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';

export default function HomePage() {
  const popularProducts = products.slice(0, 3);

  const brands = [
    { name: 'SunGuard', emoji: '🕶️', desc: 'Premium UV protection eyewear' },
    { name: 'CoastalWear', emoji: '👗', desc: 'Beachwear for every occasion' },
    { name: 'GlowGuard', emoji: '🧴', desc: 'Reef-safe skincare formulas' },
    { name: 'TidalStep', emoji: '👡', desc: 'Sandals for every adventure' },
  ];

  const tips = [
    { emoji: '☀️', title: 'Apply SPF Daily', desc: 'Even on cloudy days, UV rays can cause skin damage. Always apply SPF 30+.' },
    { emoji: '💧', title: 'Stay Hydrated', desc: 'Drink at least 8 glasses of water daily. More if you\'re out in the sun.' },
    { emoji: '🕶️', title: 'Protect Your Eyes', desc: 'Wear polarized sunglasses with UV400 protection every time you step outside.' },
    { emoji: '🧢', title: 'Cover Up Smart', desc: 'Wear a wide-brim hat and lightweight clothing during peak sun hours (10am–4pm).' },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Popular Products */}
      <section className="px-4 md:px-8 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">🔥 Popular Products</h2>
          <p className="text-gray-500 mt-2">Handpicked favorites for this summer season</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="/products" className="btn bg-gradient-to-r from-orange-400 to-amber-400 text-white border-none hover:from-orange-500 hover:to-amber-500 btn-lg">
            View All Products →
          </a>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="px-4 md:px-8 mt-20 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">🌞 Summer Care Tips</h2>
          <p className="text-gray-500 mt-2">Stay safe and look great all summer long</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-4xl mb-3">{tip.emoji}</div>
              <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Brands */}
      <section className="px-4 md:px-8 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">🏷️ Top Brands</h2>
          <p className="text-gray-500 mt-2">We partner with the best summer brands</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-md border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-2">{brand.emoji}</div>
              <h3 className="font-bold text-orange-600">{brand.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{brand.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}