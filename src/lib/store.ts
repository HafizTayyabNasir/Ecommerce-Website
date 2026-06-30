import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // unique ID for the cart line item
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  image?: string;
  quantity: number;
  maxQuantity?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          // Check if same product+variant is already in cart
          const existingItemIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            const newQuantity = newItems[existingItemIndex].quantity + item.quantity;
            
            // Respect max quantity if available
            if (item.maxQuantity && newQuantity > item.maxQuantity) {
              newItems[existingItemIndex].quantity = item.maxQuantity;
            } else {
              newItems[existingItemIndex].quantity = newQuantity;
            }
            
            return { items: newItems };
          }

          // Create unique ID for new line item
          const id = `${item.productId}-${item.variantId || 'base'}-${Date.now()}`;
          return { items: [...state.items, { ...item, id }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "suspended-cart",
    }
  )
);
