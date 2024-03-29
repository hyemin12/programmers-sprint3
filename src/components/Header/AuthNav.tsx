import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';

import { PreviewCart } from 'components/Cart';
import useAuthStore from 'store/auth.store';
import useCartStore from 'store/cart.store';
import { useAuth } from 'hooks/useAuth';
import { AuthNavStyle } from './AuthNav.styles';

const AuthNav = () => {
  const { isLoggedIn } = useAuthStore();
  const { userLogout } = useAuth();
  const { cartItems, fetchCartItems, isEmpty } = useCartStore();
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, []);
  return (
    <AuthNavStyle>
      <ul>
        {isLoggedIn && (
          <>
            <li className="nav-cart">
              <Link to="/cart">장바구니</Link>
              {!isEmpty && <span className="cart-isExist">{cartItems.length}</span>}
              <PreviewCart />
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
