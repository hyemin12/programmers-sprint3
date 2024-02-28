import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import CheckIconButton from './CheckIconButton';
import Title from 'components/common/Title';
import Button from 'components/common/Button';
import Empty from 'components/Empty';
import CartItem from './CartItem';
import useCartStore from 'store/cart.store';
import useAuthStore from 'store/auth.store';
import CartSummary from './CartSummary';

const Cart = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { cartItems, selectedItems, clearSelectedItem, fetchCartItems, addAllSelectedItems, clearCartItems } =
    useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
    return;
  }, [isLoggedIn]);

  const handleSelectedAll = () => {
    if (selectedItems.length === cartItems.length) {
      clearSelectedItem();
    } else {
      addAllSelectedItems();
    }
  };

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((acc, cart) => {
      if (selectedItems.includes(cart.id)) {
        return (acc += cart.quantity);
      }
      return acc;
    }, 0);
  }, [cartItems, selectedItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, cart) => {
      if (selectedItems.includes(cart.id)) {
        return (acc += cart.price * cart.quantity);
      }
      return acc;
    }, 0);
  }, [cartItems, selectedItems]);

  return (
    <>
      <Title size="large">장바구니</Title>
      <ButtonBox>
        <div className="selectedAll-button">
          <CheckIconButton isChecked={selectedItems.length === cartItems.length} onClick={handleSelectedAll} />
          <Button size="medium" scheme="transparent" onClick={handleSelectedAll}>
            <strong>전체 선택</strong>
          </Button>
        </div>

        <Button size="medium" scheme="transparent" onClick={() => clearCartItems(cartItems.map((item) => item.id))}>
          전체 삭제
        </Button>
      </ButtonBox>

      <CartStyle>
        {cartItems.length === 0 ? (
          <Empty icon={<FaShoppingCart />} title="장바구니가 비어있습니다." />
        ) : (
          <>
            <div className="content">
              {cartItems.map((item) => (
                <CartItem cart={item} key={item.id} />
              ))}
            </div>
            <div className="summary"></div>
          </>
        )}
        <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </CartStyle>
    </>
  );
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f7f7f7;
  margin: 24px 0;
  padding: 15px 20px 15px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  .selectedAll-button {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  button {
    padding: 0;
  }
`;
const CartStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Cart;
