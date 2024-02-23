import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

// input이 가지고 있는 모든 속성을 받도록 설정
interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number';
}

const InputText = React.forwardRef(
  ({ placeholder, inputType = 'text', onChange }: InputTextProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyle type={inputType} placeholder={placeholder} ref={ref} onChange={onChange} />;
  },
);
const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  color: ${({ theme }) => theme.color.text};
  font-size: 1rem;
  line-height: 1.5;
`;

export default InputText;
