import styled from 'styled-components';
import { Logo, ThemeSwitcher } from 'components/common';
import AuthNav from './AuthNav';
import SearchBox from './SearchBox';

const Header = () => {
  return (
    <Container>
      <ThemeSwitcher />

      <HeaderStyle>
        <div className="search-wrapper">
          <Logo type="link" size={200} />
          <SearchBox />
        </div>
        <AuthNav />
      </HeaderStyle>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding-top: 24px;
`;
const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* max-width: ${({ theme }) => theme.layout.width.large}; */
  /* margin: 0 auto; */
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 28px;
  }
`;

export default Header;
