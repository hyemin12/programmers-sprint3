import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from 'constance/querystring';
import { IBook } from 'models/book.model';
import { BookItem } from 'components/Books';
import { ViewMode } from './BooksViewSwitcher';

interface BooksListProps {
  list: IBook[];
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
        <BookItem book={item} key={item.id} view={view} />
      ))}
    </BookListStyle>
  );
};

export const BookListStyle = styled.div<{ view: ViewMode }>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1,1fr)')};
  gap: 24px;
  @media screen and (${({ theme }) => theme.mediaQuery.tablet}) {
    grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(3, 1fr)' : 'repeat(1,1fr)')};
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(2, 1fr)' : 'repeat(1,1fr)')};
  }
`;
export default BooksList;
