import { RouterProvider } from 'react-router-dom';
import router from './Router';
import ThemeSwitcher from './components/common/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'api/queryClient';

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BookStoreThemeProvider>
          <RouterProvider router={router} />
        </BookStoreThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
