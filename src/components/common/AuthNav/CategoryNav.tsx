import { Link } from 'react-router-dom';
import { useCategory } from 'hooks/useCategory';
import { CategoryNavStyle } from './Nav.styles';

const CategoryNav = () => {
  const category = useCategory();

  return (
    <CategoryNavStyle>
      <ul>
        {category.map((item) => (
          <li key={item.id}>
            <Link to={item.id !== null ? `/books?category_id=${item.id}` : '/books'}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </CategoryNavStyle>
  );
};

export default CategoryNav;
