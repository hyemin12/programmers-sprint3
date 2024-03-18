import styled from 'styled-components';
import { FaLaughWink } from 'react-icons/fa';
import { useOrders } from 'hooks/useOrders';
import { OrderItem } from 'components/OrderList';
import { Empty, Title } from 'components/common';

const OrderList = () => {
  const { orders, selectOrderItem, selectedItemId } = useOrders();
  console.log(orders);
  return (
    <>
      <Title size="large">주문 내역</Title>
      {orders.length === 0 && <Empty icon={<FaLaughWink />} title="주문내역이 없습니다." />}
      {orders.length > 0 && (
        <OrderListStyle>
          <table>
            <thead>
              <tr>
                <th>no</th>
                <th>주문일자</th>
                <th>대표상품명</th>
                <th>수량</th>
                <th>금액</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <OrderItem
                  order={order}
                  index={idx + 1}
                  key={order.id}
                  selectOrderItem={selectOrderItem}
                  selectedItemId={selectedItemId}
                />
              ))}
            </tbody>
          </table>
        </OrderListStyle>
      )}
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
    tbody {
      tr {
        &:last-child {
          td {
            padding-bottom: 0;
            border-bottom: none;
          }
        }
      }
    }
  }
`;

export default OrderList;
