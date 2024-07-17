'use client';

import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTransition } from './TransitionContext';

interface InteractiveCardProps {
  className?: string;
  hitboxClass?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  ingredients: string[];
  position: 'left' | 'right' | 'center';
  bgColor: string;
  textColor: string;
}

const CardContainer = styled.div<{ position: 'left' | 'right' | 'center'; bgColor: string; textColor: string }>`
  perspective: 1000px;
  margin: 20px auto;
  width: 500px;
  height: auto;
  max-width: 95%;
  position: relative;
  aspect-ratio: 1 / 1.618;
  overflow: visible;
  @media (max-width: 600px) {
    width: 250px;
  }
  @media (max-width: 400px) {
    width: 200px;
  }
`;

const CardContent = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div<{ isBack?: boolean; bgColor: string; textColor: string }>`
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
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: hidden;
  transform: ${({ isBack }) => (isBack ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CocktailFamily = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

const Description = styled.p`
  width: 75%;
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const IngredientsList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 16px;
  margin-top: 50px;
  width: 75%;
  margin-bottom: 10px;
  overflow-y: auto;
  text-align: left;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
`;

const Ingredient = styled.li`
  margin: 5px 0;
  line-height: 1.5;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;


const Hitbox = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  cursor: pointer;
  z-index: 1;
`;

const LightEffect = styled.div<{ x: number; y: number; isVisible: boolean }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%);
  border-radius: 50%;
  pointer-events: none;
  transition: opacity 0.5s, transform 0.5s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const ShineContainer = styled.div<{ x: number; y: number }>`
  width: 1000px;
  height: 200px;
  position: absolute;
  top: ${({ y }) => y - 100}px;
  left: ${({ x }) => x - 500}px;
  background: linear-gradient(0, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 30%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.15) 80%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-35deg);
  pointer-events: none;
  opacity: 1;
  transition: transform 0.5s;
`;

const InteractiveCard: React.FC<InteractiveCardProps> = ({ className, hitboxClass, title, description, image, category, ingredients, position, bgColor, textColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const [isLightVisible, setIsLightVisible] = useState(false);
  const [shinePosition, setShinePosition] = useState({ avgX: 0, avgY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { triggerTransition } = useTransition();

  const handleMouseEnter = () => {
    setIsFlipped(true);
    setIsLightVisible(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setIsLightVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();

    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    setLightPosition({ x, y });

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const deltaX = (centerX - x) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateY = Math.sin(deltaX * (Math.PI / 2)) * 7.5;
    const rotateX = Math.sin(deltaY * (Math.PI / 2)) * 7.5;

    if (position === 'center') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.00)`;
    if (position === 'left') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY - 15}deg) scale(0.90)`;
    if (position === 'right') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY + 15}deg) scale(0.90)`;

    const avgX = (centerX + x) / 2;
    const avgY = (centerY + y) / 2;
    setShinePosition({ avgX, avgY });
  };

  const resetTransform = () => {
    const card = cardRef.current;
    if (!card) return;

    if (position === 'center') card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(0.95)`;
    if (position === 'left') card.style.transform = `perspective(1000px) rotateX(0) rotateY(-15deg) scale(0.85)`;
    if (position === 'right') card.style.transform = `perspective(1000px) rotateX(0) rotateY(15deg) scale(0.85)`;
  };

  useEffect(() => {
    resetTransform();
  }, [position]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const card = cardRef.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();

    const clickX = e.clientX;
    const clickY = e.clientY;

    if (clickX >= cardRect.left && clickX <= cardRect.right && clickY >= cardRect.top && clickY <= cardRect.bottom) {
      const { clientX, clientY } = e;
      triggerTransition(bgColor, clientX, clientY, `/card-details?name=${encodeURIComponent(title)}`);
    }
  };

  return (
    <CardContainer
      className={className}
      ref={cardRef}
      position={position}
      bgColor={bgColor}
      textColor={textColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <CardContent isFlipped={isFlipped}>
        <CardFace bgColor={bgColor} textColor={textColor}>
          <Title>{title}</Title>
          <Image src={image} alt={title} />
          <CocktailFamily>{category}</CocktailFamily>
        </CardFace>
        <CardFace isBack bgColor={bgColor} textColor={textColor}>
          <Description>{description}</Description>
          <IngredientsList>
            {ingredients.map((ingredient, index) => (
              <Ingredient key={index}>{ingredient}</Ingredient>
            ))}
          </IngredientsList>
          <LightEffect x={lightPosition.x} y={lightPosition.y} isVisible={isLightVisible} />
          <ShineContainer x={shinePosition.avgX} y={shinePosition.avgY} />
        </CardFace>
      </CardContent>
      <Hitbox className={hitboxClass} onMouseMove={handleMouseMove} onMouseLeave={resetTransform} />
    </CardContainer>
  );
};

export default InteractiveCard;
