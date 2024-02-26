import styled from 'styled-components';
import { Book } from 'models/book.model';
import BooksItem from './BooksItem';

interface BooksListProps {
  list: Book[];
}

const BooksList = ({ list }: BooksListProps) => {
  return (
    <BookListStyle>
      {list.map((item) => (
        <BooksItem book={item} key={item.id} />
      ))}
    </BookListStyle>
  );
};
const BookListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
export default BooksList;
