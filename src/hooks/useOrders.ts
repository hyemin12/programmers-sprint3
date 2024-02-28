import { useEffect, useState } from 'react';
import { fetchOrder, fetchOrders } from 'api/order.api';
import { IOrderListItem } from 'models/order.model';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((res) => setOrders(res));
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.find((item) => item.id === orderId)?.detail) {
      setSelectedItemId(orderId);
      return;
    }
    fetchOrder(orderId).then((res) => {
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return { ...item, detail: res };
          }
          return item;
        }),
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
