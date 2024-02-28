import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'components/common';
import useCartStore from 'store/cart.store';
import useAuthStore from 'store/auth.store';
import { useAlert } from 'hooks/useAlert';
import { IBookDetail } from 'models/book.model';

interface AddToCartButtonProps {
  book: IBookDetail;
  quantity: number;
}

const AddToCartButton = ({ book, quantity }: AddToCartButtonProps) => {
  const [cartAdded, setCartAdded] = useState(false);
  const { addCartItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleAddCart = async () => {
    if (!book) return;

    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const data = {
      book_id: book.id,
      quantity,
      title: book.title,
      summary: book.summary,
      price: book.price,
    };

    try {
      await addCartItem(data);
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    } catch (error) {
      console.error('장바구니에 아이템을 추가하는 중에 오류가 발생했습니다.', error);
    }
  };

  return (
    <AddToCartButtonStyle $added={cartAdded}>
      <Button size="medium" scheme="primary" onClick={handleAddCart}>
        장바구니에 담기
      </Button>

      <div className="added">
        <p>장바구니에 추가되었습니다</p>
        <Link to="/cart">장바구니로 이동</Link>
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
