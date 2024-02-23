import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import RouteError from './components/RouteError';
import GeneralLayout from 'components/common/GeneralLayout';
import Home from 'pages/Home';
import SignUp from 'pages/SignUp';
import ResetPassword from 'pages/ResetPassword';
import Login from 'pages/Login';

const routerData = [
  {
    path: '/',
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    path: '/books',
    element: <div>도서목록페이지</div>,
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
