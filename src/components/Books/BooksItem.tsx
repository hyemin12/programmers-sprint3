import { Book } from 'models/book.model';
import React from 'react';
import styled, { css } from 'styled-components';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { FaHeart } from 'react-icons/fa';

interface BooksItemProps {
  book: Book;
}

const BooksItem = ({ book }: BooksItemProps) => {
  return (
    <BooksItemStyle>
      <div className="img">
        <img src={getImgSrc(book.img)} alt={book.title} />
      </div>
      <div className="content">
        <h2 className="title">{book.title}</h2>
        <p className="summary">{book.summary}</p>
        <p className="author">{book.author}</p>
        <p className="price">{formatNumber(book.price)}원</p>
        <div className="likes">
          <FaHeart />
          <span>{book.likes}</span>
        </div>
      </div>
    </BooksItemStyle>
  );
};

const textStyle = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 0 0 4px 0;
`;

const BooksItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .content {
    padding: 16px;
    position: relative;
    .title {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 12px 0;
    }
    .summary,
    .author {
      ${textStyle}
    }
    .price {
      ${textStyle};
      font-size: 1rem;
      font-weight: bold;
    }
  }
  .likes {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0 0 4px 0;
    padding: 4px 12px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    font-size: 0%.875rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    position: absolute;
    right: 16px;
    bottom: 16px;
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default BooksItem;
