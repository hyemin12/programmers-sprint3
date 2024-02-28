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

export interface IOrderSheet {
  books: number[];
  total_quantity: number;
  total_price: number;
  first_book_title: string;
  payment: string;
  delivery: {
    address: string;
    contact: string;
    recipient: string;
  };
}
