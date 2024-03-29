import React from 'react';
import styled from 'styled-components';
import { IReviews } from 'models/book.model';
import { formatDate } from 'utils/format';
import { FaStar } from 'react-icons/fa';
import { parseEmailId } from 'utils/parseEmailId';
import { hidePartialName } from 'utils/hidePartialName';

interface BookReviewItemProps {
  review: IReviews;
}

// 별점
const ReviewStar = ({ score }: { score: number }) => {
  return (
    <span className="star">
      {Array.from({ length: 5 }).map((_, idx) => (
        <FaStar key={idx} className={idx < score ? 'fill' : 'star-empty'} />
      ))}
    </span>
  );
};

const BookReviewItem = ({ review }: BookReviewItemProps) => {
  return (
    <BookReviewStyle>
      <header>
        <div>
          <span>{hidePartialName(parseEmailId(review.user_name))}</span> <ReviewStar score={review.score} />
          <span>{review.score}</span>
        </div>
        <div>{formatDate(review.created_at)}</div>
      </header>
      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewStyle>
  );
};
const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    .star {
      svg {
        fill: #eee;
        &.fill {
          fill: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
  .content {
    p {
      font-size: 1rem;
    }
  }
`;

export default BookReviewItem;
