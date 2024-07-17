'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

interface InteractiveTitleProps {
  className?: string;
  title: string;
  bgColor: string;
  textColor: string;
  backColor: string;
}

const ButtonContainer = styled.div`
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ButtonContent = styled.div<{ rotationX: number; rotationY: number; isHovered: boolean; isClicked: boolean; isRed: boolean; bgColor: string; textColor: string }>`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s, background-color 0.4s;
  transform: ${({ rotationX, rotationY }) => `rotateX(${rotationX - 7.5}deg) rotateY(${rotationY * 20}deg) scale(0.95)`};
  background-color: ${({ isRed, bgColor }) => (isRed ? 'red' : bgColor)};
  color: ${({ textColor }) => textColor};

  &:hover {
    transform: ${({ rotationX, rotationY }) => `rotateX(${rotationX - 12.5}deg) rotateY(${rotationY * 25}deg) scale(1.00)`};
  }
`;

const Face = styled.div<{ bgColor: string; hoverColor: string; backColor: string; width: number; height: number; transform: string; isHovered: boolean; isRed: boolean; textColor: string }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ isRed, bgColor, hoverColor, backColor, isHovered }) =>
    isRed ? backColor : isHovered ? hoverColor : bgColor};
  color: ${({ isRed, bgColor, textColor }) => 
    isRed ? bgColor : textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border: 2.5px solid ${({ isRed, bgColor, backColor }) =>
    isRed ? backColor : bgColor};
  transform: ${({ transform }) => transform};
  left: ${({ width }) => -width / 2}px;
  top: ${({ height }) => -height / 2}px;
  border-radius: 2px;
`;

const Title = styled.h2`
  font-size: 4vw;
  margin: 0;
  text-align: center;
`;

const InteractiveTitle: React.FC<InteractiveTitleProps> = ({
  className,
  title,
  bgColor,
  textColor,
  backColor
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(1);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
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

  const lightenColor = (color: string) => {
    let usePound = false;

    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);

    let r = (num >> 16) + 20;
    if (r > 255) r = 255;

    let b = ((num >> 8) & 0x00FF) + 20;
    if (b > 255) b = 255;

    let g = (num & 0x0000FF) + 20;
    if (g > 255) g = 255;

    const newColor = (g | (b << 8) | (r << 16)).toString(16);
    return (usePound ? "#" : "") + newColor.padStart(6, '0');
  };

  const hoverColor = lightenColor(bgColor);

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
        bgColor={bgColor}
        textColor={textColor}
      >
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={width}
          height={height}
          transform={`translateZ(${depth / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        >
          <Title>{title}</Title>
        </Face>
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={width}
          height={height}
          transform={`rotateY(180deg) rotateZ(180deg) translateZ(${depth / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        >
          <Title>Main Menu</Title>
        </Face>
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={depth}
          height={height}
          transform={`rotateY(90deg) translateZ(${width / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        ></Face>
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={depth}
          height={height}
          transform={`rotateY(-90deg) translateZ(${width / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        ></Face>
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={width}
          height={depth}
          transform={`rotateX(90deg) translateZ(${height / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        ></Face>
        <Face
          bgColor={bgColor}
          hoverColor={hoverColor}
          width={width}
          height={depth}
          transform={`rotateX(-90deg) translateZ(${height / 2}px)`}
          isHovered={isHovered}
          isRed={isRed}
          textColor={textColor}
          backColor={backColor}
        ></Face>
      </ButtonContent>
    </ButtonContainer>
  );
};

export default InteractiveTitle;
