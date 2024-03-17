import styled from 'styled-components';

export const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  p {
    margin-bottom: 8px;
  }
  .info {
    display: flex;
    align-items: start;
    .title-box {
      display: flex;
      align-items: start;
      padding: 24px 24px 24px 12px;
      .product {
        width: 35vw;
      }
    }
  }
  .price-quantity-wrapper {
    padding: 24px;
    border-left: 1px solid ${({ theme }) => theme.color.border};
    /* border-right: 1px solid ${({ theme }) => theme.color.border}; */
    .total-price {
      font-weight: bold;
      text-align: center;
    }
  }
  .delete {
    padding: 12px;
    cursor: pointer;
  }
`;
