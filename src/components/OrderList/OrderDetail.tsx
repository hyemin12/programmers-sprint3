import { IOrderDetail } from 'models/order.model';
import { formatNumber } from 'utils/format';

interface OrderDetailProps {
  detail: IOrderDetail;
  index: number;
}

const OrderDetail = ({ detail, index }: OrderDetailProps) => {
  if (!detail) return null;
  const { book_title, author, quantity, price } = detail;
  return (
    <tr>
      <td></td>
      <td>주문내역{index}</td>
      <td colSpan={2}>{book_title}</td>
      <td>{author}</td>
      <td>{formatNumber(price)}원</td>
      <td>{quantity}권</td>
      <td>{formatNumber(price * quantity)}원</td>
      <td colSpan={2}></td>
    </tr>
  );
};

export default OrderDetail;
