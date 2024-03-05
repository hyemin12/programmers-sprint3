import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchBestSeller, fetchBooks } from 'api/book.api';
import { LIMIT } from 'constance/pagination';

export const useMain = () => {
  // 신간 가져오기 - useQuery
  const { data: newBooksData } = useQuery({
    queryKey: ['newbook'],
    queryFn: () =>
      fetchBooks({
        category_id: undefined,
        new: true,
        page: 1,
        limit: LIMIT,
      }),
  });

  // 베스트 셀러 가져오기 - useInfiniteQuery
  const {
    data: besetSellerData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['bestSeller'],
    queryFn: ({ pageParam = 1 }) => fetchBestSeller(pageParam),
    getNextPageParam: (lastPage) => {
      const parseIntCurrentPage = Number(lastPage.pagination.current_page);
      const isLastPage = Math.ceil(lastPage.pagination.total_count / LIMIT) === parseIntCurrentPage;
      return isLastPage ? null : parseIntCurrentPage + 1;
    },
    initialPageParam: 1,
  });

  const newBooks = newBooksData ? newBooksData.lists : [];
  const bestSellerBooks = besetSellerData ? besetSellerData.pages.flatMap((page) => page.lists) : [];
  // const pagination = data ? data.pages[data?.pages.length - 1].pagination : {};

  return {
    newBooks,
    bestSellerBooks,
    isNewBooksEmpty: newBooks.length === 0,
    isBestSellerBooksEmpty: bestSellerBooks.length === 0,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};
