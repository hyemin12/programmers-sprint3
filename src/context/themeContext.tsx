import React, { createContext, useEffect, useState } from 'react';
import { ThemeName, getTheme } from '../style/theme';
import { GlobalStyle } from '../style/global';
import { ThemeProvider } from 'styled-components';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'bookstore';

interface ThemeSwitcherProps {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const initialThemeState = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeSwitcherProps>(initialThemeState);

export const BookStoreThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME);

  const toggleTheme = () => {
    const newThemeName = themeName === DEFAULT_THEME_NAME ? 'dark' : 'light';
    setThemeName(newThemeName);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, newThemeName);
  };

  useEffect(() => {
    const localStorageTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;

    setThemeName(localStorageTheme || DEFAULT_THEME_NAME);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
