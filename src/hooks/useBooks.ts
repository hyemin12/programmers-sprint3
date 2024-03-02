import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from 'api/book.api';
import { LIMIT } from 'constance/pagination';
import { QUERYSTRING } from 'constance/querystring';

export const useBooks = () => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const fetchBooksData = () => {
    const categoryIdParams = params.get(QUERYSTRING.CATEGORY_ID);
    const newsParams = params.get(QUERYSTRING.NEWS);
    const currentPageParams = params.get(QUERYSTRING.PAGE);

    return fetchBooks({
      category_id: categoryIdParams ? Number(categoryIdParams) : undefined,
      new: newsParams ? true : undefined,
      page: currentPageParams ? Number(currentPageParams) : 1,
      limit: LIMIT,
    });
  };

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ['books', search],
    queryFn: fetchBooksData,
  });

  return {
    books: booksData?.lists,
    pagination: booksData?.pagination,
    isEmpty: booksData?.lists.length === 0,
    isBooksLoading,
  };
};
