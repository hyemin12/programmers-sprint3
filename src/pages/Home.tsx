import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useCategory } from 'hooks/useCategory';
import { MainBookList, MainCategory, VisualSlide } from 'components/Home';
import { Loading, Title } from 'components/common';
import { useMain } from 'hooks/useMain';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useMediaQuery } from 'hooks/useMediaQuery';

function Home() {
  const category = useCategory();
  const { newBooks, isNewBooksEmpty, isBestSellerBooksEmpty, bestSellerBooks, isFetching, fetchNextPage, hasNextPage } =
    useMain();
  const { isMobile } = useMediaQuery();

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
      {!isNewBooksEmpty && <MainBookList list={newBooks} title="신간 안내" $className="new-books" />}

      {/* 베스트 셀러 */}
      {!isBestSellerBooksEmpty && (
        <MainBookList list={bestSellerBooks} isBestseller title="인기도서 안내" $className="bestseller-books" />
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
  .main-contents {
    padding-bottom: 30px;
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 0 0 30px 0;
  }
`;

export default Home;
