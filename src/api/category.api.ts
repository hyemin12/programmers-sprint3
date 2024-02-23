import { CategoryList } from 'models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  const response = await httpClient.get<CategoryList>('/category');
  return response.data.lists;
};
