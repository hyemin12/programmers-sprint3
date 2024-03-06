import styled from 'styled-components';

import { BooksFilter, BookList, BookEmpty, BooksViewSwitcher } from 'components/Books';
import { Loading, Pagination, Title } from 'components/common';
import { useBooks } from 'hooks/useBooks';

const Books = () => {
  const { books, pagination, isBooksLoading, isEmpty } = useBooks();

  return (
    <>
      <Title size="large" color="text">
        도서 검색 결과
      </Title>
      <BookStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {isBooksLoading && <Loading />}
        {books && !isEmpty ? (
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
    padding: 20px 0;
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    .filter {
      padding: 0;
    }
  }
`;

export default Books;
