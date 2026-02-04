export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  description: string;
  stock: number;
  collection?: string;
}
