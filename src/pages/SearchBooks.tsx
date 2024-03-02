import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { fetchSearchBooks } from 'api/book.api';
import { Title, Pagination } from 'components/common';
import { BookList, BookEmpty } from 'components/Books';
import { LIMIT } from 'constance/pagination';
import { QUERYSTRING } from 'constance/querystring';

const SearchBooks = () => {
  const location = useLocation();
  const { search } = location;

  const params = new URLSearchParams(search);
  const searchKeywordParams = params.get(QUERYSTRING.KEYWORD);
  const currentPageParams = params.get(QUERYSTRING.PAGE);

  const fetchSearchBookData = () => {
    if (!searchKeywordParams) return;

    return fetchSearchBooks({
      query: searchKeywordParams,
      page: currentPageParams ? Number(currentPageParams) : 1,
      limit: LIMIT,
    });
  };

  const { data } = useQuery({
    queryKey: ['search', search],
    queryFn: fetchSearchBookData,
  });

  return (
    <SearchBooksStyle>
      <Title size="large">"{searchKeywordParams}" 검색 결과</Title>
      <div>
        {(!data || data?.lists.length === 0) && <BookEmpty />}
        {data && (
          <>
            <BookList list={data.lists} />
            <Pagination pagination={data.pagination} />
          </>
        )}
      </div>
    </SearchBooksStyle>
  );
};

const SearchBooksStyle = styled.div`
  h1 {
    margin-bottom: 20px;
  }
`;

export default SearchBooks;
