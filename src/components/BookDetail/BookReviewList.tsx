import styled from 'styled-components';
import { Title } from 'components/common';
import { IReviews } from 'models/book.model';
import BookReviewItem from './BookReviewItem';

interface BookReviewListProps {
  reviews: IReviews[];
}

const BookReviewList = ({ reviews }: BookReviewListProps) => {
  if (!reviews.length) return null;
  return (
    <BookReviewListStyle>
      <Title size="large" color="primary">
        리뷰
      </Title>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewListStyle>
  );
};
const BookReviewListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReviewList;
