import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import type { Product } from "../types/product";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(""); 
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-xl font-bold">Loading...</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    // FIX: Passing both product and size
    addToCart(product, selectedSize); 
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
      <div className="w-full bg-gray-50">
        {product.image && (
            <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover mix-blend-multiply" />
        )}
      </div>

      <div className="flex flex-col justify-center">
        <span className="text-gray-400 tracking-widest uppercase text-sm mb-2">{product.category}</span>
        <h1 className="text-5xl font-black mb-4 uppercase leading-tight">{product.name}</h1>
        <p className="text-3xl mb-8 font-medium">₹{product.price}</p>
        
        {/* Size Selector */}
        <div className="mb-10">
            <h3 className="font-bold mb-4 uppercase text-sm tracking-widest">Select Size</h3>
            <div className="flex gap-3">
                {product.sizes?.map((size) => (
                    <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 border flex items-center justify-center font-bold text-lg transition-all ${
                            selectedSize === size 
                            ? "bg-black text-white border-black" 
                            : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
            {!selectedSize && <p className="text-red-500 text-xs mt-2">* Please select a size</p>}
        </div>

        <button 
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-5 uppercase font-bold tracking-widest transition-all ${
                selectedSize 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
            {selectedSize ? "Add to Cart" : "Select a Size"}
        </button>
      </div>
    </div>
  );
}