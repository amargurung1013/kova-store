import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Shirts",
    image: "",
    sizes: [] as string[] // We store selected sizes here
  });

  // Available options
  const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"];
  const CATEGORIES = ["Shirts", "T-Shirts", "Jeans", "Trousers", "Jackets"];

  // 1. Fetch Products on Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get("/products").then((res) => setProducts(res.data));
  };

  // 2. Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      // Calls your backend /upload endpoint
      const res = await api.post("/upload", formData);
      // Backend returns { image_url: "uploads/filename.jpg" }
      // We need to make sure we prepend the backend URL if it's a local path
      const fullUrl = `http://127.0.0.1:8000/${res.data.image_url}`;
      setForm({ ...form, image: fullUrl });
    } catch (err) {
      console.log(err);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // 3. Toggle Size Selection
  const toggleSize = (size: string) => {
    setForm((prev) => {
      const exists = prev.sizes.includes(size);
      if (exists) {
        return { ...prev, sizes: prev.sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  // 4. Submit New Product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sizes.length) return alert("Please select at least one size!");

    try {
      await api.post("/products", {
        ...form,
        price: parseFloat(form.price), // Convert string to number
      });
      alert("Product Added!");
      fetchProducts(); // Refresh list
      // Reset Form
      setForm({ name: "", price: "", category: "Shirts", image: "", sizes: [] });
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    }
  };

  // 5. Delete Product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-16">
      
      {/* LEFT: ADD PRODUCT FORM */}
      <div className="bg-gray-50 p-8 rounded-lg h-fit sticky top-24">
        <h2 className="text-3xl font-black uppercase mb-8">Add New Drop</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Product Name</label>
            <input 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full p-4 border border-gray-300 outline-none focus:border-black"
              placeholder="E.g. Oversized Graphic Tee"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Price (₹)</label>
              <input 
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                className="w-full p-4 border border-gray-300 outline-none focus:border-black"
                placeholder="1999"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Category</label>
              <select 
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
                className="w-full p-4 border border-gray-300 outline-none focus:border-black bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Available Sizes</label>
            <div className="flex gap-3 flex-wrap">
              {AVAILABLE_SIZES.map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-12 h-12 border flex items-center justify-center font-bold transition-all ${
                    form.sizes.includes(size) 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-400 border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:border-black transition-colors relative">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {loading ? (
                <p className="text-sm font-bold">UPLOADING...</p>
              ) : form.image ? (
                <img src={form.image} alt="Preview" className="h-32 mx-auto object-cover" />
              ) : (
                <p className="text-gray-400 text-sm uppercase">Drag image or click to upload</p>
              )}
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 uppercase font-bold tracking-widest hover:bg-gray-800">
            Publish Product
          </button>
        </form>
      </div>

      {/* RIGHT: PRODUCT LIST */}
      <div>
        <h2 className="text-3xl font-black uppercase mb-8">Inventory ({products.length})</h2>
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="flex gap-4 border p-4 bg-white items-center">
              <img src={p.image} className="w-16 h-16 object-cover bg-gray-100" />
              <div className="flex-1">
                <h4 className="font-bold uppercase text-sm">{p.name}</h4>
                <p className="text-xs text-gray-500">{p.category} • ₹{p.price}</p>
                <div className="flex gap-1 mt-1">
                    {p.sizes?.map(s => <span key={s} className="text-[10px] bg-gray-100 px-1">{s}</span>)}
                </div>
              </div>
              <button 
                onClick={() => handleDelete(p.id)}
                className="text-red-500 text-xs uppercase font-bold hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}