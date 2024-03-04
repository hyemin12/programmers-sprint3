export interface IBook {
  id: number;
  title: string;
  subTitle?: string;
  img: number;
  category_id: number;
  form: string;
  isbn: string;
  index?: string;
  summary: string;
  description: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  likes: number;
  published_at: string;
}

export interface IBookDetail extends IBook {
  reviews?: [];
  bestSellers?: [];
  author: string;
  category_name: string;
  liked?: boolean;
}

export interface IReviews {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
  score: number;
}
