import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/common/Button';
import InputText from 'components/common/InputText';
import Title from 'components/common/Title';
import { SignUp } from 'api/auth.api';

export interface SignUpProps {
  email: string;
  password: string;
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();

  const onSubmit = (data: SignUpProps) => {
    SignUp(data)
      .then((res) => {
        // 성공
        window.alert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        const errorMsg = error.response.data[0].msg;

        window.alert(errorMsg);
      });
  };

  return (
    <>
      <Title size="large">회원가입</Title>
      <SignUpStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder="이메일을 입력하세요" inputType="email" {...register('email')} />
            {errors.email && <p className="error-text">이메일은 필수로 입력해야합니다.</p>}
          </fieldset>
          <fieldset>
            <InputText placeholder="비밀번호를 입력하세요" inputType="password" {...register('password')} />
            {errors.password && <p className="error-text">비밀번호는 필수로 입력해야합니다.</p>}
          </fieldset>
          <Button buttonType="submit" size="medium" scheme="primary">
            회원가입
          </Button>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignUpStyle>
    </>
  );
};

const SignUpStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;
  fieldset {
    padding: 0 0 8px 0;
    border: 0;
    .error-text {
      color: tomato;
    }
  }

  input {
    width: 100%;
  }
  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default SignUpPage;
