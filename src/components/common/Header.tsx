import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
import Logo from './Logo';

const CATEGORY = [
  { id: null, name: '전체' },
  { id: 0, name: '동화' },
  { id: 1, name: '소설' },
  { id: 2, name: '사회' },
];

const Header = () => {
  return (
    <HeaderStyle>
      <Logo type="link" size={200} />

      <nav className="category">
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <Link to={item.id !== null ? `/books?category_id=${item.id}` : '/books'}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
};

const NavItemStyle = css`
  color: ${({ theme }) => theme.color.text};

  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          ${NavItemStyle}
        }
      }
    }
  }
  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a {
          ${NavItemStyle}
          font-size: 1rem;
          display: flex;
          align-items: center;
          line-height: 1;
          &:hover {
            svg {
              fill: ${({ theme }) => theme.color.primary};
            }
          }
          svg {
            transition: all 0.3s;
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
