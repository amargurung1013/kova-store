import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage"; // <--- Make sure this import exists!
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage"; // <--- Add this too
import About from "./pages/About";
import ShopPage from "./pages/ShopPage"; // Optional, if you have it

function App() {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <div className="bg-white text-black font-sans min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<ShopPage />} />
            {/* THIS IS THE LINE THAT WAS CAUSING TROUBLE */}
            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<About />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
