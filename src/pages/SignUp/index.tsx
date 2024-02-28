import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp } from 'api/auth.api';
import { useAlert } from 'hooks/useAlert';
import { IAuthData } from 'models/user.model';
import AuthForm from 'components/AuthForm';
import EmailFieldset from 'components/AuthForm/EmailFieldset';
import PasswordFieldset from 'components/AuthForm/PasswordFieldset';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
    signUp(data)
      .then((res) => {
        showAlert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        const errorMsg = error.response.data[0].msg ?? '회원가입에 실패했습니다. 다시 시도 해주세요.';
        showAlert(errorMsg);
      });
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

export default SignUpPage;
