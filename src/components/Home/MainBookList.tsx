import { BookListStyle } from 'components/Books/BookList';
import { IBook } from 'models/book.model';
import { Title } from 'components/common';
import MainBookItem from './MainBookItem';

interface BooksListProps {
  list: IBook[];
  isBestseller?: boolean;
  title: string;
  $className?: string;
}

const MainBooksList = ({ list, title, $className, isBestseller = false }: BooksListProps) => {
  const view = 'grid';
  return (
    <div className={$className + ' main-contents'}>
      <Title size="large" color="primary">
        {title}
      </Title>
      <BookListStyle view={view}>
        {list.map((item, idx) =>
          isBestseller ? (
            <MainBookItem book={item} key={item.id} rank={idx + 1} />
          ) : (
            <MainBookItem book={item} key={item.id} />
          ),
        )}
      </BookListStyle>
    </div>
  );
};

export default MainBooksList;
