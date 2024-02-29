import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';

import useAuthStore from 'store/auth.store';
import { AuthNavStyle } from 'style/AuthNav.styles';
import useCartStore from 'store/cart.store';
import { useAuth } from 'hooks/useAuth';

const AuthNav = () => {
  const { isLoggedIn } = useAuthStore();
  const { userLogout } = useAuth();
  const { cartItems } = useCartStore();

  return (
    <AuthNavStyle>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/cart">장바구니</Link>
              {cartItems.length > 0 && <span className="cart-isExist">{cartItems.length}</span>}
            </li>
            <li>
              <Link to="/orderlist">주문내역</Link>
            </li>
            <li>
              <button onClick={userLogout}>로그아웃</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Link to="/login">
              <FaRegUser />
              로그인
            </Link>
          </li>
        )}
      </ul>
    </AuthNavStyle>
  );
};

export default AuthNav;
