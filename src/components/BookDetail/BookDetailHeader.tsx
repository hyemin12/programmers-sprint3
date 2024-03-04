import React, { useState } from 'react';

import { BookInfo } from 'pages/BookDetail';
import QuantityBox from 'components/common/QuantityBox';
import { Title, LikesButton, LazyImage } from 'components/common';
import { AddToCartButton } from 'components/BookDetail';

import { formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import { IBookDetail } from 'models/book.model';
import { ButtonGroup, DetailHeaderStyle, QuantityBoxStyle } from 'components/BookDetail/BookDetailHeader.styles';

interface BookDetailHeaderProps {
  book: IBookDetail;
  bookInfoList: BookInfo[];
  likeToggle: () => void;
}

const BookDetailHeader = ({ book, bookInfoList, likeToggle }: BookDetailHeaderProps) => {
  if (!book) return null;

  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const { img, title, subTitle, liked, likes, price } = book;
  return (
    <DetailHeaderStyle>
      <LazyImage src={getImgSrc(img)} alt={title} />

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

        <QuantityBoxStyle>
          <h4>수량</h4>
          <div>
            <QuantityBox
              quantity={quantity}
              handleOnchange={handleChange}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
            <span className="total-price">{formatNumber(price * quantity)}원</span>
          </div>
        </QuantityBoxStyle>

        {/* 장바구니 추가 섹션 */}
        <ButtonGroup>
          <AddToCartButton book={book} quantity={quantity} />
          <LikesButton likes={likes} liked={liked ? liked : false} onClick={likeToggle} />
        </ButtonGroup>
      </div>
    </DetailHeaderStyle>
  );
};

export default BookDetailHeader;
