import React from 'react';
import styled from 'styled-components';
import BooksEmpty from 'components/BookEmpty/BooksEmpty';
import BooksFilter from 'pages/Books/BooksFilter';
import BooksList from 'components/BookList/BooksList';
import BooksViewSwitcher from 'pages/Books/BooksViewSwitcher';
import Pagination from 'components/common/Pagination';
import Title from 'components/common/Title';
import { useBooks } from 'hooks/useBooks';

const Books = () => {
  const { books, pagination } = useBooks();

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {books.length > 0 ? (
          <>
            <BooksList list={books} />
            <Pagination pagination={pagination} />
          </>
        ) : (
          <BooksEmpty />
        )}
      </BookStyle>
    </>
  );
};

export const BookStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0%;
  }
`;

export default Books;
