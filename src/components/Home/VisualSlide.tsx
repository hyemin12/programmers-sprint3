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
    width: 100%;
    height: 100%;
    .slide {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 55vh;
      img {
        width: auto;
        height: 100%;
      }

      .slick-prev {
        left: 25px;
        z-index: 9;
      }
      .slick-next {
        right: 25px;
        z-index: 9;
      }
    }
    .slick-dots {
      bottom: 10px;
      li.slick-active button::before {
        color: #fff;
      }
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.tablet}) {
    height: 40vh;
    .slick-slider {
      .slick-prev {
        left: 15px;
      }
      .slick-next {
        right: 15px;
      }
    }
  }
  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 30vh;
    .slick-slider {
      .slick-prev {
        left: 15px;
      }
      .slick-next {
        right: 15px;
      }
    }
  }
`;

export default VisualSlide;
