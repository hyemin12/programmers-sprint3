import { Book } from 'models/book.model';
import React from 'react';
import styled, { css } from 'styled-components';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { FaHeart } from 'react-icons/fa';
import { ViewMode } from './BooksViewSwitcher';

interface BooksItemProps {
  book: Book;
  view: ViewMode;
}

const BooksItem = ({ book, view }: BooksItemProps) => {
  return (
    <BooksItemStyle view={view}>
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

/* 2줄 이상일 경우 경우 생략(...) */
const LimitedParagraph = css`
  /* Webkit기반 브라우저 동작 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  /* 모든 브라우저에서 동작 */
  max-height: 3em;
  text-overflow: ellipsis;
`;

const textStyle = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 0 0 4px 0;
`;

const BooksItemStyle = styled.div<{ view: ViewMode }>`
  display: flex;
  flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  .img {
    width: ${({ view }) => (view === 'grid' ? 'auto' : '165px')};
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .content {
    flex: ${({ view }) => (view === 'grid' ? 0 : 1)};
    padding: 16px;
    position: relative;
    .title {
      ${LimitedParagraph}
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 12px 0;
    }
    .summary,
    .author {
      ${textStyle}
    }
    .summary {
      ${LimitedParagraph}
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
