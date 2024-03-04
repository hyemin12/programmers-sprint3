import { useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt, FaSmileWink } from 'react-icons/fa';

import { Button, Empty, Title } from 'components/common';
import { IReviews, IReviewsPayload } from 'models/book.model';
import BookReviewItem from './BookReviewItem';
import BookReviewAdd from './BookReviewAdd';

interface BookReviewListProps {
  reviews: IReviews[];
  onAdd: (data: IReviewsPayload) => void;
}

const BookReviewList = ({ reviews, onAdd }: BookReviewListProps) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const reviewLength = reviews?.length ?? 0;
  return (
    <BookReviewListStyle>
      <div className="title-heading">
        <Title size="medium" color="primary">
          리뷰 ({reviewLength})
        </Title>
        <div>
          {isAddMode ? (
            <Button size="medium" scheme="default" onClick={() => setIsAddMode(false)}>
              작성 취소
            </Button>
          ) : (
            <Button size="medium" scheme="primary" onClick={() => setIsAddMode(true)}>
              <FaPencilAlt />
              리뷰 작성
            </Button>
          )}
        </div>
      </div>
      <BookReviewAdd onAdd={onAdd} isAddMode={isAddMode} setIsAddMode={setIsAddMode} />
      <div className="reviews">
        {reviews.length > 0 && reviews.map((review) => <BookReviewItem key={review.id} review={review} />)}
      </div>
      {reviews.length === 0 && <Empty icon={<FaSmileWink />} title="등록된 리뷰가 없습니다." />}
    </BookReviewListStyle>
  );
};
const BookReviewListStyle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  .title-heading {
    display: flex;
    justify-content: space-between;
  }
  button {
    svg {
      margin-right: 6px;
      font-size: 0.85rem;
      fill: #fff;
    }
  }
  .empty {
    padding: 50px 0%;
    h1 {
      ${({ theme }) => theme.heading.medium};
    }
  }
`;

export default BookReviewList;
