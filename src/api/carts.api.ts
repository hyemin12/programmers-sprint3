import { httpClient } from './http';
import { ICart } from 'models/cart.model';

interface AddCartProps {
  book_id: number;
  quantity: number;
}

interface CartResponse {
  lists: ICart[];
}
interface UpdateQuantityProps {
  id: number;
  quantity: number;
}

export const addCart = async (params: AddCartProps) => {
  const response = await httpClient.post<ICart>(`/carts`, params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<CartResponse>('/carts');
  return response.data.lists;
};

export const deleteCart = async (cartId: number) => {
  const response = await httpClient.delete(`/carts/${cartId}`);
  return response.data;
};

export const updateQuantity = async ({ id, quantity }: UpdateQuantityProps) => {
  const response = await httpClient.put(`/carts/${id}`, { quantity });
  return response.data;
};
