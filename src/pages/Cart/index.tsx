import React, { useEffect } from 'react';
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
const CartStyle = styled.div``;

export default Cart;
