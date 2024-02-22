import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import ThemeSwitcher from './components/ThemeSwitcher';
import { BookStoreThemeProvider } from './context/themeContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BookStoreThemeProvider>
          <ThemeSwitcher />
          <Router />
        </BookStoreThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
