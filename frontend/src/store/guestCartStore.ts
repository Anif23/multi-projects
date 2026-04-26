import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

interface GuestCartItem {
  product: Product;
  quantity: number;
}

interface GuestCartState {
  items: GuestCartItem[];

  add: (product: Product, qty: number) => void;
  update: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

export const useGuestCartStore = create<GuestCartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, qty) => {
        const exists = get().items.find(i => i.product.id === product.id);

        if (exists) {
          set({
            items: get().items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + qty }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { product, quantity: qty }],
          });
        }
      },

      update: (productId, qty) => {
        set({
          items: get().items.map(i =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        });
      },

      remove: (productId) => {
        set({
          items: get().items.filter(i => i.product.id !== productId),
        });
      },

      clear: () => set({ items: [] }),
    }),
    { name: "guest-cart" }
  )
);