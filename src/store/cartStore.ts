import create from 'zustand';
import type { CartItem } from '@/types';

type CartState = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (productId, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { productId, quantity }],
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },
  setQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getQuantity: (productId) => {
    const item = get().items.find((entry) => entry.productId === productId);
    return item?.quantity ?? 0;
  },
}));
