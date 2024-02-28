import React from 'react';
import { IBookDetail } from 'models/book.model';
import BookIntroduction from './BookDetailIntroduction';
import BookDetailTableOfContents from './BookDetailTableOfContents';

const BookDetailContents = ({ book }: { book: IBookDetail }) => {
  const { description, index, reviews, bestSellers } = book;
  return (
    <div className="content">
      <BookIntroduction description={description} />
      <BookDetailTableOfContents index={index} />
    </div>
  );
};

export default BookDetailContents;
