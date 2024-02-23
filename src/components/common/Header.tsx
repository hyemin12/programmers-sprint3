import styled from 'styled-components';
import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
  return (
    <HeaderStyle>
      <Logo type="link" size={200} />
      <Nav />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};
`;

export default Header;
