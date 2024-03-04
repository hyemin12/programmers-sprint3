import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useBook } from 'hooks/useBook';
import { IBookDetail } from 'models/book.model';
import { formatDate, formatNumber } from 'utils/format';
import {
  BookDetailHeader,
  BookDetailTableOfContents,
  BookDetailIntroduction,
  BookReviewList,
} from 'components/BookDetail';
import { BookDetailStyle } from 'style/BookDetail.styles';

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
  { label: '포맷', key: 'form' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  { label: '출간일', key: 'published_at', filter: (book: IBookDetail) => formatDate(book.published_at) },
  { label: '가격', key: 'price', filter: (book: IBookDetail) => `${formatNumber(book.price)}원` },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, reviews, likeToggle } = useBook(bookId);
  console.log(reviews);
  if (book === null) return null;
  const { description, index } = book;
  return (
    <BookDetailStyle>
      <BookDetailHeader book={book} bookInfoList={bookInfoList} likeToggle={likeToggle} />

      <BookDetailIntroduction description={description} />
      <BookDetailTableOfContents index={index} />
      <BookReviewList reviews={reviews} />
    </BookDetailStyle>
  );
};

export default BookDetail;
