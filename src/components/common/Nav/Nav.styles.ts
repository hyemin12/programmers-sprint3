import styled, { css } from 'styled-components';

export const NavItemStyle = css`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.color.text};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export const AuthNavStyle = styled.nav`
  ul {
    display: flex;
    gap: 16px;
    li {
      a,
      button {
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
`;

export const CategoryNavStyle = styled.nav`
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
`;
