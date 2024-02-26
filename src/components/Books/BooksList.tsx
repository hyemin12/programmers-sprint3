import styled from 'styled-components';
import { Book } from 'models/book.model';
import BooksItem from './BooksItem';

const dummyBook: Book = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  form: 'string',
  isbn: 'string',
  summary: 'string',
  detail: 'string',
  author: 'string',
  pages: 100,
  contents: 'string',
  price: 10000,
  likes: 1,
  pub_date: 'string',
};

const BooksList = () => {
  return (
    <BookListStyle>
      <BooksItem book={dummyBook} />
    </BookListStyle>
  );
};
const BookListStyle = styled.div``;
export default BooksList;
