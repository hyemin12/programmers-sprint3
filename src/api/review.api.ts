import { requestHandler } from './http';

export const fetchBooksReview = async (bookId: string) => {
  return await requestHandler('get', `/reviews/${bookId}`);
};
