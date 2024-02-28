import styled from 'styled-components';
import { useOrders } from 'hooks/useOrders';
import Title from 'components/common/Title';
import OrderItem from '../components/OrderList/OrderItem';

const OrderList = () => {
  const { orders } = useOrders();
  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>no</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th>지불방법</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <OrderItem order={order} index={idx + 1} key={order.id} />
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid 1px solid ${({ theme }) => theme.color.border};
    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }
  }
`;

export default OrderList;