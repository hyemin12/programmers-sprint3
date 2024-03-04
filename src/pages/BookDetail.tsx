import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useBook } from 'hooks/useBook';
import { IBookDetail } from 'models/book.model';
import { formatDate, formatNumber } from 'utils/format';
import {
  BookDetailHeader,
  BookDetailTableOfContents,
  BookDetailIntroduction,
  BookReviewList,
} from 'components/BookDetail';

export interface BookInfo {
  label: string;
  key: keyof IBookDetail;
  filter?: (book: IBookDetail) => React.JSX.Element | string;
}

const bookInfoList: BookInfo[] = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => <Link to={`/books?category_id=${book.category_id}`}>{book.category_name}</Link>,
  },
  { label: '타입', key: 'form', filter: (book: IBookDetail) => (book.form === 'paper' ? '종이책' : 'eBook') },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  { label: '출간일', key: 'published_at', filter: (book: IBookDetail) => formatDate(book.published_at) },
  { label: '가격', key: 'price', filter: (book: IBookDetail) => `${formatNumber(book.price)}원` },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, reviews, likeToggle, addReview } = useBook(bookId);

  if (book === null) return null;
  const { description, index } = book;
  return (
    <BookDetailStyle>
      <BookDetailHeader book={book} bookInfoList={bookInfoList} likeToggle={likeToggle} />

      <BookDetailIntroduction description={description} />
      <BookDetailTableOfContents index={index} />
      <BookReviewList reviews={reviews} onAdd={addReview} />
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .content {
    > div {
      padding: 18px 0%;
    }
  }
  section {
    padding: 20px 0;
  }
`;
export default BookDetail;
