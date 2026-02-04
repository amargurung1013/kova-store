import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/useCart";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Scroll Shadow Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Search "Enter" Key
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setMenuOpen(false);
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-sm py-4" : "border-b border-gray-100 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          {/* --- LEFT: HAMBURGER + LOGO --- */}
          <div className="flex items-center gap-6 flex-1">
            {/* 3 LINES BUTTON */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[6px] cursor-pointer group p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <span className="w-6 h-[2px] bg-black transition-all group-hover:w-8"></span>
              <span className="w-6 h-[2px] bg-black transition-all group-hover:w-8"></span>
              <span className="w-6 h-[2px] bg-black transition-all group-hover:w-8"></span>
            </button>

            {/* LOGO */}
            <Link
              to="/"
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter"
            >
              KOVA
            </Link>
          </div>

          {/* --- RIGHT: SEARCH & ACTIONS --- */}
          <div className="flex items-center gap-6 text-[11px] md:text-xs font-normal tracking-widest text-gray-800">
            {/* SEARCH INPUT */}
            <div className="border-b border-black pb-0.5 hidden md:block group focus-within:border-gray-500">
              <input
                type="text"
                placeholder="SEARCH"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-24 bg-transparent outline-none placeholder:text-gray-600 text-black uppercase font-normal tracking-widest focus:w-32 transition-all duration-300"
              />
            </div>

            {/* DYNAMIC LOGIN */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="hover:text-black transition-colors"
              >
                MY ACCOUNT
              </Link>
            ) : (
              <Link to="/login" className="hover:text-black transition-colors">
                LOG IN
              </Link>
            )}

            {/* 👇 CHANGED: HELP -> ABOUT */}
            <Link
              to="/about"
              className="hidden md:block hover:text-black transition-colors"
            >
              ABOUT
            </Link>

            {/* LIVE CART COUNT */}
            <Link
              to="/cart"
              className="hover:text-black transition-colors whitespace-nowrap"
            >
              SHOPPING BAG [{cartCount}]
            </Link>
          </div>
        </div>
      </nav>

      {/* --- DRAWER MENU (Pop up from left) --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[85%] md:w-[400px] bg-white z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-10 h-full overflow-y-auto flex flex-col">
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-sm font-bold tracking-widest hover:text-gray-500 mb-8"
          >
            CLOSE
          </button>

          {/* Mobile Search */}
          <div className="md:hidden border-b border-gray-200 pb-2 mb-8">
            <input
              type="text"
              placeholder="SEARCH..."
              className="w-full outline-none text-sm uppercase tracking-widest"
              onKeyDown={handleSearch}
            />
          </div>

          <div className="space-y-6">
            <Link
              to="/products?collection=New"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tight block hover:text-gray-500"
            >
              New Arrivals
            </Link>
            <Link
              to="/products?collection=Essentials"
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-tight block hover:text-gray-500"
            >
              Best Sellers
            </Link>
          </div>

          <hr className="border-gray-100 my-8" />

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Categories
            </h4>
            <Link
              to="/products?category=T-Shirts"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              T-Shirts
            </Link>
            <Link
              to="/products?category=Jackets"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              Jackets
            </Link>
            <Link
              to="/products?category=Sweater"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              Knitwear
            </Link>
            <Link
              to="/products?category=Pants"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              Pants & Cargo
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <Link
              to="/login"
              className="block text-xs text-gray-500 uppercase tracking-widest hover:text-black mb-2"
            >
              My Account
            </Link>

            {/* 👇 CHANGED IN MOBILE MENU TOO */}
            <Link
              to="/about"
              className="block text-xs text-gray-500 uppercase tracking-widest hover:text-black"
            >
              About KOVA
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
