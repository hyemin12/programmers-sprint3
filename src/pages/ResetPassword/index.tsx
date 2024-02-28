import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from 'hooks/useAlert';
import { resetPassword, resetRequest } from 'api/auth.api';
import { IAuthData } from 'models/user.model';
import AuthForm from 'components/AuthForm';
import EmailFieldset from 'components/AuthForm/EmailFieldset';
import PasswordFieldset from 'components/AuthForm/PasswordFieldset';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [resetRequested, setResetRequested] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
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
  });

  return (
    <AuthForm
      buttonText={resetRequested ? '비밀번호 초기화' : '초기화 요청'}
      title="비밀번호 초기화"
      onSubmit={onSubmit}
      showInfo={null}
    >
      <EmailFieldset register={register} errors={errors} />
      {resetRequested && <PasswordFieldset register={register} errors={errors} />}
    </AuthForm>
  );
};

export default ResetPassword;
