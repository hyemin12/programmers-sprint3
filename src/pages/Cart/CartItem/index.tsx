import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { formatNumber } from 'utils/format';
import CheckIconButton from '../CheckIconButton';
import Title from 'components/common/Title';
import QuantityBox from 'components/QuantityBox';
import { ICart } from 'models/cart.model';
import { updateQuantity } from 'api/carts.api';
import useCartStore from 'store/cart.store';

interface CartItemProps {
  cart: ICart;
}

const CartItem = ({ cart }: CartItemProps) => {
  if (!cart) return null;
  const { title, price, quantity, id, book_id } = cart;
  const { selectedItems, deleteSelectedItems, addSelectedItem, deleteCartItem } = useCartStore();
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const isChecked = useMemo(() => {
    return selectedItems.includes(id);
  }, [selectedItems]);

  const handleSelectedItem = () => {
    if (isChecked) {
      deleteSelectedItems([id]);
    } else {
      addSelectedItem(id);
    }
  };
  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= 0 || value === itemQuantity) return;
    setItemQuantity(value);
  };
  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    updateQuantity({ id, quantity: newQuantity }).then(() => {
      setItemQuantity(newQuantity);
    });
  };
  const handleDecrease = () => {
    const newQuantity = itemQuantity - 1;
    updateQuantity({ id, quantity: newQuantity }).then(() => {
      setItemQuantity(newQuantity);
    });
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="title-box">
          <CheckIconButton isChecked={isChecked} onClick={handleSelectedItem} />
          <div className="product">
            <Link to={`/books/${book_id}`}>
              <Title size="medium" color="text">
                {title}
              </Title>
            </Link>

            <p className="price">{formatNumber(price)}원</p>
          </div>
        </div>
        <div className="price-quantity-wrapper">
          <p className="total-price">{formatNumber(price * quantity)}원</p>
          <QuantityBox
            quantity={itemQuantity}
            handleOnchange={onChangeQuantity}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
        </div>
      </div>
      <div className="delete" onClick={() => deleteCartItem(id)}>
        <FaTimes />
      </div>
    </CartItemStyle>
  );
};

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  p {
    margin-bottom: 8px;
  }
  .info {
    display: flex;
    align-items: start;
    .title-box {
      display: flex;
      align-items: start;
      padding: 24px 24px 24px 12px;
    }
  }
  .price-quantity-wrapper {
    padding: 24px;
    border-left: 1px solid ${({ theme }) => theme.color.border};
    border-right: 1px solid ${({ theme }) => theme.color.border};
    .total-price {
      font-weight: bold;
      text-align: center;
    }
  }
  .delete {
    padding: 12px;
    cursor: pointer;
  }
`;

export default CartItem;
