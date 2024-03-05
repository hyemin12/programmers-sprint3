import styled, { css } from 'styled-components';
import { ViewMode } from '../BooksViewSwitcher';

const textStyle = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.secondary};
  margin: 0;
`;

export const BooksItemStyle = styled.div<{ view: ViewMode }>`
  position: relative;
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    text-decoration: none;
  }

  .img {
    width: ${({ view }) => (view === 'grid' ? 'auto' : '165px')};
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .content {
    flex: ${({ view }) => (view === 'grid' ? 0 : 1)};
    padding-left: ${({ view }) => (view === 'grid' ? 0 : '16px')};
    margin-top: 16px;
    position: relative;
    .title {
      font-size: 1.1rem;
      font-weight: bold;
      margin: 0 0 7px 0;
    }
    p {
      ${textStyle};
    }
    .summary {
      margin-bottom: 7px;
    }

    .price {
      ${textStyle};
      margin-top: 12px;
      span {
        color: ${({ theme }) => theme.color.text};
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
`;

export const Likes = styled.div<{ $liked: boolean; view: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme, $liked }) => ($liked ? theme.color.primary : theme.color.secondary)};
  font-size: 0.9rem;
  svg {
    fill: ${({ theme, $liked }) => ($liked ? theme.color.primary : theme.color.secondary)};
  }
  ${({ view }) =>
    view === 'list' &&
    css`
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    `}
`;
