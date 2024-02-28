import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { ICart } from 'models/cart.model';
import { addCart, deleteCart, fetchCart, updateQuantity } from 'api/carts.api';

interface CartStoreState {
  isEmpty: boolean;
  cartItems: ICart[];
  selectedItems: number[];
  fetchCartItems: () => void;
  addCartItem: (item: Omit<ICart, 'id'>) => void;
  deleteCartItem: (cartId: number) => void;
  clearCartItems: (idArr: number[]) => void;
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
        cartItems: [],
        selectedItems: [],
        // cartItem fetch
        fetchCartItems: async () => {
          try {
            const response = await fetchCart();
            set({
              cartItems: response,
              isEmpty: response.length === 0,
            });
          } catch (error) {
            console.error('장바구니 아이템을 가져오는 중에 오류가 발생했습니다.', error);
          }
        },

        // cartItem delete fetch
        deleteCartItem: async (cartId: number) => {
          try {
            await deleteCart({ cartId });
            set((state) => ({
              cartItems: state.cartItems.filter((item) => item.id !== cartId),
            }));
          } catch (error) {
            console.error('장바구니 아이템을 삭제하는 중에 오류가 발생했습니다.', error);
          }
        },

        clearCartItems: async (idArr: number[]) => {
          try {
            const cartId = idArr[0];
            await deleteCart({ cartId, idArr });
            set(() => ({ cartItems: [] }));
          } catch (error) {
            console.error('장바구니 아이템을 삭제하는 중에 오류가 발생했습니다.', error);
          }
        },

        // cartItem add fetch
        addCartItem: async (newItem: Omit<ICart, 'id'>): Promise<void> => {
          try {
            const parmas = { book_id: newItem.book_id, quantity: newItem.quantity };
            const response = await addCart(parmas);
            const cartItem = { ...newItem, id: response.id };
            set((state) => ({
              cartItems: addItemToCart(state.cartItems, cartItem),
            }));
          } catch (error) {
            console.error('장바구니에 아이템을 추가하는 중에 오류가 발생했습니다.', error);
          }
        },

        // cartItem update fetch
        updateCartItem: async (id: number, quantity: number) => {
          try {
            await updateQuantity({ id, quantity });
            set((state) => ({
              cartItems: updateItemQuantity(state.cartItems, id, quantity),
            }));
          } catch (error) {
            console.error('장바구니에 아이템의 수량을 변경하는 중에 오류가 발생했습니다.', error);
          }
        },

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

function updateItemQuantity(cartItems: ICart[], id: number, quantity: number): ICart[] {
  return cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
}

export default useCartStore;
