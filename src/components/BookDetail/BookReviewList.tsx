import { useState } from 'react';
import styled from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

import { Button, Title } from 'components/common';
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

      {reviews.length > 0 && reviews.map((review) => <BookReviewItem key={review.id} review={review} />)}
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
`;

export default BookReviewList;
