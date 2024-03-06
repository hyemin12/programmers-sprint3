import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from 'constance/querystring';
import { Button } from 'components/common';
import { useCategory } from 'hooks/useCategory';

const BooksFilter = () => {
  const category = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, 'true');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category-desktop">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={item.isActive ? 'primary' : 'default'}
            key={item.id}
            onClick={() => handleCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="category-mobile">
        <select>
          {category.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="new">
        <Button size="medium" scheme={searchParams.get('news') ? 'primary' : 'default'} onClick={() => handleNews()}>
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;
  .category-desktop {
    display: flex;
    gap: 8px;
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    .category-desktop {
      display: none;
    }
    .category-mobile {
      height: 100%;
      select {
        height: 100%;
        padding: 0 12px;
        border-color: ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
      }
    }
  }
`;

export default BooksFilter;
