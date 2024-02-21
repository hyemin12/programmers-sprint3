import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './theme';

interface Props {
	themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body{
    padding:0;
    margin:0;
  }
  *{
    color:${({ themeName }) => (themeName === 'light' ? '#333' : '#fff')}
  }
`;
