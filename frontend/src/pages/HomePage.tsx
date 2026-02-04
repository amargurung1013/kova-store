import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";
import SEOFooter from "../components/SEOFooter";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch latest 4 products for the "New Drops" section
    api.get("/products").then((res) => setProducts(res.data.slice(0, 4)));
  }, []);

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION (Updated Image) */}
   {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full bg-gray-900 overflow-hidden">
        <img 
            src="http://127.0.0.1:8000/uploads/image_4.jpg"

            className="absolute inset-0 w-full h-full object-cover object-top origin-top scale-125 opacity-80"
            alt="Hero"
        />
        {/* ... rest of code ... */}
        <div className="absolute inset-0 bg-black/30" />{" "}
        {/* Added a subtle dark overlay for text pop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-7xl md:text-[10rem] font-black text-white uppercase leading-none tracking-tighter mb-6 drop-shadow-lg">
            STREET
            <br />
            CULTURE
          </h1>
          <Link
            to="/products"
            className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
          >
            Shop The Drop
          </Link>
        </div>
      </section>

      {/* 2. SCROLLING MARQUEE (Slower Speed) */}
      <div className="bg-black text-white py-3 overflow-hidden whitespace-nowrap border-t border-b border-gray-800">
        <div className="inline-block animate-marquee">
          {/* Repeated content for seamless looping */}
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase">
            Free Shipping on Orders Over ₹2000
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
            ♦
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase">
            Winter Collection Live Now
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
            ♦
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase">
            New Styles Added Daily
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
            ♦
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase">
            Free Shipping on Orders Over ₹2000
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
            ♦
          </span>
          <span className="mx-8 text-xs font-bold tracking-[0.2em] uppercase">
            Winter Collection Live Now
          </span>
        </div>
        <style>{`
            /* 👇 CHANGED: Increased from 15s to 30s for a slower, smoother scroll */
            .animate-marquee { animation: marquee 30s linear infinite; }
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
      </div>

      {/* 3. CATEGORY TILES */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-black uppercase mb-10 text-center tracking-tighter">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Jackets",
                img: "https://images.unsplash.com/photo-1551028919-ac66e6a39451?w=500",
              },
              {
                name: "T-Shirts",
                img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
              },
              {
                name: "Pants",
                img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
              },
              {
                name: "Sweater",
                img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
              },
            ].map((cat) => (
              <Link
                to={`/products?category=${cat.name}`}
                key={cat.name}
                className="group text-center"
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4 relative">
                  <img
                    src={cat.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={cat.name}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                </div>
                <h4 className="font-bold uppercase tracking-wide text-sm">
                  {cat.name === "Sweater" ? "Sweaters" : cat.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WINTER COLLECTION BANNER */}
      <section className="h-[80vh] relative flex items-center justify-center overflow-hidden">
        <img
          src="http://127.0.0.1:8000/uploads/winter.jpg"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105"
          alt="Winter Collection"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 drop-shadow-2xl">
            Winter
            <br />
            Season
          </h2>
          <Link
            to="/products?collection=Winter"
            className="bg-white text-black px-12 py-4 uppercase font-bold tracking-widest text-sm hover:bg-black hover:text-white transition-all inline-block"
          >
            Shop Collection
          </Link>
        </div>
      </section>

      {/* 5. NEW DROPS GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h3 className="text-4xl font-black uppercase tracking-tighter">
            Just Dropped
          </h3>
          <Link
            to="/products"
            className="text-sm font-bold border-b border-black pb-1 uppercase"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="h-[400px] overflow-hidden mb-4 bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.collection && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1">
                    {product.collection}
                  </span>
                )}
                {/* Quick Add Button */}
                <button className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 uppercase font-bold text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  View Product
                </button>
              </div>
              <h4 className="font-bold uppercase text-sm">{product.name}</h4>
              <p className="text-gray-500 text-xs mt-1">₹{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM / NEWSLETTER TEASER */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          Join The Movement
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Sign up for exclusive drops, early access, and street culture updates.
        </p>
        <div className="flex max-w-md mx-auto border-b border-white">
          <input
            type="email"
            placeholder="ENTER EMAIL"
            className="bg-transparent w-full py-3 text-white outline-none placeholder:text-gray-600 uppercase font-bold"
          />
          <button className="text-white font-bold uppercase">Subscribe</button>
        </div>
      </section>

      {/* 7. SEO FOOTER */}
      <SEOFooter />
    </div>
  );
}
