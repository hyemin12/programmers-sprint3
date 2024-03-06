import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Button, Logo, ThemeSwitcher } from 'components/common';
import AuthNav from './AuthNav';
import SearchBox from './SearchBox';
import { HeaderContainer } from 'components/Layout/Header.styles';

const Header = () => {
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);
  return (
    <HeaderContainer>
      <ThemeSwitcher />
      {/* 데스크탑 버전 헤더 */}
      <header className="header-desktop">
        <div className="search-wrapper">
          <Logo type="link" size={200} />
          <SearchBox />
        </div>

        <AuthNav />
      </header>

      {/* 모바일 버전 헤더 */}
      <header className="header-mobile">
        <div className="gnb-wrapper">
          <Button
            size="small"
            scheme="transparent"
            className={isShowMenuBar ? 'open toggle-menu' : ' toggle-menu'}
            onClick={() => setIsShowMenuBar(!isShowMenuBar)}
          >
            <FaBars />
          </Button>
          <Logo type="link" size={200} />
        </div>
        <div className="search-wrapper">
          <SearchBox />
        </div>
        <div className={isShowMenuBar ? 'open menu-wrapper' : 'menu-wrapper'}>
          <AuthNav />
          <ThemeSwitcher />
        </div>
      </header>
    </HeaderContainer>
  );
};

export default Header;
