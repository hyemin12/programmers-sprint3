import { Book } from 'models/book.model';
import { httpClient } from './http';
import { Pagination } from 'models/pagination.model';

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

interface FetchBooksResponse {
  lists: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', { params });
    return response.data;
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

export const fetchSearchBooks = async (params: FetchSearchBooksParams) => {
  const response = await httpClient.get<FetchBooksResponse>(`/books/search`, {
    params,
  });

  return response.data;
};
