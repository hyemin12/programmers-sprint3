import { Link } from 'react-router-dom';
import { BooksItemStyle } from 'components/Books/BookItem';
import { EllipsisBox, LazyImage, LikesButton } from 'components/common';
import { IBook } from 'models/book.model';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';

interface BestSellerBookItemProps {
  book: IBook;
}

const BestSellerBookItem = ({ book }: BestSellerBookItemProps) => {
  if (!book) return null;
  const { id, title, img, author, price, liked, likes } = book;
  return (
    <BooksItemStyle view="grid">
      <Link to={`/books/${id}`}>
        <div className="img">
          <LazyImage src={getImgSrc(img)} alt={title} />
        </div>

        <div className="content">
          <h2 className="title">
            <EllipsisBox line={2}>{title}</EllipsisBox>
          </h2>

          <p className="author">{author}</p>
          <p className="price">{formatNumber(price)}원</p>

          <div className="likes">
            <LikesButton liked={liked ? liked : false} likes={likes} onClick={() => {}} />
          </div>
        </div>
      </Link>
    </BooksItemStyle>
  );
};

export default BestSellerBookItem;
