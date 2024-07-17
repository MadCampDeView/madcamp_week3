'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

interface InteractiveTitleProps {
  className?: string;
  title: string;
  color?: string;
  hoverColor?: string; // New prop for hover color
}

const ButtonContainer = styled.div`
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ButtonContent = styled.div<{ rotationX: number; rotationY: number, isHovered: boolean; isClicked: boolean; isRed: boolean }>`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s, background-color 0.4s;
  transform: ${({ rotationX, rotationY }) => `rotateX(${rotationX-7.5}deg) rotateY(${rotationY*20}deg) scale(0.95)`};
  background-color: ${({ isRed }) => (isRed ? 'red' : 'initial')};

  &:hover {
    transform: ${({ rotationX, rotationY }) => `rotateX(${rotationX-12.5}deg) rotateY(${rotationY*25}deg) scale(1.00)`};
  }
`;

const Face = styled.div<{ bgColor?: string; hoverColor?: string; width: number; height: number; transform: string; isHovered: boolean; isRed: boolean }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ isRed, bgColor, hoverColor, isHovered }) =>
    isRed ? 'red' : isHovered ? hoverColor || bgColor : bgColor || 'black'};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border: 2.5px solid ${({bgColor}) => bgColor};
  transform: ${({ transform }) => transform};
  left: ${({ width }) => -width / 2}px;
  top: ${({ height }) => -height / 2}px;
  border-radius: 2px; /* Rounded edges */
`;

const Title = styled.h2`
  font-size: 4vw; /* Responsive font size */
  margin: 0;
  color: #FFD700; /* Modern gold color for titles */
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0;
  color: #FFD700; /* Modern gold color for description */
`;

const InteractiveTitle: React.FC<InteractiveTitleProps> = ({
  className,
  title,
  color = '#444444', // Subtle dark gray color for cuboid faces
  hoverColor = '#666666', // Slightly lighter gray for hover effect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(1);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    if (isRed) {
      const timeout = setTimeout(() => {
        setRotationX(0);
        setRotationY(1);
        setIsRed(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isRed]);

  const handleFlip = () => {
    if (isRed) {
      router.push('/main'); // Navigate to the main screen
    } else {
      setRotationX(180);
      setRotationY(-1);
      setIsRed(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const depth = containerDimensions.height * 0.75;
  const width = containerDimensions.width * 0.75;
  const height = containerDimensions.height * 0.75;

  return (
    <ButtonContainer className={className} ref={containerRef}>
      <ButtonContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlip}
        rotationX={rotationX}
        rotationY={rotationY}
        isHovered={isHovered}
        isClicked={isClicked}
        isRed={isRed}
      >
        <Face bgColor={color} hoverColor={hoverColor} width={width} height={height} transform={`translateZ(${depth / 2}px)`} isHovered={isHovered} isRed={isRed}>
          <Title>{title}</Title>
        </Face>
        <Face bgColor={color} hoverColor={hoverColor} width={width} height={height} transform={`rotateY(180deg) rotateZ(180deg) translateZ(${depth / 2}px)`} isHovered={isHovered} isRed={isRed}>
          <Title>Main Menu</Title>
        </Face>
        <Face bgColor={color} hoverColor={hoverColor} width={depth} height={height} transform={`rotateY(90deg) translateZ(${width / 2}px)`} isHovered={isHovered} isRed={isRed}></Face>
        <Face bgColor={color} hoverColor={hoverColor} width={depth} height={height} transform={`rotateY(-90deg) translateZ(${width / 2}px)`} isHovered={isHovered} isRed={isRed}></Face>
        <Face bgColor={color} hoverColor={hoverColor} width={width} height={depth} transform={`rotateX(90deg) translateZ(${height / 2}px)`} isHovered={isHovered} isRed={isRed}></Face>
        <Face bgColor={color} hoverColor={hoverColor} width={width} height={depth} transform={`rotateX(-90deg) translateZ(${height / 2}px)`} isHovered={isHovered} isRed={isRed}></Face>
      </ButtonContent>
    </ButtonContainer>
  );
};

export default InteractiveTitle;
