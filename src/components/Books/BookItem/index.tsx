import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaHeart } from 'react-icons/fa';

import { EllipsisBox } from 'components/common';
import { ViewMode } from '../BooksViewSwitcher';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { IBook } from 'models/book.model';

interface BooksItemProps {
  book: IBook;
  view: ViewMode;
}

const BooksItem = ({ book, view }: BooksItemProps) => {
  const { pathname } = useLocation();
  return (
    <BooksItemStyle view={view}>
      <Link to={`/books/${book.id}`}>
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="content">
          <h2 className="title">
            <EllipsisBox line={2}>{book.title}</EllipsisBox>
          </h2>
          <EllipsisBox line={2}>
            <p className="summary">{book.summary}</p>
          </EllipsisBox>

          <p className="author">{book.author}</p>
          <p className="price">{formatNumber(book.price)}원</p>
          {pathname !== '/search' && (
            <div className="likes">
              <FaHeart />
              <span>{book.likes}</span>
            </div>
          )}
        </div>
      </Link>
    </BooksItemStyle>
  );
};

const textStyle = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 0 0 4px 0;
`;

const BooksItemStyle = styled.div<{ view: ViewMode }>`
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }

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
