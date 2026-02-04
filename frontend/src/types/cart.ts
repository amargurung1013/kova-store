import type { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
  size: string; // 👈 You must add this line!
}
