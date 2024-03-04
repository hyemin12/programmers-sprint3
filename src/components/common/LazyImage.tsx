import { useState } from 'react';
import styled from 'styled-components';
import Loading from './Loading';

interface LazyImageProps {
  alt: string;
  src: string;
}

const LazyImage = ({ alt, src }: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <LazyImageStyle className="lazy-img">
        <img src={src} alt={alt} loading="lazy" onLoad={handleImageLoad} />
      </LazyImageStyle>
    </>
  );
};
const LazyImageStyle = styled.div`
  img {
    display: block;
    width: 100%;
  }
`;

export default LazyImage;
