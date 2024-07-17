// src/components/Carousel.tsx
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

const SwiperStyled = styled(Swiper)`
  padding: 5%; /* Add padding to the Swiper component */
`;

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(100); // Default space between slides
  const [cocktails, setCocktails] = useState<any[]>([]); // State to store recommended cocktails

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const updateSpaceBetween = () => {
    const width = window.innerWidth;
    setSpaceBetween(width / 16.18);
  };

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('/data/cocktails.json');
        const data = await response.json();

        // Filter recommended cocktails
        const recommendedCocktails = [];
        for (const category of data) {
          for (const cocktail of category.cocktails) {
            if (cocktail.recommended) {
              recommendedCocktails.push({
                title: cocktail.name,
                description: cocktail.description,
                bgColor: cocktail.color,
                textColor: cocktail.textColor
              });
            }
          }
        }
        setCocktails(recommendedCocktails);
      } catch (error) {
        console.error('Error fetching cocktail data:', error);
      }
    };

    fetchCocktails();
    updateSpaceBetween();
    window.addEventListener('resize', updateSpaceBetween);
    return () => {
      window.removeEventListener('resize', updateSpaceBetween);
    };
  }, []);

  if (cocktails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <CarouselContainer>
      <SwiperStyled
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
        {cocktails.map((cocktail, index) => {
          // Determine position based on the activeIndex and current index
          const positionIndex = (index - activeIndex + cocktails.length) % cocktails.length;
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
                title={cocktail.title}
                description={cocktail.description}
                position={position}
                bgColor={cocktail.bgColor} // Pass the color prop
                textColor={cocktail.textColor}
              />
            </SwiperSlideStyled>
          );
        })}
      </SwiperStyled>
    </CarouselContainer>
  );
};

export default Carousel;
