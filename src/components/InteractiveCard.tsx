'use client'; // This line indicates that this component should be rendered on the client side

import React, { useRef } from 'react';
import styles from '../../styles/MainPage.module.css';

interface InteractiveCardProps {
  className: string;
  hitboxClass: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ className, hitboxClass }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const cardRect = card.getBoundingClientRect();

    const x = e.clientX - cardRect.left; // x position within the element.
    const y = e.clientY - cardRect.top;  // y position within the element.

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const rotateY = Math.sin(((centerX - x) / centerX) * (Math.PI / 2)) * 10; // max rotation is 10 degrees
    const rotateX = Math.sin(((y - centerY) / centerY) * (Math.PI / 2)) * 10; // max rotation is 10 degrees

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
  };

  return (
    <div className={className} ref={cardRef}>
      <div className={hitboxClass} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}></div>
    </div>
  );
};

export default InteractiveCard;
