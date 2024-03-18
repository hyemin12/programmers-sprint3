import { IOrderDetail } from 'models/order.model';
import { formatNumber } from 'utils/format';

interface OrderDetailProps {
  detail: IOrderDetail;
}

const OrderDetail = ({ detail }: OrderDetailProps) => {
  if (!detail) return null;
  const { book_title, author, quantity, price } = detail;
  return (
    <tr>
      <td className="td-product">
        <p>{book_title}</p>
        <span className="author">{author}</span>
      </td>
      <td>{quantity}</td>
      <td>{formatNumber(price * quantity)}원</td>
    </tr>
  );
};

export default OrderDetail;
