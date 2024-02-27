import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './theme';
import '@noonnu/pretendard-regular';

interface Props {
  themeName: ThemeName;
}
export const GlobalStyle = createGlobalStyle<Props>`
  *{
    color:${({ themeName }) => (themeName === 'light' ? '#333' : '#fff')};
    font-family: "Pretender-Regular", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif ;
  }
  /* 폰트 크기의 팽창을 방지합니다. */
  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }
  /* 고정된 모든 항목에는 여분의 스크롤 여백이 있어야 합니다. */
  :target {
    scroll-margin-block: 5ex;
  }
  body{
    padding:0;
    margin:0;
    min-height: 100vh;
    line-height: 1.5;
    background-color: ${({ themeName }) => (themeName === 'light' ? '#fff' : '#111')};
  }
  /* pico font family 초기화 */
  h1,
  h2,
  h3,
  h4,h5,h6,
  p{
    font-family:"Pretendard-Regular", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif ;
  }
  /* 기본 여백을 제거하여 작성된 CSS를 더 잘 제어할 수 있습니다. */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin-block-start: 0;
    margin-block-end: 0;
  }
  /* 제목 요소와 상호작용하는 요소에 대해 line-height를 더 짧게 설정합니다. */
  h1,
  h2,
  h3,
  h4,
  button,
  input,
  label {
    line-height: 1.1;
  }
  /* 이미지 관련 작업을 더 쉽게 합니다. */
  img,
  picture {
    max-width: 100%;
    display: block;
  }
  /* input 및 button 항목들이 글꼴을 상속하도록 합니다. */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  /* list를 role값으로 갖는 ul, ol 요소의 기본 목록 스타일을 제거합니다. */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }
`;
