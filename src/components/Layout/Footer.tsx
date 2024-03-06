import styled from 'styled-components';
import { Logo } from 'components/common';

const Footer = () => {
  return (
    <FooterStyle>
      <Logo size={140} type="image" />
      <div className="copyright">
        <p>copyright(c) 2024 hyemin</p>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .copyright {
    font-size: 0.75em;
    color: ${({ theme }) => theme.color.text};
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`;

export default Footer;
