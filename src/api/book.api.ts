import { LIMIT } from 'constance/pagination';
import { requestHandler } from './http';

interface FetchBooksParams {
  category_id?: number;
  new?: boolean;
  page?: number;
  limit?: number;
}

interface FetchSearchBooksParams {
  query: string;
  page?: number;
  limit?: number;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    return await requestHandler('get', '/books', { params });
  } catch (error) {
    return {
      lists: [],
      pagination: {
        current_page: 1,
        total_count: 0,
      },
    };
  }
};
export const fetchBestSeller = async (page: number) => {
  return await requestHandler('get', `/books/best`, { params: { page, limit: LIMIT } });
};
export const fetchBook = async (bookId: string) => {
  return await requestHandler('get', `/books/${bookId}`);
};

export const fetchSearchBooks = async (params: FetchSearchBooksParams) => {
  return await requestHandler('get', '/books/search', { params });
};

export const likeBook = async (bookId: number) => {
  return await requestHandler('post', `/likes/${bookId}`);
};

export const unlikeBook = async (bookId: number) => {
  return await requestHandler('delete', `/likes/${bookId}`);
};
