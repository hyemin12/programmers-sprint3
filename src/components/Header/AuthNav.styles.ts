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
      position: relative;
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
      &.nav-cart {
        .preview-cart {
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out;
        }
        &:hover .preview-cart {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .cart-isExist {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      background-color: ${({ theme }) => theme.color.primary};
      border-radius: 50%;
      color: #fff;
      font-size: 0.5em;
      line-height: 2;
      position: absolute;
      right: -6px;
      top: -12px;
    }
  }
`;
