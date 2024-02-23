import { useEffect, useState } from 'react';
import { fetchCategory } from 'api/category.api';
import { CategoryItem } from 'models/category.model';

export const useCategory = () => {
  const [category, setCategory] = useState<CategoryItem[]>([]);

  useEffect(() => {
    fetchCategory().then((response) => {
      if (!response) return;
      const categoryWithAll = [{ id: null, name: '전체' }, ...response];
      setCategory(categoryWithAll);
    });
  }, []);

  return category;
};
