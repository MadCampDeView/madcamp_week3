// components/Carousel.tsx
'use client';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import InteractiveCard from './InteractiveCard'; // Import your interactive card component

const CarouselContainer = styled.div`
  width: 90%; /* Adjust the width to make the carousel larger */
  display: flex;
  justify-content: center;
  align-items: center; /* Center align items vertically */
  position: relative;
  max-height: 100vh; /* Ensure container doesn't exceed viewport height */
  overflow: visible; /* Allow overflow */
`;

const NavigationButtonStyle = css`
  .swiper-button-prev, .swiper-button-next {
    top: 50%;
    transform: translateY(-50%);
    color: #fff; /* Changed for better visibility */
    background: #007BFF; /* A blue background for better visibility and aesthetics */
    border-radius: 50%;
    width: 50px; /* Increased size for better touch interaction */
    height: 50px; /* Increased size for better touch interaction */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* More prominent shadow for 3D effect */
    border: none; /* Removing border for a cleaner look */
    cursor: pointer; /* Ensures it's clear these are interactive elements */
    transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover and active states */
  }

  .swiper-button-prev:hover, .swiper-button-next:hover,
  .swiper-button-prev:active, .swiper-button-next:active {
    background-color: #0056b3; /* Darker shade on hover and active */
    transform: scale(1.1); /* Slightly larger on hover and active for feedback */
  }

  .swiper-button-prev {
    left: 20px; /* Increased spacing from the edge for better accessibility */
  }

  .swiper-button-next {
    right: 20px; /* Increased spacing from the edge for better accessibility */
  }

  .swiper-button-prev::after, .swiper-button-next::after {
    font-size: 20px; /* Larger icon size */
    content: attr(data-swiper-button-icon); /* Use icons via data attribute */
  }
`;

const SwiperSlideStyled = styled(SwiperSlide)`
  overflow: visible; /* Ensure slides do not clip their contents */
  padding: 0; /* Adjust padding if necessary to give more space */
`;

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(100); // Default space between slides

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const updateSpaceBetween = () => {
    const width = window.innerWidth;
    setSpaceBetween(width / 16.18);
  };

  useEffect(() => {
    updateSpaceBetween();
    window.addEventListener('resize', updateSpaceBetween);
    return () => {
      window.removeEventListener('resize', updateSpaceBetween);
    };
  }, []);

  const titles = [
    '여름 특선 칵테일',
    '클래식 칵테일',
    '과일 칵테일',
    '무알콜 칵테일',
    '가을 특선 칵테일',
    '겨울 특선 칵테일',
    '이국적인 칵테일'
  ];

  const descriptions = [
    '시원한 맛',
    '시간을 초월한 맛',
    '상큼한 과일향',
    '가볍게 즐기는',
    '따뜻한 느낌',
    '따뜻한 음료',
    '이국적인 맛'
  ];

  const colors = [
    '#FFB6C1', // Light Pink
    '#FA8072', // Salmon
    '#FFD700', // Gold
    '#ADFF2F', // Green Yellow
    '#FF4500', // Orange Red
    '#1E90FF', // Dodger Blue
    '#9370DB'  // Medium Purple
  ];

  return (
    <CarouselContainer>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={3.2} /* Adjust the slidesPerView */
        centeredSlides={true} /* Center the slides */
        navigation
        pagination={{ clickable: true }}
        css={NavigationButtonStyle}
        spaceBetween={spaceBetween} /* Responsive space between slides */
        onSlideChange={handleSlideChange}
        loop={true} /* Enable infinite loop */
      >
        {titles.map((title, index) => {
          // Determine position based on the activeIndex and current index
          const positionIndex = (index - activeIndex + titles.length) % titles.length;
          let position: 'left' | 'right' | 'center';
          if (positionIndex === 0) {
            position = 'center';
          } else if (positionIndex === 1 || positionIndex === 2) {
            position = 'right';
          } else {
            position = 'left';
          }

          return (
            <SwiperSlideStyled key={index}>
              <InteractiveCard
                className=""
                hitboxClass=""
                title={title}
                description={descriptions[index]}
                position={position}
                color={colors[index]} // Pass the color prop
              />
            </SwiperSlideStyled>
          );
        })}
      </Swiper>
    </CarouselContainer>
  );
};

export default Carousel;
