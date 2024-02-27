import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EllipsisBox from 'components/common/EllipsisBox';
import Title from 'components/common/Title';
import LikesButton from 'components/LikesButton';
import { useBook } from 'hooks/useBook';
import { IBookDetail } from 'models/book.model';
import { formatDate, formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';
import AddToCartButton from 'components/AddToCartButton';
import QuantityBox from 'components/QuantityBox';
import React, { useState } from 'react';
import useCartStore from 'store/cart.store';
import Button from 'components/common/Button';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => <Link to={`/books?category_id=${book.category_id}`}>{book.category_name}</Link>,
  },
  { label: '포맷', key: 'form' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  { label: '출간일', key: 'published_at', filter: (book: IBookDetail) => formatDate(book.published_at) },
  { label: '가격', key: 'price', filter: (book: IBookDetail) => `${formatNumber(book.price)}원` },
];

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, likeToggle } = useBook(bookId);
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

  if (book === null) return null;
  const { title, img, summary, subTitle, description, index, likes, liked, price } = book;
  return (
    <BookDetailStyle>
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

          {bookInfoList.map(({ label, key, filter }) => (
            <dl key={key}>
              <dt>{label}</dt>
              <dd>{filter ? filter(book) : book[key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className="summary">{summary}</p>
          <LikesButton likes={likes} liked={liked ? liked : false} onClick={likeToggle} />
          <AddToCartStyle>
            {/* <div className="price-quantity-wrapper"> */}
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
            {/* </div> */}
          </AddToCartStyle>
        </div>
      </header>

      <div className="content">
        <Title size="medium">책 소개</Title>
        <EllipsisBox line={4} $expanded>
          <p className="detail">{description}</p>
        </EllipsisBox>

        {index && (
          <>
            <Title size="medium">목차</Title>
            <EllipsisBox line={5} $expanded>
              {index
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((item, index) => {
                  if (item.startsWith('-')) {
                    // '-'로 시작하는 경우
                    return <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{item}</p>;
                  } else if (/^Ⅰ|Ⅱ|Ⅲ|Ⅳ|Ⅴ|Ⅵ/.test(item)) {
                    // 로마 숫자로 시작하는 경우
                    return (
                      <p key={index}>
                        <strong>{item}</strong>
                      </p>
                    );
                  } else {
                    return <p key={index}>{item}</p>;
                  }
                })}
            </EllipsisBox>
          </>
        )}
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .title-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .subtitle {
          color: ${({ theme }) => theme.color.secondary};
        }
      }
      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
  .content {
    > div {
      padding: 18px 0%;
    }
  }
`;

const AddToCartStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .total-price {
    display: flex;
    align-items: center;
    gap: 12px;
    h4 {
      font-size: 1.2rem;
    }
  }
  .button-box {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
export default BookDetail;
