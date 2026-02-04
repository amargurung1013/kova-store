import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

// Define what an Order looks like coming from the DB
interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: Array<{ name: string; quantity: number; size: string }>; // Adjust based on your actual data structure
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userEmail] = useState(
    () => localStorage.getItem("userEmail") || "Guest",
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // FETCH ORDERS FROM API
    api
      .get("/orders/my")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
              My Account
            </h1>
            <p className="text-gray-500 font-medium">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-8 py-3 bg-white border border-gray-300 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PROFILE CARD */}
          <div className="bg-white p-8 shadow-sm h-fit">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
              Details
            </h3>
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  Email
                </span>
                <span className="text-sm font-bold">{userEmail}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                  Member Status
                </span>
                <span className="text-sm font-bold text-green-600">Active</span>
              </div>
            </div>
          </div>

          {/* ORDER HISTORY LIST */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Order History ({orders.length})
            </h3>

            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              // EMPTY STATE
              <div className="bg-white p-12 text-center border border-dashed border-gray-200">
                <p className="font-bold text-sm uppercase tracking-wide mb-2">
                  No orders yet
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-4 bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              // ORDER LIST
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-6 shadow-sm border border-gray-100 flex justify-between items-center group hover:border-black transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Order #{order.id} •{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-lg">₹{order.total_price}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.items.length} Items
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
