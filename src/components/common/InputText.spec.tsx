import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';

describe('InputText 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" />
      </BookStoreThemeProvider>,
    );
    expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument();
  });

  // 전달된 ref가 input인지 확인
  it('forwardRef 확인', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" ref={ref} />
      </BookStoreThemeProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
