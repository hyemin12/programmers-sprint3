import { useForm } from 'react-hook-form';

import { IAuthData } from 'models/user.model';
import { EmailFieldset, PasswordFieldset, AuthForm } from 'components/AuthForm';
import { useAuth } from 'hooks/useAuth';

const LoginPage = () => {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
    userLogin(data);
  });

  return (
    <>
      <AuthForm buttonText="로그인" title="로그인" onSubmit={onSubmit} showInfo="login">
        <EmailFieldset register={register} errors={errors} />
        <PasswordFieldset register={register} errors={errors} />
      </AuthForm>
    </>
  );
};

export default LoginPage;
