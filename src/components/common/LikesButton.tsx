import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { Button } from 'components/common';

interface LikesButtonProps {
  likes: number;
  liked: boolean;
  onClick: () => void;
}

const LikesButton = ({ likes, liked, onClick }: LikesButtonProps) => {
  return (
    <LikesButtonStyle onClick={onClick} size="medium" scheme={liked ? 'like' : 'default'}>
      <FaHeart />
      {likes}
    </LikesButtonStyle>
  );
};
const LikesButtonStyle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.secondary};
  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikesButton;
