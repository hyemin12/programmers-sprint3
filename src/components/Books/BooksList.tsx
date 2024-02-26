import styled from 'styled-components';
import { Book } from 'models/book.model';
import BooksItem from './BooksItem';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QUERYSTRING } from 'constance/querystring';
import { ViewMode } from './BooksViewSwitcher';

interface BooksListProps {
  list: Book[];
}

const BooksList = ({ list }: BooksListProps) => {
  const [view, setView] = useState<ViewMode>('grid');
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const viewParam = params.get(QUERYSTRING.VIEW);
    if (viewParam) {
      setView(viewParam as ViewMode);
    }
  }, [search]);

  return (
    <BookListStyle view={view}>
      {list.map((item) => (
        <BooksItem book={item} key={item.id} view={view} />
      ))}
    </BookListStyle>
  );
};

const BookListStyle = styled.div<{ view: ViewMode }>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1,1fr)')};
  gap: 24px;
`;
export default BooksList;
