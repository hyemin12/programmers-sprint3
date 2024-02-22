import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import RouteError from './components/RouteError';
import GeneralLayout from 'components/common/GeneralLayout';

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
];
const router = createBrowserRouter(
  routerData.map((route) => ({
    path: route.path,
    element: <GeneralLayout>{route.element}</GeneralLayout>,
    errorElement: route.errorElement,
  })),
);

export default router;
