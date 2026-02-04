import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../services/api";
import type { Product } from "../types/product";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // 1. READ ALL FILTERS (Not just collection)
  const collectionFilter = searchParams.get("collection");
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 2. BUILD THE QUERY STRING DYNAMICALLY
        let endpoint = "/products";
        const params = new URLSearchParams();

        if (collectionFilter) params.append("collection", collectionFilter);
        if (categoryFilter) params.append("category", categoryFilter);
        if (searchQuery) params.append("search", searchQuery);

        // Attach params to endpoint (e.g., /products?category=Jackets)
        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const res = await api.get(endpoint);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionFilter, categoryFilter, searchQuery]); // Re-run if ANY filter changes

  // 3. DEFINE BANNER IMAGES FOR EACH CATEGORY
  // (You can change these Unsplash links to your own /uploads/ images later!)
  const banners: Record<string, string> = {
    "Jackets": "https://images.unsplash.com/photo-1551028919-ac66e6a39451?w=1200",
    "T-Shirts": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200",
    "Pants": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200",
    "Sweater": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200",
  };

  // Determine which banner to show
  // Priority: Category Image -> Winter Image -> Default
  const currentBanner = categoryFilter 
    ? banners[categoryFilter] 
    : "http://127.0.0.1:8000/uploads/winter.jpg";

  // Determine Page Title
  let pageTitle = "All Products";
  if (collectionFilter) pageTitle = `${collectionFilter} Collection`;
  if (categoryFilter) pageTitle = categoryFilter;
  if (searchQuery) pageTitle = `Results for "${searchQuery}"`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in">
      
      {/* --- NEW: SMART HEADER SECTION --- */}
      <div className="relative h-64 mb-12 rounded-lg overflow-hidden flex items-center justify-center group">
        <img 
            src={currentBanner} 
            alt={pageTitle}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-2xl">
                {pageTitle}
            </h1>
            {!loading && (
                <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase mt-3 opacity-90">
                    {products.length} Items Available
                </p>
            )}
        </div>
      </div>
      {/* ---------------------------------- */}

      {/* CONTENT SECTION */}
      {loading ? (
        // Loading Skeleton
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="h-[400px] bg-gray-200"></div>
              <div className="h-4 bg-gray-200 w-2/3"></div>
              <div className="h-4 bg-gray-200 w-1/3"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        // --- EMPTY STATE / COMING SOON ---
        <div className="flex flex-col md:flex-row bg-gray-50 border border-gray-100 overflow-hidden min-h-[400px]">
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <img
              src="http://127.0.0.1:8000/uploads/winter.jpg"
              alt="Coming Soon"
              className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-80"
            />
          </div>
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-start bg-white">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
              Status: 404
            </span>
            <h3 className="text-2xl font-black uppercase mb-4">Nothing Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any items matching <strong>{pageTitle}</strong>. 
              Try checking back later for our next drop.
            </p>
            <Link to="/" className="bg-black text-white px-8 py-3 uppercase font-bold text-xs tracking-widest hover:bg-gray-800">
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        // Product Grid
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group block">
              <div className="h-[400px] overflow-hidden mb-4 bg-gray-100 relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {p.collection && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest">
                    {p.collection}
                  </span>
                )}
              </div>
              <h4 className="font-bold uppercase text-sm tracking-wide">
                {p.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1">₹{p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}