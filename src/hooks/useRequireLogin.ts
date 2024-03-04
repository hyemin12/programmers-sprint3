import { useNavigate } from 'react-router';
import { useAlert } from './useAlert';
import useAuthStore from 'store/auth.store';

export const useRequireLogin = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const requireLogin = () => {
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      navigate('/login');
      return false;
    }

    return true;
  };

  return { requireLogin };
};
