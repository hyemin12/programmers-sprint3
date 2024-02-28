import styled from 'styled-components';
import { useOrders } from 'hooks/useOrders';
import Title from 'components/common/Title';
import { formatDate, formatNumber } from 'utils/format';
import Button from 'components/common/Button';
import React from 'react';

const OrderList = () => {
  const { orders, selectOrderItem, selectedItemId } = useOrders();
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
            {orders.map(
              (
                {
                  id,
                  address,
                  contact,
                  created_at,
                  recipient,
                  total_price,
                  total_quantity,
                  payment,
                  book_title,
                  detail,
                },
                idx,
              ) => (
                <React.Fragment key={id}>
                  <tr>
                    <td>{idx + 1}</td>
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
                  {selectedItemId === id && (
                    <>
                      {detail &&
                        detail.map(({ book_id, book_title, author, price, quantity }, idx) => (
                          <tr key={book_id}>
                            <td></td>
                            <td>주문내역{idx + 1}</td>
                            <td colSpan={2}>{book_title}</td>
                            <td>{author}</td>
                            <td>{formatNumber(price)}원</td>
                            <td>{quantity}권</td>
                            <td>{formatNumber(price * quantity)}원</td>
                            <td colSpan={2}></td>
                          </tr>
                        ))}
                    </>
                  )}
                </React.Fragment>
              ),
            )}
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
