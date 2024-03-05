import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from 'constance/querystring';
import { IBook } from 'models/book.model';
import { BookItem } from 'components/Books';
import { ViewMode } from './BooksViewSwitcher';
import { BestSellerBookItem } from 'components/Home';

interface BooksListProps {
  list: IBook[];
  isBestseller?: boolean;
}

const BooksList = ({ list, isBestseller = false }: BooksListProps) => {
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
      {list.map((item) =>
        isBestseller ? (
          <BestSellerBookItem book={item} key={item.id} />
        ) : (
          <BookItem book={item} key={item.id} view={view} />
        ),
      )}
    </BookListStyle>
  );
};

const BookListStyle = styled.div<{ view: ViewMode }>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1,1fr)')};
  gap: 24px;
`;
export default BooksList;
