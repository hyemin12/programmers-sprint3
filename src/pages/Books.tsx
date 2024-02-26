import React from 'react';
import styled from 'styled-components';
import BooksEmpty from 'components/Books/BooksEmpty';
import BooksFilter from 'components/Books/BooksFilter';
import BooksList from 'components/Books/BooksList';
import BooksViewSwitcher from 'components/Books/BooksViewSwitcher';
import Pagination from 'components/Books/Pagination';
import Title from 'components/common/Title';

const Books = () => {
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        <BooksFilter />
        <BooksViewSwitcher />

        <BooksList />

        <BooksEmpty />

        <Pagination />
      </BookStyle>
    </>
  );
};

const BookStyle = styled.div``;

export default Books;
