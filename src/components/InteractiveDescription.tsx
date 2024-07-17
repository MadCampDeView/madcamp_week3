'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface InteractiveDescriptionProps {
  className?: string;
  cocktailFamily: string;
  cocktailDescr: string;
  ingredients: string[];
  recipeDescr: string[];
  bgColor: string;
  hoverColor: string;
  textColor: string;
}

const ButtonContainer = styled.div`
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const ButtonContent = styled.div<{ rotationY: number; rotationX: number; isClicked: boolean; isHovered: boolean }>`
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s;
  transform: ${({ rotationY, rotationX }) => `rotateY(${rotationY - 20}deg) rotateX(${rotationX * 10}deg) scale(0.95)`};

  &:hover {
    transform: ${({ rotationY, rotationX }) => `rotateY(${rotationY - 25}deg) rotateX(${rotationX * 15}deg) scale(1.00)`};
  }
`;

const Face = styled.div<{ bgColor: string; hoverColor: string; width: number; height: number; transform: string; isHovered: boolean }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ bgColor, hoverColor, isHovered }) => (isHovered ? hoverColor : bgColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border: 2.5px solid ${({ bgColor }) => bgColor};
  transform: ${({ transform }) => transform};
  left: ${({ width }) => -width / 2}px;
  top: ${({ height }) => -height / 2}px;
  border-radius: 2px; /* Rounded edges */
`;

const Title = styled.h2<{ textColor: string }>`
  font-size: 18px;
  margin: 0;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const Description = styled.p<{ textColor: string }>`
  font-size: 14px;
  margin: 0;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const List = styled.ul<{ textColor: string }>`
  padding-left: 20px;
  margin: 0;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const ListItem = styled.li<{ textColor: string }>`
  font-size: 14px;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const InteractiveDescription: React.FC<InteractiveDescriptionProps> = ({
  className,
  cocktailFamily,
  cocktailDescr,
  ingredients,
  recipeDescr,
  bgColor,
  hoverColor,
  textColor
}) => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width, height });
    }
  }, []);

  const handleFlip = () => {
    setRotationY((prevRotationY) => prevRotationY + 180);
    setRotationX((prevRotationX) => -prevRotationX);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600); // Reset isClicked after animation duration
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const depth = 200;
  const width = containerDimensions.width * 0.75;
  const height = containerDimensions.height * 0.75;

  return (
    <ButtonContainer className={className} ref={containerRef}>
      <ButtonContent
        onClick={handleFlip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        rotationY={rotationY}
        rotationX={rotationX}
        isClicked={isClicked}
        isHovered={isHovered}
      >
        <Face bgColor={bgColor} hoverColor={hoverColor} width={width} height={height} transform={`translateZ(${depth / 2}px)`} isHovered={isHovered}>
          <div>
            <Title textColor={textColor}>{cocktailFamily}</Title>
            <Description textColor={textColor}>{cocktailDescr}</Description>
          </div>
        </Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={width} height={height} transform={`rotateY(180deg) translateZ(${depth / 2}px)`} isHovered={isHovered}>
          <div>
            <Title textColor={textColor}>Ingredients</Title>
            <List textColor={textColor}>
              {ingredients.map((ingredient, index) => (
                <ListItem textColor={textColor} key={index}>{ingredient}</ListItem>
              ))}
            </List>
            <Title textColor={textColor}>Recipe</Title>
            <List textColor={textColor}>
              {recipeDescr.map((step, index) => (
                <ListItem textColor={textColor} key={index}>{step}</ListItem>
              ))}
            </List>
          </div>
        </Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={depth} height={height} transform={`rotateY(90deg) translateZ(${width / 2}px)`} isHovered={isHovered}></Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={depth} height={height} transform={`rotateY(-90deg) translateZ(${width / 2}px)`} isHovered={isHovered}></Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={width} height={depth} transform={`rotateX(90deg) translateZ(${height / 2}px)`} isHovered={isHovered}></Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={width} height={depth} transform={`rotateX(-90deg) translateZ(${height / 2}px)`} isHovered={isHovered}></Face>
      </ButtonContent>
    </ButtonContainer>
  );
};

export default InteractiveDescription;
