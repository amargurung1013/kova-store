import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/useCart"; // 👈 Connects to your new Cart Context
import type { Product } from "../types/product";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(""); // Track selected size
  const [loading, setLoading] = useState(true);

  // Get 'addToCart' from our global state
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("PLEASE SELECT A SIZE"); // Simple validation
      return;
    }
    if (product) {
      addToCart(product, selectedSize); // 👈 The Magic Line: Updates the cart!
      alert(`ADDED ${product.name} TO BAG`); // Temporary feedback
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold tracking-widest">
        LOADING...
      </div>
    );
  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-bold tracking-widest">
        PRODUCT NOT FOUND
      </div>
    );

  return (
    <div className="pt-24 min-h-screen bg-white">
      {" "}
      {/* pt-24 to clear the fixed navbar */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* LEFT: FULL HEIGHT IMAGE */}
        <div className="h-[50vh] md:h-[calc(100vh-6rem)] bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: DETAILS SECTION */}
        <div className="p-8 md:p-16 flex flex-col justify-center max-w-xl">
          {/* Breadcrumbs */}
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Home / {product.category} / {product.collection}
          </span>

          {/* Title & Price */}
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
            {product.name}
          </h1>
          <p className="text-xl font-medium text-gray-600 mb-8">
            ₹{product.price.toFixed(2)}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
              Select Size
            </h3>
            <div className="flex gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-sm font-bold transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Size Guide Link (Static for now) */}
            <button className="text-xs underline text-gray-500 mt-4 uppercase tracking-widest">
              Size Guide
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>

            <p className="text-xs text-center text-gray-500 font-medium mt-4">
              Free shipping on orders over ₹2000.
            </p>
          </div>

          {/* ACCORDION DETAILS (Static for style) */}
          <div className="mt-12 border-t border-gray-100 pt-8 space-y-4">
            <div className="flex justify-between items-center cursor-pointer group">
              <span className="text-xs font-bold uppercase tracking-widest">
                Description
              </span>
              <span className="text-xl group-hover:rotate-45 transition-transform">
                +
              </span>
            </div>
            <div className="flex justify-between items-center cursor-pointer group">
              <span className="text-xs font-bold uppercase tracking-widest">
                Material & Care
              </span>
              <span className="text-xl group-hover:rotate-45 transition-transform">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
