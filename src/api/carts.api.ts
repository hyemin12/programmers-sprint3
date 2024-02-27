import { httpClient } from './http';
import { ICart } from 'models/cart.model';

interface AddCartProps {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartProps) => {
  const response = await httpClient.post<ICart>(`/carts`, params);
  return response.data;
};
