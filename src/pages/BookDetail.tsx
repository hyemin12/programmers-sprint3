import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EllipsisBox from 'components/common/EllipsisBox';
import Title from 'components/common/Title';
import LikesButton from 'components/LikesButton';
import { useBook } from 'hooks/useBook';
import { IBookDetail } from 'models/book.model';
import { formatDate, formatNumber } from 'utils/format';
import { getImgSrc } from 'utils/image';

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

  if (book === null) return null;
  const { title, img, summary, subTitle, description, index, likes, liked } = book;
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
          <div className="add-cart">장바구니 넣기</div>
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
export default BookDetail;
