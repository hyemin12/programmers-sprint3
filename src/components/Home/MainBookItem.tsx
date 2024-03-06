import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { EllipsisBox, LazyImage } from 'components/common';
import { IBook } from 'models/book.model';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { BooksItemStyle } from 'components/Books/BookItem/BookItem.styles';

interface MainBookItemProps {
  book: IBook;
  rank?: number;
}

const MainBookItem = ({ rank, book }: MainBookItemProps) => {
  if (!book) return null;
  const { id, title, img, author, price } = book;
  return (
    <BooksItemStyle view="grid">
      <Link to={`/books/${id}`}>
        <div className="img">
          <LazyImage src={getImgSrc(img)} alt={title} />
        </div>

        <div className="content">
          {rank && <RankStyle>{rank}</RankStyle>}
          <h2 className="title">
            <EllipsisBox line={2}>{title}</EllipsisBox>
          </h2>

          <p className="author">{author}</p>
          <p className="price">
            <span>{formatNumber(price)}</span>원
          </p>
        </div>
      </Link>
    </BooksItemStyle>
  );
};

const RankStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.color.secondary};
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: #fff;
  font-size: 0.85rem;
  font-weight: bold;
  line-height: 2;
`;

export default MainBookItem;
