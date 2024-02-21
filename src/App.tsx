import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import { GlobalStyle } from './style/global';
import { light, dark } from './style/theme';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle themeName="light" />
        <ThemeProvider theme={light}>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
