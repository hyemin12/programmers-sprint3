import { createBrowserRouter } from 'react-router-dom';
import RouteError from './components/RouteError';
import GeneralLayout from 'components/common/GeneralLayout';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Login from 'pages/Login';
import Books from 'pages/Books';
import SearchBooks from 'pages/SearchBooks';

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
    path: '/search',
    element: <SearchBooks />,
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
