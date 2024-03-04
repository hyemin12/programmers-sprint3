import { useAlert } from 'hooks/useAlert';
import { useNavigate } from 'react-router';
import useAuthStore from 'store/auth.store';

/** 로그인 여부를 확인하는 함수 <br/>
 * 로그인이 되어있는지 확인하고,
 * 로그인이 되어있지 않다면 로그인 페이지로 이동합니다.
 */
export const requireLogin = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    showAlert('로그인이 필요합니다.');
    navigate('/login');
    return;
  }
};
