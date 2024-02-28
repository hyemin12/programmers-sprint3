import { createBrowserRouter } from 'react-router-dom';
import RouteError from './components/RouteError';
import GeneralLayout from 'components/Layout/Layout';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Login from 'pages/Login';
import Books from 'pages/Books';
import SearchBooks from 'pages/SearchBooks';
import BookDetail from './pages/BookDetail';
import Cart from 'pages/Cart';
import Order from 'pages/Order';
import OrderList from 'pages/OrderList';

const routerData = [
  {
    path: '/',
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/books/:bookId',
    element: <BookDetail />,
  },
  {
    path: '/search',
    element: <SearchBooks />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/orderlist',
    element: <OrderList />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
];
const router = createBrowserRouter(
  routerData.map((route) => ({
    path: route.path,
    element: <GeneralLayout>{route.element}</GeneralLayout>,
    errorElement: route.errorElement,
  })),
);

export default router;
