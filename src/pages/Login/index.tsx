import { useNavigate } from 'react-router-dom';
import { useAlert } from 'hooks/useAlert';
import { IAuthData } from 'models/user.model';
import { login } from 'api/auth.api';
import useAuthStore from 'store/auth.store';
import AuthForm from 'components/AuthForm';
import EmailFieldset from 'components/AuthForm/EmailFieldset';
import PasswordFieldset from 'components/AuthForm/PasswordFieldset';
import { useForm } from 'react-hook-form';

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthData>();

  const onSubmit = handleSubmit((data: IAuthData) => {
    login(data)
      .then((res) => {
        storeLogin(res.token);
        showAlert('로그인에 성공했습니다.');
        navigate('/');
      })
      .catch((error) => {
        const errorMsg = error.response.data.error.message ?? '로그인에 실패했습니다. 다시 시도 해주세요.';
        showAlert(errorMsg);
      });
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

export default Login;
