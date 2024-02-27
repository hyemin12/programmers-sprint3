import React from 'react';
import styled from 'styled-components';
import Title from 'components/common/Title';

const Cart = () => {
  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>Carts</CartStyle>
    </>
  );
};

const CartStyle = styled.div``;

export default Cart;
