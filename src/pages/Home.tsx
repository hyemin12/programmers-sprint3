import React from 'react';
import Title from '../components/common/Title';
import Button from '../components/common/Button';

function Home() {
  return (
    <div>
      <Title size="large">제목 테스트</Title>
      <Button size="large" scheme="primary">
        버튼 테스트
      </Button>
    </div>
  );
}

export default Home;
