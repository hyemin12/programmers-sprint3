import { FormEvent, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

import { Button } from 'components/common';
import { QUERYSTRING } from 'constance/querystring';

const SearchBox = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchBook = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const searchWordParams = params.get(QUERYSTRING.KEYWORD);
    const trimSearchWord = keyword.trim();

    // keyword가 아무것도 입력되지 않았거나, 기존의 값과 같다면 함수 종료
    if (trimSearchWord.length === 0 || searchWordParams === trimSearchWord) return;

    params.set(QUERYSTRING.KEYWORD, trimSearchWord);
    setKeyword('');
    if (pathname === '/search') {
      setSearchParams(params);
    } else {
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <SearchBoxStyle className="search-box">
      <form onSubmit={handleSearchBook}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 도서명을 입력해주세요."
        />

        <Button size="small" scheme="transparent">
          <FaSearch />
        </Button>
      </form>
    </SearchBoxStyle>
  );
};
const SearchBoxStyle = styled.div`
  form {
    width: 400px;
    position: relative;
    input {
      width: 100%;
      padding: 8px 18px;
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: 32px;
      color: ${({ theme }) => theme.color.text};
    }
    button {
      font-size: 1rem;
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 12px;
      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    form {
      width: calc(100vw - 24px);
    }
  }
`;
export default SearchBox;
