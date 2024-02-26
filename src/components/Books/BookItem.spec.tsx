import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from 'context/themeContext';
import { Book } from 'models/book.model';
import BooksItem from './BooksItem';

const dummyBook: Book = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  form: 'string',
  isbn: 'string',
  summary: 'Dummy summary',
  detail: 'Dummy detail',
  author: 'Dummy author',
  pages: 100,
  contents: 'string',
  price: 10000,
  likes: 1,
  pub_date: 'string',
};

describe('Book Item test!', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BooksItem book={dummyBook} />
      </BookStoreThemeProvider>,
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('10,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute('src', `https://picsum.photos/id/${dummyBook.img}/600/600`);
  });
});
