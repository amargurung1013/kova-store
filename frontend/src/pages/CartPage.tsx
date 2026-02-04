import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, remove, increase, decrease, totalPrice } = useCart();

  if (cart.length === 0) {
    return <div className="p-20 text-center text-xl font-bold">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-12 uppercase tracking-wide">Your Cart</h1>
      
      <div className="space-y-8">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b border-gray-200 pb-8">
            {/* Image */}
            <img src={item.image} className="w-32 h-32 object-cover rounded-md" alt={item.name} />
            
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl uppercase">{item.name}</h3>
                  <p className="font-bold text-xl">₹{item.price * item.quantity}</p>
                </div>
                <p className="text-gray-500">Size: <span className="text-black font-bold">{item.size}</span></p>
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-black">
                  <button onClick={() => decrease(item.id, item.size)} className="px-4 py-2 hover:bg-gray-100 font-bold">-</button>
                  <span className="px-4 font-medium">{item.quantity}</span>
                  <button onClick={() => increase(item.id, item.size)} className="px-4 py-2 hover:bg-gray-100 font-bold">+</button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => remove(item.id, item.size)} 
                  className="text-red-500 font-medium hover:text-red-700 text-sm uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Checkout */}
      <div className="mt-12 flex flex-col items-end">
        <p className="text-2xl mb-6">Total: <span className="font-bold">₹{totalPrice}</span></p>
        <Link to="/checkout" className="bg-black text-white px-10 py-4 uppercase font-bold tracking-widest hover:bg-gray-800 transition-all w-full md:w-auto text-center">
          Checkout
        </Link>
      </div>
    </div>
  );
}