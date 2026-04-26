export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  images?: { id: number; url: string }[];
  category?: { id: number; name: string };
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export interface WishlistItem {
  id: number;
  productId: number;
  product: Product;
}