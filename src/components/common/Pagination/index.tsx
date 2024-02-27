import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { IPagination } from 'models/pagination.model';
import { LIMIT } from 'constance/pagination';
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
      <ul>
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
      </ul>
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    gap: 8px;
    li {
      list-style: none;
    }
  }
`;

export default Pagination;
