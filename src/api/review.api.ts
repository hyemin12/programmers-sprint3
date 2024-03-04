import { IReviewsPayload } from 'models/book.model';
import { requestHandler } from './http';

export const fetchBooksReview = async (bookId: string) => {
  return await requestHandler('get', `/reviews/${bookId}`);
};

export const addBookReview = async (bookId: string, payload: IReviewsPayload) => {
  return await requestHandler('post', `/reviews/${bookId}`, payload);
};
