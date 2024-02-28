import Title from 'components/common/Title';
import React from 'react';
import styled from 'styled-components';

const OrderList = () => {
  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle></OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div``;

export default OrderList;
