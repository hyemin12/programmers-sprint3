import { Route, Routes } from 'react-router-dom';
import GeneralLayout from './components/common/GeneralLayout';
import Home from './pages/Home';

const Router = () => {
	return (
		<Routes>
			<Route element={<GeneralLayout />}>
				<Route path='/' element={<Home />} />
			</Route>
		</Routes>
	);
};

export default Router;
