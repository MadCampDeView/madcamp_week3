'use client';

import React, { useState } from 'react';
import styled from '@emotion/styled';

interface InteractiveDescriptionProps {
  className?: string;
  description: string;
  additionalContent: string;
  color?: string;
}

const DescriptionContainer = styled.div<{ color?: string }>`
  perspective: 1500px;
  display: flex;
  box-sizing: border-box;
  height: 61.8%;
  margin-top: 1.618vh;
  margin-left: 16.18vw;
  width: calc(100% - 16.18vw);
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 900px) {
    margin-left: 5vw;
    width: calc(100% - 10vw);
  }

  @media (max-width: 600px) {
    width: 90vw;
    margin-left: 5vw;
  }

  @media (max-width: 400px) {
    width: 80vw;
  }
`;

const DescriptionContent = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateX(180deg)' : 'rotateX(0)')};
`;

const DescriptionFace = styled.div<{ isBack?: boolean; color?: string, isHovered?: boolean }>`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isHovered }) => (isHovered ? '#ff7e5f' : 'black')};
  border: 1px solid ${({ isHovered }) => (isHovered ? '#feb47b' : 'blue')};
  padding: 20px;
  text-align: center;
  color: ${({ isHovered }) => (isHovered ? '#ffffff' : '#333')};
  transform: ${({ isBack }) => (isBack ? 'rotateX(180deg)' : 'rotateX(0)')};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: inherit;
`;

const InteractiveDescription: React.FC<InteractiveDescriptionProps> = ({
  className,
  description,
  additionalContent,
  color,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <DescriptionContainer
      className={className}
      color={color}
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-live="polite"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' ? handleFlip() : null)}
    >
      <DescriptionContent isFlipped={isFlipped}>
        <DescriptionFace isHovered={isHovered} color={color}>
          <Title>Front</Title>
          <Description>{description}</Description>
        </DescriptionFace>
        <DescriptionFace isBack isHovered={isHovered} color={color}>
          <Title>Back</Title>
          <Description>{additionalContent}</Description>
        </DescriptionFace>
      </DescriptionContent>
    </DescriptionContainer>
  );
};

export default InteractiveDescription;
