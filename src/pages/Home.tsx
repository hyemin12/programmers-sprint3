import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCategory } from 'hooks/useCategory';
import { MainBookList, MainCategory, VisualSlide } from 'components/Home';
import { Loading, Title } from 'components/common';
import { useMain } from 'hooks/useMain';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';

function Home() {
  const category = useCategory();
  const { newBooks, isNewBooksEmpty, isBestSellerBooksEmpty, bestSellerBooks, isFetching, fetchNextPage, hasNextPage } =
    useMain();

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  // 무한 스크롤
  const targetRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  return (
    <HomeStyle>
      {/* 배너 */}
      <div className="visual">
        <VisualSlide />
      </div>

      {/* 카테고리 */}
      <div className="category">
        <MainCategory category={category} />
      </div>

      {/* 신간안내 */}
      {!isNewBooksEmpty && (
        <div className="new-books">
          <Title size="large" color="primary">
            신간 안내
          </Title>
          <MainBookList list={newBooks} />
        </div>
      )}

      {/* 베스트 셀러 */}
      {!isBestSellerBooksEmpty && (
        <div className="bestseller-books">
          <Title size="large" color="primary">
            인기 도서 안내
          </Title>
          <MainBookList list={bestSellerBooks} isBestseller />
        </div>
      )}
      {isFetching && <Loading />}
      <div ref={targetRef}></div>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  .visual {
    width: 100%;
    overflow: hidden;
  }
`;

export default Home;
