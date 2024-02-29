import { IAuthData } from 'models/user.model';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'store/auth.store';
import { useAlert } from './useAlert';
import { login, resetPassword, resetRequest, signUp } from 'api/auth.api';
import { useState } from 'react';
import { removeToken, setToken } from 'utils/savedTokenToLocalStorage';

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const [resetRequested, setResetRequested] = useState<boolean>(false);

  const userSignUp = (data: IAuthData) => {
    signUp(data)
      .then((res) => {
        showAlert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        const errorMsg = error.response.data[0].msg ?? '회원가입에 실패했습니다. 다시 시도 해주세요.';
        showAlert(errorMsg);
      });
  };

  const userLogin = (data: IAuthData) => {
    login(data)
      .then((res) => {
        setToken(res.token);
        storeLogin(res.token);
        showAlert('로그인에 성공했습니다.');
        navigate('/');
      })
      .catch((error) => {
        const errorMsg = error.response.data.error.message ?? '로그인에 실패했습니다. 다시 시도 해주세요.';
        showAlert(errorMsg);
      });
  };

  const userRequestPassword = (data: IAuthData) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  const userResetPassword = (data: IAuthData) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화 되었습니다.');
      navigate('/login');
    });
  };

  const userLogout = () => {
    if (!isLoggedIn) return;
    storeLogout();
    removeToken();
  };

  return { userLogin, userSignUp, userRequestPassword, userResetPassword, userLogout, resetRequested };
};
