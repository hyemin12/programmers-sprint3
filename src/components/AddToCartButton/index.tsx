import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import InputText from 'components/common/InputText';
import { IBookDetail } from 'models/book.model';
import { addCart } from 'api/carts.api';
import { useAlert } from 'hooks/useAlert';
import useAuthStore from 'store/auth.store';
import { Link, useNavigate } from 'react-router-dom';
import { useBook } from 'hooks/useBook';

interface AddToCartButtonProps {
  book: IBookDetail;
}

const AddToCartButton = ({ book }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AddToCartButtonStyle $added={cartAdded}>
      <div>
        <Button size="medium" scheme="default" onClick={handleDecrease}>
          -
        </Button>
        <InputText inputType="number" value={quantity} onChange={handleChange} />
        <Button size="medium" scheme="default" onClick={handleIncrease}>
          +
        </Button>
      </div>
      <Button size="medium" scheme="primary" onClick={() => addToCart(quantity)}>
        장바구니에 담기
      </Button>

      <div className="added">
        <p>장바구니에 추가되었습니다</p>
        <Link to="/carts">장바구니로 이동</Link>
      </div>
    </AddToCartButtonStyle>
  );
};

const AddToCartButtonStyle = styled.div<{ $added: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .added {
    background-color: ${({ theme }) => theme.color.background};
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    position: absolute;
    right: 0;
    bottom: -90px;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: all 0.5s ease-in-out;
    p {
      padding-bottom: 8px;
    }
  }
`;

export default AddToCartButton;
