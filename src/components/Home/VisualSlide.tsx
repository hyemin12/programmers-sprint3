import Slider from 'react-slick';
import styled from 'styled-components';

import bannerImg1 from 'assets/images/visual-banner1.jpg';
import bannerImg2 from 'assets/images/visual-banner2.jpg';

// slick css
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

var settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />
};

const VisualSlide = () => {
  return (
    <VisualSlideStyle>
      <Slider {...settings}>
        <div className="slide">
          <img src={bannerImg1} />
        </div>
        <div className="slide">
          <img src={bannerImg2} />
        </div>
      </Slider>
    </VisualSlideStyle>
  );
};

const VisualSlideStyle = styled.div`
  width: 100%;
  height: 55vh;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  overflow: hidden;
  position: relative;
  .slick-slider {
    height: 100%;
    img {
      width: 100%;
      object-fit: cover;
    }
    .slick-prev,
    .slick-next {
      z-index: 9;
    }
    .slick-prev {
      left: 25px;
    }
    .slick-next {
      right: 25px;
    }
  }
`;

export default VisualSlide;
