import React from 'react';
import styled from 'styled-components';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
};

const LayoutStyle = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
  @media screen and (${({ theme }) => theme.mediaQuery.tablet}) {
    padding: 24px 12px;
  }
`;

export default GeneralLayout;
