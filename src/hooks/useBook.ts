import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBookDetail } from 'models/book.model';
import { fetchBook, likeBook, unlikeBook } from 'api/book.api';
import { useAlert } from './useAlert';
import useAuthStore from 'store/auth.store';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
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

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  return { book, likeToggle };
};
