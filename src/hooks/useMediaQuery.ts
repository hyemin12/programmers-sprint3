import { useEffect, useState } from 'react';
import { getTheme } from 'style/theme';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia(getTheme('light').mediaQuery.mobile).matches);

  useEffect(() => {
    const isMobileMediaQuery = window.matchMedia('max-width:768px');

    setIsMobile(isMobileMediaQuery.matches);
  }, []);

  return { isMobile };
};
