import { httpClient, requestHandler } from './http';

export interface AddCartProps {
  book_id: number;
  quantity: number;
}

interface UpdateQuantityProps {
  id: number;
  quantity: number;
}
interface DeleteCartProps {
  idArr?: number[];
  cartId: number;
}

export const addCart = async (params: AddCartProps) => {
  return await requestHandler('post', '/carts', params);
};

export const fetchCart = async () => {
  return await requestHandler('get', '/carts');
};

export const deleteCart = async ({ cartId, idArr }: DeleteCartProps) => {
  return await requestHandler('delete', `/carts/${cartId}?idArr=${idArr}`);
};

export const updateQuantity = async ({ id, quantity }: UpdateQuantityProps) => {
  const response = await httpClient.put(`/carts/${id}`, { quantity });
  return response.data;
};
