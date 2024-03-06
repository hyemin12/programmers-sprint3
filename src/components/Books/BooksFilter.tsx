import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from 'constance/querystring';
import { Button } from 'components/common';
import { useCategory } from 'hooks/useCategory';
import { ChangeEvent, useEffect, useState } from 'react';

const BooksFilter = () => {
  const category = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.target.value;
    handleCategory(currentValue === undefined ? null : Number(currentValue));
  };

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
        {category.map(({ id, name, isActive }) => (
          <Button size="medium" scheme={isActive ? 'primary' : 'default'} key={id} onClick={() => handleCategory(id)}>
            {name}
          </Button>
        ))}
      </div>
      <div className="category-mobile">
        <select onChange={onChangeCategory} value={category.find((item) => item.isActive)?.id?.toString()}>
          {category.map(({ id, name }) => (
            <option key={id} value={id?.toString()}>
              {name}
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
  .category-mobile {
    display: none;
  }
  @media screen and (${({ theme }) => theme.mediaQuery.tablet}) {
    flex: 1;
    justify-content: space-between;
    .category-desktop {
      display: none;
    }
    .category-mobile {
      display: block;
      height: 100%;
      select {
        height: 100%;
        padding: 0 12px;
        border-color: ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
      }
    }
    .new {
      margin-right: 12px;
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 0;
  }
`;

export default BooksFilter;
