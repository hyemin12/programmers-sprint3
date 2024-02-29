import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { useCategory } from 'hooks/useCategory';
import { VisualSlide } from 'components/Home';

function Home() {
  const category = useCategory();

  return (
    <HomeStyle>
      <div className="visual">
        <VisualSlide />
      </div>
      <div className="category">
        <ul>
          {category.map((item) => {
            if (item.id !== null) {
              return (
                <li>
                  <Link to={`/books?category_id=${item.id}`}>{item.name}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  .visual {
    width: 100%;
    overflow: hidden;
  }
  .category {
    ul {
      display: flex;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100px;
        padding: 9px 12px;
        border: 1px solid ${({ theme }) => theme.color.border};
        list-style: none;
        a {
          text-decoration: none;
        }
      }
    }
  }
`;

export default Home;
