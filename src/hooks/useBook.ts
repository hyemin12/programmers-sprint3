import { useEffect, useState } from 'react';
import { IBookDetail, IReviews, IReviewsPayload } from 'models/book.model';
import { fetchBook, likeBook, unlikeBook } from 'api/book.api';
import { addBookReview, fetchBooksReview } from 'api/review.api';
import { useRequireLogin } from './useRequireLogin';
import { UseFormReset } from 'react-hook-form';

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<IBookDetail | null>(null);
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const { requireLogin } = useRequireLogin();

  const likeToggle = () => {
    if (!book) return;

    if (!requireLogin()) return;

    if (book.liked) {
      unlikeBook(book.id).then(() => setBook({ ...book, liked: false, likes: book.likes - 1 }));
    } else {
      likeBook(book.id).then(() => setBook({ ...book, liked: true, likes: book.likes + 1 }));
    }
  };

  const addReview = (data: IReviewsPayload) => {
    if (!bookId) return;

    addBookReview(bookId.toString(), data).then(() => {
      fetchBooksReview(bookId).then((reviews) => {
        setReviews(reviews);
      });
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBooksReview(bookId).then((res) => {
      setReviews(res);
    });
  }, [bookId]);

  return { book, likeToggle, reviews, addReview };
};
