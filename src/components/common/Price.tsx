import React from 'react';
import styled from 'styled-components';
import { formatNumber } from 'utils/format';

interface PriceProps {
  price: number;
  size: 'default' | 'large';
}

const Price = ({ price, size }: PriceProps) => {
  return (
    <PriceStyle size={size}>
      <p>
        <strong>{formatNumber(price)}</strong>원
      </p>
    </PriceStyle>
  );
};
const PriceStyle = styled.p<Omit<PriceProps, 'price'>>`
  font-size: ${({ size }) => (size === 'default' ? '0.95rem' : '1.1rem')};
  strong {
    font-size: ${({ size }) => (size === 'default' ? '1rem' : '1.25rem')};
  }
`;

export default Price;
