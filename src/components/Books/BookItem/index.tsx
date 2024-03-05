import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { EllipsisBox, LazyImage, LikesButton } from 'components/common';
import { ViewMode } from '../BooksViewSwitcher';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { IBook } from 'models/book.model';
import { useBook } from 'hooks/useBook';

interface BooksItemProps {
  book: IBook;
  view: ViewMode;
}

const BooksItem = ({ book, view }: BooksItemProps) => {
  const { pathname } = useLocation();

  if (!book) return null;
  const { id, img, title, summary, author, price, likes, liked } = book;
  return (
    <BooksItemStyle view={view}>
      <Link to={`/books/${id}`}>
        <div className="img">
          <LazyImage src={getImgSrc(img)} alt={title} />
        </div>

        <div className="content">
          <h2 className="title">
            <EllipsisBox line={2}>{title}</EllipsisBox>
          </h2>
          <EllipsisBox line={2}>
            <p className="summary">{summary}</p>
          </EllipsisBox>

          <p className="author">{author}</p>
          <p className="price">{formatNumber(price)}원</p>

          {pathname !== '/search' && (
            <div className="likes">
              <LikesButton liked={liked ? liked : false} likes={likes} onClick={() => {}} />
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

export const BooksItemStyle = styled.div<{ view: ViewMode }>`
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    border: 1px solid ${({ theme }) => theme.color.third};
    border-radius: ${({ theme }) => theme.borderRadius.default};
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
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
`;

export default BooksItem;
