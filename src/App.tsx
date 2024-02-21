import React from 'react';
import Home from './pages/Home';
import GeneralLayout from './components/common/GeneralLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route element={<GeneralLayout />}>
						<Route path='/' element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

