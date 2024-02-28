import React from 'react';
import styled from 'styled-components';
import { Button, Title } from 'components/common';
import AuthInfoBox, { ShowInfoProps } from './AuthInfoBox';

interface AuthFormProps {
  buttonText: string;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
  showInfo: ShowInfoProps;
}

const AuthForm = ({ showInfo, buttonText, title, onSubmit, children }: AuthFormProps) => {
  return (
    <>
      <AuthFormStyle>
        <Title size="large" color="text">
          {title}
        </Title>
        <form onSubmit={onSubmit}>
          {children}
          <Button buttonType="submit" size="medium" scheme="primary">
            {buttonText}
          </Button>
        </form>
        <AuthInfoBox showInfo={showInfo} />
      </AuthFormStyle>
    </>
  );
};

const AuthFormStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;
  fieldset {
    padding: 0 0 8px 0;
    border: 0;
    .error-text {
      color: tomato;
    }
  }
  h1 {
    margin-bottom: 30px;
    text-align: center;
  }
  input {
    width: 100%;
  }
  button {
    width: 100%;
  }
`;

export default AuthForm;
