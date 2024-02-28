import { RouterProvider } from 'react-router-dom';
import router from './Router';
import ThemeSwitcher from './components/common/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';

function App() {
  return (
    <div className="App">
      <BookStoreThemeProvider>
        <ThemeSwitcher />
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </div>
  );
}

export default App;
