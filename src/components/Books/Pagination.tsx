import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { LIMIT } from 'constance/pagination';
import { Pagination as IPagination } from 'models/pagination.model';
import { QUERYSTRING } from 'constance/querystring';

interface PaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total_count, current_page } = pagination;
  const pages: number = Math.ceil(total_count / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  if (pages <= 0) return null;
  return (
    <PaginationStyle>
      {Array(pages)
        .fill(0)
        .map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <li key={pageNum}>
              <Button
                size="small"
                scheme={pageNum === Number(current_page) ? 'primary' : 'default'}
                onClick={() => handleClickPage(pageNum)}
              >
                {pageNum}
              </Button>
            </li>
          );
        })}
    </PaginationStyle>
  );
};

const PaginationStyle = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0;
  padding: 24px 0;
  gap: 8px;
  li {
    list-style: none;
  }
`;

export default Pagination;
