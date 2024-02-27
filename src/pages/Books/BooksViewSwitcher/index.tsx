import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaList, FaTh } from 'react-icons/fa';
import Button from 'components/common/Button';
import { QUERYSTRING } from 'constance/querystring';

export type ViewMode = 'list' | 'grid';

const viewOptions = [
  { value: 'list', icon: <FaList /> },
  { value: 'grid', icon: <FaTh /> },
];

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <BookViewSwitcherStyle>
      {viewOptions.map(({ value, icon }) => (
        <Button
          size="medium"
          scheme={searchParams.get(QUERYSTRING.VIEW) === value ? 'primary' : 'default'}
          key={value}
          onClick={() => handleSwitch(value as ViewMode)}
        >
          {icon}
        </Button>
      ))}
    </BookViewSwitcherStyle>
  );
};
const BookViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;
