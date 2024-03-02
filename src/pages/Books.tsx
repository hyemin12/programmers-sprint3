import styled from 'styled-components';

import { BooksFilter, BookList, BookEmpty, BooksViewSwitcher } from 'components/Books';
import { Loading, Pagination, Title } from 'components/common';
import { useBooks } from 'hooks/useBooks';

const Books = () => {
  const { books, pagination, isBooksLoading } = useBooks();

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BookStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {isBooksLoading && <Loading />}
        {books && books.length > 0 ? (
          <>
            <BookList list={books} />
            <Pagination pagination={pagination} />
          </>
        ) : (
          <BookEmpty />
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
