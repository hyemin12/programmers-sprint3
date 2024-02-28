import React, { useState } from 'react';
import { BookInfo } from '..';
import Title from 'components/common/Title';
import LikesButton from 'components/LikesButton';
import Button from 'components/common/Button';
import QuantityBox from 'components/QuantityBox';
import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { IBookDetail } from 'models/book.model';
import useCartStore from 'store/cart.store';
import { AddToCartStyle } from '../BookDetail.styles';

interface BookDetailHeaderProps {
  book: IBookDetail;
  bookInfoList: BookInfo[];
  likeToggle: () => void;
}

const BookDetailHeader = ({ book, bookInfoList, likeToggle }: BookDetailHeaderProps) => {
  if (!book) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const { addCartItem } = useCartStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const { img, title, subTitle, summary, liked, likes, price } = book;
  return (
    <header>
      <div className="img">
        <img src={getImgSrc(img)} alt={title} />
      </div>
      <div className="info">
        <div className="title-wrapper">
          <Title size="large" color="text">
            {title}
          </Title>
          {subTitle && <div className="subtitle">{subTitle}</div>}
        </div>

        {/* 책 정보 섹션 */}
        {bookInfoList.map(({ label, key, filter }) => (
          <dl key={key}>
            <dt>{label}</dt>
            <dd>{filter ? filter(book) : book[key as keyof IBookDetail]}</dd>
          </dl>
        ))}

        <p className="summary">{summary}</p>
        <LikesButton likes={likes} liked={liked ? liked : false} onClick={likeToggle} />

        {/* 장바구니 추가 섹션 */}
        <AddToCartStyle>
          <span className="total-price">
            총 금액 <h4>{formatNumber(price)}원</h4>
          </span>

          <div className="button-box">
            <QuantityBox
              quantity={quantity}
              handleOnchange={handleChange}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
            <Button size="medium" scheme="primary">
              장바구니에 담기
            </Button>
          </div>
        </AddToCartStyle>
      </div>
    </header>
  );
};

export default BookDetailHeader;
