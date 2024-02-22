export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third';

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: 'brown',
    background: 'lightgray',
    secondary: 'blue',
    third: 'green',
  },
};

export const dark: Theme = {
  name: 'dark',
  color: {
    primary: 'coral',
    background: 'midnightblue',
    secondary: 'darkblue',
    third: 'darkgreen',
  },
};

export const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
