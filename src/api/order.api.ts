import { IOrder, IOrderDetail, IOrderSheet } from 'models/order.model';
import { httpClient } from './http';

interface FetchOrdersResponse {
  lists: IOrder[];
}
interface FetchOrderResponse {
  lists: IOrderDetail[];
}

export const order = async (orderData: IOrderSheet) => {
  const response = await httpClient.post('/orders', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<FetchOrdersResponse>('/orders');
  return response.data.lists;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<FetchOrderResponse>(`/orders/${orderId}`);
  return response.data.lists;
};
