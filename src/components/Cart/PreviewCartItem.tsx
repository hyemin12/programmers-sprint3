import React from 'react';
import styled from 'styled-components';
import { Price, Title } from 'components/common';
import { ICart } from 'models/cart.model';
import { formatNumber } from 'utils/format';

interface PreviewCartItemProps {
  item: ICart;
}

const PreviewCartItem = ({ item }: PreviewCartItemProps) => {
  if (!item) return null;

  const { title, price, quantity } = item;
  return (
    <PreviewCartItemStyle>
      <div className="info">
        <Title size="small" color="text">
          {title}
        </Title>
        <p>수량: {quantity}</p>
      </div>
      <div className="preview-cart-item-price">
        <Price size="default" price={price} />
      </div>
    </PreviewCartItemStyle>
  );
};
const PreviewCartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 8px 0;
  .info {
    h1 {
      margin-bottom: 2px;
    }
    p {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.color.secondary};
    }
  }
  .preview-cart-item-price {
    flex-shrink: 0;
  }
`;

export default PreviewCartItem;
