import styled from 'styled-components';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import { Button } from 'components/common';

interface CheckIconButtonProps {
  isChecked: boolean;
  onClick: () => void;
}

const CheckIconButton = ({ isChecked, onClick }: CheckIconButtonProps) => {
  return (
    <CheckIconButtonStyle size="small" onClick={onClick} scheme="transparent" $isChecked={isChecked}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconButtonStyle>
  );
};

const CheckIconButtonStyle = styled(Button)<{ $isChecked: boolean }>`
  svg {
    width: 24px;
    height: 24px;
    svg,
    path {
      color: ${({ $isChecked, theme }) => ($isChecked ? theme.color.primary : theme.color.border)};
    }
  }
`;

export default CheckIconButton;
