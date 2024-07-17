'use client';

import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const SpreadEffectContainer = styled.div<{ color: string; x: number; y: number; delay: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ color }) => color};
  z-index: ${({ color }) => (color === 'black' ? 1000 : 999)};
  animation: spreadEffect 0.75s forwards ${({ delay }) => delay};
  clip-path: circle(0% at ${({ x, y }) => `${x}px ${y}px`});

  @keyframes spreadEffect {
    0% {
      clip-path: circle(0% at ${({ x, y }) => `${x}px ${y}px`});
    }
    100% {
      clip-path: circle(150% at ${({ x, y }) => `${x}px ${y}px`});
    }
  }
`;

interface SpreadEffectProps {
  color: string;
  x: number;
  y: number;
  onAnimationEnd: () => void;
}

const SpreadEffect: React.FC<SpreadEffectProps> = ({ color, x, y, onAnimationEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onAnimationEnd, 800); // Trigger after both animations
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <>
      <SpreadEffectContainer color={color} x={x} y={y} delay="0s" />
      <SpreadEffectContainer color="#212529" x={x} y={y} delay="0.3s" />
    </>
  );
};

export default SpreadEffect;
