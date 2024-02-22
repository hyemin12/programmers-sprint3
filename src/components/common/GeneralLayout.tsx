import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const GeneralLayout = () => {
  return (
    <>
      <Header />
      <LayoutStyle>
        <Outlet />
      </LayoutStyle>
      <Footer />
    </>
  );
};

const LayoutStyle = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
`;

export default GeneralLayout;
