import { IOrderSheet } from 'models/order.model';
import { requestHandler } from './http';

export const order = async (orderData: IOrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return await requestHandler('get', '/orders');
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler('get', `/orders/${orderId}`);
};
