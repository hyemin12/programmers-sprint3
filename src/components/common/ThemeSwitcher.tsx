import React, { useContext } from 'react';
import { ThemeName } from 'style/theme';
import { ThemeContext } from 'context/themeContext';
import styled, { css } from 'styled-components';

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  return (
    <ThemeSwitcherStyle $themename={themeName} className="theme-switcher">
      <input type="checkbox" id="theme-toggle" className="toggle-checkbox" onChange={() => {}} />
      <label htmlFor="theme-toggle" onClick={toggleTheme}>
        <span className="ball"></span>
      </label>
    </ThemeSwitcherStyle>
  );
};

const DarkTheme = css`
  label {
    background-color: #555;
  }
  .ball {
    transform: translateX(24px);
  }
`;

const ThemeSwitcherStyle = styled.div<{ $themename: ThemeName }>`
  input {
    opacity: 0;
    position: absolute;
  }
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50px;
    height: 26px;
    background-color: #111;
    padding: 5px;
    border-radius: 50px;
    position: relative;
    cursor: pointer;
    .ball {
      background-color: #fff;
      width: 22px;
      height: 22px;
      position: absolute;
      left: 2px;
      top: 2px;
      border-radius: 50%;
      transition: transform 0.2s linear;
    }
  }
  ${({ $themename }) => $themename === 'dark' && DarkTheme};
`;

export default ThemeSwitcher;
