import React from 'react';
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../../style/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
  buttonType?: 'submit' | 'button';
}

const Button = ({ children, size, scheme, disabled, isLoading, buttonType = 'button', ...props }: ButtonProps) => {
  return (
    <ButtonStyle type={buttonType} size={size} scheme={scheme} disabled={disabled} isLoading={isLoading} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<ButtonProps, 'children'>>`
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  padding: ${({ theme, size }) => theme.button[size].padding};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`;

export default Button;
