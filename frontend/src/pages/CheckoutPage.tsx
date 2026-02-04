import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { api } from "../services/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Simple form state
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zip: "",
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Prepare the data for the Backend
      // The backend expects: { items: [], total_price: 100 }
      const payload = {
        items: cart, 
        total_price: totalPrice
      };

      // 2. Send to API (Token is handled automatically if api.ts is set up, 
      // otherwise we rely on the interceptor or add headers manually)
      await api.post("/orders", payload);

      // 3. Success!
      clearCart(); // Empty the cart
      navigate("/profile"); // Send user to their profile to see the order
      
    } catch (error) {
      console.error("Order Failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h2 className="text-2xl font-black uppercase mb-4">Your Bag is Empty</h2>
        <button onClick={() => navigate("/products")} className="bg-black text-white px-8 py-3 uppercase font-bold text-xs tracking-widest">
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* LEFT: ADDRESS FORM */}
        <div>
          <h2 className="text-2xl font-black uppercase mb-8">Shipping Details</h2>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">Address</label>
              <input 
                required
                type="text" 
                placeholder="STREET ADDRESS"
                className="w-full border border-gray-300 p-4 uppercase text-sm outline-none focus:border-black"
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">City</label>
                <input 
                  required
                  type="text" 
                  placeholder="CITY"
                  className="w-full border border-gray-300 p-4 uppercase text-sm outline-none focus:border-black"
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Zip Code</label>
                <input 
                  required
                  type="text" 
                  placeholder="ZIP CODE"
                  className="w-full border border-gray-300 p-4 uppercase text-sm outline-none focus:border-black"
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                />
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white p-8 h-fit shadow-sm">
          <h2 className="text-xl font-black uppercase mb-8">Order Summary</h2>
          
          <div className="space-y-4 mb-8 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity}) <span className="text-gray-400 text-xs">Size: {item.size}</span></span>
                <span className="font-bold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-black pt-4 flex justify-between items-center mb-8">
            <span className="font-bold uppercase tracking-widest">Total</span>
            <span className="text-2xl font-black">₹{totalPrice}</span>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="w-full bg-black text-white py-4 uppercase font-bold text-xs tracking-[0.2em] hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

      </div>
    </div>
  );
}