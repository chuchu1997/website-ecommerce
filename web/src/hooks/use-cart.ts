import { create } from "zustand";

interface CartStore {
  quantity: number;
  setQuantity: (qty: number) => void;
  refresh: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set) => ({
  quantity: 0,
  setQuantity: (qty) => set({ quantity: qty }),
  refresh: async () => {
    const res = await fetch("/api/cart/count");
    const data = await res.json();
    set({ quantity: data.count });
  },
}));