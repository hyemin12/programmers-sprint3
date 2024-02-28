import OrderDetail from './OrderDetail';
import { Button } from 'components/common';
import { useOrders } from 'hooks/useOrders';
import { IOrderListItem } from 'models/order.model';
import { formatDate, formatNumber } from 'utils/format';

interface OrderItemProps {
  order: IOrderListItem;
  index: number;
}

const OrderItem = ({ order, index }: OrderItemProps) => {
  if (!order) return null;

  const { selectOrderItem, selectedItemId } = useOrders();
  const { id, address, contact, created_at, recipient, total_price, total_quantity, payment, book_title, detail } =
    order;
  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{formatDate(created_at, 'YYYY.MM.DD')}</td>
        <td>{address}</td>
        <td>{recipient}</td>
        <td>{contact}</td>
        <td>{book_title}</td>
        <td>{total_quantity}</td>
        <td>{formatNumber(total_price)}원</td>
        <td>{payment}</td>
        <td>
          <Button size="small" scheme="default" onClick={() => selectOrderItem(id)}>
            자세히
          </Button>
        </td>
      </tr>
      {selectedItemId === id && detail && (
        <>
          {detail.map((item, idx) => (
            <OrderDetail key={item.book_id} detail={item} index={idx + 1} />
          ))}
        </>
      )}
    </>
  );
};

export default OrderItem;
