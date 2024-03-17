import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { IDeliveryForm } from 'pages/Order';

interface PaymentMethodItemProps {
  value: string;
  register: UseFormRegister<IDeliveryForm>;
}

const PaymentMethodItem = ({ value, register }: PaymentMethodItemProps) => {
  return (
    <PaymentMethodItemStyle>
      <input id={`payment-${value}`} type="radio" value={value} {...register('payment', { required: true })} />
      <label htmlFor={`payment-${value}`}>{value}</label>
    </PaymentMethodItemStyle>
  );
};
const PaymentMethodItemStyle = styled.div`
  display: inline-flex;
  overflow: hidden;

  input[type='radio'] {
    display: none;
  }

  label {
    display: inline-block;
    padding: 12px 24px;
    background-color: #fff;
    border: 2px solid ${({ theme }) => theme.color.border};
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background-color: ${({ theme }) => theme.color.primary};
    border-color: ${({ theme }) => theme.color.primary};
    color: #fff;
  }
`;

export default PaymentMethodItem;
