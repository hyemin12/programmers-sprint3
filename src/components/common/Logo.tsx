import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImg from 'assets/images/logo.png';

interface LogoProps {
  size: number;
  type: 'link' | 'image';
}

const Logo = ({ size, type }: LogoProps) => {
  if (type === 'link')
    return (
      <LogoStyle className="logo" size={size}>
        <Link to="/">
          <img src={logoImg} alt="bookstore" />{' '}
        </Link>
      </LogoStyle>
    );

  return (
    <LogoStyle className="logo" size={size}>
      <img src={logoImg} alt="bookstore" />
    </LogoStyle>
  );
};

const LogoStyle = styled.h1<Omit<LogoProps, 'type'>>`
  img {
    width: ${({ size }) => `${size}px`};
  }
`;

export default Logo;
