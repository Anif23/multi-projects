import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";
import { queryClient } from "../lib/queryClient";

interface WishlistState {
  items: Product[];

  toggle: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const exists = get().items.find(p => p.id === product.id);

        if (exists) {
          set({
            items: get().items.filter(p => p.id !== product.id),
          });
        } else {
          set({
            items: [...get().items, product],
          });
        }
      },

      isWishlisted: (id) => {
        return get().items.some(p => p.id === id);
      },

      clear: () => set({ items: [] }),
    }),
    { name: "wishlist" }
  )
);