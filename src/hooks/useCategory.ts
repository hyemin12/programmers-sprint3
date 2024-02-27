import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCategory } from 'api/category.api';
import { ICategoryItem } from 'models/category.model';
import { QUERYSTRING } from 'constance/querystring';

export const useCategory = () => {
  const { search } = useLocation();
  const [category, setCategory] = useState<ICategoryItem[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(search);
    const categoryIdParams = params.get(QUERYSTRING.CATEGORY_ID);
    if (categoryIdParams) {
      setCategory((prev) => {
        return prev.map((item) => ({ ...item, isActive: item.id === Number(categoryIdParams) }));
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => ({ ...item, isActive: item.id === null }));
      });
    }
  };

  // 최초 렌더시 실행
  useEffect(() => {
    fetchCategory().then((response) => {
      if (!response) return;
      const categoryWithAll = [{ id: null, name: '전체' }, ...response];
      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  // url이 변경될 때 setActive 함수 실행
  useEffect(() => {
    setActive();
  }, [search]);

  return category;
};
