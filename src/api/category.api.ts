import { ICategoryList } from 'models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  const response = await httpClient.get<ICategoryList>('/category');
  return response.data.lists;
};
