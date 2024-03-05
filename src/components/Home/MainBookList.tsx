import { BookListStyle } from 'components/Books/BookList';
import BestSellerBookItem from './BestSellerBookItem';
import { IBook } from 'models/book.model';
import { BookItem } from 'components/Books';

interface BooksListProps {
  list: IBook[];
  isBestseller?: boolean;
}

const MainBooksList = ({ list, isBestseller = false }: BooksListProps) => {
  const view = 'grid';
  return (
    <BookListStyle view={view}>
      {list.map((item, idx) =>
        isBestseller ? (
          <BestSellerBookItem book={item} key={item.id} rank={idx + 1} />
        ) : (
          <BookItem book={item} key={item.id} view={view} />
        ),
      )}
    </BookListStyle>
  );
};

export default MainBooksList;
