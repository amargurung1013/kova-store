import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";
// Removed useCart because we can't add to cart from here anymore

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  
  // No need for addToCart here anymore

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {["All", "Shirts", "T-Shirts", "Jeans", "Jackets"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-sm px-4 py-2 border whitespace-nowrap ${
              category === c ? "bg-black text-white border-black" : "border-gray-300 hover:border-black"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">Latest Drops</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products
          .filter((p) => category === "All" || p.category === category)
          .map((p) => (
            <div key={p.id} className="group border border-transparent hover:border-gray-200 transition-all">
              <Link to={`/product/${p.id}`} className="block relative overflow-hidden">
                {p.image && (
                  <img 
                    src={p.image} 
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={p.name}
                  />
                )}
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-bold uppercase tracking-widest">View Product</p>
                </div>
              </Link>

              <div className="p-4 text-center">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm">₹{p.price}</p>
                
                {/* CHANGED: Replaced 'Add to Cart' with a Link to Details */}
                <Link
                  to={`/product/${p.id}`}
                  className="mt-3 block w-full border border-black py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Select Size
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}