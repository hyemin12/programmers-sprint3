import { Book } from 'models/book.model';
import React from 'react';
import styled from 'styled-components';

interface BooksItemProps {
  book: Book;
}

const BooksItem = ({ book }: BooksItemProps) => {
  return (
    <BooksItemStyle>
      <div>
        <img src={`https://picsum.photos/id/${book.img}/600/600`} alt={book.title} />
      </div>
    </BooksItemStyle>
  );
};

const BooksItemStyle = styled.div``;

export default BooksItem;
