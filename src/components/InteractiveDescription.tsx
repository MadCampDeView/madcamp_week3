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
  imagePath: string; // Added imagePath prop
}

const ButtonContainer = styled.div`
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
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
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FrontFaceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TextContent = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ImageContent = styled.img`
  max-width: 50%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the area */
  border-radius: 8px;
`;

const Title = styled.h2<{ textColor: string }>`
  font-size: 26px; /* Increased font size */
  margin: 0 0 10px;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const Description = styled.p<{ textColor: string }>`
  font-size: 20px; /* Increased font size */
  margin: 0 0 20px;
  color: ${({ textColor }) => textColor}; /* Text color */
`;

const List = styled.ul<{ textColor: string }>`
  padding-left: 20px;
  margin: 10px 0 0;
  color: ${({ textColor }) => textColor}; /* Text color */
  list-style-type: disc;
  text-align: left; /* Left aligned text */
`;

const ListItem = styled.li<{ textColor: string }>`
  font-size: 16px;
  color: ${({ textColor }) => textColor}; /* Text color */
  margin-bottom: 8px;
`;

const InteractiveDescription: React.FC<InteractiveDescriptionProps> = ({
  className,
  cocktailFamily,
  cocktailDescr,
  ingredients,
  recipeDescr,
  bgColor,
  hoverColor,
  textColor,
  imagePath // Added imagePath prop
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
          <FrontFaceContent>
            <TextContent>
              <Title textColor={textColor}>{cocktailFamily}</Title>
              <Description textColor={textColor}>{cocktailDescr}</Description>
            </TextContent>
            <ImageContent src={imagePath} alt={`${cocktailFamily} image`} />
          </FrontFaceContent>
        </Face>
        <Face bgColor={bgColor} hoverColor={hoverColor} width={width} height={height} transform={`rotateY(180deg) translateZ(${depth / 2}px)`} isHovered={isHovered}>
          <div style={{ textAlign: 'left', margin: '0 20px' }}> {/* Added margin and text align */}
            <Title textColor={textColor}>Ingredients</Title>
            <List textColor={textColor}>
              {ingredients.map((ingredient, index) => (
                <ListItem textColor={textColor} key={index}>{ingredient}</ListItem>
              ))}
            </List>
            <Title textColor={textColor} style={{ marginTop: '20px' }}>Recipe</Title>
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
