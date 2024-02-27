import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchBooks } from 'api/book.api';
import { LIMIT } from 'constance/pagination';
import { QUERYSTRING } from 'constance/querystring';
import { IBook } from 'models/book.model';
import { IPagination } from 'models/pagination.model';

export const useBooks = () => {
  const { search } = useLocation();

  const [books, setBooks] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ total_count: 0, current_page: 1 });

  useEffect(() => {
    const params = new URLSearchParams(search);

    const categoryIdParams = params.get(QUERYSTRING.CATEGORY_ID);
    const newsParams = params.get(QUERYSTRING.NEWS);
    const currentPageParams = params.get(QUERYSTRING.PAGE);

    fetchBooks({
      category_id: categoryIdParams ? Number(categoryIdParams) : undefined,
      new: newsParams ? true : undefined,
      page: currentPageParams ? Number(currentPageParams) : 1,
      limit: LIMIT,
    }).then((res) => {
      setBooks(res.lists);
      setPagination(res.pagination);
    });
  }, [search]);

  return { books, pagination };
};
