import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBookDetail } from 'models/book.model';
import { fetchBook, likeBook, unlikeBook } from 'api/book.api';
import { useAlert } from './useAlert';
import useAuthStore from 'store/auth.store';
import { addCart } from 'api/carts.api';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);

  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const likeToggle = () => {
    if (!book) return;

    // 로그인 되지 않은 경우
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (book.liked) {
      unlikeBook(book.id).then(() => setBook({ ...book, liked: false, likes: book.likes - 1 }));
    } else {
      likeBook(book.id).then(() => setBook({ ...book, liked: true, likes: book.likes + 1 }));
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    addCart({ book_id: book.id, quantity }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
