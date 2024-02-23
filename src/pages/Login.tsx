import { SignUpStyle } from './SignUp';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputText from 'components/common/InputText';
import Title from 'components/common/Title';
import Button from 'components/common/Button';
import { useAlert } from 'hooks/useAlert';
import { AuthData } from 'models/user.model';
import { login } from 'api/auth.api';
import useAuthStore from 'store/auth.store';

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const { storeLogin } = useAuthStore();

  const onSubmit = (data: AuthData) => {
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
  };
  return (
    <>
      <Title size="large">로그인</Title>
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
            로그인
          </Button>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignUpStyle>
    </>
  );
};

export default Login;
