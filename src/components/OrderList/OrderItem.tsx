import OrderDetail from './OrderDetail';
import { Button, Modal, Title } from 'components/common';
import { useOrders } from 'hooks/useOrders';
import { IOrderListItem } from 'models/order.model';
import { useState } from 'react';
import { formatDate, formatNumber } from 'utils/format';
import OrderDetailModal from './OrderDetailModal';

interface OrderItemProps {
  order: IOrderListItem;
  index: number;
  selectedItemId: number | null;
  selectOrderItem: (id: number) => void;
}

const OrderItem = ({ order, index, selectedItemId, selectOrderItem }: OrderItemProps) => {
  if (!order) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => setIsModalOpen(false);

  const { id, address, contact, created_at, recipient, total_price, total_quantity, payment, book_title, detail } =
    order;
  console.log(order, detail, selectedItemId, id, selectedItemId === id);
  return (
    <>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleModalClose}>
          {selectedItemId === id && detail && <OrderDetailModal order={order} />}
        </Modal>
      )}
      <tr>
        <td>{index}</td>
        <td>{formatDate(created_at, 'YYYY.MM.DD')}</td>
        <td>{book_title}</td>
        <td>{total_quantity}</td>
        <td>{formatNumber(total_price)}원</td>
        <td>
          <Button
            size="small"
            scheme="default"
            onClick={() => {
              selectOrderItem(id);
              setIsModalOpen(true);
            }}
          >
            자세히
          </Button>
        </td>
      </tr>
    </>
  );
};

export default OrderItem;
