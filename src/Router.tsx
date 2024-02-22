import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import GeneralLayout from './components/common/GeneralLayout';
import Home from './pages/Home';
import RouteError from './pages/RouteError';

const Router = () => {
  return (
    <Routes>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<div>도서목록</div>} />
        <Route path="/login" element={<div>로그인</div>} />
        <Route path="/sign" element={<div>회원가입</div>} />
        <Route path="/*" element={<RouteError />} />
      </Route>
    </Routes>
  );
};

export default Router;
