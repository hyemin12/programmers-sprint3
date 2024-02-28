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
import { useAlert } from 'hooks/useAlert';
import { IOrderSheet } from 'models/order.model';

const Cart = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { showAlert, showConfirm } = useAlert();
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

  const handlerOrder = () => {
    if (selectedItems.length === 0) {
      showAlert('주문할 상품을 선택해주세요');
      return;
    }

    // 주문서 작성으로 데이터 전달
    const selectedFirstBook = cartItems.find((item) => item.id === selectedItems[0]);
    const orderData: Omit<Omit<IOrderSheet, 'delivery'>, 'payment'> = {
      books: selectedItems,
      total_price: totalQuantity,
      total_quantity: totalQuantity,
      first_book_title: selectedFirstBook ? selectedFirstBook.title : '',
    };

    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: orderData });
    });
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
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button size="large" scheme="primary" onClick={handlerOrder}>
            주문하기
          </Button>
        </div>
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
  gap: 20px;
  .content {
    flex-grow: 1;
  }
  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default Cart;
