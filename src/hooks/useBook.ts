import { useMutation, useQuery } from '@tanstack/react-query';
import { IBookDetail, IReviews, IReviewsPayload } from 'models/book.model';
import { fetchBook, likeBook, unlikeBook } from 'api/book.api';
import { addBookReview, fetchBooksReview } from 'api/review.api';
import { useRequireLogin } from './useRequireLogin';

export const useBook = (bookId: string | undefined) => {
  if (!bookId)
    return {
      book: null,
      reviews: [],
      toggleLike: () => {},
      addReview: () => {},
    };
  const { requireLogin } = useRequireLogin();

  // 도서 상세 정보 가져오기
  const {
    data: book = null,
    refetch: refetchBook,
    isLoading: isBookLoading,
  } = useQuery<IBookDetail | null>({
    queryKey: ['book', bookId],
    queryFn: () => fetchBook(bookId),
  });

  // 리뷰 가져오기
  const { data: reviews = [], refetch: refetchReviews } = useQuery<IReviews[]>({
    queryKey: ['reviews', bookId],
    queryFn: () => fetchBooksReview(bookId),
  });

  // 리뷰 추가하고, 새로운 리뷰 목록 가져오기
  const addReviewMutation = useMutation({
    mutationFn: (data: IReviewsPayload) => addBookReview(bookId.toString(), data),
    onSuccess: () => {
      refetchReviews();
    },
  });

  // 좋아요 버튼 누르고, 새로운 도서 정보 가져오기
  const toggleLikeMutation = useMutation({
    mutationFn: (bookId: number) => (book!.liked ? unlikeBook(bookId) : likeBook(bookId)),
    onSuccess: () => {
      refetchBook();
    },
  });

  const toggleLike = () => {
    if (!book) return;
    if (!requireLogin()) return;
    toggleLikeMutation.mutate(book.id);
  };

  const addReview = (data: IReviewsPayload) => {
    if (!bookId) return;
    addReviewMutation.mutate(data);
  };

  return { book, toggleLike, reviews, addReview, isBookLoading };
};
