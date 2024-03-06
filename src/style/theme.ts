export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background' | 'secondary' | 'third' | 'border' | 'text';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'default' | 'transparent' | 'like' | 'darkblue';
export type LayoutWidth = 'large' | 'medium' | 'small';
export type MediaQuery = 'mobile' | 'tablet' | 'desktop';

interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
  heading: {
    [key in HeadingSize]: { fontSize: string };
  };
  button: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonScheme: {
    [key in ButtonScheme]: {
      color: string;
      backgroundColor: string;
      border?: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
  mediaQuery: {
    [key in MediaQuery]: string;
  };
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: '#ff5800',
    secondary: '#5f5f5f',
    background: '#eee',
    third: '#f1f1f1',
    border: '#ccc',
    text: '#111',
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.5rem' },
    small: { fontSize: '1rem' },
  },
  button: {
    large: { fontSize: '1.5rem', padding: '1rem 2rem' },
    medium: { fontSize: '1rem', padding: '0.5rem 1rem' },
    small: { fontSize: '0.75rem', padding: '0.25rem 0.5rem' },
  },
  buttonScheme: {
    primary: {
      color: '#fff',
      backgroundColor: '#ff5800',
    },
    darkblue: {
      color: '#fff',
      backgroundColor: 'midnightblue',
    },
    transparent: {
      color: '#333',
      backgroundColor: 'transparent',
      border: 'none',
    },
    like: {
      color: '#fff',
      backgroundColor: 'coral',
      border: 'none',
    },
    default: {
      color: '#111',
      backgroundColor: '#eee',
    },
  },
  borderRadius: {
    default: '4px',
  },
  layout: {
    width: {
      large: '1020px',
      medium: '760px',
      small: '320px',
    },
  },
  mediaQuery: {
    mobile: 'max-width: 768px',
    tablet: 'max-width: 1024px',
    desktop: 'min-width: 1025px',
  },
};

export const dark: Theme = {
  ...light,
  name: 'dark',
  color: {
    primary: '#ff5800',
    background: 'midnightblue',
    secondary: '#ccc',
    third: '#555',
    border: '#eee',
    text: '#fff',
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
