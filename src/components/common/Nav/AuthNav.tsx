import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import useAuthStore from 'store/auth.store';
import { AuthNavStyle } from './Nav.styles';

const AuthNav = () => {
  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <AuthNavStyle>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/cart">장바구니</Link>
            </li>
            <li>
              <Link to="/orderlist">주문내역</Link>
            </li>
            <li>
              <button onClick={storeLogout}>로그아웃</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
        )}
      </ul>
    </AuthNavStyle>
  );
};

export default AuthNav;