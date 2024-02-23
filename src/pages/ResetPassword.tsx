import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Title from 'components/common/Title';
import InputText from 'components/common/InputText';
import Button from 'components/common/Button';
import { useAlert } from 'hooks/useAlert';
import { SignUpStyle } from './SignUp';
import { resetPassword, resetRequest } from 'api/auth.api';
import { AuthData } from 'models/user.model';

const ResetPassword = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const onSubmit = (data: AuthData) => {
    if (resetRequested) {
      // 초기화 함수 호출
      resetPassword(data).then(() => {
        showAlert('비밀번호가 초기화 되었습니다.');
        navigate('/login');
      });
    } else {
      // 초기화 요청 함수 호출
      resetRequest(data).then(() => {
        setResetRequested(true);
      });
    }
  };
  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignUpStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText placeholder="이메일을 입력하세요" inputType="email" {...register('email')} />
            {errors.email && <p className="error-text">이메일은 필수로 입력해야합니다.</p>}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText placeholder="비밀번호를 입력하세요" inputType="password" {...register('password')} />
              {errors.password && <p className="error-text">비밀번호는 필수로 입력해야합니다.</p>}
            </fieldset>
          )}

          <Button buttonType="submit" size="medium" scheme="primary">
            {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
          </Button>
        </form>
      </SignUpStyle>
    </>
  );
};

export default ResetPassword;
