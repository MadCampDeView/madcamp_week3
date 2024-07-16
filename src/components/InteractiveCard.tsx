'use client';

import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useTransition } from './TransitionContext';

interface InteractiveCardProps {
  className?: string;
  hitboxClass?: string;
  title: string;
  description: string;
  position: 'left' | 'right' | 'center';
  color?: string;
}

const CardContainer = styled.div<{ position: 'left' | 'right' | 'center'; color?: string }>`
  perspective: 1000px;
  margin: 20px auto;
  width: 500px;  /* Set a fixed width */
  height: auto;
  max-width: 85%;  /* Ensure it doesn't exceed the container width */
  position: relative;
  aspect-ratio: 1 / 1.618; /* Maintain aspect ratio */
  overflow: visible; /* Allow hitbox to overflow */
  @media (max-width: 600px) {
    width: 250px;  /* Adjust width for smaller screens */
  }
  @media (max-width: 400px) {
    width: 200px;  /* Adjust width for even smaller screens */
  }
`;

const CardContent = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFace = styled.div<{ isBack?: boolean; color?: string }>`
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
  background-color: ${({ color }) => color || '#7DF9FF'};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  overflow: hidden;
  color: #333;
  transform: ${({ isBack }) => (isBack ? 'rotateY(180deg)' : 'rotateY(0)')};
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(white, rgba(255, 255, 255, 0) 50%, white);
    transform: rotate(30deg);
    transition: opacity 0.3s, transform 0.3s;
    opacity: 0;
    pointer-events: none;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
`;

const Hitbox = styled.div`
  position: absolute;
  top: -10%; /* Increase the hitbox area */
  left: -10%; /* Increase the hitbox area */
  width: 120%; /* Increase the hitbox area */
  height: 120%; /* Increase the hitbox area */
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
  top: ${({ y }) => y-100}px;
  left: ${({ x }) => x-500}px;
  // background: linear-gradient(top, transparent, rgba(200,200,200,1));
  background: linear-gradient(0, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%);
  transform: rotate(-35deg);
  pointer-events: none;
  opacity: 1;
  transition: transform 0.5s;
`;

const InteractiveCard: React.FC<InteractiveCardProps> = ({ className, hitboxClass, title, description, position, color }) => {
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

    const x = e.clientX - cardRect.left; // x position within the element.
    const y = e.clientY - cardRect.top;  // y position within the element.

    setLightPosition({ x, y });

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const deltaX = (centerX - x) / centerX;
    const deltaY = (y - centerY) / centerY;

    const rotateY = Math.sin(deltaX * (Math.PI / 2)) * 7.5; // max rotation is 10 degrees
    const rotateX = Math.sin(deltaY * (Math.PI / 2)) * 7.5; // max rotation is 10 degrees

    if (position === 'center') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.00)`;
    if (position === 'left') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY - 15}deg) scale(0.90)`;
    if (position === 'right') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY + 15}deg) scale(0.90)`;

    const avgX = (centerX + x) / 2;
    const avgY = (centerY + y) / 2;
    // const avgX = x;
    // const avgY = y;
    setShinePosition({avgX, avgY});
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

    // Check if the click is within the card bounds
    if (clickX >= cardRect.left && clickX <= cardRect.right && clickY >= cardRect.top && clickY <= cardRect.bottom) {
      const { clientX, clientY } = e;
      // Update the URL to point to the new location
      triggerTransition(color || '#7DF9FF', clientX, clientY, `/card-details?name=${encodeURIComponent(title)}`);
    }
  };

  return (
    <CardContainer
      className={className}
      ref={cardRef}
      position={position}
      color={color}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <CardContent isFlipped={isFlipped}>
        <CardFace color={color}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </CardFace>
        <CardFace isBack color={color}>
          <LightEffect x={lightPosition.x} y={lightPosition.y} isVisible={isLightVisible} />
          <p>Additional content on the back.</p>
          <ShineContainer x={shinePosition.avgX} y={shinePosition.avgY}/>
        </CardFace>
      </CardContent>
      <Hitbox className={hitboxClass} onMouseMove={handleMouseMove} onMouseLeave={resetTransform} />
    </CardContainer>
  );
};

export default InteractiveCard;
