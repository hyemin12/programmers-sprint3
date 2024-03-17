import { Title } from 'components/common';
import React, { useEffect } from 'react';
import useCartStore from 'store/cart.store';
import styled from 'styled-components';
import PreviewCartItem from './PreviewCartItem';
import Price from 'components/common/Price';

const PreviewCart = () => {
  const { cartItems, isEmpty, fetchCartItems } = useCartStore();
  const totalQuantity = cartItems.reduce((acc, cart) => (acc += cart.quantity), 0);
  const totalPrice = cartItems.reduce((acc, cart) => (acc += cart.price * cart.quantity), 0);

  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <PreviewCartStyle className="preview-cart">
      {isEmpty && <p className="preview-cart-empty">장바구니가 비어있습니다.</p>}
      <div className="cart-items">
        {cartItems.map((item) => (
          <PreviewCartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="total-quantity-price-wrapper">
        <p>총 수량 {totalQuantity}개</p>

        <div className="total-price">
          <p>총 가격</p>
          <Price size="large" price={totalPrice} />
        </div>
      </div>
    </PreviewCartStyle>
  );
};
const PreviewCartStyle = styled.div`
  width: 400px;
  padding: 0 12px;
  background-color: ${({ theme }) => theme.color.default};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: 0 2px 10px #0000001a;
  position: absolute;
  z-index: 10;
  top: 24px;
  right: -20px;
  .preview-cart-empty {
    padding: 20px 0;
  }
  .cart-items {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
  }
  .total-quantity-price-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 17px;
    padding: 10px 0;
    border-top: 1px solid ${({ theme }) => theme.color.third};

    .total-price {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      &::before {
        content: '';
        width: 1px;
        height: 12px;
        background-color: ${({ theme }) => theme.color.third};
        position: absolute;
        left: -9px;
      }
    }
  }
`;

export default PreviewCart;
