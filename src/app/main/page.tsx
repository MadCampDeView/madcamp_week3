'use client';
import React from 'react';
import Carousel from '@/components/Carousel';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  color: blue;
`;

const BottomText = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: blue;
`;

const MainPage = () => {
  return (
    <PageContainer>
      <Title>오늘의 추천 칵테일</Title>
      <Carousel />
      <BottomText>바 테이블 같은 거</BottomText>
    </PageContainer>
  );
};

export default MainPage;
