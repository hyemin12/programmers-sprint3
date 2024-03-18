import { Price, Title } from 'components/common';
import { IOrderDetail, IOrderListItem } from 'models/order.model';
import React, { useState } from 'react';
import styled from 'styled-components';
import OrderDetail from './OrderDetail';
import { formatDate } from 'utils/format';

interface OrderDetailModalProps {
  order: IOrderListItem;
}

const OrderDetailModal = ({ order }: OrderDetailModalProps) => {
  return (
    <OrderDetailModalStyle>
      <Title size="medium" color="text">
        상세 주문 내역
      </Title>
      <div className="row order-num">
        <p>주문 번호</p>
        <h4>
          {order.id} ({formatDate(order.created_at, 'YY.MM.DD')})
        </h4>
      </div>
      <article>
        <Title size="small" color="text">
          상품 정보
        </Title>
        <table>
          <thead>
            <tr>
              <th className="product">상품명</th>
              <th className="quantity">수량</th>
              <th className="price">가격</th>
            </tr>
          </thead>
          <tbody>{order.detail?.map((item, idx) => <OrderDetail key={item.book_id} detail={item} />)}</tbody>
        </table>
      </article>
      <article>
        <Title size="small" color="text">
          배송 정보
        </Title>
        <div className="row">
          <span>수령인</span>
          <p>{order.recipient}</p>
        </div>
        <div className="row">
          <span>연락처</span>
          <p>{order.contact}</p>
        </div>
        <div className="row">
          <span>주소</span>
          <p>{order.address}</p>
        </div>
      </article>
      <article>
        <Title size="small" color="text">
          결제 내역
        </Title>
        <div className="row">
          <span>결제수단</span>
          <p>{order.payment}</p>
        </div>
        <div className="row">
          <span>상품 금액</span>
          <Price price={order.total_price} size="default" />
        </div>
      </article>
    </OrderDetailModalStyle>
  );
};
const OrderDetailModalStyle = styled.div`
  padding: 24px;
  p,
  span {
    font-size: 0.95rem;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;

    span {
      width: 70px;
      color: ${({ theme }) => theme.color.secondary};
    }
    &.order-num {
      padding-bottom: 10px;
    }
  }
  article {
    margin-bottom: 4px;
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    h1 {
      margin-bottom: 0.75em;
    }
    &:last-child {
      border: none;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      font-size: 0.95rem;
      text-align: center;
    }
    thead {
      background-color: #f1f1f1;
      tr {
        .quantity {
          width: 60px;
        }
        .price {
          width: 100px;
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 8px 0;
          border-bottom: 1px solid #f1f1f1;
        }
        .td-product {
          text-align: start;
          .author {
            font-size: 0.8rem;
          }
        }
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

export default OrderDetailModal;
