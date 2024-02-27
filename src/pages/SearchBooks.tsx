import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/common/Title';
import { fetchSearchBooks } from 'api/book.api';
import BooksList from 'components/Books/BooksList';
import Pagination from 'components/Books/Pagination';
import BooksEmpty from 'components/Books/BooksEmpty';
import { LIMIT } from 'constance/pagination';
import { QUERYSTRING } from 'constance/querystring';
import { IBook } from 'models/book.model';
import { IPagination } from 'models/pagination.model';

const SearchBooks = () => {
  const location = useLocation();
  const { search } = location;
  const [searchWord, setSearchWord] = useState('');
  const [books, setBooks] = useState<IBook[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ total_count: 0, current_page: 1 });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const searchKeywordParams = params.get(QUERYSTRING.KEYWORD);
    const currentPageParams = params.get(QUERYSTRING.PAGE);
    if (searchKeywordParams) {
      // 검색어 가져오기
      setSearchWord(searchKeywordParams);

      // 검색 결과 가져오기
      fetchSearchBooks({
        query: searchKeywordParams,
        page: currentPageParams ? Number(currentPageParams) : 1,
        limit: LIMIT,
      }).then((res) => {
        setBooks(res.lists);
        setPagination(res.pagination);
      });
    }
  }, [location]);
  return (
    <SearchBooksStyle>
      <Title size="large">"{searchWord}" 검색 결과</Title>
      <div>
        {books.length > 0 ? (
          <>
            <BooksList list={books} />
            <Pagination pagination={pagination} />
          </>
        ) : (
          <BooksEmpty />
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
