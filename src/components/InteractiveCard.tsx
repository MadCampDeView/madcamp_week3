// components/InteractiveCard.tsx
'use client'; // This line indicates that this component should be rendered on the client side

import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface InteractiveCardProps {
  className?: string;
  hitboxClass?: string;
  title: string;
  description: string;
  position: 'left' | 'right' | 'center';
  color?: string;
}

const CardContainer = styled.div<{ position: 'left' | 'right' | 'center'; color?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1.618; /* golden ratio */
  background-color: #7DF9FF;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, height 0.3s ease, width 0.3s ease;
  margin: 20px auto;
  position: relative;
  transform: ${({ position }) => {
    if (position === 'center') return 'scale(0.95)';
    if (position === 'left') return 'scale(0.85) rotateY(-15deg)';
    if (position === 'right') return 'scale(0.85) rotateY(15deg)';
  }};
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
  justify-content: center;
  align-items: center;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  cursor: pointer;
`;

const InteractiveCard: React.FC<InteractiveCardProps> = ({ className, hitboxClass, title, description, position, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();

    const x = e.clientX - cardRect.left; // x position within the element.
    const y = e.clientY - cardRect.top;  // y position within the element.

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateY = Math.sin(((centerX - x) / centerX) * (Math.PI / 2)) * 7.5; // max rotation is 10 degrees
    const rotateX = Math.sin(((y - centerY) / centerY) * (Math.PI / 2)) * 7.5; // max rotation is 10 degrees

    if (position === 'center') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.00)`;
    if (position === 'left') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY-15}deg) scale(0.90)`;
    if (position === 'right') card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY+15}deg) scale(0.90)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    if (position === 'center') card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(0.95)`;
    if (position === 'left') card.style.transform = `perspective(1000px) rotateX(0) rotateY(-15deg) scale(0.85)`;
    if (position === 'right') card.style.transform = `perspective(1000px) rotateX(0) rotateY(15deg) scale(0.85)`;
  };

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      if (position === 'center') card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(0.95)`;
      if (position === 'left') card.style.transform = `perspective(1000px) rotateX(0) rotateY(-15deg) scale(0.85)`;
      if (position === 'right') card.style.transform = `perspective(1000px) rotateX(0) rotateY(15deg) scale(0.85)`;
    }
  }, [position]);

  return (
    <CardContainer className={className} ref={cardRef} position={position} color={color}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Hitbox className={hitboxClass} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
    </CardContainer>
  );
};

export default InteractiveCard;
