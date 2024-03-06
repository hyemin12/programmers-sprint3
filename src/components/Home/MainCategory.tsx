import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ICategoryItem } from 'models/category.model';

interface MainCategoryProps {
  category: ICategoryItem[];
}

const MainCategory = ({ category }: MainCategoryProps) => {
  return (
    <MainCategoryStyle>
      {category.map((item) => {
        if (item.id !== null) {
          return (
            <li key={item.id}>
              <Link to={`/books?category_id=${item.id}`}>{item.name}</Link>
            </li>
          );
        }
      })}
    </MainCategoryStyle>
  );
};

const MainCategoryStyle = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 24px 0;
  li {
    display: flex;
    min-width: 110px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    list-style: none;
    a {
      flex: 1;
      padding: 9px 12px;
      text-align: center;
      text-decoration: none;
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 12px 0;
  }
`;

export default MainCategory;
