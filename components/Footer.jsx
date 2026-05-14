export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-amber-500 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-3">☀️ SunCart</h3>
          <p className="text-orange-100 text-sm">Your one-stop summer essentials store. Stay cool, look great, and enjoy every sunny day!</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-orange-100 text-sm">📧 hello@suncart.com</p>
          <p className="text-orange-100 text-sm">📞 +1 (800) SUN-CART</p>
          <p className="text-orange-100 text-sm">📍 Miami Beach, FL</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-yellow-200 transition">📘</a>
            <a href="#" className="hover:text-yellow-200 transition">📸</a>
            <a href="#" className="hover:text-yellow-200 transition">🐦</a>
          </div>
          <a href="#" className="text-orange-200 text-sm underline mt-3 block">Privacy Policy</a>
        </div>
      </div>
      <div className="text-center text-orange-200 text-xs py-3 border-t border-orange-400">
        © 2025 SunCart. All rights reserved.
      </div>
    </footer>
  );
}