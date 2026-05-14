'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    title: "Summer Sale 50% OFF 🔥",
    subtitle: "Shop the hottest deals on sunglasses, outfits & more",
    bg: "from-orange-400 to-amber-300",
    emoji: "🕶️"
  },
  {
    title: "Hot Deals This Weekend 🏖️",
    subtitle: "Beach accessories starting at just $19.99",
    bg: "from-yellow-400 to-orange-300",
    emoji: "🌊"
  },
  {
    title: "Sun-Ready Skincare ☀️",
    subtitle: "Protect your skin with premium SPF products",
    bg: "from-amber-500 to-yellow-400",
    emoji: "🧴"
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className={`bg-gradient-to-r ${slide.bg} transition-all duration-700 rounded-3xl mx-4 md:mx-8 mt-8 p-10 md:p-16 text-white text-center relative overflow-hidden min-h-[320px] flex flex-col items-center justify-center`}>
      {/* Decorative circles */}
      <div className="absolute top-4 right-8 text-8xl opacity-20">{slide.emoji}</div>
      <div className="absolute bottom-4 left-8 text-6xl opacity-10">☀️</div>

      <div className="text-6xl mb-4 animate__animated animate__bounceIn">{slide.emoji}</div>
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg animate__animated animate__fadeInUp">
        {slide.title}
      </h1>
      <p className="text-lg md:text-xl opacity-90 mb-8 animate__animated animate__fadeInUp">
        {slide.subtitle}
      </p>
      <a href="/products" className="btn btn-lg bg-white text-orange-500 border-none hover:bg-orange-50 font-bold shadow-lg">
        Shop Now →
      </a>

      {/* Dots */}
      <div className="flex gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}