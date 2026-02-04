import { useState, useEffect } from "react";
import type { ReactNode } from "react"; // Fixed type import
import { CartContext } from "./CartContext";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export default function CartProvider({ children }: { children: ReactNode }) {
  // 1. LAZY INITIALIZATION (Fixes "setState synchronously" warning)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("kova_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("kova_cart", JSON.stringify(cart));
  }, [cart]);

  // --- ACTIONS ---
  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      // Check if item exists
      const existing = prev.find((item) => item.id === product.id && item.size === size);

      if (existing) {
        // Increment quantity if found
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Add new item if not found
      // We explicitly cast the new object to match CartItem structure
      return [...prev, { ...product, quantity: 1, size }]; 
    });
  };

  const increase = (id: number, size: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decrease = (id: number, size: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      })
    );
  };

  const remove = (id: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCart([]);

  // --- CALCULATIONS ---
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Navbar badge count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); 

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increase,
        decrease,
        remove,
        clearCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}