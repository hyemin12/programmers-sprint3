export interface Book {
  id: number;
  title: string;
  img: number;
  category_id: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  likes: number;
  pub_date: string;
}

export interface BookDetail extends Book {
  author: string;
  category_name: string;
  is_liked?: boolean;
}