export interface ICategoryItem {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export interface ICategoryList {
  lists: ICategoryItem[];
}
