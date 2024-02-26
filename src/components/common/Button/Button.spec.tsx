import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from 'context/themeContext';
import Button from './index';

describe('Button 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>,
    );
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('size prop 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('scheme prop 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>,
    );

    expect(container.firstChild).toHaveStyle({ backgroundColor: 'midnightblue' });
  });

  it('disabled 적용', () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary" disabled>
          버튼
        </Button>
      </BookStoreThemeProvider>,
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
