import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: ${({ theme }) => theme.layout.width.large};
  margin: 0 auto;
  padding-top: 24px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 28px;
      width: 100%;
    }
    .menu-wrapper {
      flex-shrink: 0;
    }
    &.header-mobile {
      display: none;
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.tablet}) {
    padding: 0 12px;
    .theme-switcher {
      display: none;
    }
    header.header-desktop {
      display: none;
    }

    header.header-mobile {
      display: block;
      padding-bottom: 0;
      border-bottom: none;

      .gnb-wrapper {
        display: flex;
        justify-content: center;
        position: relative;
        margin-bottom: 20px;
        .logo {
          img {
            width: 160px;
          }
        }

        .toggle-menu {
          font-size: 1.25rem;
          position: absolute;
          top: -2px;
          left: 0;
          transition: transform 0.3s ease;
          transform: translateX(0);
          &.open {
            transform: translateX(78vw);
          }
        }
      }
      .menu-wrapper {
        width: 80vw;
        height: 100vh;
        background-color: ${({ theme }) => theme.color.background};
        padding: 10vh 30px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease;
        transform: translateX(-105%);
        .theme-switcher {
          display: block;
          position: absolute;
          bottom: 7vh;
        }
        &.open {
          transform: translateX(0);
        }
      }
    }
  }
`;
