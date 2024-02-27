import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ICart } from 'models/cart.model';
import { fetchCart } from 'api/carts.api';

interface CartStoreState {
  isEmpty: boolean;
  cartItems: ICart[];
  selectedItems: number[];
  setIsEmpty: (isEmpty: boolean) => void;
  fetchCartItems: () => void;
  addCartItem: (item: ICart) => void;
  deleteCartItem: (deleteItemId: number[]) => void;
  clearCartItems: () => void;
  addSelectedItem: (id: number) => void;
  addAllSelectedItems: () => void;
  deleteSelectedItems: (id: number[]) => void;
  clearSelectedItem: () => void;
}

const useCartStore = create<CartStoreState>()(
  devtools(
    persist(
      (set) => ({
        isEmpty: true,
        setIsEmpty: (isEmpty: boolean) => set(() => ({ isEmpty })),
        cartItems: [],
        selectedItems: [],
        // cartItem fetch
        fetchCartItems: async () => {
          const response = await fetchCart();
          set({
            cartItems: response,
            isEmpty: response.length === 0,
          });
        },

        addCartItem: (newItem: ICart) =>
          set((state) => ({
            cartItems: addItemToCart(state.cartItems, newItem),
          })),
        deleteCartItem: (deleteItemsId: number[]) =>
          set((state) => ({
            cartItems: deleteItemsFromCart(state.cartItems, deleteItemsId),
          })),
        clearCartItems: () => set(() => ({ cartItems: [] })),
        updateCartItem: (id: number, quantity: number) =>
          set((state) => ({
            cartItems: updateCartItemQuantity(state.cartItems, id, quantity),
          })),
        addSelectedItem: (id: number) => set((state) => ({ selectedItems: [...state.selectedItems, id] })),
        addAllSelectedItems: () => set((state) => ({ selectedItems: state.cartItems.map((item) => item.id) })),
        deleteSelectedItems: (id: number[]) =>
          set((state) => ({
            selectedItems: state.selectedItems.filter((item) => !id.includes(item)),
          })),
        clearSelectedItem: () => set(() => ({ selectedItems: [] })),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

function addItemToCart(cartItems: ICart[], newItem: ICart): ICart[] {
  const newItemId = newItem.id;
  const isExist = cartItems.find((item) => item.id === newItemId);
  if (isExist) {
    return cartItems.map((item) => (item.id === newItemId ? { ...item, quantity: item.quantity + 1 } : item));
  } else {
    return [...cartItems, { ...newItem, quantity: 1 }];
  }
}

function deleteItemsFromCart(cartItems: ICart[], deleteItemsId: number[]): ICart[] {
  return cartItems.filter((item) => !deleteItemsId.includes(item.id));
}

function updateCartItemQuantity(cartItems: ICart[], id: number, quantity: number): ICart[] {
  return cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export default useCartStore;
