import { IOrderSheet } from 'models/order.model';
import { httpClient } from './http';

export const order = async (orderData: IOrderSheet) => {
  const response = await httpClient.post('/orders', orderData);
  return response.data;
};
