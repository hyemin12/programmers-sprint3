import { httpClient } from './http';
import { IBook, IBookDetail } from 'models/book.model';
import { IPagination } from 'models/pagination.model';

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
  lists: IBook[];
  pagination: IPagination;
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
export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<IBookDetail>(`/books/${bookId}`);
  return response.data;
};

export const fetchSearchBooks = async (params: FetchSearchBooksParams) => {
  const response = await httpClient.get<FetchBooksResponse>(`/books/search`, {
    params,
  });

  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post<FetchBooksResponse>(`/likes/${bookId}`);

  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete<FetchBooksResponse>(`/likes/${bookId}`);

  return response.data;
};
