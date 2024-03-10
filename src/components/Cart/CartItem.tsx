import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import CheckIconButton from './CheckIconButton';
import { Title, QuantityBox, Price } from 'components/common';
import { ICart } from 'models/cart.model';
import { formatNumber } from 'utils/format';
import { updateQuantity } from 'api/carts.api';
import useCartStore from 'store/cart.store';
import { CartItemStyle } from 'components/Cart/CartItem.styles';

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

          {/* 제품명 */}
          <div className="product">
            <Link to={`/books/${book_id}`}>
              <Title size="medium" color="text">
                {title}
              </Title>
            </Link>

            <Price size="default" price={price} />
          </div>
        </div>
        {/* 제품 수량*/}
        <div className="price-quantity-wrapper">
          <Price size="default" price={price * quantity} />
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

export default CartItem;
