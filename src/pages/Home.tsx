import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCategory } from 'hooks/useCategory';
import { VisualSlide } from 'components/Home';
import { Title } from 'components/common';
import { fetchBestSeller, fetchBooks } from 'api/book.api';
import { LIMIT } from 'constance/pagination';
import { IBook } from 'models/book.model';
import { BookList } from 'components/Books';

function Home() {
  const [newBooks, setNewBooks] = useState<IBook[]>([]);
  const [bestSellerBooks, setBestSellerBooks] = useState<IBook[]>([]);
  const category = useCategory();

  useEffect(() => {
    fetchBooks({
      category_id: undefined,
      new: true,
      page: 1,
      limit: LIMIT,
    }).then((res) => setNewBooks(res.list));
    fetchBestSeller().then((res) => setBestSellerBooks(res));
  }, []);

  return (
    <HomeStyle>
      <div className="visual">
        <VisualSlide />
      </div>
      <div className="category">
        <ul>
          {category.map((item) => {
            if (item.id !== null) {
              return (
                <li key={item.id}>
                  <Link to={`/books?category_id=${item.id}`}>{item.name}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {newBooks && (
        <div className="new-books">
          <Title size="large" color="primary">
            신간 안내
          </Title>
          <BookList list={newBooks} />
        </div>
      )}
      {bestSellerBooks && (
        <div className="bestseller-books">
          <Title size="large" color="primary">
            인기 도서 안내
          </Title>
          <BookList list={bestSellerBooks} />
        </div>
      )}
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  .visual {
    width: 100%;
    overflow: hidden;
  }
  .category {
    ul {
      display: flex;
      justify-content: center;
      gap: 6px;
      padding: 24px 0;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 110px;
        padding: 9px 12px;
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        list-style: none;
        a {
          text-decoration: none;
        }
      }
    }
  }
`;

export default Home;
