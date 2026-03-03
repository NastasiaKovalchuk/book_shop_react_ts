import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type CartItem } from "@/types/cart";

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  increaseItem: (bookId: string) => void;
  decreaseItem: (bookId: string) => void;
  removeItem: (bookId: string) => void;
  clearCart: () => void;

  getTotalPrice: () => number;
  getTotalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.bookId === item.bookId);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.bookId === item.bookId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        }),

      increaseItem: (bookId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.bookId === bookId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),

      decreaseItem: (bookId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      removeItem: (bookId) =>
        set((state) => ({
          items: state.items.filter((i) => i.bookId !== bookId),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },

      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: "cart" },
  ),
);
