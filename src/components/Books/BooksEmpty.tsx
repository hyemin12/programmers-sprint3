import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSmileWink } from 'react-icons/fa';
import Title from 'components/common/Title';

const BooksEmpty = () => {
  return (
    <BooksEmptyStyle>
      <div className="icon">
        <FaSmileWink />
      </div>
      <Title size="large" color="secondary">
        검색 결과가 없습니다
      </Title>
      <Link to="/books">전체 검색 결과로 이동</Link>
    </BooksEmptyStyle>
  );
};

const BooksEmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;
  .icon {
    font-size: 4rem;
    svg {
      fill: #ccc;
    }
  }
`;

export default BooksEmpty;
