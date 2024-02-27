import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type ShowInfoProps = 'login' | 'signup' | null;

const AuthInfoBox = ({ showInfo }: { showInfo: ShowInfoProps }) => {
  if (!showInfo) return null;

  if (showInfo === 'signup')
    return (
      <InfoBoxStyle>
        <p>
          이미 계정을 가지고 계신가요?<Link to="/login">로그인</Link>
        </p>
      </InfoBoxStyle>
    );

  return (
    <InfoBoxStyle>
      <Link to="/signup">회원가입</Link>
      <Link to="/reset">비밀번호 초기화</Link>
    </InfoBoxStyle>
  );
};

const InfoBoxStyle = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  a {
    font-size: 0.85rem;
    text-decoration: none;
  }
  p {
    font-size: 0.85rem;
    a {
      margin-left: 4px;
      text-decoration: underline;
    }
  }
`;

export default AuthInfoBox;
