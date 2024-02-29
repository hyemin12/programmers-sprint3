import { useForm } from 'react-hook-form';

import { IAuthData } from 'models/user.model';
import { EmailFieldset, PasswordFieldset, AuthForm } from 'components/AuthForm';
import { useAuth } from 'hooks/useAuth';

const SignUp = () => {
  const { userSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
    userSignUp(data);
  });

  return (
    <>
      <AuthForm buttonText="회원가입" title="회원가입" onSubmit={onSubmit} showInfo="signup">
        <EmailFieldset register={register} errors={errors} />
        <PasswordFieldset register={register} errors={errors} />
      </AuthForm>
    </>
  );
};

export default SignUp;
