import { useForm } from 'react-hook-form';

import { IAuthData } from 'models/user.model';
import { EmailFieldset, PasswordFieldset, AuthForm } from 'components/AuthForm';
import { useAuth } from 'hooks/useAuth';

const ResetPassword = () => {
  const { userResetPassword, resetRequested, userRequestPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
    resetRequested ? userResetPassword(data) : userRequestPassword(data);
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
