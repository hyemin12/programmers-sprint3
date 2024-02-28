import { ICart } from './cart.model';

export interface IOrder {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface IOrderedBook {
  quantity: number;
  book_id: number;
  cartItem_id: number;
}

export interface IOrderSheet {
  books: IOrderedBook[];
  total_quantity: number;
  total_price: number;
  first_book_title: string;
  payment: string;
  delivery: IDelivery;
}

export interface IDelivery {
  address: string;
  contact: string;
  recipient: string;
}
