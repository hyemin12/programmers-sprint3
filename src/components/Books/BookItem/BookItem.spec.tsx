import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from 'context/themeContext';
import BooksItem from '.';
import { IBook } from 'models/book.model';

const dummyBook: IBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  form: 'string',
  isbn: 'string',
  summary: 'Dummy summary',
  description: 'Dummy detail',
  author: 'Dummy author',
  pages: 100,
  contents: 'string',
  price: 10000,
  likes: 1,
  published_at: 'string',
};

describe('Book Item test!', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BooksItem book={dummyBook} view="grid" />
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
