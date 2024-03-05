import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { EllipsisBox, LazyImage } from 'components/common';
import { ViewMode } from '../BooksViewSwitcher';
import { formatDate, formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { IBook } from 'models/book.model';
import { BooksItemStyle, Likes } from './BookItem.styles';

interface BooksItemProps {
  book: IBook;
  view: ViewMode;
}

const BooksItem = ({ book, view }: BooksItemProps) => {
  const { pathname } = useLocation();

  if (!book) return null;
  const { id, img, title, summary, author, price, likes, liked, published_at } = book;
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

          {view !== 'grid' && (
            <EllipsisBox line={2}>
              <p className="summary">{summary}</p>
            </EllipsisBox>
          )}

          <p className="author">{author}</p>
          <p>{formatDate(published_at)}</p>
          <p className="price">
            <span>{formatNumber(price)}</span>원
          </p>

          {pathname !== '/search' && (
            <Likes className="likes" view={view} $liked={liked ? true : false}>
              {liked ? <FaHeart /> : <FaRegHeart />}
              {likes}
            </Likes>
          )}
        </div>
      </Link>
    </BooksItemStyle>
  );
};

export default BooksItem;
