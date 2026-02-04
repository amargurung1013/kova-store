import { createContext } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  increase: (id: number, size: string) => void;
  decrease: (id: number, size: string) => void;
  remove: (id: number, size: string) => void;
  clearCart: () => void;
  totalPrice: number;
  cartCount: number; // 👈 ADD THIS LINE
}

export const CartContext = createContext<CartContextType | null>(null);