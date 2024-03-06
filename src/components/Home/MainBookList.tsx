import { BookListStyle } from 'components/Books/BookList';
import BestSellerBookItem from './BestSellerBookItem';
import { IBook } from 'models/book.model';
import { BookItem } from 'components/Books';
import { Title } from 'components/common';

interface BooksListProps {
  list: IBook[];
  isBestseller?: boolean;
  title: string;
  $className?: string;
}

const MainBooksList = ({ list, title, $className, isBestseller = false }: BooksListProps) => {
  const view = 'grid';
  return (
    <BookListStyle view={view} className={$className}>
      <Title size="large" color="primary">
        {title}
      </Title>
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
