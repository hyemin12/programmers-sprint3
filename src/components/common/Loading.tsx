import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <LoadingStyle>
      <FaSpinner />
    </LoadingStyle>
  );
};
const rotate = keyframes`
  0%{
    transform:rotate(0deg)
  }
  100%{
    transform:rotate(360deg)
  }
`;
const LoadingStyle = styled.div`
  padding: 40px;
  text-align: center;
  svg {
    width: 70px;
    height: 70px;
    fill: #ccc;
    animation: ${rotate} 1s linear infinite;
  }
`;

export default Loading;
