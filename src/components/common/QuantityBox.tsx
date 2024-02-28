import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import InputText from './InputText';

interface QuantityBoxProps {
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
}

const QuantityBox = ({ handleIncrease, handleDecrease, quantity }: QuantityBoxProps) => {
  return (
    <QuantityBoxStyle>
      <Button size="medium" scheme="transparent" onClick={handleDecrease}>
        -
      </Button>
      <InputText inputType="number" value={quantity} />
      <Button size="medium" scheme="transparent" onClick={handleIncrease}>
        +
      </Button>
    </QuantityBoxStyle>
  );
};

const QuantityBoxStyle = styled.div`
  width: calc(33px * 3);
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 1px solid ${({ theme }) => theme.color.border};
  overflow: hidden;
  button,
  input {
    width: 32px;
    height: 32px;
    padding: 0;
    text-align: center;
  }
  input {
    border: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
  /* input 화살표 안보이게하기 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default QuantityBox;
