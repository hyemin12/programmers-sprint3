export interface CategoryItem {
  id: number | null;
  name: string;
  isActive?: boolean;
}

export interface CategoryList {
  lists: CategoryItem[];
}
